"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/signSlice";
import "./style.css";

export default function BtnUd({ writerId, postId }) {
  const [isWriter, setIsWriter] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user && writerId === user.id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [user, writerId]);

  const handleClickUpdate = () => {
    router.push(process.env.NEXT_PUBLIC_ROUTE_WRITE + `/${postId}`);
  };

  const handleClickDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    let isDelete = confirm("게시물을 삭제 하시겠습니까?");

    if (isDelete) {
      try {
        const path = process.env.NEXT_PUBLIC_PATH_POST + `/${postId}`;
        await Fetch.delete(path);
        router.back();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    isWriter && (
      <div className="ud">
        <span className="ud__btn ud__span" onClick={handleClickUpdate}>
          수정
        </span>
        <span className=" ud__span">|</span>
        <span className="ud__btn ud__span" onClick={handleClickDelete}>
          삭제
        </span>
      </div>
    )
  );
}
