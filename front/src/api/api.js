import axios from "axios";

const API_URL = "http://localhost:3000"; // Asegúrate de que es el puerto correcto de tu backend

export const fetchNeighborhoods = async () => {
    try {
        const response = await axios.get(`${API_URL}/neighborhoods`);
        return response.data;
    } catch (error) {
        console.error("Error fetching neighborhoods:", error);
        return [];
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
