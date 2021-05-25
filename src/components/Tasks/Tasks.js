import React from "react";
import { useGetPriorities } from "../../hooks/useGetPriorities";
import { useGetStatuses } from "../../hooks/useGetStatuses";
import { useGetTasks } from "../../hooks/useGetTasks";
import { prioritiesUrl, statusesUrl, tasksUrl } from "../../shared/endpoints";
import styles from "./Tasks.module.css";

export const Tasks = () => {
  const tasks = useGetTasks(tasksUrl);
  const priorities = useGetPriorities(prioritiesUrl);
  const statuses = useGetStatuses(statusesUrl);

  return (
    <main className={styles.tasks}>
      <button className="blueBtn">Создать заявку</button>

      {tasks.length > 0 ? (
        <>
          <table className={styles.tableHead}>
            <thead>
              <tr>
                <th width="5%" className={styles.withBorder}>
                  ID
                </th>
                <th width="20%" className={styles.withBorder}>
                  Название
                </th>
                <th width="10%" className={styles.withBorder}>
                  Статус
                </th>
                <th width="10%">Исполнитель</th>
                <th width="55%" className={styles.empty}></th>
              </tr>
            </thead>
          </table>
          <section className={styles.tableSection}>
            <table className={styles.tableBody}>
              <tbody>
                {tasks.map((task) => {
                  return (
                    <tr key={task.id}>
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
                      <td width="20%">{task.name}</td>
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
                      <td width="55%" className={styles.empty}></td>
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
