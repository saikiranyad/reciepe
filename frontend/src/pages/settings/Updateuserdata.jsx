import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_BACKEND_URL } from '../../utils/Paths';

function Updateuserdata() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Optional: pre-fill existing data
  useEffect(() => {
    axios.get(`${USER_BACKEND_URL}/getuser`, { withCredentials: true })
      .then(res => {
        const user = res.data.havinguser;
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          description: user.description || '',
        }));
        setPreview(user.avatar || null);
      })
      .catch(err => console.error('Error fetching user data', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      if (formData.avatar) data.append('avatar', formData.avatar);

      const res = await axios.put(`${USER_BACKEND_URL}/updateuser`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage(res.data.message || 'Profile updated!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white sm:px-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Avatar</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="mt-2 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>

        {message && (
          <div className="text-center mt-2 text-sm text-gray-700">{message}</div>
        )}
      </form>
    </div>
  );
}

export default Updateuserdata;

