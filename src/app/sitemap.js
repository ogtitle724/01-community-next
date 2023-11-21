import Fetch from "@/util/fetch";
import { categories, categoryKO2EN } from "@/config/category";

export default async function sitemap() {
  let sitemap = [];

  sitemap.push({
    url: `https://www.clipmk.com`,
    lastModified: new Date(),
    changeFrequency: "always",
    priority: 1,
  });

  Object.keys(categories).forEach((tbl) => {
    sitemap.push({
      url: `https://www.clipmk.com/${categoryKO2EN[tbl]}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    });

    categories[tbl].forEach((grp) => {
      sitemap.push({
        url: `https://www.clipmk.com/${categoryKO2EN[tbl]}/${grp}`,
        lastModified: new Date(),
        changeFrequency: "always",
        priority: 0.5,
      });
    });
  });

  let data;

  try {
    const res = await Fetch.get("/board/posts-ids");
    data = await res.json();
  } catch (err) {
    console.error(err);
  }

  (data = data.map((id) => {
    return {
      url: `https://clipmk.com/post/${id}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    };
  })),
    (sitemap = [...sitemap, ...data]);

  return sitemap;
}
