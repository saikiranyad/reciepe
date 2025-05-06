// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { NOTIFICATION_BACKEND_URL } from '../../utils/Paths';

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get(`${NOTIFICATION_BACKEND_URL}/notifications`, {
//           withCredentials:true
//         });
//         setNotifications(res.data.notifications);
//         console.log(res.data.notifications)
//       } catch (err) {
//         console.error("Error fetching notifications", err);
//       }
//     };

//     fetchNotifications();
//   }, []);
//   console.log(notifications)

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-4 rounded-xl shadow-xl bg-rose-50">
//       <h2 className="text-2xl font-bold text-rose-600 mb-4">Notifications</h2>
//       {notifications.length === 0 ? (
//         <p className="text-gray-500">No notifications yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {notifications.map((notif, index) => (
//             <li
//               key={index}
//               className={`p-4 rounded-lg shadow flex gap-4 items-center ${
//                 notif.read ? "bg-white" : "bg-rose-100"
//               }`}
//             >
//               <div className="flex-1">
//                 <p className="text-sm text-gray-800">
//                   <span className="font-semibold text-rose-600">{notif.from?.name}</span>{" "}
//                   {notif.typeofnotification === "like" && "liked your recipe"}
//                   {notif.typeofnotification === "comment" && "commented on your recipe"}
//                   {notif.typeofnotification === "reply" && "replied to your comment"}
//                   {notif.typeofnotification === "newrecipe" && "posted a new recipe"}
//                 </p>
//                 {notif.recipe && (
//                   <p className="text-xs text-gray-500 mt-1 italic">
//                     Recipe: {notif.recipe.title}
//                   </p>
//                 )}
//               </div>
//               <img
//                 src={notif.recipe?.images?.imageUrl[0] || "/placeholder.jpg"}
//                 alt="recipe"
//                 className="w-12 h-12 rounded-md object-cover"
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Notifications;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NOTIFICATION_BACKEND_URL } from '../../utils/Paths';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${NOTIFICATION_BACKEND_URL}/notifications`, {
          withCredentials: true,
        });
        setNotifications(res.data.notifications);
        console.log(res.data.notifications);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-10 rounded-xl shadow-xl bg-rose-50 sm:px-6">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow flex gap-4 items-center ${
                notif.read ? "bg-white" : "bg-rose-100"
              }`}
            >
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold text-rose-600">{notif.from?.name}</span>{" "}
                  {notif.typeofnotification === "like" && "liked your recipe"}
                  {notif.typeofnotification === "comment" && "commented on your recipe"}
                  {notif.typeofnotification === "reply" && "replied to your comment"}
                  {notif.typeofnotification === "newrecipe" && "posted a new recipe"}
                </p>
                {notif.reciepe && (
                  <p className="text-xs text-gray-500 mt-1 italic">
                    Recipe: {notif.reciepe.title}
                  </p>
                )}
              </div>
              {notif.reciepe?.images?.length > 0 && (
                <img
                  src={notif.reciepe.images[0]?.imageurl || "/placeholder.jpg"}
                  alt="recipe"
                  className="w-12 h-12 rounded-md object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;

