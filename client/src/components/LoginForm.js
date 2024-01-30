import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        userName: '',
        userPassword: '',
    })
    const navigation = useNavigate()
    const [message, setMessage] = useState('')
    const handleChange = (e) =>{
        //Setea los datos del formulario por name automaticamente
        setDatosFormulario({...datosFormulario, [e.target.name]: e.target.value})
        setMessage('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        try{
            const responseFetch = await fetch('/api/login', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(datosFormulario)
            })
            const result = await responseFetch.json()
            setMessage(result.message)
            console.log(result)
            setTimeout(() => {
                if(result.access){
                    navigation('/gastos')
                }
            }, 500)
             
        }
        catch(err){
            console.log(err) //------------------//
        }
    }
    
    return (
        <>
            <h2>{message}</h2>
            <h1 className='d-flex justify-content-center'>Login</h1>
            <Container className="container justify-content-center align-items-center col-lg-6" style={{ height: "100vh" }}>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre de usuario"
                                    name="userName"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    name="userPassword"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='mt-2'>
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