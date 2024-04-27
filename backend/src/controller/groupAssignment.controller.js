import assignmentModel from '../models/groupAssignment.model.js'

export const User2group = async (req, res) => {
    const { group_id, user_ids } = req.body;  // Expect user_ids to be an array of user IDs

    try {
        const assignments = user_ids.map(user_id => ({
            group_id,
            user_id
        }));

        const createdAssignments = await assignmentModel.insertMany(assignments);

        res.status(201).json(createdAssignments);
    } catch (error) {
        console.error('Failed to assign users to group:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};




export const findUsersByGroup = async (req, res) => {

    const group_id = req.params.group_id

    await assignmentModel.find({ group_id: group_id }, { _id: 0, group_id: 1 })
        .populate('user_id', { username: 1 })
        .then(assignment => {
            const response = assignment.map((item, index) => ({
                user_id: item.user_id._id,
                name: item.user_id.username
            })
            )
            return res.status(200).json(response)
        })
        .catch(error => {
            console.error(error);
            res.send("error")
            return res.status(500).json({ error_message: 'group_id is required' });
        });

};


export const removeUserFromGroup = async (req, res) => {
    const { group_id, user_id } = req.params;

    try {
        const result = await assignmentModel.findOneAndDelete({ group_id: group_id, user_id: user_id });
        if (result) {
            res.status(200).json({ message: "User removed from the group successfully" });
        } else {
            res.status(404).json({ message: "User not found in the specified group" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};