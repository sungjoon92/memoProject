import PropTypes from "prop-types";

function EditorToolbar({ editor, onButtonClick, onCodeBlockChange, languages }) {
  return (
    <div className="editor-menu">
      <div className="menu-group">
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            )
          }
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          type="button"
        >
          H1
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            )
          }
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          type="button"
        >
          H2
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            )
          }
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          type="button"
        >
          H3
        </button>
      </div>

      <div className="menu-group">
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleBold().run())
          }
          className={editor.isActive("bold") ? "is-active" : ""}
          type="button"
        >
          굵게
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleItalic().run())
          }
          className={editor.isActive("italic") ? "is-active" : ""}
          type="button"
        >
          기울임
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleUnderline().run())
          }
          className={editor.isActive("underline") ? "is-active" : ""}
          type="button"
        >
          밑줄
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleStrike().run())
          }
          className={editor.isActive("strike") ? "is-active" : ""}
          type="button"
        >
          취소선
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleHighlight().run())
          }
          className={editor.isActive("highlight") ? "is-active" : ""}
          type="button"
        >
          형광펜
        </button>
      </div>

      <div className="menu-group">
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleBulletList().run())
          }
          className={editor.isActive("bulletList") ? "is-active" : ""}
          type="button"
        >
          목록
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleOrderedList().run()
            )
          }
          className={editor.isActive("orderedList") ? "is-active" : ""}
          type="button"
        >
          번호
        </button>
        <button
          onClick={(e) =>
            onButtonClick(e, () =>
              editor.chain().focus().toggleBlockquote().run()
            )
          }
          className={editor.isActive("blockquote") ? "is-active" : ""}
          type="button"
        >
          인용
        </button>
      </div>

      <div className="menu-group">
        <select
          onChange={onCodeBlockChange}
          value={
            editor.isActive("codeBlock")
              ? editor.getAttributes("codeBlock").language || ""
              : ""
          }
          disabled={!editor.isActive("codeBlock")}
          className="code-language-select"
        >
          <option value="">코드 언어 선택</option>
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <button
          onClick={(e) =>
            onButtonClick(e, () => editor.chain().focus().toggleCodeBlock().run())
          }
          className={editor.isActive("codeBlock") ? "is-active" : ""}
          type="button"
        >
          코드블록
        </button>
      </div>
    </div>
  );
}

EditorToolbar.propTypes = {
  editor: PropTypes.object.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onCodeBlockChange: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EditorToolbar; 