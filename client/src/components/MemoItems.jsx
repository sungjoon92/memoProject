import PropTypes from "prop-types";

function MemoItems({ memos, onMemoClick }) {
  return (
    <div className="memo-items">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="memo-item"
          onClick={() => onMemoClick(memo.id)}
        >
          <div className="memo-item-content">
            <h3>{memo.title}</h3>
            <span className="memo-date">
              {new Date(memo.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

MemoItems.propTypes = {
  memos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMemoClick: PropTypes.func.isRequired,
};

export default MemoItems; 