export default function Checkbox({ name, handleClick, checked }) {
  return (
    <div className="flex items-center py-2">
      <input
        id={name}
        type="checkbox"
        onChange={handleClick}
        checked={checked}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2  focus:ring-blue-500"
      />
      <label
        htmlFor={name}
        className="ml-2 cursor-pointer text-sm font-medium text-gray-900 "
      >
        {name}
      </label>
    </div>
  );
}
