import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useEffect } from "react";

export default function Editor({ onEditorChange, data }) {
  const [editorData, setEditorData] = useState(data);

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  useEffect(() => {
    setEditorData(data);
  }, [data]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    onEditorChange(data);
  };

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
            
            const requestOptions = {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json, text/plain, */*",
              },
            };
  
            
            const res = await fetch(
              process.env.NEXT_PUBLIC_DOMAIN+process.env.NEXT_PUBLIC_PATH_UPLOAD_MEDIA,
              requestOptions,
            );
            
            if(res.ok){
              const data = await res.json();
              resolve({
                default: data.url,
              });
            }
          } catch (err) {
            reject(err);
          }
        });
      },
    };
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        placeholder: "내용을 입력하세요.",
        extraPlugins: [uploadPlugin]
      }}
      data=""
      onChange={handleEditorChange }
    />
  );
}
