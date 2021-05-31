import React, { useEffect } from "react";
import { useGetPriorities } from "../../shared/hooks/useGetPriorities";
import { useGetStatuses } from "../../shared/hooks/useGetStatuses";
import { useGetUsers } from "../../shared/hooks/useGetUsers";
import styles from "./Tasks.module.css";
import {
  prioritiesUrl,
  statusesUrl,
  usersUrl,
} from "../../shared/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { showCreateForm } from "../../store/slices/createForm";
import { editFormVisibility, showEditForm } from "../../store/slices/editForm";
import { getTask } from "../../store/slices/task";
import { getTasks, taskListStatus, taskList } from "../../store/slices/tasks";

export const Tasks = () => {

  // Запрос на получение заявок
  const dispatch = useDispatch();
  const tasksStatus = useSelector(taskListStatus)
  const tasks = useSelector(taskList)

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(getTasks());
    }
  }, [tasksStatus, dispatch]);

  // Длаем запросы по 1 разу и кэшируем в localStorage
  // юзеры, приоритеты, и статусы
  const priorities = useGetPriorities(prioritiesUrl);
  const statuses = useGetStatuses(statusesUrl);
  useGetUsers(usersUrl);

  // Выбираем нажатую заявку из таблицы и делаем запрос по ID
  const isEditFormVisible = useSelector(editFormVisibility)
  const handleTaskSelection = (task) => {
    dispatch(getTask(task.id)).then(() => {
      if (!isEditFormVisible) dispatch(showEditForm());
    })
  };

  return (
    <main className={styles.tasks}>
      <div style={{width: '50%'}}>
        <button className="blueBtn" onClick={() => dispatch(showCreateForm())}>
          Создать заявку
        </button>
      </div>

      {tasksStatus === 'success' ? (
        <>
          <table className={styles.tableHead}>
            <thead>
              <tr>
                <th width="5%" className={styles.withBorder}>
                  ID
                </th>
                <th width="25%" className={styles.withBorder}>
                  Название
                </th>
                <th width="10%" className={styles.withBorder}>
                  Статус
                </th>
                <th width="10%">Исполнитель</th>
                <th width="50%" className={styles.empty}></th>
              </tr>
            </thead>
          </table>
          <section className={styles.tableSection}>
            <table className={styles.tableBody}>
              <tbody>
                {tasks.map((task) => {
                  return (
                    <tr key={task.id} onClick={() => handleTaskSelection(task)}>
                      <td width="5%">
                        {priorities.map((prio) => {
                          if (task.priorityId === prio.id) {
                            return (
                              <div
                                key={prio.id}
                                style={{
                                  width: "4px",
                                  height: "35px",
                                  backgroundColor: prio.rgb,
                                  position: "absolute",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  left: "8px",
                                }}
                              ></div>
                            );
                          } else return null;
                        })}

                        {task.taskTypeId}
                      </td>
                      <td width="25%">{task.name}</td>
                      <td width="10%">
                        {statuses.map((status) => {
                          if (task.statusId === status.id) {
                            return (
                              <span
                                key={status.id}
                                className={styles.taskStatus}
                                style={{ backgroundColor: status.rgb }}
                              >
                                {status.name}
                              </span>
                            );
                          } else return null;
                        })}
                      </td>
                      <td width="10%">{task.executorName}</td>
                      <td width="50%" className={styles.empty}></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <h1>Получаем данные...</h1>
      )}
    </main>
  );
};
