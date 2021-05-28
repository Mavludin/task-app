import React from "react";
import styles from "./TaskCreation.module.css";
import close from "./../../assets/img/close.png";
import { Form } from "./components/Form";

export const TaskCreation = ({ setShowCraeteForm, setSelectedTask, setShowEditForm }) => {
  
  return (
    <div className={styles.taskCreation}>
      <header className={styles.header}>
        Новая заявка
        <button onClick={() => setShowCraeteForm(false)}>
          <img src={close} alt="Close" />
        </button>
      </header>

      <Form
        setShowCraeteForm={setShowCraeteForm}
        setSelectedTask={setSelectedTask}
        setShowEditForm={setShowEditForm}
      />
    </div>
  );
};
