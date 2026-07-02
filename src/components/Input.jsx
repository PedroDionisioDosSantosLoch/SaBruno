export default function Input() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-72">
        <input
          type="text"
          placeholder="Nome"
          className="border w-full rounded-sm p-0.5 text-black focus:outline-none"
        />
      </div>
    </div>
  )
}
