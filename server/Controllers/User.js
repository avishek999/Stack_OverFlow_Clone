import mongoose from "mongoose";
import User from '../Models/Auth.js'


export const getAllUsers = async (req,res) =>{
    try {

        const alluser = await User.find();
        const  allUserDetails = []
        alluser.forEach(User => {
            //allUserDetails.push({_id: users._id, name: users.name, about: users.abot.about, tags: users.tags, joinedOn: users.joinedOn})
            allUserDetails.push({
                _id: User._id,
                name: User.name,
                about: User.about,
                tags: User.tags,
                joinedOn: User.joinedOn,
              });
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    try {
      const updatedProfile = await User.findByIdAndUpdate(
        _id,
        { $set: { name: name, about: about, tags: tags } },
        { new: true }
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };