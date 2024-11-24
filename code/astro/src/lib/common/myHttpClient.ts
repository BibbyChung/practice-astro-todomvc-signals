import { EnumMyErrorCustomCode, MyError } from "./my-error";

// 'json' | 'text' | 'blob' | 'arraybuffer' = 'json'
export type resType = "json" | "text";

export const contentTypeJsonHeaders = { "Content-Type": "application/json" };
export const contentTypeTextHeaders = { "Content-Type": "text/plain" };

const noCacheHeaders = {
  "Cache-Control":
    "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
  Pragma: "no-cache",
  Expires: "0",
};

const checkStatusAndHandleData = async <T>(
  res: Response,
  resType: resType = "json"
) => {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    if (resType === "json") {
      return await (res.json() as Promise<T>);
    }
    if (resType === "text") {
      return await (res.text() as Promise<T>);
    }
    const myError = new MyError(
      EnumMyErrorCustomCode.notSupportHttpContentType
    );
    throw myError;
  } else {
    const tt = await res.text();
    try {
      const jj = JSON.parse(tt) as object;
      throw Error(JSON.stringify(jj));
    } catch (err) {
      throw Error(tt);
    }
  }
};

const getResult = async <T>(res: Response, resType: resType) =>
  await checkStatusAndHandleData<T>(res, resType);

const getQueryString = (data: object) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          params.append(key, value.toString());
        });
      } else {
        params.append(key, value.toString());
      }
    }
  });
  return params.toString();
};

export const getHttpClient = async <T>(
  url: string,
  qs: Record<string, any> = {},
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  let newUrl = url;
  if (Object.keys(qs ?? {}).length !== 0) {
    newUrl = `${url}?${getQueryString(qs)}`;
  }
  const res = await fetch(newUrl, {
    method: "GET",
    ...options,
  });
  return await getResult<T>(res, resType);
};

export const getByNoCacheHttpClient = async <T>(
  url: string,
  qs: Record<string, any> = {},
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) =>
  await getHttpClient<T>(
    url,
    qs,
    {
      ...options,
      ...{
        headers: {
          ...noCacheHeaders,
          ...(options.headers as object),
        },
      },
    },
    resType
  );

export const postByUrlencodedHttpClient = async <T>(
  url: string,
  body: Record<string, string>,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  const params = new URLSearchParams();
  for (const key in body) {
    params.append(key, body[key]);
  }

  const res = await fetch(url, {
    method: "POST",
    ...options,
    body: params,
  });

  return await getResult<T>(res, resType);
};

export const postByFormDataHttpClient = async <T>(
  url: string,
  body: Record<string, string>,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  // https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
  // formData.append('file', fileInput.files[0]);
  const FormData = (await import("form-data")).default;
  const data = new FormData();
  for (const key in body) {
    const obj = body[key];
    data.append(key, obj);
  }

  const res = await fetch(url, {
    method: "POST",
    ...options,
    body: data as any,
  });
  return await getResult<T>(res, resType);
};

export const postHttpClient = async <T>(
  url: string,
  body: object,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  const res = await fetch(url, {
    method: "POST",
    ...options,
    body: JSON.stringify(body),
  });

  return await getResult<T>(res, resType);
};

export const patchHttpClient = async <T>(
  url: string,
  body: object,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  const res = await fetch(url, {
    method: "PATCH",
    ...options,
    body: JSON.stringify(body),
  });

  return await getResult<T>(res, resType);
};

export const putHttpClient = async <T>(
  url: string,
  body: object,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  const res = await fetch(url, {
    method: "PUT",
    ...options,
    body: JSON.stringify(body),
  });
  return await getResult<T>(res, resType);
};

export const delHttpClient = async <T>(
  url: string,
  options: Record<string, object | string> = { headers: {} },
  resType: resType = "json"
) => {
  const res = await fetch(url, {
    method: "DELETE",
    ...options,
  });
  return await getResult<T>(res, resType);
};
