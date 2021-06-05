import React, { useState } from "react";
import styles from "./../TaskCreation.module.css";
import loader from "./../../../assets/img/oval.svg";
import { useDispatch, useSelector } from "react-redux";
import { showEditForm } from "../../../store/slices/editForm";
import { hideCreateForm } from "../../../store/slices/createForm";
import {
  createTask,
  getTask,
  selectPostStaus,
} from "../../../store/slices/task";
import { getTasks } from "../../../store/slices/tasks";

export const Form = () => {
  const [taskName, setTaskName] = useState("");
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const [taskDesc, setTaskDesc] = useState("");
  const handleTaskDescChange = (e) => {
    setTaskDesc(e.target.value);
  };

  const dispatch = useDispatch();

  const postTaskStatus = useSelector(selectPostStaus);
  const loading = postTaskStatus === "loading";
  const failed = postTaskStatus === "failed";
  const handleSubmit = (e) => {
    e.preventDefault();

    // Задаем какие-то значения статуса b приоритета
    const priorityId = JSON.parse(localStorage.getItem("priorities")).find(
      (item) => item.name === "Средний"
    ).id;
    const statusId = JSON.parse(localStorage.getItem("statuses")).find(
      (item) => item.name === "Открыта"
    ).id;

    const taskObj = {
      name: taskName,
      description: taskDesc,
      comment: "",
      price: 100.0,
      taskTypeId: 43805,
      statusId,
      priorityId,
      serviceId: 43804,
      resolutionDatePlan: new Date(Date.now() + 7200 * 1000 * 24),
      tags: [],
      initiatorId: 43806,
      executorId: 43806,
      executorGroupId: 43804,
    };

    dispatch(createTask(taskObj))
      .then(({ payload }) => {
        dispatch(getTasks());
        dispatch(getTask(payload)).then(() => {
          dispatch(showEditForm());
          dispatch(hideCreateForm());
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <h4>Название</h4>
        <textarea
          cols="30"
          rows="5"
          onChange={handleTaskNameChange}
          value={taskName}
          required
        />
      </div>
      <div>
        <h4>Описание</h4>
        <textarea
          cols="30"
          rows="8"
          onChange={handleTaskDescChange}
          value={taskDesc}
          required
        />
      </div>
      {failed && <div className={styles.error}>Произошла ошибка</div>}
      <div className={styles.submitSection}>
        <button
          style={{ cursor: loading && "not-allowed" }}
          disabled={loading}
          type="submit"
          className="blueBtn"
        >
          Сохранить
        </button>
        {loading && <img src={loader} alt="loader" className={styles.loader} />}
      </div>
    </form>
  );
};
