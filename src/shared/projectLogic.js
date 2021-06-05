import { getTask } from "../store/slices/task";
import { getTasks } from "../store/slices/tasks";

export const editTask = (e, dispatch, users, selectedTask ) => {
  e.preventDefault()

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