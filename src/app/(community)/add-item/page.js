export default function SugForm({ setIsSug }) {
  /**
   * 자기 자신이 올려둔 아이템 데이터 받아옴
   * 체크 가능하도록
   * 아이템 별 상태가 있어야 할듯 / 거래제안됨, 거래완료, 일반 => 제안된 상태는 추가적인 제안 가능??
   * 제안 창에서 바로 거래 포스팅 올리도록 하는게 좋을까? 아니면 제안용과 제안받을 용을 나누는게 좋을까?
   * 채팅은 어느타이밍에 넘어가야하지? 제안시 바로 연결은 해야될듯 => 채팅창을 따로 라우팅하는게 맞겠다
   */
  /* const [selecteItemId, setSelectedItemId] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [imgs, setImgs] = useState([]);

  const handleClkBtnSubmit = (e) => {
    e.preventDefault();
    if (selecteItemId) {
      setIsSug(false);
    } else {
      alert("품목을 선택해주세요");
    }
  };

  const handleClkBtnCancel = (e) => {
    e.preventDefault();
    if (isCreate) {
      setIsCreate(false);
      setImgs([]);
    } else {
      setIsSug(false);
      setSelectedItemId(null);
    }
  };

  const handleClkRadio = (e) => {
    setSelectedItemId(e.target.value);
  };

  const handleClkBtnCreate = (e) => {
    e.preventDefault();
    setIsCreate(true);
  };

  const handleClickUploadBtn = (e) => {
    const files = e.target.files;
    let temp = [];

    const loadFile = (fileIndex) => {
      if (files[fileIndex] && fileIndex < 5) {
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
          temp.push(event.target.result);
          loadFile(fileIndex + 1);
        });
        reader.readAsDataURL(files[fileIndex]);
      } else {
        setImgs(temp);
      }
    };

    // Start reading the first file
    loadFile(0);
  };

  const handleClkBtnDel = (e, idx) => {
    e.preventDefault();
    let newImgs = imgs.slice();
    newImgs.splice(idx, 1);

    setImgs(newImgs);
  };

  const getImgs = () => {
    let eles = [];
    for (let i = 0; i < 5; i++) {
      if (imgs?.[i]) {
        eles.push(
          <div className="create-field__img-wrapper">
            <img src={imgs[i]} alt="imgs" className="create-field__img"></img>
            <button
              className="create-filed__btn-delete-img"
              onClick={(e) => handleClkBtnDel(e, i)}
            >
              ✖
            </button>
          </div>
        );
      } else {
        eles.push(<div className="create-field__default-img"></div>);
      }
    }

    return eles;
  };

  return (
    <form className="sug-form" onSubmit={handleClkBtnSubmit}>
      {isCreate ? (
        <>
          <div className="create-field">
            <div className="create-field__img-receive">
              <label
                className="create-field__img-label"
                for="create-field__img-input"
              >
                <input
                  id="create-field__img-input"
                  className="create-field__img-input"
                  type="file"
                  multiple="multiple"
                  capture="environment"
                  ccept="image/*"
                  onChange={handleClickUploadBtn}
                />
                <span className="create-field__img-count">{`${imgs.length}/5`}</span>
              </label>
              {getImgs(imgs)}
            </div>
            <input
              type="text"
              className="create-field__title"
              placeholder="제목을 입력하세요"
            ></input>
            <div className="create-field__description"></div>
          </div>
          <div className="create-field__btn-wrapper">
            <button className="create-field__btn" onClick={handleClkBtnCancel}>
              취 소
            </button>
            <button className="create-field__btn">확 인</button>
          </div>
        </>
      ) : (
        <>
          <ul className="sug-form__items">
            <button className="sug-from__btn-new" onClick={handleClkBtnCreate}>
              + 새로 만들기
            </button>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
            <li>
              <label for="sub-form__radio-id" className="sug-form__item">
                <input
                  type="radio"
                  name="sug-from__radio"
                  id="sub-form__radio-id"
                  className="sug-form__radio-btn"
                  value="id1"
                  onChange={handleClkRadio}
                ></input>
                <div className="sug-form__item-img"></div>
                <span className="sug-form__item-title">샘플 데이터 타이틀</span>
                <span className="sug-form__item-nick">유저123</span>
              </label>
            </li>
          </ul>
          <div className="sug-form__btn-wrapper">
            <button className="sug-form__btn" onClick={handleClkBtnCancel}>
              취 소
            </button>
            <button className="sug-form__btn">확 인</button>
          </div>
        </>
      )}
    </form>
  ); */
}
