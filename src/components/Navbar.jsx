import { MdOutlineTaskAlt } from "react-icons/md";

function Navbar() {
  return (
    <nav className="flex items-center text-white py-3">
      <div className="logo text-4xl md:ml-20 ml-5 mt-5 cursor-pointer flex items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <MdOutlineTaskAlt className="text-purple-400 text-2xl" />
        </div>
        <div>
          <span className="font-extrabold text">to</span>
          <span className="font-extrabold text text-purple-700">do.</span>
        </div>
      </div>
      {/* <ul className="flex gap-8 font-medium text-2xl">
        <li className='cursor-pointer hover:text-purple-700 transition-all duration-150'>Home</li>
        <li className='cursor-pointer hover:text-purple-700 transition-all duration-150'>Your Tasks</li>
      </ul> */}
    </nav>
  );
}

export default Navbar;
