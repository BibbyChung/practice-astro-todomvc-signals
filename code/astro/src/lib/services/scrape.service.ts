import { getHttpClient } from '../common/myHttpClient'

type PostItem = {
  href: string
  imgSrc: string
  imgSrcset: string
  imgSizes: string
  category: string
  title: string
  publishDate: string
}

const parsePostItems = (html: string, category: string) => {
  const pattern =
    /<li class="p-postList__item">\s*<a href="(?<href>[^"]+)"[^>]*>.*?<img[^>]*?src="(?<imgSrc>[^"]+)"[^>]*?srcset="(?<imgSrcset>[^"]+)"[^>]*?sizes="(?<imgSizes>[^"]+)".*?<span class="c-postThumb__cat icon-folder".*?>(?<category>[^<]+)<\/span>.*?<h2 class="p-postList__title">(?<title>[^<]+)<\/h2>.*?datetime="(?<publishDate>.+?)"[^>]*>/gis

  const posts: PostItem[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(html))) {
    const g = match.groups
    if (g) {
      posts.push({
        href: g.href,
        imgSrc: g.imgSrc,
        imgSrcset: g.imgSrcset,
        imgSizes: g.imgSizes,
        category: g.category,
        title: g.title,
        publishDate: g.publishDate,
      })
    }
  }

  return posts.filter((a) => {
    if (category === '') {
      return true
    }
    return a.category.indexOf(category) !== -1
  })
}

export const getPostItems = async (category: string) => {
  const url = 'https://beebet.com/ja/column/'
  const html = await getHttpClient<string>(url, {}, {}, 'text')
  const posts = parsePostItems(html, category)
  return posts
}
