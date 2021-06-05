import React, { useEffect } from "react";

import styles from "./Tasks.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createFormVisibility,
  showCreateForm,
} from "../../store/slices/createForm";
import { editFormVisibility, hideEditForm } from "../../store/slices/editForm";
import { getTasks, taskListStatus } from "../../store/slices/tasks";
import { TableOfTasks } from "./components/TableOfTasks";
import { TaskCreation } from "../../components/TaskCreation/TaskCreation";
import { TaskEdit } from "../../components/TaskEdit/TaskEdit";

export const Tasks = () => {
  // Запрос на получение заявок
  const dispatch = useDispatch();
  const tasksStatus = useSelector(taskListStatus);
  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(getTasks());
    }
  }, [tasksStatus, dispatch]);

  // Открываем форму создания заявки
  const isEditFormVisible = useSelector(editFormVisibility);
  const isCreateFormVisible = useSelector(createFormVisibility);
  const handleShowCreateForm = () => {
    if (isEditFormVisible) {
      dispatch(hideEditForm());
    }
    if (!isCreateFormVisible) dispatch(showCreateForm());
  };

  return (
    <div className={styles.tasks}>
      <div style={{ width: "50%" }}>
        <button className="blueBtn" onClick={handleShowCreateForm}>
          Создать заявку
        </button>
      </div>

      {tasksStatus === "success" ? (
        <TableOfTasks />
      ) : (
        <h1>Получаем данные...</h1>
      )}

      {isCreateFormVisible && <TaskCreation />}
      {isEditFormVisible && <TaskEdit />}
    </div>
  );
};
