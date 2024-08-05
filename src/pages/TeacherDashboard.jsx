import React from 'react'
import { Container, Footer, Header } from 'rsuite'
import SideBarQuizApp from '../components/SideBarQuizApp'
import { HeaderWebsite } from '../components/Header'
import { FooterWebsite } from '../components/FooterWebsite'
import logo from '../images/logo.png'
const TeacherDashboard = () => {
  return (
    <div>
      <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
        <HeaderWebsite />
      </Header>

      <Container style={{ minHeight: "82vh" }}>
        <SideBarQuizApp />
        <Container >
            <div className='d-flex justify-content-start'>
              <img src={logo} height='100px' width='175px' style={{marginTop:'3%'}}/>
            
            <label style={{marginLeft:'10%', fontFamily:'cursive', marginTop:'8%', fontSize:'50px'}}>Welcome to E-Pariksha<br/>
              <label style={{fontSize:'25px'}}>Empowering Success, Exam at a click!</label><br/>
              <label style={{fontSize:'20px'}}>Your journey to Academic Excellence Starts Here!</label></label>
              </div>
        </Container>
      </Container>

      <Footer className="">
        <FooterWebsite/>
      </Footer>
    </div>
  );
}

export default TeacherDashboard