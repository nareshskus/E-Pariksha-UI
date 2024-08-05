import React, { useEffect, useState } from 'react'
import { getCategoryList } from '../service/CategoryService';
import { getAllQuestions, getQuestionById } from '../service/QuestionService';
import { QuestionCard } from './QuestionCard';
import { Button, Form } from 'react-bootstrap';
import { addQuestionToExam, deleteQuestionFromExam, getAllQuestionsOFExam } from '../service/ExamQuestionService';
import Swal from 'sweetalert2';
import { OffCanvaAddedQuestions } from './OffCanvaAddedQuestions';

export const AddQuestionExamData = ({examId}) => {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [addedQuestions, setAddedQuestions] = useState([]);

    useEffect(() => {
        getCategoryList()
            .then(data => {
                const categoryNames =['All',...data.map(category=> category.categoryName)];
                setCategories(categoryNames);
            })
            .catch(error => console.error('Error fetching categories: ', error));
    }, [])

    useEffect(() => {
        getAllQuestions()
            .then(data => setQuestions(data))
            .catch(error=> console.error('Error fetching all questions.', error))
    }, [])

    const handleAddQuestionService = async (examId, questionsList) =>{
        try {
            const data = await addQuestionToExam(examId,questionsList)
            Swal.fire({
              title: "Questions Added Successfully.",
              icon: "success"
            });
        } catch (error) {
            console.error('Error adding questions: ',error);
        }
    }

    useEffect(() => {
        getAllQuestionsOFExam(examId)
            .then((data) => {
                const questionIds = data.map((question)=> question.questionId);
                setAddedQuestions((prevQuestions)=> [...questionIds])
            })
            .catch(error => console.error('Error fetching exams: ', error));
    }, [])

    const [addedQuestionsData, setAddedQuestionsData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const newDataArray = await Promise.all(
                    addedQuestions.map(async (questionId) =>
                await getQuestionById(questionId)))
                setAddedQuestionsData(newDataArray)
            }
            catch (error) {
                console.error('Error fetching exams: ', error)
            }
        }
        fetchData();
    }, [addedQuestions])

    const filteredQuestions = selectedCategory === 'All'? questions.filter(
        (question)=> !addedQuestions.includes(question.questionId)) : 
        questions.filter((question) =>
          (!selectedCategory || question.category.categoryName === selectedCategory) &&
          !addedQuestions.includes(question.questionId)
      );
      const reverseData = [...filteredQuestions].reverse();
  
    const handleSelectQuestion = (questionId) => {
        if (selectedQuestions.includes(questionId)) {
            setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
        } else {
            setSelectedQuestions([...selectedQuestions, questionId]);
        }
    };
  
    const handleAddToExam = () => {
        console.log(selectedQuestions)
        setAddedQuestions([...addedQuestions, ...selectedQuestions]);
        const requestBody ={
            "questionIds": selectedQuestions
        }
        handleAddQuestionService(examId, requestBody)
        setSelectedQuestions([]);
    };

    const handleRemoveQuestionInExam = (questionId)=> {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteQuestionFromExam(examId,questionId)
              Swal.fire({
                title: "Deleted!",
                text: "Your question has been removed.",
                icon: "success"
              });

              const updatedQuestions = addedQuestions.filter(qId => qId !== questionId);
              setAddedQuestions(updatedQuestions)
            }
          });
    }

  return (
    <div>
        <h2>Question List</h2>
        <div className='d-flex justify-content-start' style={{marginBottom:'25px'}}>
            <label htmlFor='categoryFilter'>Filter for Category: </label>
            <select id='categoryFilter'
                onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                {categories.map(category=>(
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {selectedQuestions.length > 0 ?
                <Button variant='success' onClick={handleAddToExam} style={{marginLeft:'5px'}}>Add to Exam</Button>:
                <Button variant='success' disabled style={{marginLeft:'5px'}}>Add to Exam</Button>
            }
        </div>

        <div className='d-flex justify-content-start'>
        
        {reverseData.length !== 0 ? (
        <ul>
            {reverseData.map((question) => (
                <li key={question.questionId} className='d-flex justify-content-start'>
                    <Form>
                        <div key={"checkbox"} className="mb-3">
                            <Form.Check type={"checkbox"} id={"check-api-checkbox"} 
                                checked={selectedQuestions.includes(question.questionId)}
                        onChange={() => handleSelectQuestion(question.questionId)}
                            >
                            <Form.Check.Input type={"checkbox"} isValid checked={selectedQuestions.includes(question.questionId)}
                                onChange={() => handleSelectQuestion(question.questionId)}/>
                            <Form.Check.Label style={{marginTop:'-20px'}}><QuestionCard question={question} /></Form.Check.Label>
                            </Form.Check>
                        </div>
                    </Form>
                </li>
            ))}
        </ul>
        ) : (
        <h3>No questions to add from selected category.</h3>
        )}

        <div style={{position:'fixed', right:'0', top:'20%'}}>
            <OffCanvaAddedQuestions questions={addedQuestionsData} handleRemoveQuestionInExam={handleRemoveQuestionInExam}/>
        </div>
        </div>
    </div>
  )
}
