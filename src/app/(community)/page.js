import Board from "./_components/board/Board";
import Fetch from "@/util/fetch";
import ServerError from "./_components/error/Error";
import dynamic from "next/dynamic";
import Link from "next/link";
import { categoryEN2KO } from "@/config/category";

const Slider = dynamic(() => import("./_components/slider/Slider"));

export default async function HomePage(props) {
  const category = categoryEN2KO[props.params.topic];
  const querys = props.searchParams;
  const page = querys.page ?? 1;

  try {
    const path =
      process.env.NEXT_PUBLIC_PATH_PAGING + `/best?page=${page - 1}&size=30`;
    let res = await Fetch.get(path);
    const postData = await res.json();
    console.log(postData);
    res = await Fetch.get("/board/posts/best?page=1&size=20");
    const bestData = await res.json();
    console.log(bestData);

    return (
      <>
        <Slider />
        <section className="announce">
          <Link className="center--y announce__a " href={"/"}>
            <p className="announce__title">
              ⌨ ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ뭐여이거
            </p>
          </Link>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.32888 4.82792C8.90753 10.3657 11.3745 26.5834 11.7857 34C11.7857 34 18.7755 24.6056 22.476 18.1779C23.7095 14.2223 23.0813 9.59838 17.1308 4.82792C9.72988 -1.10539 -5.89442 -2.09426 2.32888 4.82792Z"
              fill="#F4E592"
            />
          </svg>
        </section>
        <Board
          posts={postData}
          title={category ?? "BEST"}
          isThumbnail={true}
        ></Board>
      </>
    );
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
