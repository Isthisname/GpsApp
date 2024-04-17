import assignmentModel from '../models/groupAssignment.model.js'

export const User2group = async (req, res) => {
    const Request = req.body;

    

    if (!Request.user_id) {
        return res.status(400).json({ error_message: 'user_id is required' });
    }
    if (!Request.group_id) {
        return res.status(400).json({ error_message: 'group_id is required' });
    }

    const groupAssigment = new assignmentModel({
       
        group_id: Request.group_id,
        user_id: Request.user_id,
        

    })
    const createdGroup = await groupAssigment.save()
    return res.status(200).json({ id: createdGroup._id });

};