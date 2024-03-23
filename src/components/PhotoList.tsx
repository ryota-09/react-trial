"use client"

import { useEffect, useState } from "react"

export const PhotoList = () => {
  const [photos, setPhoto] = useState([] as any)
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    const getphotos = async () => {
      setIsLoading(true)
      const photos = await Promise.all(Array(10).fill(fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json())));
      setPhoto(photos.flat());
      setIsLoading(false)
    }
    getphotos()
  }, [])
  return (
    <>
      <h1>Photos</h1>
      {isloading && <div>Loading...</div>}
      <div>
        {photos.map((photo: any, index: any) => <div key={index}>{photo.title}</div>)}
      </div>
    </>
  )
}