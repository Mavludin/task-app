import React from "react";
import styles from "./TaskCreation.module.css";
import close from "./../../assets/img/close.png";
import { Form } from "./components/Form";
import { useDispatch } from "react-redux";
import { hideCreateForm } from "../../store/slices/createForm";

export const TaskCreation = ({ setSelectedTask }) => {

  const dispatch = useDispatch()
  
  return (
    <div className={styles.taskCreation}>
      <header className={styles.header}>
        Новая заявка
        <button onClick={() => dispatch(hideCreateForm())}>
          <img src={close} alt="Close" />
        </button>
      </header>

      <Form setSelectedTask={setSelectedTask} />
    </div>
  );
};
