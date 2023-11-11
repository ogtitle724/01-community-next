import Link from "next/link";
import { memo } from "react";
import { categories, categoryKO2EN } from "@/config/category";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, selectGroup, setGroup } from "@/redux/slice/pageSlice";
import "./style.css";

function GnbGroup() {
  console.log("GNBGROUP");
  const category = useSelector(selectCategory);
  const grp = useSelector(selectGroup);
  const dispatch = useDispatch();

  const handleClkBtnGroup = (arg) => {
    dispatch(setGroup(arg));
  };

  if (category) {
    return (
      <nav className="gnb-group">
        {categories[category]?.map((group, idx) => {
          return (
            <Link
              key={"gnb-group_" + idx}
              className={
                "gnb-group__item" +
                (group === grp ? " gnb-group__item--cur" : "")
              }
              href={`/${categoryKO2EN[category]}?group=${group}`}
              onClick={() => handleClkBtnGroup(group)}
            >
              {group}
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default memo(GnbGroup);
