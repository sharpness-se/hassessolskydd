import React, { ChangeEvent} from 'react'

interface CheckboxProps{
    label: string,
    id: string,
    value: boolean,
    onChange:  (event: ChangeEvent<HTMLInputElement>) => void;
}
export const Checkbox: React.FC<CheckboxProps>=({label,id,value,onChange})=>{
  return (
    <div className="flex items-center ps-4 border border-gray-200 rounded-lg mb-5">
    <input
      type="checkbox"
      id={id}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      checked={value}
      onChange={onChange}
    />
    <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
      {label}
    </label>
  </div>
  )
}
