import Board from "./_components/board/Board";
import Fetch from "@/util/fetch";
import Slider from "./_components/slider/Slider";
import ServerError from "./_components/error/Error";
import { categoryEN2KO } from "@/config/config";

export default async function HomePage(props) {
  const category = categoryEN2KO[props.params.topic];
  const querys = props.searchParams;
  const page = querys.page ?? 1;

  try {
    const res = await Fetch.get(
      process.env.NEXT_PUBLIC_PATH_PAGING + `/best?page=${page - 1}&size=30`,
      { next: { revalidate: 0 } }
    );
    const postData = await res.json();

    return (
      <>
        <Slider />
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
