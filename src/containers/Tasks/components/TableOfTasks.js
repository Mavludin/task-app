import React from "react";
import { useGetPriorities } from "../../../shared/hooks/useGetPriorities";
import { useGetStatuses } from "../../../shared/hooks/useGetStatuses";
import { useGetUsers } from "../../../shared/hooks/useGetUsers";
import styles from "./../Tasks.module.css";
import { prioritiesUrl, statusesUrl, usersUrl } from "../../../shared/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { createFormVisibility, hideCreateForm } from "../../../store/slices/createForm";
import { editFormVisibility, showEditForm } from "../../../store/slices/editForm";
import { getTask } from "../../../store/slices/task";
import { taskList } from "../../../store/slices/tasks";

export const TableOfTasks = () => {
  // Длаем запросы по 1 разу и кэшируем в localStorage
  // юзеры, приоритеты, и статусы
  const priorities = useGetPriorities(prioritiesUrl);
  useGetStatuses(statusesUrl);
  useGetUsers(usersUrl);

  // Выбираем нажатую заявку из таблицы и делаем запрос по ID
  const isEditFormVisible = useSelector(editFormVisibility);
  const isCreateFormVisible = useSelector(createFormVisibility)
  const dispatch = useDispatch();
  const handleTaskSelection = (task) => {
    dispatch(getTask(task.id)).then(() => {
      if (!isEditFormVisible) dispatch(showEditForm());
      if (isCreateFormVisible) dispatch(hideCreateForm())
    });
  };

  const tasks = useSelector(taskList)

  return (
    <>
      <table className={styles.tableHead}>
        <thead>
          <tr>
            <th className={styles.withBorder}>
              ID
            </th>
            <th className={styles.withBorder}>
              Название
            </th>
            <th className={styles.withBorder}>
              Статус
            </th>
            <th>Исполнитель</th>
            <th className={styles.empty}></th>
          </tr>
        </thead>
      </table>
      <section className={styles.tableSection}>
        <table className={styles.tableBody}>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr key={task.id} onClick={() => handleTaskSelection(task)}>
                  <td>
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
                  <td>{task.name}</td>
                  <td>
                  <span
                    className={styles.taskStatus}
                    style={{ backgroundColor: task.statusRgb }}
                  >
                    {task.statusName}
                  </span>
                  </td>
                  <td>{task.executorName}</td>
                  <td className={styles.empty}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};
