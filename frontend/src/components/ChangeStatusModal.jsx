import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";

function ChangeStatusModal({show, handleClose, applicant, updateApplicant}) {
    const [status, setStatus] = useState(applicant?.status);
    const [comment, setComment] = useState(applicant?.comment || "");
    console.log(applicant);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the update function with new status and comment
        updateApplicant(applicant.id, {status, comment});

        // Close the modal
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Applicant Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ChangeStatusModal;
