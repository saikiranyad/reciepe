// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from '../components/Reciepecard';
// import Reciepecardforother from '../components/Reciepecardforother';

// const Meandfollower = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await axios.get(`${USER_BACKEND_URL}/followingreciepes`, {
//           withCredentials: true
//         });

//         setRecipes(res.data.user_recipes);

//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?._id) setUserId(user._id);
//       } catch (err) {
//         console.error('Failed to fetch recipes:', err);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleView = (id) => {
//     console.log("View post", id);
//     navigate(`/recipedata/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${RECIEPE_BACKEND_URL}/recipes/${id}`, {
       
//           withCredentials: true,
//       });
//       setRecipes(recipes.filter(r => r._id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleSaveToggle = async (id) => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
//         withCredentials: true,
//       });

//       setRecipes(prev =>
//         prev.map(r => r._id === id ? { ...r, isSaved: !r.isSaved } : r)
//       );
//     } catch (err) {
//       console.error('Save toggle failed:', err);
//     }
//   };

  
//     return (
//         <div className='p-6 px-4'>
//           <div className='max-w-7xl mx-auto'>
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Feed</h2>
      
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {recipes.map(recipe => {
//                 const isOwn = recipe.userId._id === userId;
//                 const commonProps = {
//                   username: recipe.userId.name,
//                   avatar: recipe.userId.avatar,
//                   time: new Date(recipe.createdAt).toLocaleString(),
//                   images: recipe.images.map(img => img.imageurl),
//                   description: recipe.description,
//                   caption: recipe.caption,
//                   recipeId: recipe._id,
//                   onView: () => handleView(recipe._id),
//                 };
      
//                 return isOwn ? (
//                   <Reciepecard
//                     key={recipe._id}
//                     {...commonProps}
//                     onDelete={() => handleDelete(recipe._id)}
//                     onSaveToggle={() => handleSaveToggle(recipe._id)}
//                     isSaved={recipe.isSaved}
//                   />
//                 ) : (
//                   <Reciepecardforother
//                     key={recipe._id}
//                     {...commonProps}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       );
      
    
  
// };

// export default Meandfollower;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { RECIEPE_BACKEND_URL, USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from '../components/Reciepecard';
// import Reciepecardforother from '../components/Reciepecardforother';
// import { useNavigate } from 'react-router-dom';

// const Meandfollower = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await axios.get(`${USER_BACKEND_URL}/followingreciepes`, {
//           withCredentials: true,
//         });

//         setRecipes(res.data.user_recipes);

//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?._id) setUserId(user._id);
//       } catch (err) {
//         console.error('Failed to fetch recipes:', err);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleView = (id) => {
//     navigate(`/recipedata/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${RECIEPE_BACKEND_URL}/recipes/${id}`, {
//         withCredentials: true,
//       });
//       setRecipes(recipes.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleSaveToggle = async (id) => {
//     try {
//       const res = await axios.post(
//         `${USER_BACKEND_URL}/savedrecipe`,
//         { recipeId: id },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setRecipes((prev) =>
//           prev.map((recipe) =>
//             recipe._id === id ? { ...recipe, isSaved: !recipe.isSaved } : recipe
//           )
          
//         );
//         console.log(res.data)
//       }
//     } catch (err) {
//       console.error('Save toggle failed:', err);
//     }
//   };

//   return (
//     <div className="p-6 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Your Feed
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {recipes.map((recipe) => {
//             const isOwn = recipe.userId._id === userId;
//             const commonProps = {
//               username: recipe.userId.name,
//               avatar: recipe.userId.avatar,
//               time: new Date(recipe.createdAt).toLocaleString(),
//               images: recipe.images.map((img) => img.imageurl),
//               description: recipe.description,
//               caption: recipe.caption,
//               recipeId: recipe._id,
//               onView: () => handleView(recipe._id),
//               onSaveToggle: () => handleSaveToggle(recipe._id),
//               isSaved: recipe.isSaved,
//             };

//             return isOwn ? (
//               <Reciepecard
//                 key={recipe._id}
//                 {...commonProps}
//                 onDelete={() => handleDelete(recipe._id)}
//               />
//             ) : (
//               <Reciepecardforother key={recipe._id} {...commonProps} />
//             );
//           })}
//         </div>
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
  const [recipes, setRecipes] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?._id) setUserId(user._id);

        // Get recipes from followed users
        const recipesRes = await axios.get(`${USER_BACKEND_URL}/followingreciepes`, {
          withCredentials: true,
        });

        // Get saved recipes (IDs only)
        const savedRes = await axios.get(`${USER_BACKEND_URL}/fetchsaverecieps`, {
          withCredentials: true,
        });

        // console.log(recipesRes.data)
        // console.log(savedRes.data)
        const savedRecipeIds = savedRes.data.savedrecipes.map((r) => r._id);

        // Annotate recipes with isSaved flag
        const updatedRecipes = recipesRes.data.user_recipes.map((recipe) => ({
          ...recipe,
          isSaved: savedRecipeIds.includes(recipe._id),
        }));

        setRecipes(updatedRecipes);
        setSavedIds(savedRecipeIds);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  const handleView = (id) => {
    navigate(`/recipedata/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${RECIEPE_BACKEND_URL}/recipes/${id}`, {
        withCredentials: true,
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSaveToggle = async (id) => {
    try {
      const isCurrentlySaved = savedIds.includes(id);

      const res = isCurrentlySaved
        ? await axios.delete(`${USER_BACKEND_URL}/unsavedrecipe`, {
            data: { recipeId: id },
            withCredentials: true,
          })
        : await axios.post(
            `${USER_BACKEND_URL}/savedrecipe`,
            { recipeId: id },
            { withCredentials: true }
          );

      if (res.data.success) {
        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe._id === id ? { ...recipe, isSaved: !isCurrentlySaved } : recipe
          )
        );

        setSavedIds((prev) =>
          isCurrentlySaved ? prev.filter((rid) => rid !== id) : [...prev, id]
        );
      }
    } catch (err) {
      console.error('Save toggle failed:', err);
    }
  };

  return (
    <div className="p-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Feed</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => {
            const isOwn = recipe.userId._id === userId;
            const commonProps = {
              username: recipe.userId.name,
              avatar: recipe.userId.avatar,
              time: new Date(recipe.createdAt).toLocaleString(),
              images: recipe.images.map((img) => img.imageurl),
              description: recipe.description,
              caption: recipe.caption,
              recipeId: recipe._id,
              onView: () => handleView(recipe._id),
              onSaveToggle: () => handleSaveToggle(recipe._id),
              isSaved: recipe.isSaved,
            };

            return isOwn ? (
              <Reciepecard
                key={recipe._id}
                {...commonProps}
                onDelete={() => handleDelete(recipe._id)}
              />
            ) : (
              <Reciepecardforother key={recipe._id} {...commonProps} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Meandfollower;



