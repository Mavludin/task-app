import React, { useState } from "react";
import styles from "./../TaskEdit.module.css";
import loader from "./../../../assets/img/oval.svg";
import circle from "./../../../assets/img/circle.png";
import { useDispatch, useSelector } from "react-redux";
import { selectPutStatus, taskSelection } from "../../../store/slices/task";
import { addComment } from "../../../shared/main/projectLogic";

export const LeftFormSide = () => {

  const [taskComment, setTaskComment] = useState("");
  const handleTaskCommentChange = (e) => {
    setTaskComment(e.target.value);
  };

  const taskStatus = useSelector(selectPutStatus)
  const selectedTask = useSelector(taskSelection)
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    addComment(e, dispatch, taskComment, selectedTask);
    setTaskComment("")
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.descriptionSection}>
        <h4>Описание</h4>
        <p className={styles.taskDesc}>{selectedTask.description}</p>
      </div>
      <div>
        <h4>Добавление комментариев</h4>
        <textarea
          cols="30"
          rows="8"
          onChange={handleTaskCommentChange}
          value={taskComment}
        />
      </div>
      <div className={styles.submitSection}>
        <button
          style={{ cursor: taskStatus === 'loading' && "not-allowed" }}
          disabled={taskStatus === 'loading'}
          type="submit"
          className="blueBtn"
        >
          Сохранить
        </button>
        {taskStatus === 'loading' && <img src={loader} alt="loader" className={styles.loader} />}
      </div>
      {taskStatus === 'success' && (
        <div className={styles.success}>Заявка успешно изменена</div>
      )}

      {taskStatus === 'failed' && (
        <div className={styles.error}>Произошла ошибка</div>
      )}
      <div className={styles.commentarySection}>
        {selectedTask.lifetimeItems.map((item) => {
          if (item.comment) {
            return (
              <div key={item.id} className={styles.commentItem}>
                <div className={styles.initiator}>
                  <img src={circle} alt="Circle" />
                  <div className={styles.inner}>
                    <div className={styles.initiatorName}>
                      {selectedTask.initiatorName}
                    </div>
                    <div className={styles.createdAt}>
                      {new Date(item.createdAt).toLocaleString()}{" "}
                      прокомментировал
                    </div>
                  </div>
                </div>
                <p className={styles.comment}>{item.comment}</p>
              </div>
            );
          } else return null;
        })}
      </div>

    </form>
  );
};
