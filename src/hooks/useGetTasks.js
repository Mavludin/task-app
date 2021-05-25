import { useEffect, useState } from "react"

export const useGetTasks = (url) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch(url)
      const json = await res.json();
      return await json.value
    }
    getTasks()
    .then(res => {
      setTasks(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [url])

  return tasks
}