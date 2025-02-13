import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemoCreateForm from "../components/MemoCreateForm";
import MemoItems from "../components/MemoItems";
import "../styles/MemoEditor.css";
import { memoApi } from "../api/memoApi";

function MemoList() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memos, setMemos] = useState([]);

  const fetchMemos = async () => {
    try {
      const response = await memoApi.getMemos();
      setMemos(response);
    } catch (error) {
      console.error("메모 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await memoApi.createMemo({ title, content });
      navigate(`/memo/${response.id}`);
    } catch (error) {
      console.error("메모 생성 실패:", error);
    }
  };

  return (
    <div className="memo-list">
      <div className="memo-header">
        <button onClick={() => setIsCreating(true)} className="create-button">
          메모 작성
        </button>
      </div>

      {isCreating && (
        <MemoCreateForm
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleSubmit}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <br />
      <hr />

      <MemoItems memos={memos} onMemoClick={(id) => navigate(`/memo/${id}`)} />
    </div>
  );
}

export default MemoList;
