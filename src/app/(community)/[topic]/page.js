import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import Fetch from "@/util/fetch";
import { categoryEN2KO } from "@/config/config";

export default async function TopicPage(props) {
  const category = categoryEN2KO[props.params.topic];
  const querys = props.searchParams;
  const group = querys.group;
  const page = querys.page ?? 1;

  try {
    let path =
      process.env.NEXT_PUBLIC_PATH_PAGING +
      `/${category}?page=${page - 1}&size=30`;

    if (group) path += `group=${group}`;

    console.log("group:", group);

    const res = await Fetch.get(path, { next: { revalidate: 0 } });
    const postData = await res.json();

    return (
      <>
        <Board
          posts={postData}
          title={category + (group ? `.${group}` : "")}
        ></Board>
      </>
    );
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
