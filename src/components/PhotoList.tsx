"use client"

import { useEffect, useState } from "react"

export const PhotoList = () => {
  const [photos, setPhoto] = useState([] as any)
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    const getphotos = async () => {
      setIsLoading(true)
      const photos = await Promise.all(Array(1).fill(fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json())));
      setPhoto(photos.flat());
      setIsLoading(false)
    }
    getphotos()
  }, [])

  useEffect(() => {
    if (photos.length === 0) return
    setPhoto(photos.map((photo: any) => ({ ...photo, title: photo.title.toUpperCase() })))
  }, [photos])

  return (
    <>
      <div className="w-[768px] mx-auto">
        <h1 className=" text-3xl font-bold">List</h1>
        <div className="text-2xl text-red-600">Total Items : {photos.length}</div>
        {isloading && <div className="text-3xl font-bold m-10">Loading...</div>}
        <ul className="block max-h-[500px] border-4 p-8 overflow-auto rounded-md">
          {photos.map((photo: any, index: any) => (
            <li key={index} className="cursor-pointer hover:bg-slate-200 hover:rounded-md flex gap-4 items-center">
              <div className="p-2 flex gap-4">
                <input type="checkbox" className="cursor-pointer" />
                <img src={photo.url} width={20} height={20} />
              </div>
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}