import Button from '../components/Button.jsx'
import { Chord, Scale } from 'tonal'
import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/solid'

import { useEffect, useState } from 'react'

function ChordJam() {
  const [progression, setProgression] = useState(generateProgression(4))
  const [colors, setColors] = useState(generateColors(4))
  const [locked, setLocked] = useState(Array(4).fill(false))

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault()
        setProgression((prev) =>
          prev.map((chord, index) => (locked[index] ? chord : generateProgression(1)[0]))
        )
        setColors((prev) =>
          prev.map((color, index) => (locked[index] ? color : generateColors(1)[0]))
        )
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [locked])

  function generateProgression(length) {
    const randomScale = Scale.names()[Math.floor(Math.random() * length)]
    const randomChords = Scale.scaleChords(`C ${randomScale}`)
    const shuffledArray = [...randomChords].sort(() => Math.random() - 0.5)
    return shuffledArray.slice(0, length)
  }

  function generateColors(length) {
    return Array.from({ length }, () => {
      const grayValue = Math.floor(Math.random() * 256)
      return `rgb(${grayValue}, ${grayValue}, ${grayValue})`
    })
  }

  function addChord() {
    setProgression([...progression, Chord.get('I').symbol])
    setColors([...colors, generateColors(1)[0]])
    setLocked([...locked, false])
  }

  function removeChord(index) {
    setProgression(progression.filter((_, i) => i !== index))
    setColors(colors.filter((_, i) => i !== index))
    setLocked(locked.filter((_, i) => i !== index))
  }

  function toggleLock(index) {
    setLocked((prev) => prev.map((lock, i) => (i === index ? !lock : lock)))
  }

  console.log(progression)

  return (
    <div className="w-full h-full">
      <div className="flex h-full min-h-screen w-full">
        {progression.map((chord, index) => (
          <div
            key={index}
            className="bg-gray-100 flex-grow h-full"
            style={{ backgroundColor: colors[index], flexBasis: `${100 / progression.length}%` }}
          >
            <div className="p-8 py-12 h-full flex flex-col justify-between">
              <div className="w-full flex flex-col items-center space-y-3">
                <span className="text-2xl font-semibold">{chord}</span>
                <span className="text-lg font-semibold">{index}</span>
              </div>
              <div className="flex flex-col items-center justify-end h-full w-full space-y-6">
                <button
                  className={` text-white font-bold py-1 px-2 rounded ${
                    locked[index] ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => toggleLock(index)}
                >
                  <LockClosedIcon className="h-6 w-6" />
                </button>
                <button
                  className=" text-white font-bold py-1 px-2 rounded"
                  onClick={() => removeChord(index)}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {progression.length < 10 && (
          <div
            className="bg-gray-100 flex-grow h-full flex items-center justify-center"
            style={{ flexBasis: `${100 / (progression.length + 1)}%` }}
          >
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addChord}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChordJam
