import React, { useState } from "react";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Button, Dropdown, Menu, Divider } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  CodeOutlined,
  DownOutlined,
} from "@ant-design/icons";
const limit = 100;

const TipTapEditor: React.FC = () => {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    content: "<p>Example Text</p>",
    autofocus: true,
    extensions: [
      StarterKit,
      TextStyle,
      Link,
      Image,
      Placeholder.configure({
        placeholder: `Body (Character limit: ${limit})`,
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate({ editor }) {
      const text = editor.getText();
      if (text.length > limit) {
        editor.commands.undo();
      } else {
        setCharCount(text.length);
      }
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && charCount < limit) {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={charCount >= limit}
      >
        <BoldOutlined /> Bold
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={charCount >= limit}
      >
        <ItalicOutlined /> Italic
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={charCount >= limit}
      >
        <UnderlineOutlined /> Underline
      </Menu.Item>
    </Menu>
  );

  const isLimitReached = charCount >= limit;

  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "4px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "8px",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <Dropdown overlay={menu} trigger={["click"]} disabled={isLimitReached}>
          <Button>
            Normal text <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive("bold") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Button
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive("italic") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Button
          icon={<UnderlineOutlined />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          type={editor.isActive("underline") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Button
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type={editor.isActive("strike") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Divider type="vertical" />
        <Button
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type={editor.isActive("orderedList") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Button
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type={editor.isActive("bulletList") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Divider type="vertical" />
        <Button
          icon={<LinkOutlined />}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url && charCount < limit) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          type={editor.isActive("link") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-image"
          onChange={handleImageUpload}
          disabled={isLimitReached}
        />
        <Button
          icon={<PictureOutlined />}
          onClick={() => {
            if (!isLimitReached) {
              document.getElementById("upload-image")?.click();
            }
          }}
          type={editor.isActive("image") ? "primary" : "default"}
          disabled={isLimitReached}
        />
        <Button
          icon={<CodeOutlined />}
          onClick={() => editor.chain().focus().toggleCode().run()}
          type={editor.isActive("code") ? "primary" : "default"}
          disabled={isLimitReached}
        />
      </div>
      <EditorContent
        editor={editor}
        style={{
          minHeight: "150px",
          padding: "10px",
          border: "1px solid #f0f0f0",
          borderRadius: "4px",
          backgroundColor: "#ffffff",
          cursor: isLimitReached ? "not-allowed" : "text",
        }}
      />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <span style={{ color: isLimitReached ? "red" : "inherit" }}>
          Characters: {charCount}/{limit}
        </span> */}
        {editor.storage.characterCount.characters()} / {limit} characters
        {/* <br />
        {editor.storage.characterCount.words()} words */}
      </div>
    </div>
  );
};

export default TipTapEditor;
