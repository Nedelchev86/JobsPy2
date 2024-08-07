import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import {useAuth} from "../../contexts/authContexts";
import {toast} from "react-toastify";
import {API_URL} from "../../config";
const EditEducationModal = ({show, handleClose, educationId, initialData}) => {
    const {auth} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (initialData) {
            setValue("institution", initialData.institution);
            setValue("description", initialData.description);
            setValue("start_date", initialData.start_date);
            setValue("end_date", initialData.end_date);
        }
    }, [initialData, setValue, show]);

    const onSubmit = async (data) => {
        try {
            const formDataToSend = new FormData();

            formDataToSend.append("institution", data.institution);
            formDataToSend.append("description", data.description);
            formDataToSend.append("start_date", data.start_date);
            formDataToSend.append("end_date", data.end_date);

            if (data.image && data.image[0]) {
                formDataToSend.append("image", data.image[0]);
            }

            const response = await fetch(`${API_URL}jobseekers/educations/edit/${initialData.id}/`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth}`, // Add authorization header
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Education updated successfully:", responseData);
                toast.success("Education updated successfully");

                reset();

                handleClose();
            } else {
                const errorData = await response.json();
                console.error("Error updating education:", errorData);
                toast.error("Failed to update education");
            }
        } catch (error) {
            toast.error("Failed to update education");
            console.error("Error updating education:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control type="text" {...register("institution", {required: true})} isInvalid={!!errors.institution} />
                        <Form.Control.Feedback type="invalid">Institution is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" {...register("description", {required: true})} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="start_date">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" {...register("start_date", {required: true})} isInvalid={!!errors.start_date} />
                        <Form.Control.Feedback type="invalid">Start date is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="end_date">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" {...register("end_date", {required: true})} isInvalid={!!errors.end_date} />
                        <Form.Control.Feedback type="invalid">End date is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            {...register("image")} // Register image input
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-3"
                        disabled={isSubmitting} // Disable button when submitting
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {" Updating..."}
                            </>
                        ) : (
                            "Update Education"
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditEducationModal;
