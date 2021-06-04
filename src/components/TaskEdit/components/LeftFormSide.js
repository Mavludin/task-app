import React from "react";
import styles from "./../TaskEdit.module.css";
import loader from "./../../../assets/img/oval.svg";
import circle from "./../../../assets/img/circle.png";

export const LeftFormSide = ({
  handleTaskCommentChange,
  selectedTask,
  taskComment,
  pending,
  postSuccess,
}) => {
  return (
    <>
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
          style={{ cursor: pending && "not-allowed" }}
          disabled={pending}
          type="submit"
          className="blueBtn"
        >
          Сохранить
        </button>
        {pending && <img src={loader} alt="loader" className={styles.loader} />}
      </div>
      {postSuccess === 1 && (
        <div className={styles.success}>Заявка успешно изменена</div>
      )}

      {postSuccess === 0 && (
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

    </>
  );
};
