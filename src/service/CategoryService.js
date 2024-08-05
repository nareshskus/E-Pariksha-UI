const API_BASE_URL = 'http://localhost:8080/category';

export const getCategoryList = async ()=>{
    const response = await fetch(`${API_BASE_URL}/allCategory`);
    const data = await response.json();
    return data;
};

export const addCategory = async category =>{
    const response = await fetch(`${API_BASE_URL}/addCategory`,{
        method: 'POST',
        headers:{
            'content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    });

    const data = await response.json();
    return data;
}

export const deleteCategory = async (categoryId) => {
    console.log(categoryId +'Inside delete cate ')
    await fetch(`${API_BASE_URL}/deleteCategory/${categoryId}`,{
        method: 'DELETE',
    })
}