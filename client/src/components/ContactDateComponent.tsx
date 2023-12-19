import React from 'react'

interface ContactDateProps{
    heading: string,
}

const ContactDateComponent: React.FC<ContactDateProps> =({heading})=> {
  return (
    <div className="bg-white rounded p-5 w-full">
            <h2 className="uppercase tracking-wide text-gray-700 text-xs font-bold">
              {heading}
            </h2>
          </div>
  )
}


export default ContactDateComponent
