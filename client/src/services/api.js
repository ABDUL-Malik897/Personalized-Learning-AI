import axios from "axios";


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const createUser = async (userData) => {
    const response = await API.post("/users", userData);
    return response.data;
};

export const getUser = async (userId) => {
    const response = await API.get(`/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await API.put(`/users/${userId}`, userData);
    return response.data;
};

export const getLearningPath = async (userId) => {
    const response = await API.get(`/learning-paths/user/${userId}`);
    return response.data;
};

export const getUserProgress = async (userId) => {
    const response = await API.get(`/progress/user/${userId}`);
    return response.data;
};

export const createProgress = async (progressData) => {
    const response = await API.post("/progress", progressData);
    return response.data;
};

export const updateProgress = async (progressId, progressData) => {
    const response = await API.put(`/progress/${progressId}`, progressData);
    return response.data;
};

export const chatWithAI = async (chatData) => {
    const response = await API.post("/ai/chat", chatData);
    return response.data;
};

export const reassessLearningPath = async (userId) => {
    const response = await API.post("/ai/reassess", {
        userId,
    });
    return response.data;
};

export const generateLearningPath = async (userId) => {
    const response = await API.post("/ai/generate", {
        userId,
    });

    return response.data;
};

export const getResourceContent = async (url) => {
    const response = await API.get(`/resources/content`,
        {
            params: { url },
        }
    );

    return response.data;
};

export default API;