import Fetch from "@/util/fetch";
import Board from "../_components/board/Board";
import ServerError from "../_components/error/Error";
import "./style.css";

export default async function SearchPage({ searchParams }) {
  const term = searchParams.term;
  const page = searchParams.page ?? 1;

  try {
    const res = await Fetch.get(
      process.env.REACT_APP_PATH_SEARCH +
        `?page=${page - 1}&size=30&searchTerm=${term}`
    );
    const postData = res.json();
    return <Board posts={postData} title={`'${term}' 관련 게시물`} />;
    return;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
