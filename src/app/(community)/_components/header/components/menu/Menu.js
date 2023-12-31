import { useRef, memo } from "react";
import { useSelector } from "react-redux";
import { selectIsLogIn } from "@/redux/slice/signSlice";
import Sign from "../sign/Sign";
import UserBoard from "../user_board/UserBoard";
import SearchBar from "@community/search_bar/SearchBar";
import Modal from "../../../modal/Modal";
import "./style.css";

function MenuBtn() {
  console.log("MENU");
  const dialogRef = useRef();
  const isLogIn = useSelector(selectIsLogIn);

  return (
    <>
      <button
        className="btn-menu"
        onClick={() => dialogRef.current.showModal()}
        aria-label="메뉴"
      ></button>
      <Modal dialogRef={dialogRef} isForm={true}>
        <div className="menu">
          <div className="menu__sign">
            <SearchBar dialogRef={dialogRef} />
            {isLogIn ? <UserBoard /> : <Sign />}
          </div>
          <div className="menu__content"></div>
        </div>
      </Modal>
    </>
  );
}

export default memo(MenuBtn);
