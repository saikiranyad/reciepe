import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER_BACKEND_URL } from '../utils/Paths';
import { setUser } from '../redux/Slices/authSlice';

const Login = () => {
    const navigate = useNavigate()
    const  dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
        const form = new FormData();
        form.append('email',formData.email);
        form.append('password',formData.password);
        const response = await axios.post(`${USER_BACKEND_URL}/login`,form,{
            headers:{'Content-Type':'multipart/form-data'},
            withCredentials:true
        })
      
        dispatch(setUser(response.data.user));
        localStorage.setItem("user",JSON.stringify(response.data.user))
        // window.location.reload()
        navigate('/')
        setFormData({email:'',password:''})
        

    }catch(err){
        console.log(err)
    }
    // You can send `formData` to your login API here
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-rose-600 mb-4">🍰 Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-rose-400 mt-4">
          New here? <Link to='/register'><p className="underline hover:text-rose-600">Create an account</p></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
