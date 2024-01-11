import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function NavBar () {
    const navigate = useNavigate()
    const handlelogout = async () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        try{
            const responseFetch = await fetch('/api/logout', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                secure: true
            })
            responseFetch.ok && navigate('/')
        }
        catch(err){
            console.log(err) //------------------//
        }
    }
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
                                <Nav.Link className='navbar_button_enlaces' onClick={() => {handlelogout()}}>Logout</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar