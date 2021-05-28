import React from "react";
import { useGetPriorities } from "../../shared/hooks/useGetPriorities";
import { useGetStatuses } from "../../shared/hooks/useGetStatuses";
import { useGetTasks } from "../../shared/hooks/useGetTasks";
import { useGetUsers } from "../../shared/hooks/useGetUsers";
import styles from "./Tasks.module.css";
import { useGetTags } from "../../shared/hooks/useGetTags";
import {
  prioritiesUrl,
  singleTaskUrl,
  statusesUrl,
  tagsUrl,
  tasksUrl,
  usersUrl,
} from "../../shared/endpoints";

export const Tasks = ({
  setShowCraeteForm,
  setSelectedTask,
  setShowEditForm,
  showEditForm,
}) => {
  const tasks = useGetTasks(tasksUrl);

  // Длаем запросы по 1 разу и кэшируем в localStorage
  const priorities = useGetPriorities(prioritiesUrl);
  const statuses = useGetStatuses(statusesUrl);
  useGetUsers(usersUrl);
  useGetTags(tagsUrl)

  // Выбираем нажатую заявку из таблицы и делаем запрос по ID
  const selectTask = (task) => {
    fetch(singleTaskUrl + "/" + task.id)
      .then(async (res) => {
        setSelectedTask(await res.json());
        if (!showEditForm) setShowEditForm(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className={styles.tasks}>
      <div style={{width: '50%'}}>
        <button className="blueBtn" onClick={() => setShowCraeteForm(true)}>
          Создать заявку
        </button>
      </div>

      {tasks.length > 0 ? (
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
                    <tr key={task.id} onClick={() => selectTask(task)}>
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
