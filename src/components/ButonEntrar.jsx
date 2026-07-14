export default function ButonEntrar({ disabled = false, children = 'Entrar' }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-72 bg-blue-600 text-white p-2 rounded-sm font-medium shadow-[5px_5px_0px_0px_#585D69] hover:bg-blue-700 active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
