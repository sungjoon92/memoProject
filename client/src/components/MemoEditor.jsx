import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import PropTypes from "prop-types";
import "../styles/MemoEditor.css";
import EditorToolbar from "./EditorToolbar";

// lowlight 인스턴스 생성
const lowlight = createLowlight(common);

// 지원할 프로그래밍 언어 목록
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "sql", label: "SQL" },
];

const EDITOR_EXTENSIONS = [
  StarterKit.configure({ codeBlock: true }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
  Highlight,
  CodeBlockLowlight.configure({ lowlight }),
];

function MemoEditor({ content = "", onUpdate }) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content,
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  if (!editor) return null;

  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    callback();
  };

  const setCodeBlock = (e) => {
    e.preventDefault();
    const language = e.target.value;
    editor.chain().focus().toggleCodeBlock({ language }).run();
  };

  return (
    <div className="memo-editor">
      <EditorToolbar
        editor={editor}
        onButtonClick={handleButtonClick}
        onCodeBlockChange={setCodeBlock}
        languages={LANGUAGES}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

MemoEditor.propTypes = {
  content: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default MemoEditor;
