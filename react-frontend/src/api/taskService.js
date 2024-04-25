import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:3300';

export const listTaskByUser = async () => {
	try {
		const config = { headers: { Authorization: `Bearer ${getToken()}` } };
		const requestUrl = `${API_URL}/task`;
		const response = await axios.get(requestUrl, config);
		const data = response.data;

		const modifiedData = data?.map(item => ({
			id: item._id,
			title: item.title,
			description: item.description,
			location: item.location,
			group_id: item.group_id,
			owner_id: item.owner_id,
			target_id: item.target_id,
			status: item.status,
			notes: item?.notes,
			createdAt: item.createdAt,
		}));

		return modifiedData;
	} catch (error) {
		if (error.response.status === 404) {
			return [];
		}
		throw error;
	}
};

export const deleteTaskById = async task_id => {
	try {
		const requestUrl = `${API_URL}/task/${task_id}`;
		const response = await axios.delete(requestUrl);
		const data = response.data;
		return data;
	} catch (error) {
		throw error;
	}
};

export const createTask = async requestTask => {
	const config = { headers: { Authorization: `Bearer ${getToken()}` } };
	try {
		const requestUrl = `${API_URL}/task`;
		const response = await axios.post(requestUrl, requestTask, config);
		if (!response.data) {
			throw new Error('La respuesta no contiene datos');
		}
		const createdTask = response.data;
		return createdTask;
	} catch (error) {
		throw error;
	}
};

export const editTask = async (requestTask, taskId) => {
	const config = { headers: { Authorization: `Bearer ${getToken()}` } };
	try {
		const requestUrl = `${API_URL}/task/${taskId}`;
		const response = await axios.put(requestUrl, requestTask, config);
		if (!response.data) {
			throw new Error('La respuesta no contiene datos');
		}
		const editedTask = response.data;
		return editedTask;
	} catch (error) {
		throw error;
	}
};

export const taskAssignedToMe = async () => {
	try {
		const config = { headers: { Authorization: `Bearer ${getToken()}` } };
		const requestUrl = `${API_URL}/mytasks`;
		const response = await axios.get(requestUrl, config);
		const data = response.data;
		const modifiedData = data.map(item => ({
			id: item._id,
			title: item.title,
			description: item.description,
			location: item.location,
			group_id: item.group_id,
			owner_id: item.owner_id,
			target_id: item.target_id,
			status: item.status,
			createdAt: item.createdAt,
		}));

		return modifiedData;
	} catch (error) {
		if (error.response.status === 404) {
			return [];
		}
		throw error;
	}
};
