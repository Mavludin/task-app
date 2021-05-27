import React, { useState } from "react";
import styles from "./TaskCreation.module.css";
import close from "./../../assets/img/close.png";
import { singleTaskUrl } from "../../shared/endpoints";
import loader from './../../assets/img/oval.svg'

export const TaskCreation = ({ setShowForm, setSelectedTask, setShowEditForm }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [pending, setPending] = useState(false);
  const [postSuccess, setPostSuccess] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescChange = (e) => {
    setTaskDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priorityId = JSON.parse(localStorage.getItem('priorities')).find(item => item.name === 'Средний').id
    const statusId = JSON.parse(localStorage.getItem('statuses')).find(item => item.name === 'Открыта').id

    const taskObj = {
      name: taskName,
      description: taskDesc,
      comment: "",
      price: 100.0,
      taskTypeId: 43430,
      statusId,
      priorityId,
      serviceId: 43429,
      resolutionDatePlan: new Date(Date.now() + 7200 * 1000 * 24),
      tags: [72381, 72382],
      initiatorId: 43431,
      executorId: 43430,
      executorGroupId: 43429,
    };

    setPending(true);

    const res = await fetch(
      singleTaskUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskObj),
      }
    )

    if (res.ok) {
      const id = await res.json()
      
      const createdTask = await fetch(singleTaskUrl + '/' + id);
      const taskJson = await createdTask.json();
      setSelectedTask(taskJson)
      setShowEditForm(true)
      setPostSuccess(1)
      setPending(false)
      setShowForm(false)
    } else {
      setPending(false);
      setPostSuccess(0)
    }

  };
  
  return (
    <div className={styles.taskCreation}>
      <header className={styles.header}>
        Новая заявка
        <button onClick={() => setShowForm(false)}>
          <img src={close} alt="Close" />
        </button>
      </header>

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
        <div className={styles.submitSection}>
          <button style={{cursor: pending && 'not-allowed'}} disabled={pending} type="submit" className="blueBtn">
            Сохранить
          </button>
          {pending && <img src={loader} alt="loader" className={styles.loader} />  }
        </div>
        {postSuccess === 0 && (
          <div className={styles.error}>Произошла ошибка</div>
        )}
      </form>
    </div>
  );
};
