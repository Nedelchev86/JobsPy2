import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import {useAuth} from "../contexts/Contexts";

const EditEducationModal = ({show, handleClose, educationId, initialData}) => {
    const {auth} = useAuth();
    console.log("initial data" + initialData);

    // Initialize useForm with react-hook-form
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setValue, // use setValue to pre-fill form data
    } = useForm();

    // Use useEffect to populate the form with existing data when the modal is opened
    useEffect(() => {
        if (initialData) {
            setValue("institution", initialData.institution);
            setValue("description", initialData.description);
            setValue("start_date", initialData.start_date);
            setValue("end_date", initialData.end_date);
        }
    }, [initialData, setValue, show]);

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Create a FormData object for file upload
            const formDataToSend = new FormData();

            // Append each field to FormData
            formDataToSend.append("institution", data.institution);
            formDataToSend.append("description", data.description);
            formDataToSend.append("start_date", data.start_date);
            formDataToSend.append("end_date", data.end_date);

            // Append image if selected
            if (data.image && data.image[0]) {
                formDataToSend.append("image", data.image[0]);
            }

            // Make a PUT request to your API endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}educations/edit/${initialData.id}/`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth}`, // Add authorization header
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Education updated successfully:", responseData);

                // Reset form data after successful submission
                reset();

                // Close the modal
                handleClose();
            } else {
                const errorData = await response.json();
                console.error("Error updating education:", errorData);
            }
        } catch (error) {
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
