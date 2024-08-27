import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import tinymce from "tinymce/tinymce";
import { Dropdown, Menu, Button } from "antd";

const TinyMCEPage: React.FC = () => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    console.log("Content was updated:", content);
  };

  const filePickerCallback = (
    cb: (url: string, meta: { title: string }) => void
    // value: string,
    // meta: Record<string, any> // Broaden the type to match the expected type
  ) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce?.activeEditor?.editorUpload.blobCache;

          const base64 = reader.result?.toString().split(",")[1];
          if (blobCache && base64) {
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* Call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
          }
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  };

  const insertValue = (value: string) => {
    if (editorRef.current) {
      editorRef.current.execCommand("mceInsertContent", false, value);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => insertValue("{{first_name}}")}>
        First Name
      </Menu.Item>
      <Menu.Item key="2" onClick={() => insertValue("{{last_name}}")}>
        Last Name
      </Menu.Item>
      <Menu.Item key="3" onClick={() => insertValue("{{email}}")}>
        Email
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>TinyMCE Editor</h1>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue="<p></p>"
        onInit={(editor) => {
          editorRef.current = editor;
        }}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "link",
            "image",
            "lists",
            "charmap",
            "preview",
            "anchor",
            "pagebreak",
            "searchreplace",
            "wordcount",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "emoticons",
            "help",
          ],
          images_file_types: "jpg,svg,webp",
          file_picker_types: "file image media",
          file_picker_callback: filePickerCallback,
          branding: false, // Disable the TinyMCE branding
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | image",
        }}
        onEditorChange={handleEditorChange}
      />
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button style={{ marginTop: "10px" }}>Insert Variable</Button>
      </Dropdown>
    </div>
  );
};

export default TinyMCEPage;
