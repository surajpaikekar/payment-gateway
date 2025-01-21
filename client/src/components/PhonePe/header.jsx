
import {Link} from "react-router-dom";
const Header = () => {
  return (
      <header className="bg-white py-4 px-5 border-b-2 border-purple-700 flex justify-between">
        <div className="w-48">
          {/* logo space */}
        </div>
        
        <nav className="flex items-center ml-auto">
            <Link to="/" className="mx-4 no-underline text-black font-medium text-xl">Home</Link>
            <Link to="/about" className="mx-4 no-underline text-black text-xl font-medium">About me</Link>
            <Link to="/contact" className="mx-4 no-underline text-black font-medium text-xl">Contact</Link>
            <Link to="/more" className="mx-4 no-underline text-black text-xl font-medium">More</Link>
        </nav>
      
      </header>
  )
}

export default Header;
