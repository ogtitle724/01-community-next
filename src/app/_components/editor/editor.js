import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Fetch from "@/util/fetch";

export default function Editor({ ckRef, onChange, data, isImg }) {
  let initialData = data ? data : "";

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

  return (
    <CKEditor
      ref={ckRef}
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력하세요.",
        extraPlugins: isImg && [uploadPlugin],
      }}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
