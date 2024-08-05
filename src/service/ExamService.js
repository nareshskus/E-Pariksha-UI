const API_BASE_URL = 'http://localhost:8080/exams';

export const getExamById = async (examId)=>{
    const response = await fetch(`${API_BASE_URL}/getExam/${examId}`);
    const data = await response.json();
    return data;
};

export const getAllExams = async() =>{
    const response = await fetch(`${API_BASE_URL}/allExams`);
    const data = await response.json();
    return data;
}

export const createExam = async (exam) =>{
    const response = await fetch(`${API_BASE_URL}/createExam`,{
        method: 'POST',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(exam),
    });
    const data = await response.json();
    return data;
}

export const updateExam = async (examId, updatedExam) =>{
    const response = await fetch(`${API_BASE_URL}/updateExam/${examId}`,{
        method: 'PUT',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExam),
    });

    const data = await response.json();
    return data;
}

export const deleteExam = async ( examId) =>{
    await fetch(`${API_BASE_URL}/deleteExam/${examId}`,{
        method: 'DELETE',
    });
}