"use client"

import { useEffect, useState } from "react"

export const PhotoList = () => {
  const [photos, setPhoto] = useState([] as any)
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    const getphotos = async () => {
      setIsLoading(true)
      const photos = await Promise.all(Array(5).fill(fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json())));
      setPhoto(photos.flat());
      setIsLoading(false)
    }
    getphotos()
  }, [])

  // useEffect(() => {
  //   setPhoto(photos.map((photo: any) => ({ ...photo, title: photo.title.toUpperCase() })))
  // }, [photos])

  return (
    <>
      <div className="w-[768px] mx-auto">
        <h1 className="bg-red-500">Photos</h1>
        {isloading && <div>Loading...</div>}
        <ul className="">
          {photos.map((photo: any, index: any) => (
            <li key={index} className="cursor-pointer h-10 hover:bg-slate-300 flex gap-4">
              <img src={photo.url} width={20} height={20} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}