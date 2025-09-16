import React from 'react'

const Mainlayout = ({children}) => {
  return (
    <main className=" w-full min-h-screen p-6 md:p-20 font-sans bg-gray-100 h-full">
        {children}
    </main>
  )
}

export default Mainlayout