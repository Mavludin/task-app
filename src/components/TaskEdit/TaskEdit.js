import React, { useState } from "react";
import styles from "./TaskEdit.module.css";
import close from "./../../assets/img/close.png";
import loader from "./../../assets/img/oval.svg";
import circle from "./../../assets/img/circle.png";
import { singleTaskUrl } from "../../shared/endpoints";
import calendar from "./../../assets/img/calendar.png";
import { useParams } from "react-router";

export const TaskEdit = ({ setShowEditForm, selectedTask }) => {
  const [taskComment, setTaskComment] = useState("");
  const [postSuccess, setPostSuccess] = useState("");
  const [pending, setPending] = useState(false);

  const handleTaskCommentChange = (e) => {
    setTaskComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskObj = {
      comment: taskComment,
      statusId: 86860,
      executorId: 42692,
      executorGroupId: 42691,
    };

    setPending(true);

    fetch(singleTaskUrl + "/" + selectedTask.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    })
      .then((res) => {
        if (!res.ok) setPostSuccess(0);
        else setPostSuccess(1);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
        setPostSuccess(0);
        setPending(false);
      });
  };

  console.log(selectedTask);

  const [status, setStatus] = useState(() => {
    const statuses = JSON.parse(localStorage.getItem('statuses'));
    return statuses.find(status => status.id === selectedTask.statusId)
  });
  const [showStatusList, setShowStatusList] = useState(false);

  console.log(status)

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={styles.taskEdit}>
      <header className={styles.header}>
        <span className={styles.taskNumber}>№ {selectedTask.id}</span>
        <span className={styles.taskName}>{selectedTask.name}</span>
        <button>
          <img src={close} alt="Close" onClick={() => setShowEditForm(false)} />
        </button>
      </header>

      <div className={styles.formCover}>
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
              required
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
            {pending && (
              <img src={loader} alt="loader" className={styles.loader} />
            )}
          </div>
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
          {postSuccess === 1 && (
            <div className={styles.success}>Заявка успешно создана</div>
          )}

          {postSuccess === 0 && (
            <div className={styles.error}>Произошла ошибка</div>
          )}
        </form>

        <div className={styles.right}>
          <div className={styles.status}>
            <div
              className={styles.statusRgb}
              style={{ backgroundColor: selectedTask.statusRgb }}
            ></div>
            <span>{selectedTask.statusName}</span>
            <button onClick={() => setShowStatusList(true)}>Изменить</button>

            {
              showStatusList && (
                <form>
                  <select value={status} onChange={handleStatusChange}>
                    {JSON.parse(localStorage.getItem("statuses")).map((status) => {
                      return (
                        <option option key={status.id} value={status.name}>
                          {status.name}
                        </option>
                      );
                    })}
                  </select>
                </form>
              )
            }


          </div>
          <div className={styles.creatorName}>
            <h4>Заявитель</h4>
            <span>Имя заявителя</span>
          </div>
          <div className={styles.initiatorName}>
            <h4>Создана</h4>
            <span>{selectedTask.initiatorName}</span>
          </div>
          <div className={styles.executor}>
            <h4>Исполнитель</h4>
            <span>{selectedTask.executorName}</span>
          </div>
          <div className={styles.priority}>
            <h4>Приоритет</h4>
            <span>{selectedTask.priorityName}</span>
          </div>
          <div className={styles.resolutionDate}>
            <h4>Срок</h4>
            <img src={calendar} alt="Calendar" />
            <span>
              {new Date(selectedTask.resolutionDatePlan).toLocaleDateString()}г.
            </span>
          </div>
          <div className={styles.tags}>
            <h4>Теги</h4>
            {selectedTask.tags.map((tag) => {
              return <div key={tag.id}>{tag.name}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
