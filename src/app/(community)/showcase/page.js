import Fetch from "@/util/fetch";
import ServerError from "../_components/error/Error";
import Showcase from "./_components/showcase/showcase";

export default async function showCasePage({ searchParams }) {
  const order = searchParams?.order ?? "최신순";

  try {
    const res = await Fetch.get(process.env.NEXT_PUBLIC_PATH_ITEM_PAGING);
    const itemData = await res.json();

    return <Showcase itemData={itemData} />;
  } catch (err) {
    console.error(err);
    return <ServerError />;
  }
}
