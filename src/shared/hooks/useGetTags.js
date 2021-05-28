import { useEffect, useState } from "react"

export const useGetTags = (url) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      const res = await fetch(url)
      const json = await res.json();
      return await json
    }
    getTags()
    .then(res => {
      setTags(res)
      localStorage.setItem('tags', JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })
  }, [url])

  return tags
}