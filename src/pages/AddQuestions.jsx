import React, { useState } from 'react'
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from '../service/QuestionService';
import CategoryList from '../components/CategoryList';
import SideBarQuizApp from '../components/SideBarQuizApp';
import { Container, Footer, Header } from 'rsuite'
import { HeaderWebsite } from '../components/Header';
import { QuestionForm } from '../components/QuestionForm';
import { FooterWebsite } from '../components/FooterWebsite';
export const AddQuestions = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([])
    const handleCategorySelect=  async category =>{
        setSelectedCategory(category);
        fetchQuestions(category.categoryName)
    };
    const fetchQuestions = async (categoryName)=>{
        try {
            const data = await getQuestions(categoryName);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions: ',error);
        }
    }

    const handleAddQuestion = async newQuestion =>{
        try {
            const data = await addQuestion(newQuestion)
            setQuestions([...questions, data]);
        } catch (error) {
            console.error('Error adding question: ',error);
        }
    }

  return (
    <div>
      <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <HeaderWebsite />
      </Header>

      <Container style={{ minHeight: "82vh" }}>
        <SideBarQuizApp />
        <Container>
          {!selectedCategory ? (
            <>
              <h2 style={{ paddingBottom: "30px" }}>
                Select Category to Add Question
              </h2>
              <CategoryList onSelectCategory={handleCategorySelect} />
            </>
          ) : null}
          {selectedCategory && (
            <>
              <div className="d-flex justify-content-between">
                <h2>
                  Add Question to {selectedCategory.categoryName} Category
                </h2>
                <button
                  className="bn632-hover bn25"
                  onClick={() => setSelectedCategory(null)}
                >
                  Select another Category
                </button>
              </div>
              <QuestionForm
                onSubmitQuestion={handleAddQuestion}
                categoryName={selectedCategory.categoryName}
              />
            </>
          )}
        </Container>
      </Container>

      <Footer className=''>
        <FooterWebsite/>
      </Footer>
    </div>
  );
}
