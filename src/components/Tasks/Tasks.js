import axios from "axios";
import React, { useEffect } from "react";
import { useGetPriorities } from "../../hooks/useGetPriorities";
import { useGetStatuses } from "../../hooks/useGetStatuses";
import { useGetTasks } from "../../hooks/useGetTasks";
import { prioritiesUrl, statusesUrl, tasksUrl } from "../../shared/endpoints";
import styles from "./Tasks.module.css";

export const Tasks = () => {
  const tasks = useGetTasks(tasksUrl);
  // const priorities = useGetPriorities(prioritiesUrl);
  // const stauses = useGetStatuses(statusesUrl);

  useEffect(() => {
    axios.get('http://intravision-task.test01.intravision.ru/api/10979561-5b4d-430d-a9bc-b20cd82c359b/Tags')
    .then(res => {
      console.log(res)
    })
  }, [])


  return (
    <main className={styles.tasks}>
      <button className="blueBtn">Создать заявку</button>

      {tasks.length > 0 ? (
        <>
          <table className={styles.tableHead}>
            <thead>
              <tr>
                <th width="5%" className={styles.withBorder}>ID</th>
                <th width="20%" className={styles.withBorder}>Название</th>
                <th width="10%" className={styles.withBorder}>Статус</th>
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
                        {/* <div
                          style={priorities.map((prio) => {
                            if (task.priorityId === prio.id) {
                              return {
                                width: "2px",
                                height: "100%",
                                backgroundColor: prio.rgb,
                              };
                            } else return null;
                          })}
                        ></div> */}
                        {task.taskTypeId}
                      </td>
                      <td width="20%">{task.name}</td>
                      <td width="10%">
                        <span
                          className={styles.taskStatus}
                          style={{ backgroundColor: task.statusRgb }}
                        >
                          {task.statusName}
                        </span>
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
