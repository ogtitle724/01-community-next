import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRef } from "react";
import Fetch from "@/util/fetch";

export default function Editor({ /* ckRef, */ onChange, data, isImg }) {
  let initialData = data ? data : "";
  let ref = useRef();

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise(async (resolve, reject) => {
          try {
            const image = await loader.file;
            if (!image) {
              reject(new Error("No file selected"));
              return;
            }

            const formData = new FormData();
            formData.append("image", image, image.name);

            const path = process.env.NEXT_PUBLIC_PATH_UPLOAD_MEDIA;
            const res = await Fetch.post(path, formData);
            const data = await res.json();

            resolve({
              default: data.url,
            });
          } catch (err) {
            reject(err);
          }
        });
      },
    };
  };

  const isEndOfText = (position) => {
    // Check if there's no node after the current position and if there's text just before the position.
    return (
      !position.nodeAfter &&
      position.nodeBefore &&
      position.nodeBefore.is("text")
    );
  };

  const handleCursorPositionChange = (event, editor) => {
    const selection = editor.model.document.selection;
    const position = selection.getFirstPosition();

    if (isEndOfText(position)) {
      editor.model.change((writer) => {
        writer.insertText(" ", position);

        // Move the cursor back to its original position
        writer.setSelection(position);
      });
    }
  };

  return (
    <CKEditor
      ref={/* ckRef */ ref}
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력하세요.",
        extraPlugins: isImg && [uploadPlugin],
      }}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
        // Attach a selection change event listener
        editor.model.document.on("change:selection", () =>
          handleCursorPositionChange(null, editor)
        );
      }}
      onInit={(editor) => {
        console.log("init");
      }}
    />
  );
}
