"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

import Fetch from "@/util/fetch";
import timeConverter from "@/util/time_converter";
import { selectUser } from "@/redux/slice/signSlice";
import { sanitize } from "@/util/secure";
import { changeP2Span, deleteEnter } from "@/util/textProcess";
import "./style.css";

export default function CommentBoard({ postId, comments }) {
  console.log("COMMENT");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState(null);
  const editorRef = useRef();
  const router = useRouter();

  const handleClkBtnOk = async () => {
    if (content) {
      const option = {
        headers: { "Content-Type": "application/json" },
      };
      let contentArg = changeP2Span(content);
      contentArg = deleteEnter(contentArg);

      const payload = {
        content: contentArg,
        postId,
      };
      let path;

      if (target) {
        path = process.env.NEXT_PUBLIC_PATH_REPLY;
        path = path.replace("{comment-id}", target.parentId);
        payload.targetId = target.targetId;
      } else {
        path = process.env.NEXT_PUBLIC_PATH_COMMENT;
      }

      try {
        await Fetch.post(path, JSON.stringify(payload), option);
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
            className="comment-board__btn btn--m"
            onClick={() => handleClkBtnOk()}
            disabled={!content}
            aria-label="댓글 등록"
          >
            ✔
          </button>
          <button
            type="button"
            className="comment-board__btn btn--m"
            onMouseDown={() => handleClkBtnCancel()}
            aria-label="취소"
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
    const option = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ value });
    const path = process.env.NEXT_PUBLIC_PATH_COMMENT_REC.replace(
      "{comment-id}",
      comment.id
    );

    try {
      await Fetch.patch(path, body, option);
      reva;
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
    const path = process.env.NEXT_PUBLIC_PATH_COMMENT + `/${comment.id}`;
    const option = {
      headers: { "Content-Type": "application/json" },
    };
    const contentArg = changeP2Span(content);
    const body = JSON.stringify({ content: deleteEnter(contentArg) });

    try {
      await Fetch.patch(path, body, option);
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
      <div className="comment__info">
        <div className="comment__profile-img"></div>
        <span className="comment__nickname text--s">{comment.user_nick}</span>
        <span className="comment__date text--s">{timeDisplay}</span>
      </div>
      <div className="comment__content">
        {!isEdit && cName ? (
          <span className="comment__reply-target text--vs">
            {comment.parent_nick ? "@ " + comment.parent_nick : "🔗targetNick"}
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
            <div className="comment-board__btn-wrapper">
              <button
                className="comment-board__btn btn--m"
                onClick={handleClkBtnUpdate}
                aria-label="댓글 등록"
              >
                ✔
              </button>
              <button
                className="comment-board__btn btn--m"
                onClick={handleClkBtnCancel}
                aria-label="취소"
              >
                ✖
              </button>
            </div>
          </>
        ) : (
          <span
            className="comment__descripition text--s"
            dangerouslySetInnerHTML={{ __html: sanitize(comment.content) }}
          ></span>
        )}
      </div>
      {!isEdit && !comment.del_date && (
        <div className="comment__interface">
          <div className="comment__rec-wrapper">
            <button
              className="comment__btn comment__btn-like"
              onClick={() => handleClkRec(1)}
              aria-label="추천"
            >
              <i className="comment__i comment__i-like icon"></i>
            </button>
            <span className="comment__span-rec text--s">
              {comment.recommend_cnt ? comment.recommend_cnt : "0"}
            </span>
            <button
              className="comment__btn comment__btn-dislike"
              onClick={() => handleClkRec(-1)}
              aria-label="비추천"
            >
              <i className="comment__i comment__i-dislike icon"></i>
            </button>
            <span className="comment__span-rec text--s">
              {comment.decommend_cnt ? comment.decommend_cnt : "0"}
            </span>
          </div>
          <div className="comment__btn-wrapper">
            {isWriter && (
              <>
                <button
                  className="comment__btn comment__btn-edit"
                  onClick={() => handleClickBtnEdit()}
                  aria-label="댓글 수정"
                >
                  <i className="comment__i comment__i-edit icon"></i>
                </button>
                <button
                  className="comment__btn comment__btn-delete"
                  onClick={() => handleClickBtnDelete()}
                  aria-label="댓글 삭제"
                >
                  <i className="comment__i comment__i-delete icon"></i>
                </button>
              </>
            )}
            <button
              className="comment__btn comment__btn-reply"
              onClick={() => handleClickBtnReply()}
              onMouseDown={(e) => e.preventDefault()}
              aria-label="대댓글 작성"
            >
              <i
                className={
                  "icon" + target?.targetCommentId === comment.id
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
