import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/feedback';

export const getFeedbacks =  async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/allFeedbacks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Feedbacks:', error)
        throw error;
    }
}

export const sendFeedback = async (feedback) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/addFeedback`, feedback,{
            headers:{
                'content-Type': 'application/json',
            },
        })
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback: ',error);
        throw error;
    }
}