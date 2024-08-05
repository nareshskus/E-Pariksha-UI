const API_BASE_URL = 'http://localhost:8080/questions';

export const getQuestions = async (categoryName)=>{
    const response = await fetch(`${API_BASE_URL}/byCategory/${categoryName}`);
    const data = await response.json();
    return data;
};

export const getAllQuestions = async() =>{
    const response = await fetch(`${API_BASE_URL}/allQuestions`);
    const data = await response.json();
    return data;
}

export const getQuestionById = async(questionId) =>{
    const response = await fetch(`${API_BASE_URL}/getQuestion/${questionId}`);
    const data = await response.json();
    return data;
}

export const addQuestion = async (question) =>{
    const response = await fetch(`${API_BASE_URL}/addQuestion`,{
        method: 'POST',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(question),
    });

    const data = await response.json();
    return data;
}

export const updateQuestion = async (questionId, updatedQuestion) =>{
    const response = await fetch(`${API_BASE_URL}/updateQuestion/${questionId}`,{
        method: 'PUT',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion),
    });

    const data = await response.json();
    return data;
}

export const deleteQuestion = async ( questionId) =>{
    await fetch(`${API_BASE_URL}/deleteQuestion/${questionId}`,{
        method: 'DELETE',
    });
}