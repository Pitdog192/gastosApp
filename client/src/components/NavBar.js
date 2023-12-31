import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavBar () {
    return(
        <>
            <Navbar bg="success" data-bs-theme="dark">
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Brand href="#home">Gastos</Navbar.Brand>
                        </Col>
                        <Col>
                            <Nav>
                                <Nav.Link className='navbar_button_enlaces' href="/">Home</Nav.Link>
                                <Nav.Link className='navbar_button_enlaces' href="/gastos">Gastos</Nav.Link>
                                <Nav.Link className='navbar_button_enlaces' href="/api/logout">Logout</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar