import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { getImageUrl } from "@/services/helpers/helpers";
import avatar from '@/assets/profile.jpg'
import defaultProfilePhoto from '@/assets/images/dummyImg.png'
import { getProfile } from "@/services/api/api";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [photo, setPhoto] = useState(defaultProfilePhoto);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log(response.status);
        
        if (res.status !== 404) {
          if (response.data.avatar) {
            setPhoto(getImageUrl((response.data.avatar)))
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!user) {
    return null;
  }

  const user_role = user.role == "job_seeker" ? "jobseeker" : user.role;
  // const userAvatar = user?.linkedProfile?.picture ?? (user?.avatar ? getImageUrl(user.avatar) : avatar);
  // const userAvatar = user?.avatar ?? getImageUrl(user.avatar);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="h-8 w-8 rounded-full"
          src={photo}
          alt={user.name || "User"}
        />
        <span className="ml-2 text-gray-700 font-medium hidden md:block">
          {user.name || "User"}
        </span>
        <FaChevronDown className="ml-1 text-gray-400" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-xs text-gray-400">Signed in as</div>
          <div className="px-4 py-2 text-sm font-medium text-[#2b4033] truncate">
            {user.email || "No email provided"}
          </div>
          <div className="border-t border-gray-100"></div>

          {user.role !== 'admin' && (
            <Link
              to={`/${user_role}/settings`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          )}
          <div className="border-t border-gray-100"></div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
