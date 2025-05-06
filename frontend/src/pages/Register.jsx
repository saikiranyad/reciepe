import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { USER_BACKEND_URL } from '../utils/Paths';

const Register = () => {
    const navigate = useNavigate()

    const [formdata,setFormdata] =useState({
        name:'',
        email:'',
        password:''
    });
    const handlechange = (e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        try{
            const form = new FormData();
            form.append('name',formdata.name);
            form.append('email',formdata.email);
            form.append('password',formdata.password)
            const response = await axios.post(`${USER_BACKEND_URL}/sign`,form,{
                headers:{'Content-Type':'multipart/form-data'},
                withCredentials:true
            })
            console.log(response.data);
            setFormdata({name:'',email:'',password:''})
            navigate('/login')

        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-rose-600">🍓 Join Don Recipe</h2>
        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label htmlFor="name" className="block text-rose-700 font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              className="w-full px-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="please enter don name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-rose-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              className="w-full px-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="e.g. chef@kitchen.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-rose-700 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              className="w-full px-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-xl hover:bg-rose-600 transition duration-300 font-semibold"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-rose-400">
          Already a member? <a href="/login" className="underline hover:text-rose-600">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
