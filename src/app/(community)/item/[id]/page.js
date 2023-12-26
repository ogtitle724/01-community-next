import Fetch from "@/util/fetch";
import ServerError from "../../_components/error/Error";
import BtnInterface from "./_components/btn_interface/btnInterface";
import BtnSug from "./_components/btn_sug/btnSug";
import ImgSlider from "./_components/img_slider/ImgSlider";
import Link from "next/link";
import Image from "next/image";
import { cache } from "react";
import { sanitize } from "@/util/secure";
import { metaData } from "@/config/metadata";
import { deleteTags } from "@/util/textProcess";
import "./style.css";
import revalidate from "@/util/revalidate";

const getData = cache(async (path) => {
  try {
    const res = await Fetch.get(path);
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
    const metaUrl = process.env.NEXT_PUBLIC_URL_CLI + path;

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
  revalidate();
  console.log(itemData.deals);
  if (itemData) {
    return (
      <main className="item-detail__main">
        <ImgSlider itemDetail={itemData} />
        <h1 className="item-detail__title text--l">{itemData.title}</h1>
        <section
          className="item-detail__description text--m"
          dangerouslySetInnerHTML={{ __html: sanitize(itemData.content) }}
        ></section>
        <BtnInterface itemDetail={itemData} />
        <section className="suged-list">
          <span className="suged-list__title text--l">제안된 거래</span>
          <ul className="suged-list__ul">
            {itemData.deals.content.length ? (
              itemData.deals.content.map((deal, idx) => {
                return (
                  <li
                    key={`item-${itemData.id}-deal-${idx}`}
                    className="suged-item"
                  >
                    <Image
                      alt={"item-detail-deal-" + idx}
                      src={itemData.img_src}
                      width={64}
                      height={36}
                      className="suged-item__img"
                    ></Image>
                    <span className="suged-item__title text--m">
                      <Link
                        href={
                          process.env.NEXT_PUBLIC_ROUTE_ITEM + `/${deal.id}`
                        }
                      >
                        {deal.title}
                      </Link>
                    </span>
                    <span className="suged-item__nick text--m">
                      {"닉네임이 없다"}
                    </span>
                  </li>
                );
              })
            ) : (
              <span className="suged-list__no-data text--m">
                {"첫 거래를 제안해주세요!"}
              </span>
            )}
          </ul>
        </section>
        <BtnSug itemDetail={itemData} />
      </main>
    );
  } else {
    return <ServerError />;
  }
}
