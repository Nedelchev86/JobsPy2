import React from "react";
import {useAuth} from "../../contexts/authContexts";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import usePost from "../../hooks/usePost";
import {postEducation} from "../../api/JobSeekerApi";
const AddEducationModal = ({show, handleClose}) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset, // Add reset to reset form fields
    } = useForm({
        mode: "onBlur",
    }); // Initialize the useForm hook

    const {auth} = useAuth();
    const {data, loading, error, post} = postEducation();

    const submitEducation = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append("institution", data.institution);
        formDataToSend.append("description", data.description);
        formDataToSend.append("start_date", data.start_date);
        formDataToSend.append("end_date", data.end_date);

        if (data.image[0]) {
            formDataToSend.append("image", data.image[0]);
        }

        try {
            await post(formDataToSend, true); // Call post with FormData and set isFormData to true
            console.log("Education added successfully:", data);
            toast.success("Education added successfully!");
            reset();
            handleClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error adding education");
        }

        // fetch(`${import.meta.env.VITE_API_URL}jobseekers/educations/create/`, {
        //     headers: {
        //         Authorization: `Bearer ${auth}`,
        //     },
        //     method: "POST",
        //     body: formDataToSend,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Education added successfully:", data);
        //         toast.success("Education added successfully!");
        //         reset();
        //         handleClose();
        //     })
        //     .catch((error) => {
        //         console.error("Error updating profile:", error);
        //         toast.success("Error adding education");
        //     });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submitEducation)}>
                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("institution", {required: "Institution is required."})} // Register input with validation and custom message
                            isInvalid={!!errors.institution} // Apply error style
                        />
                        <Form.Control.Feedback type="invalid">{errors.institution?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            {...register("description", {required: "Description is required."})} // Register input with validation and custom message
                            isInvalid={!!errors.description} // Apply error style
                        />
                        <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="start_date">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("start_date", {required: "Start date is required."})} // Register input with validation and custom message
                            isInvalid={!!errors.start_date} // Apply error style
                        />
                        <Form.Control.Feedback type="invalid">{errors.start_date?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="end_date">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            {...register("end_date", {required: "End date is required."})} // Register input with validation and custom message
                            isInvalid={!!errors.end_date} // Apply error style
                        />
                        <Form.Control.Feedback type="invalid">{errors.end_date?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            {...register("image")} // Register input without validation for optional file
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-3"
                        disabled={isSubmitting} // Disable button during submission
                    >
                        {isSubmitting ? ( // Display loading indicator while submitting
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {" Adding..."}
                            </>
                        ) : (
                            "Add Education"
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEducationModal;
