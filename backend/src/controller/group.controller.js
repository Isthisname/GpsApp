import groupModel from "../models/group.model.js";


export const createGroup = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;  // Extracted user ID from the token

    // Create a new group object with the owner_id set to the authenticated user's ID
    const group = new groupModel({
        name: name,
        description: description,
        owner_id: userId
    });

    try {
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const findGroupByOwner = async (req, res) => {
    
    const ownerId = req.user.id;  // Extracted user ID from the token

    try {
        

        // Find groups where owner_id is the user provided in the token
        const groups = await groupModel.find({ owner_id: ownerId });
        
        if (!groups || groups.length === 0) {
            return res.status(404).json({ message: "No groups found for the specified owner" });
        }

        res.status(200).json(groups);
    } catch (error) {
        console.error('Error retrieving groups:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteGroup = async (req, res) => {

    const groupId = req.params.group_id

    try {
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'group not found' });
        }
        await groupModel.findByIdAndDelete(groupId)
        res.status(200).json({ message: 'group deleted' });

    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}


export const updateGroup = async (req, res) => {

    const groupId = req.params.group_id
    const groupRequest = req.body;


    const group = await groupModel.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'group not found' });
    }

    
    await   groupModel.findByIdAndUpdate(groupId, groupRequest, { new: true })
    .then(updatedGroup => {
        if (updatedGroup) {
            console.log('Usuario actualizado:', updatedGroup);
            return res.status(200).json({ id: updatedGroup._id, name: updatedGroup.name, description: updatedGroup.description });
        } else {
            console.log('No se encontró el usuario con el ID proporcionado');
            return res.status(400).json({ message: 'update fail' });
        }
    })
    .catch(error => {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });



   
};


