import Fetch from "@/util/fetch";
import ServerError from "../../_components/error/Error";
import BtnInterface from "./_components/btn_interface/btnInterface";
import BtnSug from "./_components/btn_sug/btnSug";
import ImgSlider from "./_components/img_slider/ImgSlider";
import Link from "next/link";
import { cache } from "react";
import { sanitize } from "@/util/secure";
import { metaData } from "@/config/metadata";
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
  const pageMetaData = structuredClone(metaData);

  if (itemData) {
    const metaTitle = `${itemData.title} | 물물교환/중고거래 `;
    const metaDescription = deleteTags(itemData.content.slice(0, 250));
    const metaUrl = path;

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
            {itemData.deals.content.length ? (
              itemData.deals.content.map((deal, idx) => {
                return (
                  <li
                    key={`item-${itemData.id}-deal-${idx}`}
                    className="suged-item"
                  >
                    <div className="suged-item__img"></div>
                    <span className="suged-item__title">
                      <Link
                        href={process.env.NEXT_PUBLIC_PATH_ITEM + `/${deal.id}`}
                      >
                        {deal.title}
                      </Link>
                    </span>
                    <span className="suged-item__nick">{"닉네임이 없다"}</span>
                  </li>
                );
              })
            ) : (
              <span className="suged-list__no-data">
                {"첫 거래를 제안해주세요!"}
              </span>
            )}
          </ul>
        </div>
        <BtnSug itemDetail={itemData} />
      </main>
    );
  } else {
    return <ServerError />;
  }
}
