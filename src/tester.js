import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Updated ToDoList component
const ToDoList = ({ todos, onAddTask, onRemoveTask }) => (
    <div>
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
        <Button variant="primary" onClick={onAddTask}>
            Add Task
        </Button>
        <Button variant="danger" onClick={onRemoveTask}>
            Remove Task
        </Button>
    </div>
);

function Tester() {
    const [tabs, setTabs] = useState([
        { key: 'first', title: 'Tab 1', todos: ['Task 1', 'Task 2'] },
        { key: 'second', title: 'Tab 2', todos: ['Task A', 'Task B'] },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', todos: [] });

    const handleInputChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleAddProject = () => {
        const { name, todos } = newProject;

        // Check if the name or todos is empty
        if (!name || todos.length === 0) {
            alert('Please enter both name and at least one task for the new project.');
            return;
        }

        // Generate a unique key for the new tab
        const newKey = `tab-${tabs.length + 1}`;

        // Create a new tab object
        const newTab = { key: newKey, title: name, todos };

        // Update the state to include the new tab
        setTabs([...tabs, newTab]);

        // Close the modal and reset the newProject state
        setShowModal(false);
        setNewProject({ name: '', todos: [] });
    };

    const handleAddTask = (tabIndex) => {
        const updatedTabs = [...tabs];
        updatedTabs[tabIndex].todos.push(`New Task ${updatedTabs[tabIndex].todos.length + 1}`);
        setTabs(updatedTabs);
    };

    const handleRemoveTask = (tabIndex) => {
        const updatedTabs = [...tabs];
        updatedTabs[tabIndex].todos.pop();
        setTabs(updatedTabs);
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={tabs[0].key}>
            <Row>
                <Col sm={1}>
                    <h2>Projects</h2>

                    <Nav variant="pills" className="flex-column">
                        {tabs.map((tab, index) => (
                            <Nav.Item key={tab.key}>
                                <Nav.Link eventKey={tab.key}>{tab.title}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
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
                                <Form.Group controlId="formProjectTasks">
                                    <Form.Label>Project Tasks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter tasks, separated by commas"
                                        name="todos"
                                        value={newProject.todos.join(',')}
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
                <Col sm={11}>
                    <Tab.Content>
                        {tabs.map((tab, index) => (
                            <Tab.Pane key={tab.key} eventKey={tab.key}>
                                <ToDoList
                                    todos={tab.todos}
                                    onAddTask={() => handleAddTask(index)}
                                    onRemoveTask={() => handleRemoveTask(index)}
                                />
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Tester;
