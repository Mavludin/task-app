import React from "react";
import styles from "./TaskEdit.module.css";
import close from "./../../assets/img/close.png";
import { RightFormSide } from "./components/RightFormSide";
import { LeftFormSide } from "./components/LeftFormSide";
import { useDispatch, useSelector } from "react-redux";
import { hideEditForm } from "../../store/slices/editForm";
import { taskSelection } from "../../store/slices/task";

export const TaskEdit = () => {

  const selectedTask = useSelector(taskSelection)
  const dispatch = useDispatch()

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
        
        <LeftFormSide />

        <RightFormSide />
      </div>
    </div>
  );
};
