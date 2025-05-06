// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from '../components/Reciepecard';
// import Reciepecardforother from '../components/Reciepecardforother';
// import { useNavigate } from 'react-router-dom';

// const Meandfollower = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [savedIds, setSavedIds] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get user from localStorage
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?._id) setUserId(user._id);

//         // Fetch recipes from followed users
//         const recipesRes = await axios.get(`${USER_BACKEND_URL}/followingreciepes`, {
//           withCredentials: true,
//         });

//         // Fetch saved recipe IDs
//         const savedRes = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
//           withCredentials: true,
//         });

//         const savedRecipeIds = savedRes.data.savedrecipes.map((r) => r._id);

//         // Add isSaved flag to each recipe
//         const updatedRecipes = recipesRes.data.user_recipes.map((recipe) => ({
//           ...recipe,
//           isSaved: savedRecipeIds.includes(recipe._id),
//         }));

//         setRecipes(updatedRecipes);
//         setSavedIds(savedRecipeIds);
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleView = (id) => {
//     navigate(`/recipedata/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${RECIEPE_BACKEND_URL}/recipes/${id}`, {
//         withCredentials: true,
//       });
//       setRecipes((prev) => prev.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleSaveToggle = async (id) => {
//     try {
//       const isCurrentlySaved = savedIds.includes(id);

//       const res = isCurrentlySaved
//         ? await axios.delete(`${USER_BACKEND_URL}/unsavedrecipe`, {
//             data: { recipeId: id },
//             withCredentials: true,
//           })
//         : await axios.post(
//             `${USER_BACKEND_URL}/savedrecipe`,
//             { recipeId: id },
//             { withCredentials: true }
//           );

//       if (res.data.success) {
//         setRecipes((prev) =>
//           prev.map((recipe) =>
//             recipe._id === id ? { ...recipe, isSaved: !isCurrentlySaved } : recipe
//           )
//         );

//         setSavedIds((prev) =>
//           isCurrentlySaved ? prev.filter((rid) => rid !== id) : [...prev, id]
//         );
//       }
//     } catch (err) {
//       console.error('Save toggle failed:', err);
//     }
//   };
//   console.log(recipes)

//   return (
//     <div className="p-6 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Feed</h2>

//         {recipes.length === 0 ? (
//           <p className="text-center text-gray-600">No recipes found from you or those you follow.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {recipes.map((recipe) => {
//               const isOwn = recipe.userId?._id === userId;
//               const commonProps = {
//                 username: recipe.userId?.name || 'Unknown',
//                 avatar:
//                   recipe.userId?.avatar ||
//                   'https://www.gravatar.com/avatar/?d=mp', // fallback avatar
//                 time: new Date(recipe.createdAt).toLocaleString(),
//                 images: recipe.images?.map((img) => img.imageurl) || [],
//                 description: recipe.description || '',
//                 caption: recipe.caption || '',
//                 recipeId: recipe._id,
//                 onView: () => handleView(recipe._id),
//                 onSaveToggle: () => handleSaveToggle(recipe._id),
//                 isSaved: recipe.isSaved || false,
//               };

//               return isOwn ? (
//                 <Reciepecard
//                   key={recipe._id}
//                   {...commonProps}
//                   onDelete={() => handleDelete(recipe._id)}
//                 />
//               ) : (
//                 <Reciepecardforother key={recipe._id} {...commonProps} />
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Meandfollower;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../utils/Paths';
import Reciepecard from '../components/Reciepecard';
import Reciepecardforother from '../components/Reciepecardforother';
import { useNavigate } from 'react-router-dom';

const Meandfollower = () => {
  const [recipesss, setRecipesss] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user data
        if (user?._id) setUserId(String(user._id)); // Set the user ID

        // Fetch the recipes from followed users and the current user
        const recipesRes = await axios.get(`${USER_BACKEND_URL}/followingreciepes`, {
          withCredentials: true,
        });
        console.log(recipesRes?.data?.user_recipes); // Check if your own recipes are included

      

        console.log(recipesRes.data); // Check the updated recipes with saved status
        setRecipesss(recipesRes.data.user_recipes); // Set recipes state
     
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
   
    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  // Handle navigating to a specific recipe
  const handleView = (id) => navigate(`/recipedata/${id}`);

  // Handle deleting a recipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${RECIEPE_BACKEND_URL}/recipes/${id}`, {
        withCredentials: true,
      });
      setRecipesss((prev) => prev.filter((r) => r._id !== id)); // Remove deleted recipe from state
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Handle saving or unsaving a recipe
  // const handleSaveToggle = async (id) => {
  //   try {
  //     const isCurrentlySaved = savedIds.includes(id);

  //     const res = isCurrentlySaved
  //       ? await axios.delete(`${USER_BACKEND_URL}/unsavedrecipe`, {
  //           data: { recipeId: id },
  //           withCredentials: true,
  //         })
  //       : await axios.post(
  //           `${USER_BACKEND_URL}/savedrecipe`,
  //           { recipeId: id },
  //           { withCredentials: true }
  //         );

  //     if (res.data.success) {
  //       setRecipes((prev) =>
  //         prev.map((recipe) =>
  //           recipe._id === id ? { ...recipe, isSaved: !isCurrentlySaved } : recipe
  //         )
  //       );

  //       setSavedIds((prev) =>
  //         isCurrentlySaved ? prev.filter((rid) => rid !== id) : [...prev, id]
  //       );
  //     }
  //   } catch (err) {
  //     console.error('Save toggle failed:', err);
  //   }
  // };
  console.log(recipesss)

  return (
    <div className="p-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Feed</h2>

        {recipesss.length === 0 ? (
          <p className="text-center text-gray-600">
            No recipes found from you or those you follow.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipesss.map((recipe) => {
              const isOwn = String(recipe.userId?._id) === String(userId); // Check if it's the user's own recipe
              const commonProps = {
                username: recipe.userId?.name || 'Unknown',
                avatar: recipe.userId?.avatar || 'https://www.gravatar.com/avatar/?d=mp',
                time: new Date(recipe.createdAt).toLocaleString(),
                images: recipe.images?.map((img) => img.imageurl) || [],
                description: recipe.description || '',
                caption: recipe.caption || '',
                recipeId: recipe._id,
                onView: () => handleView(recipe._id),
                // onSaveToggle: () => handleSaveToggle(recipe._id),
                // isSaved: recipe.isSaved || false,
              };

              return isOwn ? (
                <Reciepecard key={recipe._id} {...commonProps} onDelete={() => handleDelete(recipe._id)} />
              ) : (
                <Reciepecardforother key={recipe._id} {...commonProps} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meandfollower;







