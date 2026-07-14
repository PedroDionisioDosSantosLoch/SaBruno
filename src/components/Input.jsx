export default function Input({
  placeholder,
  icon: Icon,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="w-72">
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 text-gray-500" size={22} />}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`border border-black w-full rounded-sm p-1.5 text-black focus:outline-none ${
            Icon ? 'pl-10' : 'pl-3'
          } shadow-[5px_5px_0px_0px_#585D69]`}
        />
      </div>
    </div>
  )
}
