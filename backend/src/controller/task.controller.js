import taskModel from "../models/task.model.js";

export const createTask = async (req, res) => {
    const requestTask = req.body;

    if (!requestTask.title) {
        return res.status(400).json({ error_message: 'title is required' });
    }

    if (!requestTask.type) {
        return res.status(400).json({ error_message: 'type is required' });
    }

    if (!requestTask.owner_id) {
        return res.status(400).json({ error_message: 'owner_id is required' });
    }

    if (!requestTask.location || !requestTask.location.latitude || !requestTask.location.longitude) {
        return res.status(400).json({ error_message: 'location is required' });
    }

    const taskStatus = !requestTask.status ? "ASSIGNED": null;

    const task = new taskModel({
        title: requestTask.title,
        priority: requestTask.priority,
        type: requestTask.type,
        owner_id: requestTask.owner_id,
        status:taskStatus,
        location: requestTask.location,
        description: requestTask.description,
        due_date: requestTask.due_date,
        group_id: requestTask.group_id,
        target_id: requestTask.target_id,
        status: requestTask.status,
        notes: requestTask.notes,

    })
    await task.save()
    return res.status(200).json({ title: task.title, status: task.status });

};



export const findTaskByOwner = async (req, res) => {

    const ownerId = req.params.owner_id

    taskModel.find({ owner_id: ownerId })
    .populate('target_id', { username: 1 })
    .populate('owner_id', { username: 1 })
    .populate('group_id', { name: 1 })
        .then(tasks => {
            console.log(tasks); // Los documentos que coinciden con el criterio de búsqueda

            res.json(tasks)
        })
        .catch(error => {
            console.error(error); // Manejo de errores si la consulta falla
            res.send("error")
        });


};



