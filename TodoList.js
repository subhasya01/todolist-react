import React, { useState } from 'react';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedTaskIndex, setEditedTaskIndex] = useState(null);
    const [newTask, setNewTask] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [taskStatus, setTaskStatus] = useState('todo');

    const handleAddTask = () => {
        if (newTask.trim() !== '' && startDate && endDate) {
            const newTaskObject = {
                task: newTask,
                startDate,
                endDate,
                status: taskStatus,
            };

            if (editMode && editedTaskIndex !== null) {
                // If in edit mode, replace the existing task at the specified index
                const updatedTasks = [...tasks];
                updatedTasks[editedTaskIndex] = newTaskObject;
                setTasks(updatedTasks);
                setEditMode(false);
                setEditedTaskIndex(null);
            } else {
                // If not in edit mode, add a new task
                setTasks([...tasks, newTaskObject]);
            }

            // Reset form fields
            setNewTask('');
            setStartDate('');
            setEndDate('');
            setTaskStatus('todo');
            handleClose();
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setNewTask(taskToEdit.task);
        setStartDate(taskToEdit.startDate);
        setEndDate(taskToEdit.endDate);
        setTaskStatus(taskToEdit.status);
        setEditMode(true);
        setEditedTaskIndex(index);
        handleShow();
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setEditMode(false);
        setEditedTaskIndex(null);
    };

    const renderTaskCards = (status) => {
        return tasks
            .filter((task) => task.status === status)
            .map((task, index) => (
                <Card key={index} style={{ width: '18rem', marginBottom: '10px' }}>
                    <Card.Body>
                        <Card.Title>{task.task}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Start Date: {task.startDate}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            End Date: {task.endDate}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            Status: {task.status}
                        </Card.Subtitle>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditTask(index)}
                            style={{ marginRight: '5px' }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteTask(index)}
                        >
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ));
    };

    return (
        <div>
            <Row>
                <Col>
                    <h3>To Do</h3>
                    {renderTaskCards('todo')}
                    <Button
                        variant="primary"
                        onClick={() => {
                            setTaskStatus('todo');
                            handleShow();
                        }}
                    >
                        Add Task
                    </Button>
                </Col>
                <Col>
                    <h3>In Progress</h3>
                    {renderTaskCards('progress')}
                    <Button
                        variant="primary"
                        onClick={() => {
                            setTaskStatus('progress');
                            handleShow();
                        }}
                    >
                        Add Task
                    </Button>
                </Col>
                <Col>
                    <h3>In Review</h3>
                    {renderTaskCards('review')}
                    <Button
                        variant="primary"
                        onClick={() => {
                            setTaskStatus('review');
                            handleShow();
                        }}
                    >
                        Add Task
                    </Button>
                </Col>
                <Col>
                    <h3>Completed</h3>
                    {renderTaskCards('completed')}
                    <Button
                        variant="primary"
                        onClick={() => {
                            setTaskStatus('completed');
                            handleShow();
                        }}
                    >
                        Add Task
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="task">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                <option value="todo">To Do</option>
                                <option value="progress">In Progress</option>
                                <option value="review">In Review</option>
                                <option value="completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddTask}>
                        {editMode ? 'Edit Task' : 'Add Task'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TodoList;
