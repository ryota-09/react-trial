"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef, useState } from "react"

export const VirtualList = () => {
  const [photos, setPhoto] = useState([] as any)
  const [isloading, setIsLoading] = useState(true)
  const parentRef = useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: photos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  })

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
      <div className="mx-auto w-[768px]">
        <h1 className=" text-3xl font-bold">Virtual List</h1>
        <div className="text-2xl text-red-600">Total Items : {photos.length}</div>
        {isloading && <div className="text-3xl font-bold m-10">Loading...</div>}
        <div style={{ overflow: "hidden" }}>
          <ul className="block border-4 p-8 rounded-md" ref={parentRef} style={{
            height: 500,
            overflowY: 'auto',
            contain: 'strict',
          }}>
            <div style={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const photo = photos[virtualRow.index]
                  return (
                    <li key={virtualRow.index} className="cursor-pointer hover:bg-slate-200 hover:rounded-md flex gap-4 items-center" ref={rowVirtualizer.measureElement}>
                      <div className="p-2 flex gap-4">
                        <input type="checkbox" className="cursor-pointer" />
                        <img src={photo.url} width={20} height={20} />
                      </div>
                      <p>{photo.title.length < 50 ? photo.title : photo.title.slice(0, 50) + "..."}</p>
                    </li>
                  )
                })}
              </div>
            </div>
          </ul>
        </div>
      </div >
    </>
  )
}