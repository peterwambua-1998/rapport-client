import { Link } from "react-router-dom";
import logo from '@/assets/images/RAPPORT.png'

const HeaderNav = () => {
    return (
        <header className="flex justify-between bg-white items-center h-14 px-6 py-2 border-b shadow-md">
            <Link to="/" className="h-8 w-auto flex-shrink-0">
                <img
                    src={logo}
                    alt="logo"
                    className="h-full w-full object-contain"
                />
            </Link>
            <div className="flex space-x-4">
            </div>
        </header>
    );
}

export default HeaderNav;

