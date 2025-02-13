import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { memoApi } from "../api/memoApi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import "../styles/MemoDetail.css";

function MemoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    editable: false, // 읽기 전용
    content: memo?.content,
  });

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await memoApi.getMemo(id);
        setMemo(response);
        editor?.commands.setContent(response.content);
      } catch (error) {
        console.error("메모 조회 실패:", error);
      }
    };

    fetchMemo();
  }, [id, editor]);

  const handleDelete = async () => {
    try {
      await memoApi.deleteMemo(id);
      navigate("/");
    } catch (error) {
      console.error("메모 삭제 실패:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    editor?.setEditable(true);
  };

  // 수정 버튼을 클릭할때마다 내용의 마지막 글자로 포커스
  useEffect(() => {
    if (isEditing) {
      editor?.commands.focus("end");
    }
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const updatedContent = editor?.getHTML(); // 수정된 내용 가져오기
      await memoApi.updateMemo(id, { content: updatedContent });
      setMemo({ ...memo, content: updatedContent, updatedAt: new Date() });
      setIsEditing(false);
      editor?.setEditable(false);
    } catch (error) {
      console.error("메모 업데이트 실패:", error);
    }
  };

  if (!memo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="memo-detail">
      <div className="floating-buttons">
        <button className="floating-button" onClick={() => navigate("/")}>
          메인으로
        </button>
        {isEditing ? (
          <button className="floating-button save-button" onClick={handleSave}>
            저장
          </button>
        ) : (
          <button
            className="floating-button update-button"
            onClick={handleEdit}
          >
            수정
          </button>
        )}
        <button
          className="floating-button delete-button"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
      <h1 className="memo-title">{memo.title}</h1>
      <div className="memo-info">
        <span>작성: {new Date(memo.createdAt).toLocaleString()}</span>
        <span>수정: {new Date(memo.updatedAt).toLocaleString()}</span>
      </div>
      <div className="memo-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default MemoDetail;
