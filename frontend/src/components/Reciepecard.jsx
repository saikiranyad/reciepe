import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MoreVertical, Bookmark } from 'lucide-react';

const Reciepecard = ({
  username,
  avatar,
  time,
  images = [],
  caption,
  description,
  recipeId, // Add this to your props
  onView,
  onDelete,
  onSaveToggle,
  isSaved
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg duration-300 relative">
      {/* Top-right controls: Save + More menu */}
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        {/* Save Icon */}
     <button
               onClick={onSaveToggle}
               className={`p-2 rounded-full shadow ${
                 isSaved ? 'bg-rose-100 hover:bg-rose-200' : 'bg-white hover:bg-gray-100'
               }`}
               title={isSaved ? 'Unsave' : 'Save'}
             >
               <Bookmark
                 size={18}
                 className={isSaved ? 'text-rose-500 fill-rose-500' : 'text-gray-700'}
               />
             </button>

        {/* Three-dot menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={20} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-30">
              <button
                onClick={() => onView(recipeId)}  // recipeId is now passed in as a prop
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-sm"
              >
                View Post
              </button>
              <button
                onClick={() => onDelete(recipeId)}  // recipeId is now passed in as a prop
                className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 text-sm"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Swiper Image Gallery */}
      <div className="h-52 w-full overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-full swiper-custom"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{caption}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>

        <div className="flex items-center mt-4">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{username}</p>
            <p className="text-xs text-gray-400">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reciepecard;
