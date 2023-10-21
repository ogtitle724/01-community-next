"use client";
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { selectTable, selectWidth, setTable } from "@/redux/slice/pageSlice";
import { tables, tablesKO2EN } from "@/config/config";
import Group from "./components/group/group";
import "./style.css";

function Gnb() {
  const dispatch = useDispatch();
  const table = useSelector(selectTable);
  const width = useSelector(selectWidth);
  const marker = useRef();
  const gnb = useRef();
  const btnFocus = useRef();

  useEffect(() => {
    const validButton = Object.values(gnb.current.children).find(
      (btn) => btn.innerHTML === table
    );
    if (validButton) {
      btnFocus.current = validButton;
      marker.current.style = `width:${btnFocus.current.offsetWidth}px; left:${btnFocus.current.offsetLeft}px;`;
    }
  }, [width, table]);

  const handleClkLink = (table) => dispatch(setTable({ table }));
  console.log("GNB");
  return (
    <nav ref={gnb} className="gnb">
      <Link
        className="gnb__btn"
        href={process.env.NEXT_PUBLIC_ROUTE_HOME}
        onClick={() => handleClkLink("홈")}
        scroll={false}
      >
        홈
      </Link>
      {tables.map((table, idx) => {
        return (
          <Link
            key={"gnb-table_" + idx}
            className="gnb__btn"
            href={`/${tablesKO2EN[table]}`}
            onClick={() => handleClkLink(table)}
            scroll={false}
          >
            {table}
          </Link>
        );
      })}
      <Link
        className="gnb__btn barter__btn"
        href={"/showcase"}
        onClick={() => handleClkLink("물물교환")}
        scroll={false}
      >
        물물교환
      </Link>
      <div ref={marker} className="gnb__mark"></div>
      <Group table={table} handleClkLink={handleClkLink} />
    </nav>
  );
}

export default memo(Gnb);
