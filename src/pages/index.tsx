import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import '@/App.css'
import { editImage } from '@/lib/openai'

function App() {
  const [count, setCount] = useState(0)
  const onClick = async () => {
    const res = await editImage("/mac.webp")
    console.log(res)
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button className='bg-red-500' onClick={onClick}>編集</button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
