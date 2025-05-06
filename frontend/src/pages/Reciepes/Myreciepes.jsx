import React, { useEffect, useState } from 'react';
import Reciepecard from '../../components/Reciepecard';
import axios from 'axios';
import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../../utils/Paths';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Myreciepes = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleView = (recipeId) => {
    console.log("View recipe with ID:", recipeId);
    navigate(`/reciepe/${recipeId}`);
  };

  const handleDelete = async (recipeId) => {
    try {
      const response = await axios.delete(`${RECIEPE_BACKEND_URL}/${recipeId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/card');
        fetchMyRecipes();
      } else {
        console.log(response.err.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get(`${USER_BACKEND_URL}/recipes`, {
        withCredentials: true,
      });

      if (response.data.success === true && Array.isArray(response.data.recipes)) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
        setError(response.data.message || "Failed to load recipes.");
      }
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSaved = async () => {
    try {
      const response = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
        withCredentials: true,
      });

      if (response.data.success && Array.isArray(response.data.savedRecipes)) {
        setSavedRecipes(response.data.savedRecipes.map((r) => r._id));
      }
    } catch (err) {
      console.log("Error fetching saved recipes", err);
    }
  };

  const handleSaveToggle = async (recipeId) => {
    try {
      const response = await axios.post(
        `${USER_BACKEND_URL}/savedrecipe`,
        { recipeId },
        { withCredentials: true }
      );
      if (response.data.success === true) {
        fetchSaved();
        console.log(response.data);
      }
    } catch (err) {
      console.log("Error saving/unsaving", err);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
    fetchSaved();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 md:ml-10 sm:px-6">
      <h2 className="text-4xl font-extrabold text-rose-600 mb-2">My Recipes</h2>
      <p className="text-gray-500 mb-8">Your personal collection of shared delights</p>
      <hr className="border-rose-300 mb-6" />

      {loading ? (
        <div className="text-center text-gray-400 text-lg mt-10">Loading recipes...</div>
      ) : error ? (
        <div className="text-red-500 font-medium">{error}</div>
      ) : recipes.length === 0 ? (
        <div className="text-gray-500 text-center mt-20 text-lg">
          You haven’t posted any recipes yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="relative">
              <Reciepecard
                username={user?.name || "Anonymous"}
                avatar={user?.avatar}
                time={new Date(recipe.createdAt).toLocaleDateString()}
                images={recipe.images.map((image) => image.imageurl)}
                caption={recipe.title}
                description={recipe.description}
                recipeId={recipe._id}
                onView={() => handleView(recipe._id)}
                onDelete={() => handleDelete(recipe._id)}
                onSaveToggle={() => handleSaveToggle(recipe._id)}
                isSaved={savedRecipes.includes(recipe._id)}
              />

              {/* Collaborators */}
              {recipe.collabortors && recipe.collabortors.length > 0 && (
                <div className="mt-1 text-sm text-gray-600 px-2">
                  <span className="font-semibold text-rose-500">Collaborators:</span>{" "}
                  {recipe.collabortors.map((collab, idx) => (
                    <div key={collab._id || idx} className="inline-block mr-2">
                      <img
                        src={collab.avatar}
                        alt={collab.name}
                        className="w-8 h-8 rounded-full inline-block mr-1"
                      />
                      <span>{collab.name}</span>
                      {idx !== recipe.collabortors.length - 1 && ", "}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myreciepes;
