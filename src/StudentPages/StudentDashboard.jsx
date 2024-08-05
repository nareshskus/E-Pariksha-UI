import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { StudentNavbar } from '../StudentComponents/StudentNavbar';
import { Container, Footer, Header } from 'rsuite';
import { FooterStudent } from '../StudentComponents/FooterStudent';
import logo  from '../images/logo.png'
export const StudentDashboard = () => {
    const navigate = useNavigate();
    
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
          <StudentNavbar/>
        </Header>

        <Container  style={{minHeight:'82vh'}}>
            <div className='d-flex justify-content-start'>
            <img src={logo} width='30%' style={{marginTop:'8%', marginLeft:'10%'}}/>
            <label style={{marginLeft:'5%', fontFamily:'cursive', marginTop:'8%', fontSize:'50px'}}>Welcome to E-Pariksha<br/>
              <label style={{fontSize:'25px'}}>Empowering Success, Exam at a click!</label><br/>
              <label style={{fontSize:'20px'}}>Your journey to Academic Excellence Starts Here!</label></label>
            </div>
        </Container>

        <Footer>
            <FooterStudent/>
        </Footer>
    </div>
  )
}
