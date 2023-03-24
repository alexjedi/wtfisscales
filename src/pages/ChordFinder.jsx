import Button from '../components/Button.jsx'
import Chord from '../components/Chord.jsx'
import { Progression, Range } from 'tonal'

import { useEffect, useState } from 'react'

function ChordFinder() {
  const mainChordsRoman = ['I', 'vim', 'IV', 'iim', 'V', 'iiim']
  const secondDominantRoman = ['V7', 'III7', 'I7', 'VI7', 'II7', 'VII7']
  const modalInterchangeRoman = ['bIII', 'bVI', 'ivm', 'bVII']
  const [currentNote, setCurrentNote] = useState('C')
  const [mainChords, setMainChords] = useState(
    Progression.fromRomanNumerals(currentNote, mainChordsRoman)
  )
  const [secondDominant, setSecondDominant] = useState(
    Progression.fromRomanNumerals(currentNote, secondDominantRoman)
  )
  const [modalInterchange, setModalInterchange] = useState(
    Progression.fromRomanNumerals(currentNote, modalInterchangeRoman)
  )

  const removeLastM = (str) => (str.slice(-1) === 'm' ? str.slice(0, -1) : str)

  const notes = Range.chromatic([`C2`, `B2`], { sharps: true, pitchClass: true })

  useEffect(() => {
    setMainChords(Progression.fromRomanNumerals(currentNote, mainChordsRoman))
    setSecondDominant(Progression.fromRomanNumerals(currentNote, secondDominantRoman))
    setModalInterchange(Progression.fromRomanNumerals(currentNote, modalInterchangeRoman))
    // const generateNotes = (root) => {
    //   return Range.chromatic([`${root}2`, `${root}3`], { sharps: true }, { pitchClass: true })
    // }
    // setNotes(generateNotes(currentNote))
  }, [currentNote])

  return (
    <section className="w-full h-full flex flex-col items-center justify-between space-y-4 p-6">
      <div className="w-full flex flex-col items-center space-y-4">
        <div className="w-full flex flex-col items-end space-y-3 border border-gray-700 border-dashed rounded-xl py-3 px-4">
          <span className="text-end text-sm">Secondary Dominants</span>
          <div className="w-full flex justify-between items-center">
            {secondDominant.map((note, i) => (
              <Chord text={note} subtext={removeLastM(secondDominantRoman[i])} hasArrow></Chord>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-end space-y-3 border border-gray-700 border-dashed rounded-xl py-3 px-4">
          <div className="w-full flex justify-between items-center">
            {mainChords.map((note, i) => (
              <Chord
                text={note}
                subtext={removeLastM(mainChordsRoman[i])}
                hasLongArrow={i % 2 == 0}
              ></Chord>
            ))}
          </div>
          <span className="text-end text-sm">Main</span>
        </div>
        <div className="w-full flex flex-col items-end space-y-3 border border-gray-700 border-dashed rounded-xl py-3 px-4">
          <div className="w-full flex justify-between items-center">
            {modalInterchange.map((note, i) => (
              <Chord text={note} subtext={removeLastM(modalInterchangeRoman[i])}></Chord>
            ))}
          </div>
          <span className="text-end text-sm">Modal Interchange</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6 place-items-stretch">
        {notes.map((note) => (
          <Button
            text={note}
            subtext={note}
            isActive={currentNote === note}
            onClick={() => setCurrentNote(note)}
          />
        ))}
      </div>
    </section>
  )
}

export default ChordFinder
