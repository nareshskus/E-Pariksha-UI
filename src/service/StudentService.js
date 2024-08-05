import axios from 'axios'
const API_BASE_URL = 'http://localhost:8080/students';

export const getStudent =  async (studentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getStudent/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student:', error)
        throw error;
    }
}