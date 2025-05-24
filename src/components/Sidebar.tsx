import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-full p-4 bg-gray-50">
      {/* Chỉnh màu chữ T2S CRM thành màu xanh */}
      <h3 className="text-2xl text-center font-semibold mb-6 text-blue-600">T2S CRM</h3>
      <ul className="space-y-4 text-left">
        <li>
          <Link
            to="/"
            className="block py-2 px-4 hover:bg-blue-100 rounded-md"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/plans"
            className="block py-2 px-4 hover:bg-blue-100 rounded-md"
          >
            Plans
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="block py-2 px-4 hover:bg-blue-100 rounded-md"
          >
            Users
          </Link>
        </li>
        <li>
          <button
            onClick={toggleDropdown}
            className="block w-full py-2 px-4 text-left hover:bg-blue-100 rounded-md cursor-pointer"
          >
            Orders
          </button>
          {isDropdownOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link
                  to="/orders/pending"
                  className="block py-2 px-4 hover:bg-blue-100 rounded-md"
                >
                  Pending
                </Link>
              </li>
              <li>
                <Link
                  to="/orders/history"
                  className="block py-2 px-4 hover:bg-blue-100 rounded-md"
                >
                  History
                </Link>
              </li>

            </ul>
          )}
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full py-2 px-4 text-left text-white bg-rose-600 hover:bg-rose-500 rounded-md cursor-pointer"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
