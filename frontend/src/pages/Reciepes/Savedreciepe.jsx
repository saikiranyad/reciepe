import React from 'react';
import Reciepecard from '../../components/Reciepecard';

const Savedreciepe = () => {
  const savedRecipes = [
    {
      id: 1,
      username: 'chef_jenny',
      avatar: 'https://via.placeholder.com/40',
      time: '1h ago',
      image: 'https://via.placeholder.com/500x300',
      caption: 'Delicious sushi rolls 🍣',
    },
    {
      id: 2,
      username: 'foodie_mark',
      avatar: 'https://via.placeholder.com/40',
      time: '2h ago',
      image: 'https://via.placeholder.com/500x300',
      caption: 'Classic Italian pizza 🍕',
    },
  
  ];

  return (
    <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8 py-8 md:ml-78 ml-30">
      <h2 className="text-3xl font-bold text-rose-600 mb-6">Saved Recipes</h2>
      <hr className="border-rose-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {savedRecipes.map((recipe) => (
          <Reciepecard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default Savedreciepe;
