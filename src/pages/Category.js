import React, { useEffect, useState } from 'react'
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import QuestionList from '../components/QuestionList';
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from '../service/QuestionService';
import '../cssPages/categoryButton.css'
import Swal from 'sweetalert2';
import { getCategoryList } from '../service/CategoryService';
export const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([])
    const [changeInCategories, setChangeInCategories] = useState(false);

    const handleCategorySelect=  async category =>{
        setSelectedCategory(category);
        fetchQuestions(category.categoryName)
    };

    const handleAddCategory = newCategory => {
        setSelectedCategory(null);
        changeInCategories? setChangeInCategories(false): setChangeInCategories(true)
    };

    const handleDeleteCategory =() =>{
        changeInCategories? setChangeInCategories(false): setChangeInCategories(true)
    };

    const fetchQuestions = async (categoryName)=>{
        try {
            const data = await getQuestions(categoryName);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions: ',error);
        }
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoryList()
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories: ', error));
    }, [changeInCategories])

  return (
    <div>
        {!selectedCategory?<><h2>Categories</h2><CategoryForm onAddCategory={handleAddCategory} categories={categories} onDeleteCategory={handleDeleteCategory}/>
        <CategoryList onSelectCategory={handleCategorySelect} changeInCategories={changeInCategories}/></> : null}
        
        {selectedCategory && (
            <div>
                <div className='d-flex justify-content-between'>
                    <h1>{selectedCategory.categoryName} Category</h1>
                    <button className='bn632-hover bn25' onClick={()=> setSelectedCategory(null)}>Back to Categories</button>
                </div>
                <QuestionList questions={questions}/>
            </div>
        )}
    </div>
  )
}
