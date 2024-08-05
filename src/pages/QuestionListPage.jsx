import React, { useEffect, useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { FooterWebsite } from '../components/FooterWebsite'
import { getCategoryList } from '../service/CategoryService'
import { deleteQuestion, getAllQuestions, getQuestions, updateQuestion } from '../service/QuestionService'
import { QuestionCardForList } from '../components/QuestionCardForList'
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2'

export const QuestionListPage = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);

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


    const handleUpdateQuestion = async updatedQuestion => {
        try {
            const data = await updateQuestion(updatedQuestion.questionId, updatedQuestion);
            setQuestions(prevQuestions=>
                prevQuestions.map((question)=>
                question.questionId === data.questionId? data: question)
                );
        } catch (error) {
            console.error(('Error Updating question: ',error));
        }
    }

    const handleDeleteQuestion = async (deletedQuestion) =>{
        console.log(deletedQuestion.questionId)
        try {
            await deleteQuestion(deletedQuestion.questionId);
            setQuestions((prevQuestions)=>
            prevQuestions.filter((question)=>
            question.questionId!==deletedQuestion.questionId)
            );
        } catch (error) {
            console.error('Error deleting Question: ',error);
            Swal.fire({
                title: "Cancelled",
                text: "Question is not deleted.",
                icon: "error"
              });
        }
    }

    const reverseData = [...questions].reverse();

    const filteredQuestions = selectedCategory === 'All'? reverseData:
        reverseData.filter(question => question.category.categoryName === selectedCategory);
        
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderWebsite/>
        </Header>

        <Container style={{ minHeight: "82vh" }}>
            <SideBarQuizApp/>
            <Container>
                
                <h2>Question List</h2>
                <div className='d-flex justify-content-start'>
                <label htmlFor='categoryFilter'>Filter for Category:</label>
                <select id='categoryFilter'
                    onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                    {categories.map(category=>(
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                </div>
                {filteredQuestions.length!==0?<ul>
                    {filteredQuestions.map(question => (
                        <li key={question.questionId} className='question-item'>
                            <QuestionCardForList question={question} onDeleteQuestion={handleDeleteQuestion}
                                onUpdateQuestion={handleUpdateQuestion}/>
                        </li>
                    ))}
                </ul>: <h3>No questions in {selectedCategory} category.</h3>}
                
            </Container>
        </Container>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
