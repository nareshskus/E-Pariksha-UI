import React from 'react'
import { Container, Footer, Header } from 'rsuite'
import { HeaderBeforeLogin } from '../components/LoginRegistration/HeaderBeforeLogin'
import { FooterWebsite } from '../components/FooterWebsite'
import { RegistrationForm } from '../components/LoginRegistration/RegistrationForm'

export const RegistrationPage = () => {
  return (
    <div>
        <Header>
            <HeaderBeforeLogin/>
        </Header>

        <div className='loginRegistration'>
            <Container style={{minHeight:'82vh'}}>
                <RegistrationForm/>
            </Container>
        </div>

        <Footer>
            <FooterWebsite/>
        </Footer>
    </div>
  )
}
