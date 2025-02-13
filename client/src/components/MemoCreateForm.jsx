import PropTypes from "prop-types";
import MemoEditor from "./MemoEditor";

function MemoCreateForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="memo-create">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="title-input"
          />
        </div>
        <div className="form-group">
          <MemoEditor content={content} onUpdate={onContentChange} />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">
            저장
          </button>
          <button type="button" onClick={onCancel} className="cancel-button">
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

MemoCreateForm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default MemoCreateForm;
