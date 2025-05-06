
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { setUser } from "./redux/Slices/authSlice";
import { USER_BACKEND_URL } from "./utils/Paths";
import AddReciepe from "./pages/Reciepes/Addreciepe";
import Savedreciepe from "./pages/Reciepes/Savedreciepe";
import Myreciepes from "./pages/Reciepes/Myreciepes";
import Veiwreciepe from "./pages/Reciepes/Veiwreciepe";
import Updaterecipe from "./pages/Reciepes/Updaterecipe";
import Usersavedreciepe from "./pages/savedpage/Usersavedreciepe";
import Explorereciepes from "./pages/otherusers/Explorereciepes";
import ProfileInfo from "./components/Profileinfo";
import Meandfollower from "./pages/Meandfollower";
import Anotherviewreciepe from "./pages/otherusers/Anotherviewreciepe";

import Notifications from "./pages/notifications/Notifications";
import Updateuserdata from "./pages/settings/Updateuserdata";

// PrivateRoute wrapper component
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      dispatch(setUser(storedUser));
      setLoading(false);
    } else {
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${USER_BACKEND_URL}/getuser`, {
            withCredentials: true,
          });

          if (response.data?.havinguser) {
            dispatch(setUser(response.data.havinguser));
            localStorage.setItem("user", JSON.stringify(response.data.havinguser));
          } else {
            dispatch(setUser(null));
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          dispatch(setUser(null));
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }
  }, [dispatch]);

  if (loading) return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <BrowserRouter>
      <div className="flex">
        {user && <Sidebar />}
        <main className="flex-1 ml-0 md:ml-64 pt-4 pb-16 px-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Authenticated Routes */}
            <Route path="/home" element={<PrivateRoute><Meandfollower /></PrivateRoute>} />
            <Route path="/addreciepe" element={<PrivateRoute><AddReciepe /></PrivateRoute>} />
            <Route path="/card" element={<PrivateRoute><Myreciepes /></PrivateRoute>} />
            <Route path="/reciepe/:id" element={<PrivateRoute><Veiwreciepe /></PrivateRoute>} />
            <Route path="/updaterecipe/:id" element={<PrivateRoute><Updaterecipe /></PrivateRoute>} />
            <Route path="/saved" element={<PrivateRoute><Usersavedreciepe /></PrivateRoute>} />
            <Route path="/explore" element={<PrivateRoute><Explorereciepes /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfileInfo /></PrivateRoute>} />
            <Route path="/recipedata/:id" element={<PrivateRoute><Anotherviewreciepe /></PrivateRoute>} />
            <Route path="/notification" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/setting" element={<PrivateRoute><Updateuserdata /></PrivateRoute>} />

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;



