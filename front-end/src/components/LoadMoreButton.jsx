import React from 'react'

const LoadMoreButton = ({show,onClick}) => {
    if(!show)return null
  return (
    <>
    <button 
      className="w-full bg-gray-500 px-4 py-2 text-[0.8rem] md:text-xl text-white rounded-md hover:bg-black transition"
      onClick={onClick}
    >
      Load More
    </button>
  </>
  )
}

export default LoadMoreButton