








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../../utils/Paths';
import Reciepecardforother from '../../components/Reciepecardforother';
import { useNavigate } from 'react-router-dom';

const Explorereciepes = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllRecipes = async () => {
    try {
      const res = await axios.get(`${RECIEPE_BACKEND_URL}/getallreciepes`);
      if (res.data.success) {
        setRecipes(res.data.recipes);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setSavedRecipeIds(res.data.savedrecipes.map((r) => r._id));
      }
    } catch (err) {
      console.error('Error fetching saved recipes:', err);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
    fetchSavedRecipes();
  }, []);

  const handleView = (id) => {
    navigate(`/recipedata/${id}`);
  };

  const handleSaveToggle = async (recipeId) => {
    try {
      const res = await axios.post(
        `${USER_BACKEND_URL}/savedrecipe`,
        { recipeId },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSavedRecipeIds((prev) =>
          prev.includes(recipeId)
            ? prev.filter((id) => id !== recipeId)
            : [...prev, recipeId]
        );
      }
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  };

  return (
    <div className="bg-rose-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-900">Explore Delicious Recipes</h1>
          <p className="mt-2 text-gray-600 text-base sm:text-lg">
            Discover what others are cooking and get inspired
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-600">Loading recipes...</p>
          ) : recipes.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <Reciepecardforother
                key={recipe._id}
                recipeId={recipe._id}
                username={recipe.userId.name}
                avatar={recipe.userId.avatar}
                time={new Date(recipe.createdAt).toLocaleDateString()}
                images={recipe.images.map((image) => image.imageurl)}
                caption={recipe.caption}
                description={recipe.description}
                onView={() => handleView(recipe._id)}
                isSaved={savedRecipeIds.includes(recipe._id)}
                onSaveToggle={() => handleSaveToggle(recipe._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorereciepes;
