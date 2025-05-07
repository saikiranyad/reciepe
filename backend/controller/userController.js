const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Reciepe = require("../models/Reciepemodel");
const { uploadtocloudinary } = require("../helpers/uploadCloudinary");
const { sendnotification } = require("../helpers/Notificationhelper");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "user already exists" })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            name, email, password: hashedpassword
        });
        await newuser.save();
        return res.status(201).json({ success: true, message: "user registered successfully", newuser })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error in register api" })
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(409).json({ success: false, message: "user not exists" })
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(403).json({ success: false, message: "invalid credentials" })
        }
        const token = jwt.sign({ id: user._id }, "SAIKIRAN", { expiresIn: "1h" });
        return res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true }).status(201).json({ success: true, message: "user login successfully", token, user })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error in login api" })
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie("token").status(201).json({ success: true, message: "logout successfully" })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error in logout api" })
    }
}
const getuser = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const havinguser = await User.findById(userId);
       
        return res.status(201).json({ success: true, message: "user is there", havinguser })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "internal server error in getuser api" })
    }
}
const getuserdata = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const user = await User.findById(userId)
            .populate('followers', 'name avatar')
            .populate('following', 'name avatar')
            .populate('reciepes')
            .populate({
                path: 'savedReciepes',
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                }
            })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User data fetched", user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error in getuserdata API",err });
    }
};


const userrecipes = async (req, res) => {
    try {
        const userId = req.user.id;

        // 🛠️ FIX: Add `.populate("reciepes")` here
        const user = await User.findById(userId).populate({
            path: "reciepes",
            populate: {
                path: "collabortors", // Ensure this matches your schema field name
                select: "name avatar", // Only get needed fields
            },
        });
        // console.log(user.reciepes)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        return res.status(200).json({ success: true, recipes: user.reciepes });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal server error in userrecipes" });
    }
};

const savedrecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.body.recipeId || req.body.savedReciepes;
        

        if (!recipeId) {
            return res.status(403).json({ success: false, message: "Recipe ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(409).json({ success: false, message: "Unauthorized user" });
        }

        const alreadyHasRecipe = user.savedReciepes.some(id => id.toString() === recipeId);
        
        if (alreadyHasRecipe) {
            await User.findByIdAndUpdate(userId, { $pull: { savedReciepes: recipeId } }, { new: true });
            return res.status(201).json({ success: true, message: "Recipe unsaved", recipeId });
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { savedReciepes: recipeId } }, { new: true });
            return res.status(201).json({ success: true, message: "Recipe saved", recipeId });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error in saved recipe API' });
    }
};


const fetchusersavedreciepes = async (req, res) => {
    try {
      const userIds = req.user.id;
  
      const user = await User.findById(userIds)
        .populate({
          path: "savedReciepes",
          model: "Reciepe",
          populate: {
            path: "userId", // assuming each recipe has a userId field
            select: "name avatar",
          },
        });
        
  
      if (!user || user.savedReciepes.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No saved recipes found for this user",
        });
      }
  
      return res.status(200).json({
        success: true,
        savedrecipes: user.savedReciepes,
        name: user.name,
        avatar: user.avatar,
      });
    } catch (err) {
      console.error("Error in fetchusersavedreciepes:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error while fetching saved recipes",
      });
    }
  };
  



const followingandunfollowingusers = async (req, res) => {

    try {
        const userId = req.user.id
        const { targetuserid } = req.body
        
        if (userId === targetuserid) {
            return res.status(409).json({ success: false, message: "you cant follow yourself" })
        }
        const user = await User.findById(userId);
        const targetuser = await User.findById(targetuserid)
        if (!targetuser) {
            return res.status(403).json({ success: false, message: "user does'nt exists" })
        }
        const isFollowing = user.following.some(id => id.toString() === targetuserid)
        
        if (isFollowing) {
            await User.findByIdAndUpdate(userId, { $pull: { following: targetuserid } })
            await User.findByIdAndUpdate(targetuserid, { $pull: { followers: userId } })
            return res.status(201).json({ success: true, message: "you unfollowing the user" })
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { following: targetuserid } })
            await User.findByIdAndUpdate(targetuserid, { $addToSet: { followers: userId } })
            await sendnotification(targetuserid, userId, "follow", null);
            return res.status(201).json({ success: true, message: "you following the user" })
        } 
       
    }
   

    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error in Following and UnFollowing User" })
    }
}


const onlyfollowingposts = async (req, res) => {
    try {
      const userId = req.user.id; // Get the logged-in user ID
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const followingIds = user.following; // List of users the current user is following
      const idsToFetchFrom = [...followingIds, userId]; // Include the logged-in user's ID
  
      const recipes = await Reciepe.find({ userId: { $in: idsToFetchFrom } })
        .populate('userId', 'name avatar') // Include user info for each recipe
        .sort({ createdAt: -1 }); // Sort by creation date, newest first
  
      return res.status(200).json({ success: true, user_recipes: recipes });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Internal Server Error in fetching posts" });
    }
  };




const suggestionusers = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        const suggestionusers = await User.find({
            _id: { $ne: userId, $nin: user.following }
        }).limit(10).select("name avatar")
        return res.status(201).json({ success: true, suggestionusers })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "internal server error in suggestionusers" })
    }
}


const userwithid = async (req, res) => {
    try {
        const othersid = req.params.id
        const user = await User.findById(othersid)
            .populate('followers', 'name avatar')
            .populate('following', 'name avatar')
            .populate('reciepes')
            .populate({
                path: 'savedReciepes',
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                }
            })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User data fetched", user });

    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server error in userwithid" })
    }
}


const updateuser = async (req, res) => {
    try {
        const userId = req.user.id;
        

        // Prepare update object from req.body
        const updates = {
            name: req.body.name,
            description: req.body.description
        };

        // Handle avatar file upload if exists
        if (req.file) {
            const uploadResult = await uploadtocloudinary(req.file.path);
            updates.avatar = uploadResult.imageurl;
        }

        // Remove undefined fields from update object
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in update user',
        });
    }
};


const deleteuser = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find the user before deletion to get their followers and following
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { followers, following } = user;

        // 2. Remove this user from other users' following lists
        await User.updateMany(
            { _id: { $in: followers } },
            { $pull: { following: userId } }
        );

        // 3. Remove this user from other users' followers lists
        await User.updateMany(
            { _id: { $in: following } },
            { $pull: { followers: userId } }
        );

        // 4. Delete the user
        const deleteuserdata = await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deleteuserdata
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error in delete user"
        });
    }
};








module.exports = { register, login, logout, getuser, userwithid, updateuser, deleteuser, userrecipes, savedrecipe, fetchusersavedreciepes, followingandunfollowingusers, onlyfollowingposts, suggestionusers, getuserdata }