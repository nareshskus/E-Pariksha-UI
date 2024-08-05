const API_BASE_URL = 'http://localhost:8080/examQuestion';

export const getAllQuestionsOFExam = async(examId) =>{
    const response = await fetch(`${API_BASE_URL}/allQuestionsOf/${examId}`);
    const data = await response.json();
    return data;
}

export const addQuestionToExam = async (examId, questionsList) =>{
    const response = await fetch(`${API_BASE_URL}/addQuestionsTo/${examId}`,{
        method: 'POST',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(questionsList),
    });
    const data = await response.json();
    return data;
}

export const updateQuestionsInExam = async (examId, updatedQuestionList) =>{
    const response = await fetch(`${API_BASE_URL}/updateQuestionsIn/${examId}`,{
        method: 'PUT',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestionList),
    });

    const data = await response.json();
    return data;
}

export const deleteQuestionFromExam = async (examId, questionId) =>{
    await fetch(`${API_BASE_URL}/deleteQuestionFrom/${examId}/qId=${questionId}`,{
        method: 'DELETE',
    });
}