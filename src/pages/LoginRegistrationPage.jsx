import React, { useState } from 'react'
import { Container, Footer, Header } from 'rsuite'
import { FooterWebsite } from '../components/FooterWebsite'
import { HeaderBeforeLogin } from '../components/LoginRegistration/HeaderBeforeLogin'
import { LoginForm } from '../components/LoginRegistration/LoginForm'
import '../cssPages/loginPage.css'
export const LoginRegistrationPage = () => {
    
  return (
    <div>
        <Header style={{ position: "sticky", top: "0", zIndex: "100" }}>
            <HeaderBeforeLogin/>
        </Header>
        
        <div className='loginRegistration'>
        <Container style={{ minHeight: "82vh"}}>
            <LoginForm/>
            <Container>
            
            </Container>
        </Container>
        </div>

      <Footer className="">
        <FooterWebsite />
      </Footer>
    </div>
  )
}
