function Chord({ text, subtext, hasArrow, hasLongArrow }) {
  return (
    <div
      className={`relative flex flex-col items-center space-y-1 ${
        hasArrow &&
        'before:block before:absolute before:-bottom-9 before:w-0.5 before:h-8 before:bg-gray-600'
      } ${
        hasLongArrow &&
        'before:block before:absolute before:-bottom-16 before:w-0.5 before:h-12 before:bg-gray-600'
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center min-w-[40px] h-10 border rounded-lg border-[#505050] bg-[#14171F]`}
      >
        <span className="text-base text-white font-medium">{text}</span>
      </div>
      <span className="text-sm text-gray-400">{subtext}</span>
    </div>
  )
}

export default Chord
