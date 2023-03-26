import { useState } from 'react'

function Slider({ min, max, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }
  return (
    <input className="w-full" type="range" min={min} max={max} onChange={handleChange} step="1" />
  )
}

export default Slider
