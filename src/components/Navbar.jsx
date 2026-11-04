import React from 'react'

function Navbar() {
  return (
    <nav className='flex items-center bg-slate-900 text-white py-3'>
      <div className="logo text-4xl mx-9 cursor-pointer">
        <span className='font-bold text'>to</span>
        <span className='font-bold text text-purple-700'>do.</span>
      </div>
      <ul className="flex gap-8 font-medium text-2xl">
        <li className='cursor-pointer hover:text-purple-700 transition-all duration-150'>Home</li>
        <li className='cursor-pointer hover:text-purple-700 transition-all duration-150'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar