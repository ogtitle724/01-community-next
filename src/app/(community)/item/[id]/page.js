import Fetch from "@/util/fetch";
import ServerError from "../../_components/error/Error";
import BtnInterface from "./_components/btn_interface/btnInterface";
import BtnSug from "./_components/btn_sug/btnSug";
import ImgWrapper from "./_components/img_wrapper/ImgWrapper";
import { sanitize } from "@/util/secure";
import "./style.css";

export default async function ItemDetailPage({ params }) {
  const itemId = params.id;

  try {
    let path = process.env.NEXT_PUBLIC_PATH_ITEM + `/${itemId}`;
    const res = await Fetch.get(path, { next: { revalidate: 0 } });
    const itemDetail = await res.json();

    return (
      <main className="item-detail__main">
        {itemDetail?.img_src?.length ? (
          <ImgWrapper itemDetail={itemDetail} />
        ) : (
          <div className="item-detail__no-img"></div>
        )}
        <h2 className="item-detail__title">{itemDetail.title}</h2>
        <div
          className="item-detail__description"
          dangerouslySetInnerHTML={{ __html: sanitize(itemDetail.content) }}
        ></div>
        <BtnInterface itemDetail={itemDetail} />
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
        <BtnSug itemDetail={itemDetail} />
      </main>
    );
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
