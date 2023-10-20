import Link from "next/link";
import { tablesKO2EN, groups } from "@/config/config";
import "./style.css";
function Group({ table, handleClkLink }) {

  return (
    groups[table] &&
    <div className="gnb__groups">
      {groups[table].map((group, idx) => (
        <Link
          key={"gnb-group_" + idx}
          className="gnb__group_btn"
          href={`/${tablesKO2EN[table]}?group=${group}`}
          onClick={() => handleClkLink(group)}
          scroll={false}
        >
          {group}
        </Link>
      ))}
    </div>
  );
}

export default Group;