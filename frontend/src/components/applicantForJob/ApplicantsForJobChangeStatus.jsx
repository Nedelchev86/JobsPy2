// import {useAuth} from "../contexts/Contexts";

// import React, {useState} from "react";

// export default function ChangeStatusModal({isOpen, onClose, applicant, onStatusChanged}) {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const [status, setStatus] = useState(applicant.status || "Panding");
//     const [comment, setComment] = useState(applicant.comment || "");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const {auth} = useAuth();
//     if (!isOpen) return null;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`${apiUrl}company/applicants/${applicant.id}/change-status/`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${auth}`,
//                 },
//                 body: JSON.stringify({status, comment}),
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to update applicant status");
//             }

//             const updatedApplicant = await response.json();
//             console.log(updatedApplicant);
//             onStatusChanged(updatedApplicant); // Notify parent of status change
//             onClose(); // Close the modal after successful update
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <button className="modal-close" onClick={onClose}>
//                     &times;
//                 </button>
//                 <h2>Change Applicant Status</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="status">Status:</label>
//                         <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
//                             <option value="Pending">Pending</option>
//                             <option value="Accepted">Accepted</option>
//                             <option value="Rejected">Rejected</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="comment">Comment:</label>
//                         <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add your comment here" />
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? "Updating..." : "Update Status"}
//                     </button>
//                 </form>
//                 {error && <div className="error">{error}</div>}
//             </div>
//         </div>
//     );
// }

// ChangeStatusModal.jsx

import React, {useState} from "react";
import {Modal, Button, Form, Spinner, Alert} from "react-bootstrap";
import {useAuth} from "../../contexts/authContexts";
import {toast} from "react-toastify";
export default function ChangeStatusModal({isOpen, onClose, applicant, onStatusChanged}) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [status, setStatus] = useState(applicant.status || "Pending");
    const [comment, setComment] = useState(applicant.comment || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {auth} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}company/applicants/${applicant.id}/change-status/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
                body: JSON.stringify({status, comment}),
            });

            if (!response.ok) {
                toast.success("Failed to update applicant status");
                throw new Error("Failed to update applicant status");
            }
            toast.success("Applicant status updated successfully");
            onStatusChanged(); // Notify parent of status change
            onClose(); // Close the modal after successful update
        } catch (err) {
            toast.error("Failed to update applicant status");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Change Applicant Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="mt-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add your comment here" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Updating...
                            </>
                        ) : (
                            "Update Status"
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
