




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from './Reciepecard';
// import Reciepecardforother from './Reciepecardforother';
// import { useNavigate } from 'react-router-dom';

// const ProfileInfo = () => {
//   const [activeTab, setActiveTab] = useState('posts');
//   const [modalType, setModalType] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestedUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setSuggestedUsers(res.data.suggestionusers);
//       }
//     } catch (err) {
//       console.error('Error fetching suggested users:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       fetchSuggestedUsers();
//     }
//   }, [userData]);

//   const closeModal = () => setModalType(null);

//   const handleFollow = async (targetUserId) => {
//     try {
//       await axios.post(
//         `${USER_BACKEND_URL}/followandunfollow`,
//         { targetuserid: targetUserId },
//         { withCredentials: true }
//       );
//       fetchUserData();
//     } catch (err) {
//       console.error('Error in follow/unfollow:', err.response?.data || err.message);
//     }
//   };

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
//         fetchUserData(); // Refresh savedReciepes
//       }
//     } catch (err) {
//       console.error('Error saving/unsaving recipe:', err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         {/* Header */}
//         <div className="flex items-center space-x-6 mb-3">
//           <div className="relative w-32 h-32">
//             <img
//               src={userData?.avatar || 'https://via.placeholder.com/100'}
//               alt="avatar"
//               className="w-full h-full object-cover rounded-full border-4 border-rose-900"
//             />
//             {/* <img
//               src="https://png.pngtree.com/png-vector/20240911/ourlarge/pngtree-chef-hat-transparent-png-image_13816394.png" // <-- put your chef hat image in public/images/
//               alt="chef hat"
//               className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-16"
//             /> */}
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
//             <div className="flex space-x-6 mt-2">
//               <span><strong>{userData.reciepes.length}</strong> posts</span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('followers')}>
//                 <strong>{userData.followers.length}</strong> followers
//               </span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('following')}>
//                 <strong>{userData.following.length}</strong> following
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* User Description */}
//         <p className="text-sm text-gray-600 mb-4 max-w-xl">
//           {userData.description || 'No description provided.'}
//         </p>

//         {/* Tabs */}
//         <div className="flex justify-around border-t border-b py-2 mb-4 text-gray-700">
//           <button
//             onClick={() => setActiveTab('posts')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'posts' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Posts
//           </button>
//           <button
//             onClick={() => setActiveTab('saved')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'saved' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Saved
//           </button>
//         </div>

//         {/* Recipe Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeTab === 'posts' &&
//             userData.reciepes.map((recipe) => (
//               <Reciepecard
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={userData.name}
//                 avatar={userData.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 isSaved={userData.savedReciepes.some(saved => saved._id === recipe._id)}
//                 onView={() => handleView(recipe._id)}
//                 onDelete={() => console.log('Delete logic here')}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}

//           {activeTab === 'saved' &&
//             userData.savedReciepes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={recipe.userId.name}
//                 avatar={recipe.userId.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 onView={() => handleView(recipe._id)}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="w-full lg:w-72 hidden lg:block">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <ul className="space-y-3">
//               {suggestedUsers.map((user) => (
//                 <li key={user._id} className="flex items-center justify-between space-x-3">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={user.avatar}
//                       alt="user"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <span className="text-sm">{user.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="px-2 py-1 text-xs text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Followers/Following Modal */}
//       {modalType && (
//         <div className="fixed inset-0 bg-rose-100/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-4 shadow-lg relative">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3 capitalize">{modalType}</h3>
//             <ul className="space-y-2 max-h-60 overflow-y-auto">
//               {(modalType === 'followers' ? userData.followers : userData.following)?.map((user, i) => {
//                 const isFollowing = userData.following.some(f => f._id === user._id);
//                 const buttonLabel = modalType === 'followers'
//                   ? (isFollowing ? 'Unfollow' : 'Follow Back')
//                   : 'Unfollow';

//                 return (
//                   <li key={i} className="flex items-center justify-between space-x-3">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={user.avatar}
//                         alt="user"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span>{user.name}</span>
//                     </div>
//                     <button
//                       onClick={() => handleFollow(user._id)}
//                       className="px-3 py-1 text-sm text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                     >
//                       {buttonLabel}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-gray-500 hover:text-rose-900 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileInfo;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from './Reciepecard';
// import Reciepecardforother from './Reciepecardforother';
// import { useNavigate } from 'react-router-dom';

// const ProfileInfo = () => {
//   const [activeTab, setActiveTab] = useState('posts');
//   const [modalType, setModalType] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestedUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setSuggestedUsers(res.data.suggestionusers);
//       }
//     } catch (err) {
//       console.error('Error fetching suggested users:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       fetchSuggestedUsers();
//     }
//   }, [userData]);

//   const closeModal = () => setModalType(null);

//   const handleFollow = async (targetUserId) => {
//     try {
//       await axios.post(
//         `${USER_BACKEND_URL}/followandunfollow`,
//         { targetuserid: targetUserId },
//         { withCredentials: true }
//       );
//       fetchUserData();
//     } catch (err) {
//       console.error('Error in follow/unfollow:', err.response?.data || err.message);
//     }
//   };

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
//         fetchUserData();
//       }
//     } catch (err) {
//       console.error('Error saving/unsaving recipe:', err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         {/* Header */}
//         <div className="flex items-center space-x-6 mb-3">
//           <div className="relative w-32 h-32">
//             <img
//               src={userData?.avatar || 'https://via.placeholder.com/100'}
//               alt="avatar"
//               className="w-full h-full object-cover rounded-full border-4 border-rose-900"
//             />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
//             <div className="flex space-x-6 mt-2">
//               <span><strong>{userData.reciepes.length}</strong> posts</span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('followers')}>
//                 <strong>{userData.followers.length}</strong> followers
//               </span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('following')}>
//                 <strong>{userData.following.length}</strong> following
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-600 mb-4 max-w-xl">
//           {userData.description || 'No description provided.'}
//         </p>

//         {/* Mobile Suggested Users Carousel */}
//         <div className="lg:hidden mb-4">
//           {suggestedUsers.length > 0 && (
//             <div className="overflow-x-auto whitespace-nowrap px-1 py-2">
//               <h3 className="text-sm text-rose-900 font-semibold px-2 mb-2">Suggested for you</h3>
//               <div className="flex space-x-4">
//                 {suggestedUsers.map((user) => (
//                   <div key={user._id} className="flex flex-col items-center w-20">
//                     <div className="relative">
//                       <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="w-14 h-14 rounded-full border-2 border-rose-600"
//                       />
//                     </div>
//                     <span className="text-xs text-center mt-1 truncate">{user.name}</span>
//                     <button
//                       onClick={() => handleFollow(user._id)}
//                       className="text-[10px] text-white bg-rose-500 px-2 py-0.5 rounded-full mt-1 hover:bg-rose-600"
//                     >
//                       Follow
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-around border-t border-b py-2 mb-4 text-gray-700">
//           <button
//             onClick={() => setActiveTab('posts')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'posts' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Posts
//           </button>
//           <button
//             onClick={() => setActiveTab('saved')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'saved' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Saved
//           </button>
//         </div>

//         {/* Recipe Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeTab === 'posts' &&
//             userData.reciepes.map((recipe) => (
//               <Reciepecard
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={userData.name}
//                 avatar={userData.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 isSaved={userData.savedReciepes.some(saved => saved._id === recipe._id)}
//                 onView={() => handleView(recipe._id)}
//                 onDelete={() => console.log('Delete logic here')}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}

//           {activeTab === 'saved' &&
//             userData.savedReciepes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={recipe.userId.name}
//                 avatar={recipe.userId.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 onView={() => handleView(recipe._id)}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Desktop Suggested Users */}
//       <div className="w-full lg:w-72 hidden lg:block">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <ul className="space-y-3">
//               {suggestedUsers.map((user) => (
//                 <li key={user._id} className="flex items-center justify-between space-x-3">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={user.avatar}
//                       alt="user"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <span className="text-sm">{user.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="px-2 py-1 text-xs text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Followers/Following Modal */}
//       {modalType && (
//         <div className="fixed inset-0 bg-rose-100/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-4 shadow-lg relative">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3 capitalize">{modalType}</h3>
//             <ul className="space-y-2 max-h-60 overflow-y-auto">
//               {(modalType === 'followers' ? userData.followers : userData.following)?.map((user, i) => {
//                 const isFollowing = userData.following.some(f => f._id === user._id);
//                 const buttonLabel = modalType === 'followers'
//                   ? (isFollowing ? 'Unfollow' : 'Follow Back')
//                   : 'Unfollow';

//                 return (
//                   <li key={i} className="flex items-center justify-between space-x-3">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={user.avatar}
//                         alt="user"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span>{user.name}</span>
//                     </div>
//                     <button
//                       onClick={() => handleFollow(user._id)}
//                       className="px-3 py-1 text-sm text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                     >
//                       {buttonLabel}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-gray-500 hover:text-rose-900 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileInfo;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { USER_BACKEND_URL } from '../utils/Paths';
// import Reciepecard from './Reciepecard';
// import Reciepecardforother from './Reciepecardforother';
// import { useNavigate } from 'react-router-dom';

// const ProfileInfo = () => {
//   const [activeTab, setActiveTab] = useState('posts');
//   const [modalType, setModalType] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestedUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setSuggestedUsers(res.data.suggestionusers);
//       }
//     } catch (err) {
//       console.error('Error fetching suggested users:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       fetchSuggestedUsers();
//     }
//   }, [userData]);

//   const closeModal = () => setModalType(null);

//   const handleFollow = async (targetUserId) => {
//     try {
//       await axios.post(
//         `${USER_BACKEND_URL}/followandunfollow`,
//         { targetuserid: targetUserId },
//         { withCredentials: true }
//       );
//       fetchUserData();
//     } catch (err) {
//       console.error('Error in follow/unfollow:', err.response?.data || err.message);
//     }
//   };

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
//         fetchUserData(); // Refresh savedReciepes
//       }
//     } catch (err) {
//       console.error('Error saving/unsaving recipe:', err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         {/* Header */}
//         <div className="flex items-center space-x-6 mb-3">
//           <div className="relative w-32 h-32">
//             <img
//               src={userData?.avatar || 'https://via.placeholder.com/100'}
//               alt="avatar"
//               className="w-full h-full object-cover rounded-full border-4 border-rose-900"
//             />
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
//             <div className="flex space-x-6 mt-2">
//               <span><strong>{userData.reciepes.length}</strong> posts</span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('followers')}>
//                 <strong>{userData.followers.length}</strong> followers
//               </span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType('following')}>
//                 <strong>{userData.following.length}</strong> following
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* User Description */}
//         <p className="text-sm text-gray-600 mb-4 max-w-xl">
//           {userData.description || 'No description provided.'}
//         </p>

//         {/* Tabs */}
//         <div className="flex justify-around border-t border-b py-2 mb-4 text-gray-700">
//           <button
//             onClick={() => setActiveTab('posts')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'posts' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Posts
//           </button>
//           <button
//             onClick={() => setActiveTab('saved')}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === 'saved' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
//           >
//             Saved
//           </button>
//         </div>

//         {/* Recipe Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeTab === 'posts' &&
//             userData.reciepes.map((recipe) => (
//               <Reciepecard
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={userData.name}
//                 avatar={userData.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 isSaved={userData.savedReciepes.some(saved => saved._id === recipe._id)}
//                 onView={() => handleView(recipe._id)}
//                 onDelete={() => console.log('Delete logic here')}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}

//           {activeTab === 'saved' &&
//             userData.savedReciepes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={recipe.userId.name}
//                 avatar={recipe.userId.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((image) => image.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 onView={() => handleView(recipe._id)}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Right Section (Suggested Users) */}
//       <div className="w-full lg:w-72 hidden lg:block">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <div className="flex overflow-x-auto space-x-4">
//               {suggestedUsers.map((user) => (
//                 <div key={user._id} className="flex flex-col items-center">
//                   <img
//                     src={user.avatar}
//                     alt="user"
//                     className="w-16 h-16 rounded-full"
//                   />
//                   <span className="text-sm">{user.name}</span>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="mt-2 px-3 py-1 text-xs text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile View (Carousel-style Suggested Users) */}
//       <div className="w-full lg:hidden mt-4">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <div className="flex overflow-x-auto space-x-4">
//               {suggestedUsers.map((user) => (
//                 <div key={user._id} className="flex flex-col items-center">
//                   <img
//                     src={user.avatar}
//                     alt="user"
//                     className="w-16 h-16 rounded-full"
//                   />
//                   <span className="text-sm">{user.name}</span>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="mt-2 px-3 py-1 text-xs text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Followers/Following Modal */}
//       {modalType && (
//         <div className="fixed inset-0 bg-rose-100/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-4 shadow-lg relative">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3 capitalize">{modalType}</h3>
//             <ul className="space-y-2 max-h-60 overflow-y-auto">
//               {(modalType === 'followers' ? userData.followers : userData.following)?.map((user, i) => {
//                 const isFollowing = userData.following.some(f => f._id === user._id);
//                 const buttonLabel = modalType === 'followers'
//                   ? (isFollowing ? 'Unfollow' : 'Follow Back')
//                   : 'Unfollow';

//                 return (
//                   <li key={i} className="flex items-center justify-between space-x-3">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={user.avatar}
//                         alt="user"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span>{user.name}</span>
//                     </div>
//                     <button
//                       onClick={() => handleFollow(user._id)}
//                       className="px-3 py-1 text-sm text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                     >
//                       {buttonLabel}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-gray-500 hover:text-rose-900 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileInfo;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { USER_BACKEND_URL } from "../utils/Paths";
// import Reciepecard from "./Reciepecard";
// import Reciepecardforother from "./Reciepecardforother";
// import { useNavigate } from "react-router-dom";

// const ProfileInfo = () => {
//   const [activeTab, setActiveTab] = useState("posts");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestedUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setSuggestedUsers(res.data.suggestionusers);
//       }
//     } catch (err) {
//       console.error("Error fetching suggested users:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       fetchSuggestedUsers();
//     }
//   }, [userData]);

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
//         fetchUserData(); // Refresh saved recipes
//       }
//     } catch (err) {
//       console.error("Error saving/unsaving recipe:", err.message);
//     }
//   };

//   if (loading) return <div className="text-center py-6">Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         {/* Profile Header */}
//         <div className="flex items-center space-x-6 mb-4">
//           <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-rose-700">
//             <img
//               src={userData?.avatar || "https://via.placeholder.com/100"}
//               alt="avatar"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
//             <div className="flex space-x-6 mt-2 text-sm">
//               <span>{userData.reciepes.length} posts</span>
//               <span>{userData.followers.length} followers</span>
//               <span>{userData.following.length} following</span>
//             </div>
//           </div>
//         </div>

//         {/* User Description */}
//         <p className="text-sm text-gray-700 mb-4">{userData.description || "No description provided."}</p>

//         {/* Tabs */}
//         <div className="flex justify-center space-x-4 border-b border-gray-300 mb-4">
//           <button
//             onClick={() => setActiveTab("posts")}
//             className={`pb-2 text-sm font-semibold ${
//               activeTab === "posts" ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-500"
//             }`}
//           >
//             Posts
//           </button>
//           <button
//             onClick={() => setActiveTab("saved")}
//             className={`pb-2 text-sm font-semibold ${
//               activeTab === "saved" ? "border-b-2 border-rose-600 text-rose-600" : "text-gray-500"
//             }`}
//           >
//             Saved
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeTab === "posts" &&
//             userData.reciepes.map((recipe) => (
//               <Reciepecard
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={userData.name}
//                 avatar={userData.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((img) => img.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 isSaved={userData.savedReciepes.some((saved) => saved._id === recipe._id)}
//                 onView={() => handleView(recipe._id)}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}

//           {activeTab === "saved" &&
//             userData.savedReciepes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={recipe.userId.name}
//                 avatar={recipe.userId.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((img) => img.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 onView={() => handleView(recipe._id)}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Right Section (Suggestions) */}
//       <div className="w-full lg:w-72 hidden lg:block">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <ul className="space-y-3">
//               {suggestedUsers.map((user) => (
//                 <li key={user._id} className="flex items-center justify-between space-x-3">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={user.avatar}
//                       alt="user"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <span className="text-sm">{user.name}</span>
//                   </div>
//                   <button
//                     className="px-3 py-1 text-xs text-white bg-rose-600 rounded-full hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { USER_BACKEND_URL } from "../utils/Paths";
// import Reciepecard from "./Reciepecard";
// import Reciepecardforother from "./Reciepecardforother";
// import { useNavigate } from "react-router-dom";

// const ProfileInfo = () => {
//   const [activeTab, setActiveTab] = useState("posts");
//   const [modalType, setModalType] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [suggestedUsers, setSuggestedUsers] = useState([]);
//   const navigate = useNavigate();

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setUserData(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestedUsers = async () => {
//     try {
//       const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setSuggestedUsers(res.data.suggestionusers);
//       }
//     } catch (err) {
//       console.error("Error fetching suggested users:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       fetchSuggestedUsers();
//     }
//   }, [userData]);

//   const closeModal = () => setModalType(null);

//   const handleFollow = async (targetUserId) => {
//     try {
//       await axios.post(
//         `${USER_BACKEND_URL}/followandunfollow`,
//         { targetuserid: targetUserId },
//         { withCredentials: true }
//       );
//       fetchUserData();
//     } catch (err) {
//       console.error("Error in follow/unfollow:", err.response?.data || err.message);
//     }
//   };

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
//         fetchUserData();
//       }
//     } catch (err) {
//       console.error("Error saving/unsaving recipe:", err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
//       {/* Left Section */}
//       <div className="flex-1">
//         {/* Header */}
//         <div className="flex items-center space-x-6 mb-3">
//           <div className="relative w-32 h-32">
//             <img
//               src={userData?.avatar || "https://via.placeholder.com/100"}
//               alt="avatar"
//               className="w-full h-full object-cover rounded-full border-4 border-rose-900"
//             />
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
//             <div className="flex space-x-6 mt-2">
//               <span><strong>{userData.reciepes.length}</strong> posts</span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType("followers")}>
//                 <strong>{userData.followers.length}</strong> followers
//               </span>
//               <span className="cursor-pointer hover:underline" onClick={() => setModalType("following")}>
//                 <strong>{userData.following.length}</strong> following
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-600 mb-4 max-w-xl">
//           {userData.description || "No description provided."}
//         </p>

//         {/* Tabs */}
//         <div className="flex justify-around border-t border-b py-2 mb-4 text-gray-700">
//           <button
//             onClick={() => setActiveTab("posts")}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === "posts" ? "text-rose-900 border-b-2 border-rose-900" : ""}`}
//           >
//             Posts
//           </button>
//           <button
//             onClick={() => setActiveTab("saved")}
//             className={`flex-1 text-center py-2 font-semibold ${activeTab === "saved" ? "text-rose-900 border-b-2 border-rose-900" : ""}`}
//           >
//             Saved
//           </button>
//         </div>

//         {/* Suggested Users - MOBILE SLIDER */}
//         {suggestedUsers.length > 0 && (
//           <div className="mb-6 lg:hidden">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3 px-1">Suggested for you</h3>
//             <div className="flex gap-4 overflow-x-auto px-1">
//               {suggestedUsers.map((user) => (
//                 <div
//                   key={user._id}
//                   className="min-w-[140px] bg-white shadow rounded-lg p-3 flex-shrink-0 flex flex-col items-center"
//                 >
//                   <img
//                     src={user.avatar}
//                     alt="user"
//                     className="w-14 h-14 rounded-full mb-2 object-cover"
//                   />
//                   <span className="text-sm font-medium mb-1">{user.name}</span>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="text-xs px-3 py-1 rounded-full bg-rose-600 text-white hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Recipe Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeTab === "posts" &&
//             userData.reciepes.map((recipe) => (
//               <Reciepecard
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={userData.name}
//                 avatar={userData.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((img) => img.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 isSaved={userData.savedReciepes.some((r) => r._id === recipe._id)}
//                 onView={() => handleView(recipe._id)}
//                 onDelete={() => {}}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}

//           {activeTab === "saved" &&
//             userData.savedReciepes.map((recipe) => (
//               <Reciepecardforother
//                 key={recipe._id}
//                 recipeId={recipe._id}
//                 username={recipe.userId.name}
//                 avatar={recipe.userId.avatar}
//                 time={new Date(recipe.createdAt).toLocaleDateString()}
//                 images={recipe.images.map((img) => img.imageurl)}
//                 caption={recipe.caption}
//                 description={recipe.description}
//                 onView={() => handleView(recipe._id)}
//                 isSaved={true}
//                 onSaveToggle={() => handleSaveToggle(recipe._id)}
//               />
//             ))}
//         </div>
//       </div>

//       {/* Suggested Users - DESKTOP RIGHT SIDEBAR */}
//       <div className="w-full lg:w-72 hidden lg:block">
//         {suggestedUsers.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
//             <ul className="space-y-3">
//               {suggestedUsers.map((user) => (
//                 <li key={user._id} className="flex items-center justify-between space-x-3">
//                   <div className="flex items-center space-x-3">
//                     <img
//                       src={user.avatar}
//                       alt="user"
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <span className="text-sm">{user.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleFollow(user._id)}
//                     className="px-2 py-1 text-xs text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modalType && (
//         <div className="fixed inset-0 bg-rose-100/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-4 shadow-lg relative">
//             <h3 className="text-lg font-semibold text-rose-900 mb-3 capitalize">{modalType}</h3>
//             <ul className="space-y-2 max-h-60 overflow-y-auto">
//               {(modalType === "followers" ? userData.followers : userData.following)?.map((user, i) => {
//                 const isFollowing = userData.following.some(f => f._id === user._id);
//                 const buttonLabel = modalType === "followers"
//                   ? (isFollowing ? "Unfollow" : "Follow Back")
//                   : "Unfollow";

//                 return (
//                   <li key={i} className="flex items-center justify-between space-x-3">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={user.avatar}
//                         alt="user"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <span>{user.name}</span>
//                     </div>
//                     <button
//                       onClick={() => handleFollow(user._id)}
//                       className="px-3 py-1 text-sm text-white rounded-full bg-rose-600 hover:bg-rose-700"
//                     >
//                       {buttonLabel}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-gray-500 hover:text-rose-900 text-2xl"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileInfo;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_BACKEND_URL } from '../utils/Paths';
import Reciepecard from './Reciepecard';
import Reciepecardforother from './Reciepecardforother';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [modalType, setModalType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${USER_BACKEND_URL}/getuserdata`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const res = await axios.get(`${USER_BACKEND_URL}/suggest`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setSuggestedUsers(res.data.suggestionusers);
      }
    } catch (err) {
      console.error('Error fetching suggested users:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchSuggestedUsers();
    }
  }, [userData]);

  const closeModal = () => setModalType(null);

  const handleFollow = async (targetUserId) => {
    try {
      await axios.post(
        `${USER_BACKEND_URL}/followandunfollow`,
        { targetuserid: targetUserId },
        { withCredentials: true }
      );
      fetchUserData();
    } catch (err) {
      console.error('Error in follow/unfollow:', err.response?.data || err.message);
    }
  };

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
        fetchUserData();
      }
    } catch (err) {
      console.error('Error saving/unsaving recipe:', err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-10 flex flex-col lg:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-3">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={userData?.avatar || 'https://via.placeholder.com/100'}
              alt="avatar"
              className="w-full h-full object-cover rounded-full border-4 border-rose-900"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-rose-900">{userData?.name}</h2>
            <div className="flex space-x-6 mt-2 text-sm">
              <span><strong>{userData.reciepes.length}</strong> posts</span>
              <span className="cursor-pointer hover:underline" onClick={() => setModalType('followers')}>
                <strong>{userData.followers.length}</strong> followers
              </span>
              <span className="cursor-pointer hover:underline" onClick={() => setModalType('following')}>
                <strong>{userData.following.length}</strong> following
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 max-w-xl">
          {userData.description || 'No description provided.'}
        </p>
        <div className="lg:hidden mb-6">
          {suggestedUsers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {suggestedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex-shrink-0 w-28 text-center border rounded-lg p-2 shadow-sm bg-white"
                  >
                    <img
                      src={user.avatar}
                      alt="user"
                      className="w-12 h-12 mx-auto rounded-full mb-1"
                    />
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">Follow him</p>
                    <button
                      onClick={() => handleFollow(user._id)}
                      className="mt-1 px-3 py-1 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-full"
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="w-full overflow-x-auto mb-4 border-t border-b">
          <div className="flex w-full min-w-[300px]">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 text-center py-2 font-semibold ${activeTab === 'posts' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 text-center py-2 font-semibold ${activeTab === 'saved' ? 'text-rose-900 border-b-2 border-rose-900' : ''}`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {activeTab === 'posts' &&
            userData.reciepes.map((recipe) => (
              <Reciepecard
                key={recipe._id}
                recipeId={recipe._id}
                username={userData.name}
                avatar={userData.avatar}
                time={new Date(recipe.createdAt).toLocaleDateString()}
                images={recipe.images.map((image) => image.imageurl)}
                caption={recipe.caption}
                description={recipe.description}
                isSaved={userData.savedReciepes.some(saved => saved._id === recipe._id)}
                onView={() => handleView(recipe._id)}
                onDelete={() => console.log('Delete logic here')}
                onSaveToggle={() => handleSaveToggle(recipe._id)}
              />
            ))}

          {activeTab === 'saved' &&
            userData.savedReciepes.map((recipe) => (
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
                isSaved={true}
                onSaveToggle={() => handleSaveToggle(recipe._id)}
              />
            ))}
        </div>

        {/* Mobile View Suggested Users */}
        {/* <div className="lg:hidden mb-6">
          {suggestedUsers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {suggestedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex-shrink-0 w-28 text-center border rounded-lg p-2 shadow-sm bg-white"
                  >
                    <img
                      src={user.avatar}
                      alt="user"
                      className="w-12 h-12 mx-auto rounded-full mb-1"
                    />
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">Follow him</p>
                    <button
                      onClick={() => handleFollow(user._id)}
                      className="mt-1 px-3 py-1 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-full"
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> */}
      </div>

      {/* Desktop Suggested Users */}
      <div className="w-full lg:w-72 hidden lg:block">
        {suggestedUsers.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-rose-900 mb-3">Suggested for you</h3>
            <ul className="space-y-3">
              {suggestedUsers.map((user) => (
                <li key={user._id} className="flex items-center justify-between space-x-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">Follow him</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(user._id)}
                    className="px-3 py-1 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-full"
                  >
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-rose-100/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-80 p-4 shadow-lg relative">
            <h3 className="text-lg font-semibold text-rose-900 mb-3 capitalize">{modalType}</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {(modalType === 'followers' ? userData.followers : userData.following)?.map((user, i) => {
                const isFollowing = userData.following.some(f => f._id === user._id);
                const buttonLabel = modalType === 'followers'
                  ? (isFollowing ? 'Unfollow' : 'Follow Back')
                  : 'Unfollow';

                return (
                  <li key={i} className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt="user"
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{user.name}</span>
                    </div>
                    <button
                      onClick={() => handleFollow(user._id)}
                      className="px-3 py-1 text-sm text-white bg-rose-600 hover:bg-rose-700 rounded-full"
                    >
                      {buttonLabel}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-rose-900 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
















