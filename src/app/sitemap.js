/* // app/sitemap.js
import { getSortedPostsData } from "../lib/posts";
import { categories } from '@/config/category';

const URL = process.env.NEXT_PUBLIC_URL_CLI
const template = {
  url: null,
  lastModified: null
}

export default async function sitemap() {
  const topics = Object.entries(categories).reduce((acc, cur) => {
    const [main, subs] = cur
    acc.push({
      url: `${URL}/${main}`,
      lastModified: new Date()
    })

    subs.forEach(sub => {
      acc.push({
        url: `${URL}/${main}`,
        lastModified: new Date()
      })
    })
  }, [])
  //모든 포스트 id와 item 아이디를 받아서 생성해야할듯
  const posts = getSortedPostsData.map(({ id, date }) => ({
    url: `${URL}/blog/${id}`,
    lastModified: date,
  }));

  const routes = ["", "/[topic]", "/post/", ''].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
} */
