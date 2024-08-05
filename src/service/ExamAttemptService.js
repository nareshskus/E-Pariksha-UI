import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/studentExam';

export const getExamsForAttempt =  async (studentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/allExams/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exams:', error)
        throw error;
    }
}

export const getQuestionsFromExam =  async (examId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${examId}/questions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Exams:', error)
        throw error;
    }
}

export const startExam = async (examId, userName) =>{
    try {
        const response = await axios.post(`${API_BASE_URL}/start/${examId}`, userName,{
            headers:{
                'content-Type': 'application/json',
            },
        })
        return response.data;
    } catch (error) {
        console.error('Error Starting Exam: ',error);
        throw error;
    }
}

export const submitExam = async (examResultId, questionResponses) =>{
    try {
        console.log(examResultId)
        console.log(questionResponses)
        // const response = await axios.post(`${API_BASE_URL}/submit/${examResultId}`, questionResponses,{
        //     headers:{
        //         'content-Type': 'application/json',
        //     },
        // })
        // return response.data;
    } catch (error) {
        console.error('Error Submitting Exam: ',error);
        throw error;
    }
}