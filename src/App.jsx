import { useState } from 'react'
import ChordFinder from './pages/ChordFinder.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="w-full h-full flex justify-center items-center bg-[#313338] md:py-10">
      <div className="h-full w-full md:max-w-[370px] md:max-h-[800px] border border-[#505050] bg-[#14171F] md:rounded-[24px] drop-shadow-lg">
        <ChordFinder />
      </div>
    </main>
  )
}

export default App
