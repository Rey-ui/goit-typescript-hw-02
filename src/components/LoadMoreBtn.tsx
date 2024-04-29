import css from "./LoadMoreBtn.module.css";
import React from "react";
interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
  return (
    <div className={css.LoadMoreContainer}>
      <button
        className={css.LoadMoreBtn}
        type="button"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
