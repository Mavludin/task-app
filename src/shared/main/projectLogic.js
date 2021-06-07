import { hideCreateForm } from "../../store/slices/createForm";
import { showEditForm } from "../../store/slices/editForm";
import { createTask, editTask, getTask } from "../../store/slices/task";
import { getTasks } from "../../store/slices/tasks";

export const addComment = (e, dispatch, taskComment, selectedTask) => {
  e.preventDefault();

  const taskObj = { 
    id: selectedTask.id,
    name: selectedTask.name,
    description: selectedTask.description,
    comment: taskComment,
    price: selectedTask.price,
    taskTypeId: selectedTask.taskTypeId,
    statusId: selectedTask.statusId,
    priorityId: selectedTask.priorityId,
    serviceId: selectedTask.serviceId,
    resolutionDatePlan: selectedTask.resolutionDatePlan,
    tags: [],
    initiatorId: selectedTask.initiatorId,
    executorId: selectedTask.executorId,
    executorGroupId: selectedTask.executorGroupId,
  };

  dispatch(editTask(taskObj)).then(() => {
    dispatch(getTask(selectedTask.id))
  })
}


export const editExecutor = (e, dispatch, users, selectedTask) => {
  const taskObj = {
    id: selectedTask.id,
    name: selectedTask.name,
    description: selectedTask.description,
    comment: selectedTask.comment,
    price: selectedTask.price,
    taskTypeId: selectedTask.taskTypeId,
    statusId: selectedTask.statusId,
    priorityId: selectedTask.priorityId,
    serviceId: selectedTask.serviceId,
    resolutionDatePlan: selectedTask.resolutionDatePlan,
    tags: [],
    initiatorId: selectedTask.initiatorId,
    executorId: users[e.target.selectedIndex].id,
    executorGroupId: selectedTask.executorGroupId,
  };

  dispatch(editTask(taskObj)).then(() => {
    dispatch(getTask(selectedTask.id))
    dispatch(getTasks())
  })
}

export const editStatus = (e, dispatch, statuses, selectedTask) => {
  e.preventDefault()
    
  const taskObj = {
    id: selectedTask.id,
    name: selectedTask.name,
    description: selectedTask.description,
    comment: selectedTask.comment,
    price: selectedTask.price,
    taskTypeId: selectedTask.taskTypeId,
    statusId: statuses[e.target.selectedIndex].id,
    priorityId: selectedTask.priorityId,
    serviceId: selectedTask.serviceId,
    resolutionDatePlan: selectedTask.resolutionDatePlan,
    tags: [],
    initiatorId: selectedTask.initiatorId,
    executorId: selectedTask.executorId,
    executorGroupId: selectedTask.executorGroupId,
  };

  dispatch(editTask(taskObj)).then(() => {
    dispatch(getTask(selectedTask.id))
    dispatch(getTasks())
  })
}

export const postNewTask = (e, taskName, taskDesc, dispatch) => {
  e.preventDefault();

  // Задаем какие-то значения статуса b приоритета
  const priorityId = JSON.parse(localStorage.getItem("priorities")).find(
    (item) => item.name === "Средний"
  ).id;
  const statusId = JSON.parse(localStorage.getItem("statuses")).find(
    (item) => item.name === "Открыта"
  ).id;

  const taskObj = {
    name: taskName,
    description: taskDesc,
    comment: "",
    price: 100.0,
    taskTypeId: 43805,
    statusId,
    priorityId,
    serviceId: 43804,
    resolutionDatePlan: new Date(Date.now() + 7200 * 1000 * 24),
    tags: [],
    initiatorId: 43806,
    executorId: 43806,
    executorGroupId: 43804,
  };

  dispatch(createTask(taskObj))
    .then(({ payload }) => {
      dispatch(getTasks());
      dispatch(getTask(payload)).then(() => {
        dispatch(showEditForm());
        dispatch(hideCreateForm());
      });
    })
    .catch((err) => console.log(err));
}