import Board from "./_components/board/Board";
import Fetch from "@/util/fetch";
import { tablesEN2KO } from "@/config/config";
import ServerError from "./_components/error/Error";

export default async function HomePage(props) {
  const table = tablesEN2KO[props.params.topic];
  const querys = props.searchParams;
  const page = querys.page ?? 1;

  try {
    const res = await Fetch.get(
      process.env.NEXT_PUBLIC_PATH_PAGING + `/best?page=${page - 1}&size=30`,
      { next: { revalidate: 0 } }
    );
    const postData = await res.json();
    return <Board posts={postData} title={table ?? "홈"}></Board>;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
