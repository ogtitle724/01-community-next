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

  try {
    const res = await Fetch.get("/ids");
    const idData = await res.json();

    const postSitemap = idData.postsIds.map((data) => {
      return {
        url: `https://clipmk.com/post/${data.id}`,
        lastModified: data.wr_date,
        changeFrequency: "always",
        priority: 1,
      };
    });

    const itemSitemap = idData.itemsIds.map((data) => {
      return {
        url: `https://clipmk.com/item/${data.id}`,
        lastModified: data.wr_date,
        changeFrequency: "always",
        priority: 1,
      };
    });

    sitemap = [...sitemap, ...postSitemap, ...itemSitemap];
  } catch (err) {
    console.error(err);
  }

  return sitemap;
}
