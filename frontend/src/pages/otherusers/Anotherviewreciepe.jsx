
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RECIEPE_BACKEND_URL } from '../../utils/Paths';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Anotherviewreciepe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showSaves, setShowSaves] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [currentReplyTo, setCurrentReplyTo] = useState(null);
  const [savedCount, setSavedCount] = useState(0);
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${RECIEPE_BACKEND_URL}/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setRecipe(response.data.recipe);
          console.log(response.data.recipe)
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSavedCount = async () => {
      try {
        const countRes = await axios.get(`${RECIEPE_BACKEND_URL}/howmanysavedrecipes/${id}`, {
          withCredentials: true,
        });

        if (countRes.data.success) {
          setSavedCount(countRes.data.savedbyusercount);
          setSavedUsers(countRes.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    fetchSavedCount();
  }, [id]);

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
        setRecipe(prevState => ({
          ...prevState,
          comments: [...prevState.comments, newComment]
        }));
        setComment('');
        window.location.reload();
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
        window.location.reload();
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
    <div className="max-w-7xl mx-auto px-6 sm:px-6 py-10 relative">
      {/* Saved By Dropdown Toggle & Count */}
      <div className="absolute top-6 right-6 text-right z-20">
        <button
          onClick={() => setShowSaves((prev) => !prev)}
          className="text-blue-600 text-sm underline mb-2 block"
        >
          {showSaves ? 'Hide' : 'Show'} who saved
        </button>

        <div className="text-gray-700 text-sm font-semibold">
          {savedCount > 0
            ? `${savedCount} member${savedCount > 1 ? 's' : ''} saved this`
            : 'No saves yet'}
        </div>

        {showSaves && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-30">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Saved by:</h4>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {Array.isArray(savedUsers) && savedUsers.length > 0 ? (
                savedUsers.map((user) => (
                  <li key={user._id} className="flex items-center gap-3">
                    <img
                      src={user?.avatar || null}
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

      {/* Recipe Header */}
      <div className="pt-16">
        <h1 className="text-6xl font-extrabold text-rose-600 mb-4">Recipe Details</h1>
        <hr className="border-rose-300 mb-6" />
        <h2 className="text-4xl font-extrabold text-rose-600 mb-4">{recipe.title}</h2>
        <p className="text-gray-500 mb-6">{recipe.description}</p>
      </div>

      {/* Carousel and User Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-10">
        {/* Carousel */}
        <div className="md:col-span-2">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            className="rounded-lg overflow-hidden"
          >
            {recipe.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img.imageurl}
                  alt={`Slide ${index}`}
                  className="h-[400px] object-cover w-full"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* User Info */}
        <div className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center">
          {recipe.userId?.avatar ? (
            <img
              src={recipe.userId.avatar}
              alt={recipe.userId.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
          )}
          <h4 className="text-lg font-semibold text-gray-800">
            {recipe.userId?.name || "Anonymous"}
          </h4>
          <p className="text-sm text-gray-500 mt-1">Posted this recipe</p>
        </div>
      </div>

      {/* Ingredients */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ingredients</h3>
      <p className="list-disc pl-5 space-y-2 mb-6">{recipe.ingreidients}</p>

      {/* Steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Steps</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Comments</h3>
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-lg"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Comment
          </button>
        </div>

        {recipe.comments && recipe.comments.length > 0 ? (
          recipe.comments.map((commentData) => (
            <div key={commentData._id} className="border-t pt-4 mb-4">
              <div className="flex items-center gap-3">
                {commentData.userId ? (
                  <>
                    <img
                      src={commentData.userId.avatar || null}
                      alt={commentData.userId.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-gray-800">{commentData.userId.name}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Anonymous</span>
                )}
              </div>
              <p className="text-gray-700 mt-2">{commentData.text}</p>

              {commentData.replies && commentData.replies.length > 0 && (
                <div className="ml-6 mt-2">
                  {commentData.replies.map((reply) => (
                    <div key={reply._id} className="flex items-center gap-3 mb-2">
                      {reply.userId ? (
                        <>
                          <img
                            src={reply.userId.avatar || null}
                            alt={reply.userId.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-gray-600">{reply.userId.name} replied:</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Anonymous</span>
                      )}
                      <p className="text-gray-700 ml-2">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {currentReplyTo === commentData._id && (
                <div className="mt-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-2 border rounded-lg"
                  />
                  <button
                    onClick={() => handleReplySubmit(commentData._id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Reply
                  </button>
                </div>
              )}

              <button
                onClick={() => handleReplyToComment(commentData._id)}
                className="mt-2 text-blue-500"
              >
                Reply
              </button>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Anotherviewreciepe;


