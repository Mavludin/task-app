import React, { useState } from "react";
import styles from "./TaskEdit.module.css";
import close from "./../../assets/img/close.png";
import { singleTaskUrl } from "../../shared/endpoints";
import { RightFormSide } from "./components/RightFormSide";
import { LeftFormSide } from "./components/LeftFormSide";
import { useDispatch, useSelector } from "react-redux";
import { hideEditForm } from "../../store/slices/editForm";
import { taskSelection } from "../../store/slices/task";
import { getTasks } from "../../store/slices/tasks";

export const TaskEdit = () => {

  const [taskComment, setTaskComment] = useState("");
  const handleTaskCommentChange = (e) => {
    setTaskComment(e.target.value);
  };

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

  // Стейт для отслеживания состояния запроса
  const [postSuccess, setPostSuccess] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskObj = {
      id: selectedTask.id,
      name: selectedTask.name,
      description: selectedTask.description,
      comment: taskComment,
      price: selectedTask.price,
      taskTypeId: selectedTask.taskTypeId,
      statusId: status.id,
      priorityId: selectedTask.priorityId,
      serviceId: selectedTask.serviceId,
      resolutionDatePlan: selectedTask.resolutionDatePlan,
      tags: [],
      initiatorId: selectedTask.initiatorId,
      executorId: user.id,
      executorGroupId: selectedTask.executorGroupId,
    };

    setPending(true);

    fetch(singleTaskUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    })
      .then((res) => {
        if (!res.ok) setPostSuccess(0);
        else {
          setPostSuccess(1);
          dispatch(getTasks())
        }
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
        setPostSuccess(0);
        setPending(false);
      });
  };

  const dispatch = useDispatch();

  return (
    <div className={styles.taskEdit}>
      <header className={styles.header}>
        <span className={styles.taskNumber}>№ {selectedTask.id}</span>
        <span className={styles.taskName}>{selectedTask.name}</span>
        <button>
          <img src={close} alt="Close" onClick={() => dispatch(hideEditForm())} />
        </button>
      </header>

      <div className={styles.formCover}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <LeftFormSide
            handleTaskCommentChange={handleTaskCommentChange}
            selectedTask={selectedTask}
            taskComment={taskComment}
            pending={pending}
            postSuccess={postSuccess}
          />
        </form>

        <RightFormSide
          selectedTask={selectedTask}
          statuses={statuses}
          users={users}
          setShowStatusList={setShowStatusList}
          showStatusList={showStatusList}
          setStatus={setStatus}
          setUser={setUser}
          status={status}
          setShowUserList={setShowUserList}
          user={user}
          showUserList={showUserList}
        />
      </div>
    </div>
  );
};
