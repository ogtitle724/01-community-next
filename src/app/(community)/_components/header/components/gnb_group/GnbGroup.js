import Link from "next/link";
import { memo } from "react";
import { categories, categoryEN2KO, categoryKO2EN } from "@/config/config";
import { useSearchParams } from "next/navigation";
import "./style.css";

function GnbGroup({ category }) {
  console.log("GNBGROUP");
  const searchParams = useSearchParams();
  const grp = searchParams.get("group");

  return (
    <nav className="gnb-group">
      {categories[categoryEN2KO[category]].map((group, idx) => {
        return (
          <Link
            key={"gnb-group_" + idx}
            className={
              "gnb-group__item" + (group === grp ? " gnb-group__item--cur" : "")
            }
            href={`/${category}?group=${group}`}
          >
            {group}
          </Link>
        );
      })}
    </nav>
  );
}

export default memo(GnbGroup);
