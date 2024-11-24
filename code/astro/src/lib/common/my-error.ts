// type EnumDictionary<T extends string | symbol | number, U> = {
//   [K in T]: U;
// };

type ErrorMappingType = Record<
EnumMyErrorCustomCode, {
  statusCode: EnumMyErrorCustomCode;
  message: string
}>;

export enum EnumMyErrorCustomCode {
  // The function must return a status value between 200 and 599 (inclusive),
  // otherwise CloudFront returns an error to the viewer.
  badRequest = 400,
  forbidden = 403,

  custom = 599,

  jwtMalformed = 600,
  userLoginError,
  notSupportHttpContentType,
  newUserToLogin = 997,
  notNotifyJustStopFlow = 998,
  unknownError = 999
}

const mapping: ErrorMappingType = {
  [EnumMyErrorCustomCode.badRequest]: {
    statusCode: EnumMyErrorCustomCode.badRequest,
    message: 'badRequest'
  },
  [EnumMyErrorCustomCode.forbidden]: {
    statusCode: EnumMyErrorCustomCode.forbidden,
    message: 'forbidden'
  },
  [EnumMyErrorCustomCode.custom]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: EnumMyErrorCustomCode[EnumMyErrorCustomCode.custom]
  },
  [EnumMyErrorCustomCode.jwtMalformed]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: 'jwtMalformed'
  },
  [EnumMyErrorCustomCode.userLoginError]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: EnumMyErrorCustomCode[EnumMyErrorCustomCode.userLoginError]
  },
  [EnumMyErrorCustomCode.notSupportHttpContentType]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: 'notSupportHttpContentType'
  },
  [EnumMyErrorCustomCode.newUserToLogin]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: 'newUserToLogin'
  },
  [EnumMyErrorCustomCode.notNotifyJustStopFlow]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: 'notNotifyJustStopFlow'
  },
  [EnumMyErrorCustomCode.unknownError]: {
    statusCode: EnumMyErrorCustomCode.custom,
    message: 'unknownError'
  }
};

export class MyError extends Error {
  private readonly _nn = `MyError`;

  constructor(public customCode: EnumMyErrorCustomCode) {
    super(mapping[customCode]?.message ?? '-');
    this.init();
  }

  private init() {
    this.name = this._nn;
  }

  get statusCode() {
    return mapping[this.customCode]?.statusCode ?? this.customCode;
  }

  get isMyError() {
    return this.name === this._nn;
  }

  getJSONStringify() {
    return JSON.stringify(this);
  }
}
