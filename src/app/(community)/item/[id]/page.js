import Fetch from "@/util/fetch";
import ServerError from "../../_components/error/Error";
import BtnInterface from "./_components/btn_interface/btnInterface";
import BtnSug from "./_components/btn_sug/btnSug";
import ImgSlider from "./_components/img_slider/ImgSlider";
import { cache } from "react";
import { sanitize } from "@/util/secure";
import { meta } from "@/config/config";
import { deleteTags } from "@/util/textProcess";
import "./style.css";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path, { next: { revalidate: 0 } });
    return await res.json();
  } catch (err) {
    console.error(err);
    return false;
  }
});

export const generateMetadata = cache(async ({ params }) => {
  const itemId = params.id;
  const path = process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemId}`;
  const itemData = await getData(path);
  const pageMetaData = JSON.parse(JSON.stringify(meta));

  if (itemData) {
    const metaTitle = `${itemData.title} | 클립마켓 스토어 | 물물교환/중고거래 `;
    const metaDescription = deleteTags(itemData.content.slice(0, 250));
    const metaUrl = process.env.NEXT_PUBLIC_DOMAIN_CLI + path;

    pageMetaData.title = metaTitle;
    pageMetaData.description = metaDescription;
    pageMetaData.alternates.canonical = metaUrl;
    pageMetaData.openGraph.title = metaTitle;
    pageMetaData.openGraph.description = metaDescription;
    pageMetaData.openGraph.url = metaUrl;
    pageMetaData.twitter.title = metaTitle;
    pageMetaData.twitter.description = metaDescription;
  }

  return pageMetaData;
});

export default async function ItemDetailPage({ params }) {
  const itemId = params.id;
  const path = process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemId}`;
  const itemData = await getData(path);

  if (itemData) {
    return (
      <main className="item-detail__main">
        <ImgSlider itemDetail={itemData} />
        <h2 className="item-detail__title">{itemData.title}</h2>
        <div
          className="item-detail__description"
          dangerouslySetInnerHTML={{ __html: sanitize(itemData.content) }}
        ></div>
        <BtnInterface itemDetail={itemData} />
        <div className="suged-list">
          <h3 className="suged-list__title">제안된 거래</h3>
          <ul className="suged-list__ul">
            <li className="suged-item">
              <div className="suged-item__img"></div>
              <span className="suged-item__title">
                아이폰 13프로 맥스 스그 s급
              </span>
              <span className="suged-item__nick">샘플유접</span>
            </li>
          </ul>
        </div>
        <BtnSug itemDetail={itemData} />
      </main>
    );
  } else {
    return <ServerError />;
  }
}
