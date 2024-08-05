import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/result';

export const getResultsOfStudent =  async (studentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/student/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exam Result:', error)
        throw error;
    }
}

export const getResponsesByResultId = async (examResultId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/responsesExamResultId/${examResultId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching responses', error)
        throw error;
    }
}

export const getResultOfExam = async (examId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/resultOfExam/${examId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching responses', error)
        throw error;
    }
}