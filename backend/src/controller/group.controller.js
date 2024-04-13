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
        description:groupRequest.description

    })
    await gropup.save()
    return res.status(200).json({ title: groupRequest.name, description: groupRequest.description });

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



