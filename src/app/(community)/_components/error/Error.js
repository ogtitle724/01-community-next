import "./style.css";

export default function ServerError() {
  return (
    <div className="server-error__wrapper">
      <i className="server-error__icon"></i>
      <span className="server-error__message">서버와 연결이 불안정합니다.</span>
    </div>
  );
}
