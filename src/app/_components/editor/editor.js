import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Editor({ ckRef, onChange, handleImageUpload }) {
  return (
    <CKEditor
      ref={ckRef}
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력하세요.",
        extraPlugins: 's3ImageUpload',
        s3ImageUpload: {
          uploadUrl: '',
          uploadCallback: handleImageUpload,
        },
      }}
      data=""
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
