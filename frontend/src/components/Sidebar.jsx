


// import React, { useEffect, useState } from "react";
// import {
//   FaUtensils,
//   FaHeart,
//   FaUserAlt,
//   FaPlusCircle,
//   FaHome,
//   FaBell,
//   FaCog,
//   FaSignOutAlt,
//   FaCompass,
// } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { clearUser } from "../redux/Slices/authSlice";
// import { NOTIFICATION_BACKEND_URL, USER_BACKEND_URL } from "../utils/Paths";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(`${NOTIFICATION_BACKEND_URL}/notifications`, {
//           withCredentials: true,
//         });
//         setNotifications(res.data.notifications);
//       } catch (err) {
//         console.error("Error fetching notifications", err);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const notificationCount = notifications.length;
//   const formatCount = (count) => (count > 9 ? "9+" : count);

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${USER_BACKEND_URL}/logout`, {}, { withCredentials: true });
//       localStorage.removeItem("user");
//       dispatch(clearUser());
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex flex-col justify-between h-screen w-64 bg-rose-100 shadow-md p-6 fixed left-0 top-0">
//         {/* Top Header (Logo and Website Name) */}
//         <div className="flex items-center gap-2 mb-6">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCcIb1wRA6ANoARWHKepHdkhioAy0dsineX4bTnuUzYvsgSbrSP4yGx3NXOAAWApp6C4&usqp=CAU"
//             alt="Logo"
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <h2 className="text-2xl font-bold text-rose-600">Don Recipe</h2>
//         </div>

//         {/* Navigation */}
//         <div className="space-y-4 text-rose-700 font-medium">
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaHome className="text-rose-500" />
//             <Link to="/">Home</Link>
//           </div>
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaUserAlt className="text-rose-500" />
//             <Link to="/profile">Profile</Link>
//           </div>
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaCompass className="text-rose-500" />
//             <Link to="/explore">Explore</Link>
//           </div>
//           <div className="relative flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaBell className="text-rose-500" />
//             <Link to="/notification">Notifications</Link>
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 right-0 text-[10px] bg-rose-500 text-white px-1.5 rounded-full">
//                 {formatCount(notificationCount)}
//               </span>
//             )}
//           </div>
//         </div>

//         <hr className="border-rose-300" />

//         <div className="space-y-4 text-rose-700 font-medium">
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaHeart className="text-rose-500" />
//             <Link to="/saved">Saved Recipes</Link>
//           </div>
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaUserAlt className="text-rose-500" />
//             <Link to="/card">My Recipes</Link>
//           </div>
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaPlusCircle className="text-rose-500" />
//             <Link to="/addreciepe">Add New Recipe</Link>
//           </div>
//         </div>

//         {/* Settings & Logout */}
//         <div className="text-rose-700 font-medium mt-6 space-y-2">
//           <div className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
//             <FaCog className="text-rose-500" />
//             <Link to="/setting">Settings</Link>
//           </div>
//           <div
//             onClick={handleLogout}
//             className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer text-red-600"
//           >
//             <FaSignOutAlt className="text-red-500" /> Logout
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="fixed bottom-0 left-0 right-0 bg-rose-100 shadow-inner flex justify-around items-center py-2 md:hidden z-50">
//         <Link to="/" className="flex flex-col items-center text-rose-600 text-sm">
//           <FaHome className="text-xl" />
//           <span>Home</span>
//         </Link>
//         <Link to="/saved" className="flex flex-col items-center text-rose-600 text-sm">
//           <FaHeart className="text-xl" />
//           <span>Saved</span>
//         </Link>
//         <Link to="/addreciepe" className="flex flex-col items-center text-rose-600 text-sm">
//           <FaPlusCircle className="text-xl" />
//           <span>Add</span>
//         </Link>
//         <Link to="/notification" className="relative flex flex-col items-center text-rose-600 text-sm">
//           <FaBell className="text-xl" />
//           <span>Alerts</span>
//           {notificationCount > 0 && (
//             <span className="absolute -top-1 right-0 text-[10px] bg-rose-500 text-white px-1.5 rounded-full">
//               {formatCount(notificationCount)}
//             </span>
//           )}
//         </Link>
//         <Link to="/profile" className="flex flex-col items-center text-rose-600 text-sm">
//           <FaUserAlt className="text-xl" />
//           <span>Profile</span>
//         </Link>
//         <Link to="/setting" className="flex flex-col items-center text-rose-600 text-sm">
//           <FaCog className="text-xl" />
//           <span>Settings</span>
//         </Link>
//         <div
//           onClick={handleLogout}
//           className="flex flex-col items-center text-rose-600 text-sm cursor-pointer"
//         >
//           <FaSignOutAlt className="text-xl text-red-500" />
//           <span className="text-red-500">Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaHeart,
  FaUserAlt,
  FaPlusCircle,
  FaHome,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaCompass,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUser } from "../redux/Slices/authSlice";
import { NOTIFICATION_BACKEND_URL, USER_BACKEND_URL } from "../utils/Paths";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${NOTIFICATION_BACKEND_URL}/notifications`, {
          withCredentials: true,
        });
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  const notificationCount = notifications.length;
  const formatCount = (count) => (count > 9 ? "9+" : count);

  const handleLogout = async () => {
    try {
      await axios.post(`${USER_BACKEND_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user");
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="fixed top-0 left-0 right-0 md:hidden bg-rose-100 flex justify-between items-center px-4 py-2 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCcIb1wRA6ANoARWHKepHdkhioAy0dsineX4bTnuUzYvsgSbrSP4yGx3NXOAAWApp6C4&usqp=CAU"
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-rose-600">Don Recipe</span>
        </div>
        <div className="flex gap-4 items-center text-rose-700">
          <Link to="/setting">
            <FaCog className="text-xl" />
          </Link>
          <button onClick={handleLogout}>
            <FaSignOutAlt className="text-xl text-red-600" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col justify-between h-screen w-64 bg-rose-100 shadow-md p-6 fixed">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCcIb1wRA6ANoARWHKepHdkhioAy0dsineX4bTnuUzYvsgSbrSP4yGx3NXOAAWApp6C4&usqp=CAU"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold text-rose-600">Don Recipe</h2>
          </div>

          {/* Navigation */}
          <div className="space-y-4 text-rose-700 font-medium">
            <SidebarLink to="/" icon={<FaHome />} label="Home" />
            <SidebarLink to="/profile" icon={<FaUserAlt />} label="Profile" />
            <SidebarLink to="/explore" icon={<FaCompass />} label="Explore" />
            <SidebarLink
              to="/notification"
              icon={<FaBell />}
              label="Notifications"
              count={notificationCount}
            />
          </div>

          <hr className="border-rose-300" />

          <div className="space-y-4 text-rose-700 font-medium">
            <SidebarLink to="/saved" icon={<FaHeart />} label="Saved Recipes" />
            <SidebarLink to="/card" icon={<FaUserAlt />} label="My Recipes" />
            <SidebarLink to="/addreciepe" icon={<FaPlusCircle />} label="Add New Recipe" />
          </div>
        </div>

        {/* Settings & Logout */}
        <div className="text-rose-700 font-medium mt-6 space-y-2">
          <SidebarLink to="/setting" icon={<FaCog />} label="Settings" />
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer text-red-600"
          >
            <FaSignOutAlt className="text-red-500" />
            Logout
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-rose-100 shadow-inner flex justify-around items-center py-2 md:hidden z-50">
        <MobileNavLink to="/" icon={<FaHome />} label="Home" />
        <MobileNavLink to="/saved" icon={<FaHeart />} label="Saved" />
        <MobileNavLink to="/addreciepe" icon={<FaPlusCircle />} label="Add" />
        <MobileNavLink to="/notification" icon={<FaBell />} label="Alerts" count={notificationCount} />
        <MobileNavLink to="/profile" icon={<FaUserAlt />} label="Profile" />
      </div>
    </>
  );
};

const SidebarLink = ({ to, icon, label, count }) => (
  <div className="relative flex items-center gap-2 hover:bg-rose-200 p-2 rounded-lg cursor-pointer">
    <span className="text-rose-500">{icon}</span>
    <Link to={to}>{label}</Link>
    {count > 0 && (
      <span className="absolute -top-1 right-0 text-[10px] bg-rose-500 text-white px-1.5 rounded-full">
        {count > 9 ? "9+" : count}
      </span>
    )}
  </div>
);

const MobileNavLink = ({ to, icon, label, count }) => (
  <Link to={to} className="relative flex flex-col items-center text-rose-600 text-sm">
    <div className="text-xl">{icon}</div>
    <span>{label}</span>
    {count > 0 && (
      <span className="absolute -top-1 right-0 text-[10px] bg-rose-500 text-white px-1.5 rounded-full">
        {count > 9 ? "9+" : count}
      </span>
    )}
  </Link>
);

export default Sidebar;



