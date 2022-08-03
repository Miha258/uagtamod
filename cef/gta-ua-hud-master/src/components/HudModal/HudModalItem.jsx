import React from 'react'

const HudModalItem = ({modal}) => {
  return (
    <div className='rounded-md bg-slate-700 bg-opacity-90 py-3 px-2 text-center relative w-full'>
      <h1 className='uppercase text-slate-500 opacity-70 lg:text-4xl'>{modal.title}</h1>
      <p className='text-white opacity-90 mt-2 mb-4 break-words lg:text-2xl lg:tracking-widest'>{modal.text}</p>
      <div className='flex justify-center w-full absolute bottom-[-10px] gap-x-1'>
        <button className='rounded-sm py-1 w-[45%] text-center bg-blue-400 text-white lg:text-xl'>{modal.btn1}</button>
        <button className='rounded-sm py-1 w-[45%] text-center bg-yellow-400 text-blue-500 lg:text-xl'>{modal.btn2}</button>
      </div>
    </div>
  )
}
export default HudModalItem