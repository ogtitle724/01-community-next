"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

import Fetch from "@/util/fetch";
import { selectIsDarkMode, selectUser } from "@/redux/slice/signSlice";
import { sanitize } from "@/util/secure";
import { changeP2Span, deleteEnter } from "@/util/textProcess";
import timeConverter from "@/util/time_converter";
/* import thumbsUp from "@/asset/icons/thumbs-up.svg";
import thumbsDown from "@/asset/icons/thumbs-down.svg";
import chatBox from "@/asset/icons/chatbox.svg";
import edit from "@/asset/icons/edit.svg";
import trash from "@/asset/icons/trash.svg";
import close from "@/asset/icons/close.svg"; */
import "./style.css";

export default function CommentBoard({ postId, comments }) {
  console.log("comment rendered");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState(null);
  const editorRef = useRef();
  const router = useRouter();

  const handleClkBtnOk = async () => {
    if (content) {
      let payload, path;
      let contentArg = changeP2Span(content);
      contentArg = deleteEnter(contentArg);

      payload = {
        content: contentArg,
        postId,
      };

      if (target) {
        path = process.env.NEXT_PUBLIC_PATH_REPLY;
        path = path.replace("{comment-id}", target.parentId);
        payload.targetId = target.targetId;
      } else {
        path = process.env.NEXT_PUBLIC_PATH_COMMENT;
      }

      try {
        await Fetch.post(path, payload);
        let ck = editorRef.current.editor;

        ck.setData("댓글을 입력해주세요...");
        setTarget(null);
        setContent("");
        router.refresh();
      } catch (err) {
        alert("로그인이 필요합니다.");
        console.error(err);
      }
    }
  };

  const handleClkBtnCancel = () => {
    let ck = editorRef.current.editor;

    ck.setData("댓글을 입력해주세요...");
    setTarget(null);
    setContent("");
  };

  const ckFocus = () => {
    if (editorRef.current) {
      editorRef.current.editor.editing.view.focus();
    }
  };

  return (
    <section className="comment-board">
      <form className="comment-board__form">
        {target ? (
          <span className="comment-board__form-target">
            {"🔗" + target.targetNick}
          </span>
        ) : (
          ""
        )}
        <CKEditor
          ref={editorRef}
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            editor.setData("댓글을 입력해주세요...");
          }}
          onFocus={(event, editor) => {
            if (content) {
              editor.setData(content);
            } else {
              editor.setData("");
            }
          }}
          onChange={(event, editor) => {
            let data = editor.getData();
            console.log(data);
            if (data === "<p>댓글을 입력해주세요...</p>") {
              setContent("");
            } else {
              setContent(data);
            }
          }}
          onBlur={(event, editor) => {
            if (!content) {
              editor.setData("댓글을 입력해주세요...");
            }
          }}
        />

        <div className={"comment-board__btn-wrapper"}>
          <button
            type="button"
            className="comment-board__btn"
            onClick={() => handleClkBtnOk()}
            disabled={!content}
          >
            ✔
          </button>
          <button
            type="button"
            className="comment-board__btn"
            onMouseDown={() => handleClkBtnCancel()}
          >
            ✖
          </button>
        </div>
      </form>
      {comments.map((comment, idxC) => {
        return (
          <Fragment key={"comment-" + idxC}>
            <Comment
              comment={comment}
              parentId={comment.id}
              target={target}
              setTarget={setTarget}
              ckFocus={ckFocus}
            />
            {comment.replies?.length
              ? comment.replies.map((reply, idxR) => {
                  return (
                    <Comment
                      key={"reply-" + idxR}
                      comment={reply}
                      parentId={comment.id}
                      target={target}
                      setTarget={setTarget}
                      cName={" comment__reply"}
                      ckFocus={ckFocus}
                    />
                  );
                })
              : ""}
          </Fragment>
        );
      })}
    </section>
  );
}

function Comment({ comment, parentId, target, setTarget, cName, ckFocus }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [content, setContent] = useState("");
  const isDarkMode = useSelector(selectIsDarkMode);
  const timeDisplay = timeConverter(comment.wr_date);
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user && user.id === comment.user_id) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  }, [user, comment]);

  const handleClickBtnReply = () => {
    if (target?.targetCommentId === comment.id) {
      setTarget(null);
    } else {
      setTarget({
        parentId,
        targetId: comment.user_id,
        targetNick: comment.user_nick,
        targetCommentId: comment.id,
      });
      ckFocus();
    }
  };

  const handleClkRec = async (value) => {
    if (!user) {
      return alert("로그인이 필요합니다!");
    }

    let path = process.env.NEXT_PUBLIC_PATH_COMMENT_REC.replace(
      "{comment-id}",
      comment.id
    );

    try {
      await Fetch.patch(path, { value });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickBtnEdit = async () => {
    setContent(comment.content);
    setIsEdit(true);
  };

  const handleClkBtnUpdate = async () => {
    let path = process.env.NEXT_PUBLIC_PATH_COMMENT + `/${comment.id}`;
    let contentArg = changeP2Span(content);
    contentArg = deleteEnter(contentArg);

    try {
      await Fetch.patch(path, { content: contentArg });
      setIsEdit(false);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClkBtnCancel = () => {
    setIsEdit(false);
  };

  const handleClickBtnDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("댓글을 삭제하시겠습니까?")) {
      let path = process.env.NEXT_PUBLIC_PATH_COMMENT + `/${comment.id}`;

      try {
        await Fetch.delete(path);
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className={
        "comment__default" +
        (cName ? cName : "") +
        (target?.targetCommentId === comment.id ? " comment-target" : "")
      }
    >
      <span className="comment__info">
        <div className="comment__profile-img"></div>
        <span className="comment__nickname">{comment.user_nick}</span>
        <span className="comment__date">{timeDisplay}</span>
      </span>
      <div className="comment__content">
        {!isEdit && cName ? (
          <span className="comment__reply-target">
            {comment.parent_nick ? "🔗" + comment.parent_nick : "🔗targetNick"}
          </span>
        ) : (
          ""
        )}
        {isEdit ? (
          <>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                editor.setData(content);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
            <div className="comment__edit-btn-wrapper">
              <button
                className="btn-ok comment__edit-btn btn--good"
                onClick={handleClkBtnUpdate}
              >
                ✔
              </button>
              <button
                className="btn-cancel comment__edit-btn btn--bad"
                onClick={handleClkBtnCancel}
              >
                ✖
              </button>
            </div>
          </>
        ) : (
          <span
            className="comment__descripition"
            dangerouslySetInnerHTML={{ __html: sanitize(comment.content) }}
          ></span>
        )}
      </div>
      {!isEdit && !comment.del_date && (
        <div
          className={
            "comment__interface" +
            (isDarkMode ? " comment__interface--dark" : "")
          }
        >
          <div className="comment__rec-wrapper">
            <button
              className="comment__btn comment__btn-like"
              onClick={() => handleClkRec(1)}
            >
              <i className="comment__i comment__i-like"></i>
            </button>
            <span className="comment__span-rec">
              {comment.recommend_cnt ? comment.recommend_cnt : "0"}
            </span>
            <button
              className="comment__btn comment__btn-dislike"
              onClick={() => handleClkRec(-1)}
            >
              <i className="comment__i comment__i-dislike"></i>
            </button>
            <span className="comment__span-rec">
              {comment.decommend_cnt ? comment.decommend_cnt : "0"}
            </span>
          </div>
          <div className="comment__btn-wrapper">
            {isWriter && (
              <button
                className="comment__btn comment__btn-edit"
                onClick={() => handleClickBtnEdit()}
              >
                <i className="comment__i comment__i-edit"></i>
              </button>
            )}
            {isWriter && (
              <button
                className="comment__btn comment__btn-delete"
                onClick={() => handleClickBtnDelete()}
              >
                <i className="comment__i comment__i-delete"></i>
              </button>
            )}
            <button
              className="comment__btn comment__btn-reply"
              onClick={() => handleClickBtnReply()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <i
                className={
                  target?.targetCommentId === comment.id
                    ? "comment__i comment__i-close"
                    : "comment__i comment__i-reply"
                }
              ></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
