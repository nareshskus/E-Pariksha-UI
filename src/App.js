import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import 'rsuite/dist/rsuite.min.css';
import Categories from "./pages/Categories";
import { AddQuestions } from "./pages/AddQuestions";
import TeacherDashboard from "./pages/TeacherDashboard";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QuestionListPage } from "./pages/QuestionListPage";
import { ScheduleExam } from "./pages/ScheduleExam";
import { AddQuestionToExam } from "./pages/AddQuestionToExam";
import { RegistrationForm } from "./components/LoginRegistration/RegistrationForm";
import { LoginRegistrationPage } from "./pages/LoginRegistrationPage";
import { StudentDashboard } from "./StudentPages/StudentDashboard";
import { AttemptExamPage } from "./StudentPages/AttemptExamPage";
import { ExamAttemptMainPage } from "./StudentPages/ExamAttemptMainPage";
import { ResultPage } from "./StudentPages/ResultPage";
import { Responses } from "./StudentPages/Responses";
import { ExamCompleted } from "./StudentComponents/ExamCompleted";
import { Feedback } from "./StudentPages/Feedback";
import { StudentFeedback } from "./pages/StudentFeedback";
import { RegistrationPage } from "./pages/RegistrationPage";
import { StudentResults } from "./pages/StudentResults";
import { ResultParticularExam } from "./pages/ResultParticularExam";
import { StudentResponses } from "./pages/StudentResponses";
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* Teacher components */}
					<Route path="/registerUser" element={<RegistrationForm/>}/>
					<Route path="/teacherDashboard" element={<TeacherDashboard/>}/>
					<Route path="/categories" element={<Categories/>}/>
					<Route path="/addQuestion" element={<AddQuestions/>}/>
					<Route path="/questionsList" element={<QuestionListPage/>}/>
					<Route path="/scheduleExam" element={<ScheduleExam/>}/>
					<Route path="/questionToExam/:examId" element={<AddQuestionToExam/>}/>
					<Route path="/feedbacks" element={<StudentFeedback/>}/>
					<Route path="/studentResults" element={<StudentResults/>}/>
					<Route path="/resultExam/:examId" element={<ResultParticularExam/>}/>
					<Route path="/studentResponse/:examResultId" element={<StudentResponses/>}/>
				
					{/* Student components */}
					<Route path="/" element={<LoginRegistrationPage/>} />
					<Route path="/registration" element={<RegistrationPage/>}/>
					<Route path="/studentDashboard" element={<StudentDashboard/>} />
					<Route path="/attemptExam" element={<AttemptExamPage/>}/>
					<Route path="/examAttemptMain/:examId" element={<ExamAttemptMainPage/>}/>
					<Route path="/results" element={<ResultPage/>}/>
					<Route path="/response/:examResultId" element={<Responses/>} />
					<Route path="/examSubmitted" element={<ExamCompleted/>} />
					<Route path="/studentFeedback" element={<Feedback/>} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App