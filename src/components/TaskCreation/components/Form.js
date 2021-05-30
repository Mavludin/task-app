import React, { useState } from "react";
import styles from "./../TaskCreation.module.css";
import { singleTaskUrl } from "../../../shared/endpoints";
import loader from "./../../../assets/img/oval.svg";
import { useDispatch, useSelector } from "react-redux";
import { showEditForm } from "../../../store/slices/editForm";
import { hideCreateForm } from "../../../store/slices/createForm";
import { getTask, singleTaskStatus } from "../../../store/slices/task";

export const Form = () => {

  const [pending, setPending] = useState(false);
  const [postSuccess, setPostSuccess] = useState("");

  const [taskName, setTaskName] = useState("");
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const [taskDesc, setTaskDesc] = useState("");
  const handleTaskDescChange = (e) => {
    setTaskDesc(e.target.value);
  };

  const dispatch = useDispatch()
  const taskStatus = useSelector(singleTaskStatus)

  const handleSubmit = async (e) => {
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

    setPending(true);

    const res = await fetch(singleTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj),
    });

    if (res.ok) {
      const id = await res.json();

      if (taskStatus === 'idle') {
        dispatch(getTask(id))
        .then(() => {
          dispatch(showEditForm())
          setPending(false);
          dispatch(hideCreateForm())
        })
        .catch(() => {
          setPending(false);
          setPostSuccess(0);
        })
      } 

    } else {
      setPending(false);
      setPostSuccess(0);
    }
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
      {postSuccess === 0 && (
        <div className={styles.error}>Произошла ошибка</div>
      )}
    </form>
  );
};
