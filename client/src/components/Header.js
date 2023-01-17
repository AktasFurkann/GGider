import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Button, ButtonGroup,  } from '@chakra-ui/react'

import React from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'
import { UseAuth } from '../contexts/authContext';

function Header() {

  const { loggedIn, logOut } = UseAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logOut();
    navigate("/Giris")
  }



  return (
    <div>
      <Navbar bg="dark" expand="lg" variant='dark' >
        <Container text-align="justify">
          <Navbar.Brand href="/">
            <h1>AktasFamily.com</h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='navbarDeneme' onClick={() => navigate("/")}>Ana Sayfa</Nav.Link>
              <NavDropdown className='navbarDeneme' title="İşlemler" id="basic-nav-dropdown">

                <NavDropdown.Item href="/Gelir">Gelir</NavDropdown.Item>

                <NavDropdown.Item href="/Gider">Gider</NavDropdown.Item>
                <NavDropdown.Divider />

              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <ButtonGroup gap='2'>
                {
                  !loggedIn && (<>
                    <Button colorScheme='cyan' onClick={() => navigate("/Giris")}>Giriş Yap</Button>
                    <Button colorScheme='cyan' onClick={() => navigate("/KayitOl")}>Kayıt Ol</Button>
                  </>)
                }

                {
                  loggedIn && (<>
                    <Button colorScheme='pink' onClick={() => navigate("/Profile")}>Profile</Button>
                    <Button colorScheme='pink' onClick={handleLogout}>Çıkış</Button>
                  </>)
                }


              </ButtonGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br></br>

    </div>
  )
}

export default Header
