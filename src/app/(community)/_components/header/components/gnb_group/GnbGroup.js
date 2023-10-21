import Link from "next/link";
import { memo } from "react";
import { categories, categoryEN2KO, categoryKO2EN } from "@/config/config";
import { useParams, useSearchParams } from "next/navigation";
import "./style.css";

function GnbGroup() {
  console.log("GNBGROUP");
  const params = useParams();
  const category = params.topic;
  const searchParams = useSearchParams();
  const grp = searchParams.get("group");

  if (category) {
    return (
      <nav className="gnb-group">
        {categories[categoryEN2KO[category]].map((group, idx) => {
          return (
            <Link
              key={"gnb-group_" + idx}
              className={
                "gnb-group__item" +
                (group === grp ? " gnb-group__item--cur" : "")
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
}

export default memo(GnbGroup);
