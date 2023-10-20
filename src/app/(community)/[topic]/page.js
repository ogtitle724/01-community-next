import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import Fetch from "@/util/fetch";
import { tablesEN2KO } from "@/config/config";

export default async function TopicPage(props) {
  const table = tablesEN2KO[props.params.topic];
  const querys = props.searchParams;
  const page = querys.page ?? 1;

  try {
    const res = await Fetch.get(
      process.env.NEXT_PUBLIC_PATH_PAGING +
        `/${table}?page=${page - 1}&size=30`,
      { next: { revalidate: 0 } }
    );
    const postData = await res.json();
    console.log(postData.content);
    return <Board posts={postData} title={table ?? "홈"}></Board>;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
