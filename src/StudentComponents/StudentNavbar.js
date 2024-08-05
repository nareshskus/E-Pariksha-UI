import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'
import '../cssPages/StudentNavbar.css'
import { getStudent } from '../service/StudentService'
export const StudentNavbar = () => {

    const backGradient = {   
        background: 'rgb(40,102,203)',
        background: 'linear-gradient(27deg, rgba(40,102,203,1) 33%, rgba(8,224,188,1) 96%, rgba(6,232,187,1) 100%)',
    }
    const navigate = useNavigate();
    const studentName = localStorage.getItem('studentName');
    const handleLogout = () => {
        localStorage.clear();
        window.history.pushState(null, null, '/')
        navigate('/', {replace: true})
        
    }
    
  return (
    <div className='studentNavbar'>
        <Navbar data-bs-theme="dark">
        <Container>
          <Navbar.Brand style={{textDecoration:'none'}} href="/studentDashboard">
            <img src={logo} width='70px' height='35px'/>
            E-Pariksha
          </Navbar.Brand>
          <Nav className='navItems'>
            <Nav.Link className='navItems' style={{textDecoration:'none'}} href="/attemptExam">Attempt Exam</Nav.Link>
            <Nav.Link className='navItems' style={{textDecoration:'none'}} href="/results">Result</Nav.Link>
            <Nav.Link className='navItems' style={{textDecoration:'none'}} href="/studentFeedback">Feedback</Nav.Link>
          </Nav>
          <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <h6 style={{marginRight:'20px'}}>Welcome, {studentName}!!!</h6>
                    <Button variant='outline-light' onClick={()=>  handleLogout()}>Logout</Button>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
