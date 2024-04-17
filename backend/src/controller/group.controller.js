import groupModel from "../models/group.model.js";


export const createGroup = async (req, res) => {
    const groupRequest = req.body;

    if (!groupRequest.name) {
        return res.status(400).json({ error_message: 'name is required' });
    }

    if (!groupRequest.owner_id) {
        return res.status(400).json({ error_message: 'groupRequest is required' });
    }

    const gropup = new groupModel({
        name: groupRequest.name,
        owner_id: groupRequest.owner_id,
        description: groupRequest.description

    })
    const createdGroup = await gropup.save()
    return res.status(200).json({ id: createdGroup._id, title: createdGroup.name, description: createdGroup.description });

};

export const findGroupByOwner = async (req, res) => {

    const ownerId = req.params.owner_id

    groupModel.find({ owner_id: ownerId })
        .then(tasks => {
            console.log(tasks);
            return res.status(200).json(tasks)
        })
        .catch(error => {
            console.error(error);
            res.send("error")
        });


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


