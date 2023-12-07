import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes realizar acciones con el nombre de usuario y contraseña, como enviar los datos a un servidor o realizar validaciones.
        console.log('Username:', username);
        console.log('Password:', password);
        // Puedes agregar lógica adicional aquí, como enviar la información a un servidor.
    }
    
    return (
        <>
            <h1 className='d-flex justify-content-center'>Login</h1>
            <Container className="container justify-content-center align-items-center col-lg-6" style={{ height: "100vh" }}>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa tu nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit"  className='mt-2'>
                                Iniciar Sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginForm;