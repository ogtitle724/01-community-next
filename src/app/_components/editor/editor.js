import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Editor({ ckRef, onChange }) {
  return (
    <CKEditor
      ref={ckRef}
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력하세요.",
      }}
      data=""
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
