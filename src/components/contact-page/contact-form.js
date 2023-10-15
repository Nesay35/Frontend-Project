import React from 'react'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { FiMail, FiMessageSquare, FiSend, FiTag, FiUser } from "react-icons/fi";
import "./contact-form.scss"

const ContactForm = () => {
    return (
        <Form className="contact-form">
            <h2>Send me message</h2>
            <Row className="g-3">
                <Col md={6}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FiUser /></InputGroup.Text>
                        <Form.Control
                            placeholder="Your name"
                            aria-label="Your name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FiMail /></InputGroup.Text>
                        <Form.Control
                            type="email"
                            placeholder="Your email"
                            aria-label="Your email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col xs={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><FiTag /></InputGroup.Text>
                        <Form.Control
                            placeholder="Subject"
                            aria-label="Subject"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col xs={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text><FiMessageSquare /></InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </Col>
            </Row>

            <Button type="submit" variant="primary" >
                <FiSend /> Send
            </Button>

        </Form>
    )
}

export default ContactForm
