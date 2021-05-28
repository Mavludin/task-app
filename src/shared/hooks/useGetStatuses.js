import { useEffect, useState } from "react"

export const useGetStatuses = (url) => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const getStatuses = async () => {
      const res = await fetch(url)
      const json = await res.json();
      return await json
    }
    getStatuses()
    .then(res => {
      setStatuses(res)
      localStorage.setItem('statuses', JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })
  }, [url])

  return statuses
}