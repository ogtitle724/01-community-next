import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { selectCategory, setCategory, setGroup } from "@/redux/slice/pageSlice";
import { useSelector } from "react-redux";
import { selectWidth } from "@/redux/slice/pageSlice";
import { categories, categoryKO2EN } from "@/config/config";
import "./style.css";

function Gnb() {
  console.log("GNB");
  const width = useSelector(selectWidth);
  const dispatch = useDispatch();
  const marker = useRef();
  const gnb = useRef();
  const btnFocus = useRef();
  const category = useSelector(selectCategory);

  useEffect(() => {
    setTimeout(() => {
      btnFocus.current = Object.values(gnb.current.children).filter(
        (btn) => btn.innerHTML === category
      )[0];
      marker.current.style = `width:${btnFocus.current.offsetWidth}px; left:${btnFocus.current.offsetLeft}px;`;
    }, 200);
  }, [width, category]);

  const handleClkBtnGnb = (arg) => {
    dispatch(setGroup(null));
    dispatch(setCategory(arg));
  };

  return (
    <>
      <nav ref={gnb} className="gnb">
        <Link
          className="gnb__item"
          href={process.env.NEXT_PUBLIC_ROUTE_HOME}
          scroll={false}
          onClick={() => handleClkBtnGnb("홈")}
        >
          홈
        </Link>
        {Object.keys(categories).map((category, idx) => {
          return (
            <Link
              key={"gnb-category_" + idx}
              className="gnb__item"
              href={`/${categoryKO2EN[category]}`}
              scroll={false}
              onClick={() => handleClkBtnGnb(category)}
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
