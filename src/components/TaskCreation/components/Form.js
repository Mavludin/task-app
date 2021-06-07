import React, { useState } from "react";
import styles from "./../TaskCreation.module.css";
import loader from "./../../../assets/img/oval.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostStatus,
} from "../../../store/slices/task";
import { postNewTask } from "../../../shared/main/projectLogic";

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

  const postTaskStatus = useSelector(selectPostStatus);
  const loading = postTaskStatus === "loading";
  const failed = postTaskStatus === "failed";
  const handleSubmit = (e) => {
    postNewTask(e, taskName, taskDesc, dispatch)
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
