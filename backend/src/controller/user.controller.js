import User from '../models/user.model.js';

export const updateUserStatus = async (req, res) => {
    const userId = req.user.id; // Extract user ID from the decoded token
    const { latitude, longitude, status } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
                'position.latitude': latitude,
                'position.longitude': longitude,
                status: status
            }
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error updating user status", error: error });
    }
};

export const findAllUsers = async (req, res) => {
    
    

    try {
        const allUsers = await User.find({},{_id:1,username:1}) 

        if (!allUsers) {
            return res.status(404).send({ message: "Users not found" });
        }

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).send({ message: "Error retreiving all users", error: error });
    }
};

