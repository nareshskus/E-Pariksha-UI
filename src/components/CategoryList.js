import React, { useEffect, useState } from 'react'
import { getCategoryList } from '../service/CategoryService';
import { Button } from 'react-bootstrap';
import '../cssPages/categoryButton.css';
const CategoryList = ({onSelectCategory, changeInCategories}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategoryList()
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories: ', error));
    }, [changeInCategories])

    const reverseData = [...categories].reverse();
    
  return (
    <div className='d-flex flex-wrap justify-content-start'>
        {reverseData.map(category=>(
            <div style={{width:'30%', margin:'1%'}}>
            <button style={{width:'250px', height:'100px'}} key={category.categoryId} className='categoryList' onClick={() => onSelectCategory(category)}>
            {category.categoryName}</button>
            </div>
        ))}
    </div>
  )
}

export default CategoryList