import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { addCategory, deleteCategory } from '../service/CategoryService';
import Swal from 'sweetalert2';
const CategoryForm = ({categories,onAddCategory, onDeleteCategory}) => {
    const [categoryName, setCategoryName] = useState('');

    const openInputAlert = async () =>{
      const {value: inputCategoryName} = await Swal.fire({
        title:'Add Category',
        input:'text',
        inputValue:categoryName,
        showCancelButton: true,
        confirmButtonText:' Add',
        cancelButtonText: ' Cancel',
        cancelButtonColor:'#dc3545',
        inputValidator: (value)=> {
          if(!value){
            return 'Category name is required.';
          }
        },
      });

      if(inputCategoryName){
        try {
          const newCategory = await addCategory({categoryName: inputCategoryName});
          onAddCategory(newCategory);
          setCategoryName('');
          Swal.fire({
            title: "Category Added.",
            icon: "success"
          });
        } catch (error) {
          console.log('Error occoured', error);
          Swal.fire({
            title: "Error occoured while adding the category.",
            icon: "error"
          });
        }
      }
    }

    const toCategories = (json)=>{
        const categories ={};
        json.forEach((category) => {
          categories[category.categoryId] = category.categoryName;
        });
        return {Categories : categories};
    }

    const openDeleteAlert = async () =>{
      const { value: dCategory } = await Swal.fire({
        title: "Select category to Delete",
        input: "select",
        inputOptions: toCategories(categories),
        inputPlaceholder: "Categories",
        showCancelButton: true,
        cancelButtonColor:'#dc3545',
        inputValidator: (value)=> {
          if(!value){
            return 'Select any category to delete.';
          } 
        },
      });

      if(dCategory){
        try {
          const delCat = await deleteCategory(dCategory);
          onDeleteCategory(dCategory);
          Swal.fire({
            title: "Category Deleted",
            icon: "success"
          });
        } catch (error) {
          console.log('Error occoured', error);
          Swal.fire({
            title: "Error occoured while deleting the category.",
            icon: "error"
          });
        }
      }

    }
  return (
    <div>
      <button className='bn632-hover bn25' onClick={openInputAlert}>Add Category +</button>
      <button className='deleteButton' onClick={openDeleteAlert}>Delete Category</button>
    </div>
  );
}

export default CategoryForm