import React from 'react'

const HoverButton = ({ children, theme = 'dark', icon = false, onClick, ...props }) => {
  const baseClasses = `${
    icon ? 'px-1.5' : 'px-2.5'
  } relative py-1.5 rounded inline-flex items-center justify-center focus:outline-none transition-all duration-300 ease-in-out group`

  const themeClasses = theme === 'light' ? `text-white` : `text-gray-700`

  const pseudoClasses = theme === 'dark' ? `bg-gray-900 bg-opacity-5` : `bg-white bg-opacity-10`

  return (
    <button onClick={onClick} className={`${baseClasses} ${themeClasses}`} {...props}>
      <div className="w-full h-full flex space-x-2 justify-center items-center">{children}</div>
      <span
        className={`absolute w-full h-full -z-1 rounded scale-[0.7] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-in-out ${pseudoClasses}`}
      ></span>
    </button>
  )
}

export default HoverButton
