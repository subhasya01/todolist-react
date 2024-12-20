import React, { useState } from 'react';
import TodoList from "./TodoList";
import "./leftTab.css"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function LeftTab() {
    const [tabs, setTabs] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: ''});

    const handleInputChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleAddProject = () => {
        const { name, content } = newProject;

        // Check if the name or content is empty
        if (!name) {
            alert('Please enter both name for the new project.');
            return;
        }

        // Generate a unique key for the new tab
        const newKey = `tab-${tabs.length + 1}`;

        // Create a new tab object
        const newTab = { key: newKey, title: name};

        // Update the state to include the new tab
        setTabs([...tabs, newTab]);

        // Close the modal and reset the newProject state
        setShowModal(false);
        setNewProject({ name: '' });
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={tabs[0] ? tabs[0].key : undefined}>
            <Row>
                <Col sm={2}>
                    <h3>Task boards</h3>
                </Col>
                <Col sm={10}>
                    <h3>My projects</h3>
                </Col>
            </Row>

            <Row>
                <Col sm={2} >


                    <Nav variant="pills" className="flex-column">
                        {tabs.map((tab) => (
                            <Nav.Item key={tab.key}>
                                <Nav.Link className="tabs" eventKey={tab.key}>{tab.title}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Button variant="primary" className="subBtn" onClick={() => setShowModal(true)}>
                        Add New Project
                    </Button>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formProjectName">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter project name"
                                        name="name"
                                        value={newProject.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddProject}>
                                Add Project
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        {tabs.map((tab) => (
                            <Tab.Pane key={tab.key} eventKey={tab.key}>
                                <TodoList />
                            </Tab.Pane>

                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default LeftTab;
