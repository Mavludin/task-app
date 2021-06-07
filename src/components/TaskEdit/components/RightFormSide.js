import React, { useState } from "react";
import styles from "./../TaskEdit.module.css";
import calendar from "./../../../assets/img/calendar.png";
import { useDispatch, useSelector } from "react-redux";
import { taskSelection } from "../../../store/slices/task";
import closeIcon from './../../../assets/img/close.svg'
import { editExecutor, editStatus } from "../../../shared/main/projectLogic";

export const RightFormSide = () => {

  const selectedTask = useSelector(taskSelection)

  // Берем статусы из localStorage и инициализируем state
  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const [status, setStatus] = useState(() => {
    return statuses.find((status) => status.id === selectedTask.statusId);
  });
  const [showStatusList, setShowStatusList] = useState(false);

  // Берем users из localStorage и инициализируем state
  const users = JSON.parse(localStorage.getItem("users"));
  const [user, setUser] = useState(() => {
    return users.find((user) => user.id === selectedTask.executorId);
  });
  const [showUserList, setShowUserList] = useState(false);

  const dispatch = useDispatch()

  const handleStatusChange = (e) => {
    setStatus(statuses[e.target.selectedIndex]);
    editStatus(e, dispatch, statuses, selectedTask)
  };

  const handleUserChange = (e) => {
    setUser(users[e.target.selectedIndex]);
    editExecutor(e, dispatch, users, selectedTask)
  };

  return (
    <div className={styles.right}>
      <div className={styles.status}>
        <div>
          <div
            className={styles.statusRgb}
            style={{ backgroundColor: selectedTask.statusRgb }}
          ></div>
          <span>{selectedTask.statusName}</span>
        </div>
        {!showStatusList && (
          <button
            className={styles.changeBtn}
            onClick={() => setShowStatusList(true)}
          >
            Изменить
          </button>
        )}

        {showStatusList && (
          <>
            <form>
              <select value={status.name} onChange={handleStatusChange}>
                {statuses.map((status) => {
                  return (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => setShowStatusList(false)}
                className={styles.close}
              >
              <img src={closeIcon} alt="close" />
              </button>
            </form>
          </>
        )}
      </div>
      <div className={styles.creatorName}>
        <h4>Заявитель</h4>
        <span>{selectedTask.initiatorName}</span>
      </div>
      <div className={styles.taskDate}>
        <h4>Создана</h4>
        <img src={calendar} alt="Calendar" />
        <span>{new Date(selectedTask.createdAt).toLocaleDateString()}</span>
      </div>
      <div className={styles.executor}>
        <h4>Исполнитель</h4>
        <span>{selectedTask.executorName}</span>
        {!showUserList && (
          <button
            className={styles.changeBtn}
            onClick={() => setShowUserList(true)}
          >
            Изменить
          </button>
        )}

        {showUserList && (
          <>
            <form>
              <select value={user.name} onChange={handleUserChange}>
                {users.map((user) => {
                  return (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <button
                type="button"
                onClick={() => setShowUserList(false)}
                className={styles.close}
              >
                <img src={closeIcon} alt="close" />
              </button>
            </form>
          </>
        )}
      </div>
      <div className={styles.priority}>
        <h4>Приоритет</h4>
        <span>{selectedTask.priorityName}</span>
      </div>
      <div className={styles.taskDate}>
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
  );
};
