import { useEffect, useState } from "react"

export const useGetUsers = (url) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(url)
      const json = await res.json();
      return await json
    }
    getUsers()
    .then(res => {
      setUsers(res)
      localStorage.setItem('users', JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })
  }, [url])

  return users
}