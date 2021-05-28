import { useEffect, useState } from "react"

export const useGetSingleTask = (url, id) => {
  const [singleTask, setSingleTask] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const getSingleTask = async () => {
      const res = await fetch(url + '/' + id)
      const json = await res.json();
      return await json
    }
    getSingleTask()
    .then(res => {
      setSingleTask(res)
      setPending(false)
    })
    .catch(err => {
      console.log(err)
      setPending(false)
    })
  }, [url, id])

  return {singleTask, pending}
}