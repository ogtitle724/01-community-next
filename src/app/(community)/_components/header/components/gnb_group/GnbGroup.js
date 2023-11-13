import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleClkBtnGroup = (arg) => {
    dispatch(setGroup(arg));
    router.refresh();
    router.push(`/${categoryKO2EN[category]}?group=${arg}`);
  };

  if (category) {
    return (
      <nav className="gnb-group">
        {categories[category]?.map((group, idx) => {
          return (
            <a
              key={"gnb-group_" + idx}
              className={
                "gnb-group__item text--vs" +
                (group === grp ? " gnb-group__item--cur" : "")
              }
              onClick={() => handleClkBtnGroup(group)}
            >
              {group}
            </a>
          );
        })}
      </nav>
    );
  }
}

export default memo(GnbGroup);
