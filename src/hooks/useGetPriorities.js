import { useEffect, useState } from "react"

export const useGetPriorities = (url) => {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const getPriorities = async () => {
      const res = await fetch(url)
      const json = await res.json();
      return await json
    }
    getPriorities()
    .then(res => {
      setPriorities(res);
      localStorage.setItem('priorities', JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })
  }, [url])

  return priorities
}