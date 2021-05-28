import React from "react";
import styles from "./../TaskEdit.module.css";
import calendar from "./../../../assets/img/calendar.png";

export const RightFormSide = ({
  selectedTask,
  statuses,
  users,
  setShowStatusList,
  showStatusList,
  setStatus,
  setUser,
  status,
  setShowUserList,
  user,
  showUserList,
}) => {
  const handleStatusChange = (e) => {
    setStatus(statuses[e.target.selectedIndex]);
  };

  const handleUserChange = (e) => {
    setUser(users[e.target.selectedIndex]);
  };

  return (
    <div className={styles.right}>
      <div className={styles.status}>
        <div
          className={styles.statusRgb}
          style={{ backgroundColor: selectedTask.statusRgb }}
        ></div>
        <span>{selectedTask.statusName}</span>
        <button
          className={styles.changeBtn}
          onClick={() => setShowStatusList(true)}
        >
          Изменить
        </button>

        {showStatusList && (
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
          </form>
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
        <button
          className={styles.changeBtn}
          onClick={() => setShowUserList(true)}
        >
          Изменить
        </button>
        {showUserList && (
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
          </form>
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
