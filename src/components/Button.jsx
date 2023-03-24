function Button({ text, subtext, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center min-w-14 h-14 border rounded-lg ${
        isActive
          ? 'border-[#585858] bg-[#2B2F3B]'
          : 'border-[#505050] bg-[#14171F] hover:bg-[#2B2F3B]'
      }`}
    >
      <span className="text-lg text-white font-medium">{text}</span>
      <span className="text-sm text-gray-400">{subtext}</span>
    </button>
  )
}

export default Button
