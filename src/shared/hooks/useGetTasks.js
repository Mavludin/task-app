import { useEffect, useState } from "react"

export const useGetTasks = (url) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    const getTasks = async () => {
      const res = await fetch(url, opts)
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

    return () => abortCtrl.abort()
  }, [url])

  return tasks
}