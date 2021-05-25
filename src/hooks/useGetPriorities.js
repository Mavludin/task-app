import axios from "axios";
import { useEffect, useState } from "react"

export const useGetPriorities = (url) => {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    axios.get(url)
    .then(res => {
      console.log(res)
      setPriorities(res)
    })
    .catch(err => console.log(err))
  }, [url])

  return priorities
}