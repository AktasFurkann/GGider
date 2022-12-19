import { Container,Form,Nav,Navbar,NavDropdown} from 'react-bootstrap';
import { Button, ButtonGroup, Image  } from '@chakra-ui/react'

import React from 'react'
import { useNavigate } from 'react-router-dom';

import  './style.css'

function Header() {
  const navigate = useNavigate();
  return (
    <div>
            
    <Navbar bg="dark" expand="lg" variant='dark' >
      <Container text-align="justify">
        <Navbar.Brand href="/"><Image
  borderRadius='full'
  boxSize='70px'
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5r26nkcquZxFBJAhMNxpdL-zcWzVUs1qSA&usqp=CAU'
  alt='G-GİDER'
/></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='navbarDeneme' onClick={() => navigate("/")}>Ana Sayfa</Nav.Link>
            <NavDropdown className='navbarDeneme' title="İşlemler" id="basic-nav-dropdown">

              <NavDropdown.Item   onClick={() => navigate("/Gelir")}>Gelir</NavDropdown.Item>

              <NavDropdown.Item onClick={() => navigate("/Gider")}>Gider</NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
           <Form className="d-flex">
           <ButtonGroup gap='2'>
      <Button colorScheme='cyan' >Giriş Yap</Button>
      <Button colorScheme='cyan' onClick={() => navigate("/KayitOl")}>Kayıt Ol</Button>
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