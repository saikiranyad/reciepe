// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Edit, Trash, Users } from 'lucide-react';
// import { RECIEPE_BACKEND_URL } from '../../utils/Paths';
// import axios from 'axios';

// const ViewRecipe = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [showSaves, setShowSaves] = useState(false);
//   const [loading, setLoading] = useState(true);  // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.get(`${RECIEPE_BACKEND_URL}/${id}`, {
//           withCredentials: true,
//         });

//         if (response.data.success) {
//           setRecipe(response.data.recipe);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);  // Set loading to false once data is fetched
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center text-gray-400 text-lg mt-10">Loading recipe...</div>;
//   }

//   if (!recipe) {
//     return <div className="text-center text-red-500 text-lg mt-10">Error loading recipe. Please try again.</div>;
//   }

//   const handleUpdate = () => {
//     navigate(`/updaterecipe/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(`${RECIEPE_BACKEND_URL}/${id}`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         navigate('/card');
//       } else {
//         console.log(response.err.message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 relative">
//       {/* Saved By Badge */}
//       <div className="absolute top-10 right-10 z-10">
//         {/* Dropdown with saved users */}
//         {showSaves && (
//           <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-20">
//             <h4 className="text-sm font-semibold text-gray-700 mb-2">Saved by:</h4>
//             <ul className="space-y-2">
//               {Array.isArray(recipe.savedBy) &&
//                 recipe.savedBy.map((user) => (
//                   <li key={user.id} className="flex items-center gap-3">
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                     <span className="text-gray-800">{user.name}</span>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Title & Description */}
//       <h1 className="text-6xl font-extrabold text-rose-600 mb-4">Reciepe Details</h1>
//       <hr className="border-rose-300 mb-6" />
//       <h2 className="text-4xl font-extrabold text-rose-600 mb-4">{recipe.title}</h2>
//       <p className="text-gray-500 mb-6">{recipe.description}</p>

//       {/* Images */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {recipe.images.map((img, index) => (
//           <img
//             key={index}
//             src={img.imageurl}
//             alt={`Recipe ${index}`}
//             className="w-full h-64 object-cover rounded-lg"
//           />
//         ))}
//       </div>

//       {/* Ingredients */}
//       <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ingredients</h3>
//       <ul className="list-disc pl-5 space-y-2 mb-6">
//         {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
//           <li key={index} className="text-gray-700">{ingredient}</li>
//         ))}
//       </ul>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={handleUpdate}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
//         >
//           <Edit size={18} className="mr-2" />
//           Update Recipe
//         </button>
//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
//         >
//           <Trash size={18} className="mr-2" />
//           Delete Recipe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewRecipe;







import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RECIEPE_BACKEND_URL } from '../../utils/Paths';
import axios from 'axios';

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showSaves, setShowSaves] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [currentReplyTo, setCurrentReplyTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${RECIEPE_BACKEND_URL}/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setRecipe(response.data.recipe);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/updaterecipe/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${RECIEPE_BACKEND_URL}/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/card');
      } else {
        console.log(response.err.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `${RECIEPE_BACKEND_URL}/${id}/comment`,
        { commenttext: comment },
        { withCredentials: true }
      );
      if (response.data.success) {
        const newComment = response.data.newcomment;
        setRecipe(prev => ({
          ...prev,
          comments: [...prev.comments, newComment]
        }));
        setComment('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!reply.trim()) return;

    try {
      const response = await axios.post(
        `${RECIEPE_BACKEND_URL}/${id}/comment/reply`,
        { commentId, replytext: reply },
        { withCredentials: true }
      );
      if (response.data.success) {
        const updatedRecipe = { ...recipe };
        const commentToUpdate = updatedRecipe.comments.find(comment => comment._id === commentId);
        commentToUpdate.replies.push(
          response.data.comment.replies[commentToUpdate.replies.length]
        );
        setRecipe(updatedRecipe);
        setReply('');
        setCurrentReplyTo(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReplyToComment = (commentId) => {
    setCurrentReplyTo(commentId);
  };

  if (loading) {
    return <div className="text-center text-gray-400 text-lg mt-10">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="text-center text-red-500 text-lg mt-10">Error loading recipe. Please try again.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      {/* Saved By Dropdown */}
      <div className="absolute top-10 right-10 z-10">
        <button
          onClick={() => setShowSaves(prev => !prev)}
          className="text-blue-600 underline text-sm mb-2"
        >
          {showSaves ? 'Hide' : 'Show'} who saved
        </button>
        {showSaves && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-20">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Saved by:</h4>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {Array.isArray(recipe.savedBy) && recipe.savedBy.length > 0 ? (
                recipe.savedBy.map((user) => (
                  <li key={user._id} className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-800">{user.name}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">No users yet</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Title and Description */}
      <h1 className="text-6xl font-extrabold text-rose-600 mb-4">Recipe Details</h1>
      <hr className="border-rose-300 mb-6" />
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
      <p className="text-gray-600 mb-6">{recipe.description}</p>

      {/* Carousel Images */}
      <div className="mb-8">
        <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
          {recipe.images.map((img, idx) => (
            <div key={idx}>
              <img src={img.imageurl} alt={`Slide ${idx}`} className="h-[400px] object-cover rounded-lg" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Ingredients */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ingredients</h3>
      <ul className="list-disc pl-5 space-y-2 mb-6">
        {/* {recipe.ingreidients.map((ingredient, i) => (
          <li key={i} className="text-gray-700">{ingredient}</li>
        ))} */}
        {recipe.ingreidients}
      </ul>

      {/* Steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Steps</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Comments */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Comments</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6"
        >
          Submit Comment
        </button>

        {recipe.comments?.map((c) => (
          <div key={c._id} className="border-t pt-4 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={c.userId?.avatar || ''}
                alt={c.userId?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold">{c.userId?.name}</span>
            </div>
            <p className="text-gray-800 mb-2">{c.text}</p>

            {c.replies?.map((r) => (
              <div key={r._id} className="ml-8 mb-2">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={r.userId?.avatar || ''}
                    alt={r.userId?.name || 'User'}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-semibold">{r.userId?.name}</span>
                </div>
                <p className="text-gray-700 ml-8">{r.text}</p>
              </div>
            ))}

            {currentReplyTo === c._id && (
              <div className="ml-4 mt-2">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  onClick={() => handleReplySubmit(c._id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Reply
                </button>
              </div>
            )}
            <button
              onClick={() => handleReplyToComment(c._id)}
              className="text-blue-600 text-sm ml-1 mt-1"
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Edit size={18} className="mr-2" />
          Update Recipe
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
        >
          <Trash size={18} className="mr-2" />
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

export default ViewRecipe;
