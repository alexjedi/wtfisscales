import Button from '../components/Button.jsx'
import { Note, Key, RomanNumeral, Chord, Interval } from 'tonal'
import {
  LockClosedIcon,
  TrashIcon,
  PlusIcon,
  SwatchIcon,
  BookmarkIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ShareIcon,
} from '@heroicons/react/24/solid'

import { useEffect, useState } from 'react'

function getRandomKeyQuality() {
  const qualities = ['major', 'minor']
  return qualities[Math.floor(Math.random() * qualities.length)]
}

function generateRandomRootNote() {
  let randomRoot
  do {
    randomRoot = Note.names()[Math.floor(Math.random() * 12)]
  } while (randomRoot === undefined)
  return randomRoot
}

function ChordJam() {
  const [rootNote, setRootNote] = useState(generateRandomRootNote())
  const [keyQuality, setKeyQuality] = useState(getRandomKeyQuality())
  const [progression, setProgression] = useState(generateProgression(5))
  const [locked, setLocked] = useState(Array(5).fill(false))
  const [colors, setColors] = useState(generateColors(5))

  useEffect(() => {
    setProgression(generateProgression(5))
  }, [rootNote, keyQuality])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault()
        regenerateProgression()
      } else if (e.altKey) {
        e.preventDefault()
        setRootNote(generateRandomRootNote())
        setKeyQuality(getRandomKeyQuality())
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [locked])

  function generateColors(length) {
    return Array.from({ length }, () => {
      const grayValue = Math.floor(Math.random() * 256)
      return `rgb(${grayValue}, ${grayValue}, ${grayValue})`
    })
  }

  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  function generateProgression(length) {
    console.log(rootNote)
    console.log(keyQuality)
    let allChords = []
    if (keyQuality === 'major') {
      const key = Key.majorKey(rootNote)
      allChords = [
        ...(key?.triads ?? []),
        ...(key?.chords ?? []),
        ...(key?.secondaryDominants ?? []),
        ...(key?.secondaryDominantsMinorRelative ?? []),
        ...(key?.substituteDominants ?? []),
        ...(key?.substituteDominantsMinorRelative ?? []),
      ]
    } else {
      const key = Key.minorKey(rootNote)
      allChords = [...(key?.natural?.triads ?? []), ...(key?.natural?.chords ?? [])]
    }
    const filteredChords = allChords.filter((chord) => chord !== '')
    const shuffledChords = shuffleArray(filteredChords)

    return shuffledChords.slice(0, length)
  }

  function regenerateProgression() {
    const newProgression = generateProgression(progression.length)
    setProgression((prev) =>
      prev.map((chord, index) => (locked[index] ? chord : newProgression[index]))
    )
    setColors((prev) => prev.map((color, index) => (locked[index] ? color : generateColors(1)[0])))
  }

  function getTextColor(backgroundColor) {
    const [r, g, b] = backgroundColor.match(/\d+/g).map(Number)

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? 'text-gray-800' : 'text-white'
  }

  // function updateRootNote(e) {
  //   const newRoot = e.target.value.toUpperCase()
  //   if (Note.names().includes(newRoot)) {
  //     setRootNote(newRoot)
  //     regenerateProgression()
  //   }
  // }

  function toggleLock(index) {
    setLocked((prev) => prev.map((lock, i) => (i === index ? !lock : lock)))
  }

  function addChord() {
    setProgression([...progression, generateProgression(1, rootNote)[0]])
    setLocked([...locked, false])
    setColors([...colors, generateColors(1)[0]])
  }

  function removeChord() {
    if (progression.length > 1) {
      setProgression(progression.slice(0, -1))
      setLocked(locked.slice(0, -1))
      setColors(colors.slice(0, -1))
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full p-4 bg-white border-b border-gray-300 flex justify-between items-center">
        <span className="text-gray-500">
          Press <span className="text-gray-900 font-semibold">spacebar</span> to generate chord
          progressions or <span className="text-gray-900 font-semibold">alt / opt</span> to change
          the Key
        </span>
        <div className="flex justify-center items-center divide-x divide-gray-200">
          <div className="flex items-center justify-center px-2">
            <input
              type="text"
              value={rootNote}
              // onChange={updateRootNote}
              className="text-gray-700 w-4"
            />
            <select
              value={keyQuality}
              name="choice"
              onChange={(e) => setKeyQuality(e.target.value)}
              className="text-gray-700"
            >
              <option value="major">Major</option>
              <option value="minor">Minor</option>
            </select>
          </div>
          <div className="flex items-center justify-center px-2">
            <button className="rounded px-2 py-1 text-gray-700 flex justify-center items-center space-x-2">
              <ArrowUturnLeftIcon className="h-4 w-4" />
            </button>
            <button className="rounded px-2 py-1 text-gray-700 flex justify-center items-center space-x-2">
              <ArrowUturnRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-center px-2">
            <button className="rounded px-2 py-1 text-gray-700 flex justify-center items-center space-x-2">
              <BookmarkIcon className="h-4 w-4" />
              <span className="text-sm">Save</span>
            </button>
            <button className="rounded px-2 py-1 text-gray-700 flex justify-center items-center space-x-2">
              <ShareIcon className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex h-full w-full">
        {progression.map((chord, index) => (
          <div
            key={index}
            className="bg-gray-100 flex-grow h-full transition-all duration-300 ease-in-out"
            style={{ backgroundColor: colors[index], flexBasis: `${100 / progression.length}%` }}
          >
            <div className="relative p-8 py-12 h-full flex flex-col justify-between group">
              <div
                className={`${getTextColor(
                  colors[index]
                )} w-full flex flex-col items-center space-y-3`}
              >
                <span className="text-lg font-medium">{chord}</span>
                <span className="text-md font-medium">
                  {
                    RomanNumeral.get(
                      Interval.get(Interval.distance(`${rootNote}`, Chord.degrees(chord)(1)))
                    ).name
                  }
                </span>
              </div>
              <div className="flex flex-col items-center justify-end h-full w-full space-y-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <button className={` ${getTextColor(colors[index])} font-bold py-1 px-2 rounded`}>
                  <SwatchIcon className="h-5 w-5" />
                </button>
                <button
                  className={` ${getTextColor(colors[index])}  font-bold py-1 px-2 rounded ${
                    locked[index] ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => toggleLock(index)}
                >
                  <LockClosedIcon className="h-5 w-5" />
                </button>
                <button
                  className={`${getTextColor(colors[index])} font-bold py-1 px-2 rounded`}
                  onClick={() => removeChord(index)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute h-full w-6 flex justify-center items-center top-0 -right-3 group z-10">
                <button
                  className="bg-white p-4 rounded-full transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  onClick={addChord}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChordJam
