import taskModel from "../models/task.model.js";
import Task from "../models/task.model.js";

export const createTask = async (req, res) => {

    const userId = req.user.id;  // Extracted user ID from the token
    const requestTask = req.body;
    requestTask.owner_id = userId;

    
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


    const targer_id = !requestTask.target_id || requestTask.target_id===''?null:requestTask.target_id;

    const taskStatus = !requestTask.status ? "ASSIGNED": null;

    const task = new taskModel({
        title: requestTask.title,
        priority: requestTask.priority,
        type: requestTask.type,
        owner_id: userId,
        status:taskStatus,
        location: requestTask.location,
        description: requestTask.description,
        due_date: requestTask.due_date,
        group_id: requestTask.group_id,
        target_id: targer_id,
        status: requestTask.status,
        notes: requestTask.notes,

    })
    await task.save()
    return res.status(200).json({ title: task.title, status: task.status });

};


export const findTaskByOwner = async (req, res) => {


    const ownerId = req.user.id;

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


export const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.task_id; // Extract task ID from the request parameters
  
      // Find the task by ID and delete it
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Error deleting task", error });
    }
  };

  export const findTasksByTargetId = async (req, res) => {
    const targetId = req.user.id;  // Extracted user ID from the token

    try {
        const tasks = await taskModel.find({ target_id: targetId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks for user:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const findTasksByGroup = async (req, res) => {
    try {
        const groupId = req.params.group_id;
        const tasks = await Task.find({ group_id: groupId }).populate('owner_id', 'username');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error finding tasks by group:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.task_id;
        const updateData = req.body; // New data to update the task
        //const userId = req.user.id; // Extracted user ID from the token

        // Find the task by task_id and update it
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

        // Check if the task was found and updated
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Task updated successfully
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
