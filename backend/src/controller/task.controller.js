import taskModel from "../models/task.model.js";

export const task = async (req, res) => {
    const requestTask = req.body;

    if (!requestTask.group_id) {
        return res.status(400).json({ error_message: 'group_id is required' });
    }

    if (!requestTask.title) {
        return res.status(400).json({ error_message: 'title is required' });
    }

    if (!requestTask.owner_id) {
        return res.status(400).json({ error_message: 'title is owner_id' });
    }

    if (!requestTask.location) {
        return res.status(400).json({ error_message: 'title is location' });
    }

    const task = new taskModel({
        title: requestTask.title,
        description: requestTask.description,
        group_id: requestTask.group_id,
        owner_id: requestTask.owner_id,
        target_id: requestTask.target_id,
        status: requestTask.status,
        location: requestTask.location,
        notes: requestTask.notes,

    })
    await task.save()
    return res.status(200).json({ title: requestTask.title, status: requestTask.status });

};



export const findTaskByOwner = async (req, res) => {

    const ownerId = req.params.owner_id

    taskModel.find({ owner_id: ownerId })
        .then(tasks => {
            console.log(tasks); // Los documentos que coinciden con el criterio de búsqueda

            res.json(tasks)
        })
        .catch(error => {
            console.error(error); // Manejo de errores si la consulta falla
            res.send("error")
        });


};



