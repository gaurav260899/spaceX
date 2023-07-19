import { useState } from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="absolute flex items-center justify-between px-5 w-full">
        <div className="flex items-center">
        <Link to="/" className="ml-4 text-white text-4xl font-bold">
            Space
          </Link>
          <SiSpacex className="text-8xl text-white" />
        </div>

        <nav className={`${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/capsule" className="text-white text-sm">
                Capsules
              </Link>
            </li>
            <li>
              <Link to="/core" className="text-white text-sm">
                Cores
              </Link>
            </li>
            <li>
              <Link to="/crew" className="text-white text-sm">
                Crew
              </Link>
            </li>
            <li>
              <Link to="/rockets" className="text-white text-sm">
                Rockets
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}
