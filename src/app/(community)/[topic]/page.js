import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import Fetch from "@/util/fetch";
import { categoriesEN2KO } from "@/config/config";

export default async function TopicPage(props) {
  const category = categoriesEN2KO[props.params.topic];
  const querys = props.searchParams;
  const page = querys.page ?? 1;

  try {
    const res = await Fetch.get(
      process.env.NEXT_PUBLIC_PATH_PAGING +
        `/${category}?page=${page - 1}&size=30`
    );
    const postData = await res.json();
    return <Board posts={postData} title={category ?? "홈"}></Board>;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
