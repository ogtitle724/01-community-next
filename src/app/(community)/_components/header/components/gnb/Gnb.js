import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { selectCategory, setCategory, setGroup } from "@/redux/slice/pageSlice";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { categories, categoryKO2EN } from "@/config/category";
import "./style.css";

function Gnb() {
  console.log("GNB");
  const width = useSelector(selectWidth);
  const dispatch = useDispatch();
  const marker = useRef();
  const gnb = useRef();
  const btnFocus = useRef();
  const category = useSelector(selectCategory);
  const router = useRouter();

  useEffect(() => {
    if (gnb.current) {
      btnFocus.current = Object.values(gnb.current.children).filter(
        (btn) => btn.innerHTML === category
      )[0];
      marker.current.style = `width:${btnFocus.current.offsetWidth}px; left:${btnFocus.current.offsetLeft}px;`;
    }
  }, [width, category]);

  const handleClkBtnGnb = (e, arg) => {
    e.preventDefault();

    dispatch(setGroup(null));
    dispatch(setCategory(arg));
    router.refresh();
    router.push(`/${arg === "홈" ? "" : categoryKO2EN[arg]}`);
  };

  return (
    <>
      <nav ref={gnb} className="gnb">
        <Link
          className="gnb__item text--m"
          href={process.env.NEXT_PUBLIC_ROUTE_HOME}
          scroll={false}
          onClick={(e) => handleClkBtnGnb(e, "홈")}
        >
          홈
        </Link>
        {Object.keys(categories).map((category, idx) => {
          return (
            <Link
              key={"gnb-category_" + idx}
              className="gnb__item text--m"
              href={`/${categoryKO2EN[category]}`}
              scroll={false}
              onClick={(e) => handleClkBtnGnb(e, category)}
            >
              {category}
            </Link>
          );
        })}
        <div ref={marker} className="gnb__mark"></div>
      </nav>
    </>
  );
}

export default memo(Gnb);
