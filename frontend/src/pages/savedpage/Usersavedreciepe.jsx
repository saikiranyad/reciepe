// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Reciepecard from '../../components/Reciepecard';
// import { useNavigate } from 'react-router-dom';
// import { USER_BACKEND_URL } from '../../utils/Paths';
// import Reciepecardforother from '../../components/Reciepecardforother';

// function Usersavedreciepe() {
//   const [recipes, setRecipes] = useState([]);
//   const navigate = useNavigate();

//   const fetchSavedRecipes = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
//         withCredentials: true
//       });

//       if (res.data.success) {
//         setRecipes(res.data.savedrecipes);
//         console.log(res.data.savedrecipes)
//       }
//     } catch (err) {
//       console.error("Failed to fetch saved recipes", err);
//     }
//   };

//   useEffect(() => {
//     fetchSavedRecipes();
//   }, []);

//   const handleView = (id) => {
//     navigate(`/recipedata/${id}`);
//   };
//   console.log(recipes)

//   return (
//     <div className="px-4 py-8">
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h2 className="text-4xl font-extrabold text-rose-600 mb-2">Saved Recipes</h2>
//       <p className="text-gray-500 mb-8">Your personal collection of bookmarked dishes</p>
//       <hr className="border-rose-300 mb-6" />
  
//       {recipes.length === 0 ? (
//         <p className="text-gray-500 text-center">No saved recipes found.</p>
//       ) : (
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {recipes.map((recipe) => (
//             <Reciepecardforother
//               key={recipe.savedReciepes._id}
//               username={recipe.name}
//               avatar={recipe.avatar || "/default-avatar.jpg"}
//               time={new Date(recipe.createdAt).toLocaleDateString()}
//               images={recipe.savedReciepes.images.map((image) => image.imageurl)}  
//               caption={recipe.caption}
//               description={recipe.savedReciepes.description}
//               recipeId={recipe.savedReciepes._id}
//               onView={handleView}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
  
//   );
// }

// export default Usersavedreciepe;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Reciepecardforother from '../../components/Reciepecardforother';
// import { useNavigate } from 'react-router-dom';
// import { USER_BACKEND_URL } from '../../utils/Paths';

// function Usersavedreciepe() {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSavedRecipes = async () => {
//       try {
//         const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
//           withCredentials: true,
//         });

//         if (res.data.success === true) {
//           setSavedRecipes(res.data.savedrecipes || []);  // Handle the case where savedrecipes may be undefined
//           console.log(res.data.savedrecipes);
//           setUserInfo({
//             name: res.data.name || 'Guest',  // Set fallback if user info is missing
//             avatar: res.data.avatar || "/default-avatar.jpg",  // Default avatar if missing
//           });
//         } else {
//           setSavedRecipes([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch saved recipes", err);
//         setSavedRecipes([]);
//       }
//     };

//     fetchSavedRecipes();
//   }, []);

//   const handleView = (id) => {
//     navigate(`/recipedata/${id}`);
//   };

//   return (
//     <div className="px-4 py-8">
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h2 className="text-4xl font-extrabold text-rose-600 mb-2">Saved Recipes</h2>
//         <p className="text-gray-500 mb-8">Your personal collection of bookmarked dishes</p>
//         <hr className="border-rose-300 mb-6" />

//         {savedRecipes.length === 0 ? (
//           <p className="text-gray-500 text-center">No saved recipes found.</p>
//         ) : (
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {savedRecipes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 username={userInfo?.name || 'Unknown User'}  // Handle missing user name
//                 avatar={userInfo?.avatar}  // Ensure avatar is provided
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images?.map((image) => image.imageurl) || []}  // Safely access image URLs
//                 caption={recipe.title || 'Untitled'}  // Default caption if missing
//                 description={recipe.description || 'No description available'}
//                 recipeId={recipe._id}
//                 onView={handleView}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Usersavedreciepe;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Reciepecardforother from '../../components/Reciepecardforother';
// import { useNavigate } from 'react-router-dom';
// import { USER_BACKEND_URL } from '../../utils/Paths';

// function Usersavedreciepe() {
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSavedRecipes = async () => {
//       try {
//         const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
//           withCredentials: true,
//         });

//         if (res.data.success === true) {
//           setSavedRecipes(res.data.savedrecipes || []);
//           setUserInfo({
//             name: res.data.name || 'Guest',
//             avatar: res.data.avatar || '/default-avatar.jpg',
//           });
//           console.log(res.data)
//         } else {
//           setSavedRecipes([]);
//         }
//       } catch (err) {
//         console.error('Failed to fetch saved recipes', err);
//         setSavedRecipes([]);
//       }
//     };

//     fetchSavedRecipes();
//   }, []);
  

//   const handleView = (id) => {
//     navigate(`/recipedata/${id}`);
//   };

//   const handleSaveToggle = async (recipeId) => {
//     try {
//       const res = await axios.post(
//         `${USER_BACKEND_URL}/savedrecipe`,
//         { recipeId },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         // Remove recipe from saved list if unsaved
//         setSavedRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
//       }
//     } catch (err) {
//       console.error('Error toggling save state', err);
//     }
//   };

//   return (
//     <div className="px-4 py-8">
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h2 className="text-4xl font-extrabold text-rose-600 mb-2">Saved Recipes</h2>
//         <p className="text-gray-500 mb-8">Your personal collection of bookmarked dishes</p>
//         <hr className="border-rose-300 mb-6" />

//         {savedRecipes.length === 0 ? (
//           <p className="text-gray-500 text-center">No saved recipes found.</p>
//         ) : (
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {savedRecipes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 username={userInfo?.name || 'Unknown User'}
//                 avatar={userInfo?.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images?.map((image) => image.imageurl) || []}
//                 caption={recipe.title || 'Untitled'}
//                 description={recipe.description || 'No description available'}
//                 recipeId={recipe._id}
//                 onView={handleView}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Usersavedreciepe;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Reciepecardforother from '../../components/Reciepecardforother';
import { useNavigate } from 'react-router-dom';
import { USER_BACKEND_URL } from '../../utils/Paths';

function Usersavedreciepe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
          withCredentials: true,
        });

        if (res.data.success === true) {
          setSavedRecipes(res.data.savedrecipes || []);
          
        } else {
          setSavedRecipes([]);
        }
      } catch (err) {
        console.error('Failed to fetch saved recipes', err);
        setSavedRecipes([]);
      }
    };

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
        // Remove recipe from saved list if unsaved
        setSavedRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      }
    } catch (err) {
      console.error('Error toggling save state', err);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold text-rose-600 mb-2">Saved Recipes</h2>
        <p className="text-gray-500 mb-8">Your personal collection of bookmarked dishes</p>
        <hr className="border-rose-300 mb-6" />

        {savedRecipes.length === 0 ? (
          <p className="text-gray-500 text-center">No saved recipes found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {savedRecipes.map((recipe) => (
              <Reciepecardforother
                key={recipe._id}
                username={recipe.userId?.name || 'Unknown User'}
                avatar={recipe.userId?.avatar || '/default-avatar.jpg'}
                time={new Date(recipe.createdAt).toLocaleDateString()}
                images={recipe.images?.map((image) => image.imageurl) || []}
                caption={recipe.title || 'Untitled'}
                description={recipe.description || 'No description available'}
                recipeId={recipe._id}
                onView={handleView}
                isSaved={true}
                onSaveToggle={() => handleSaveToggle(recipe._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Usersavedreciepe;


