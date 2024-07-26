// import React from "react";
// import {useState} from "react";
// import {useAuth} from "../contexts/Contexts";
// import useFetch from "../hooks/useFetch";
// import {Modal, Button, Form, Spinner} from "react-bootstrap";
// import {useForm} from "react-hook-form";
// import {Slide} from "react-awesome-reveal";
// const AddEducationModal = ({show, handleClose}) => {
//     const [formData, setFormData] = useState({
//         institution: "",
//         description: "",
//         start_date: "",
//         end_date: "",
//         image: null,
//     });

//     const {
//         register,
//         handleSubmit,
//         formState: {errors, isSubmitting},
//         reset, // Add reset to reset form fields
//     } = useForm({mode: "onBlur"}); // Initialize the useForm hook

//     const resetForm = () => {
//         setFormData({
//             institution: "",
//             description: "",
//             start_date: "",
//             end_date: "",
//             image: null,
//         });
//     };
//     const {auth} = useAuth();
//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setFormData({...formData, [name]: value});
//     };

//     const handleImageChange = (e) => {
//         setFormData({...formData, image: e.target.files[0]}); // Use the first selected file
//     };

//     const submitEducation = async (e) => {
//         const formDataToSend = new FormData();
//         formDataToSend.append("institution", formData.institution);
//         formDataToSend.append("description", formData.description);
//         formDataToSend.append("start_date", formData.start_date);
//         formDataToSend.append("end_date", formData.end_date);

//         // Check if an image was uploaded before appending
//         if (formData.image) {
//             formDataToSend.append("image", formData.image);
//         }
//         console.log(formDataToSend);
//         fetch("http://127.0.0.1:8000/api/educations/create/", {
//             headers: {
//                 Authorization: `Bearer ${auth}`,
//             },
//             method: "POST",
//             body: formDataToSend,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("reser");
//                 resetForm();
//                 reset();
//                 handleClose();
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//             });
//     };

//     return (
//         <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add Education</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit(submitEducation)}>
//                     <Form.Group controlId="institution">
//                         <Form.Label>Institution</Form.Label>
//                         <Form.Control
//                             type="text"
//                             {...register("institution", {required: true})} // Register input with validation
//                             isInvalid={!!errors.institution} // Apply error style
//                             value={formData.institution}
//                             onChange={handleChange}
//                         />
//                         <Form.Control.Feedback type="invalid">Institution is required.</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group controlId="description">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             {...register("description", {required: true})} // Register input with validation
//                             isInvalid={!!errors.description} // Apply error style
//                             value={formData.description}
//                             onChange={handleChange}
//                         />
//                         <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group controlId="start_date">
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                             type="date"
//                             {...register("start_date", {required: true})} // Register input with validation
//                             isInvalid={!!errors.start_date} // Apply error style
//                             value={formData.start_date}
//                             onChange={handleChange}
//                         />
//                         <Form.Control.Feedback type="invalid">Start date is required.</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group controlId="end_date">
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                             type="date"
//                             {...register("end_date", {required: true})} // Register input with validation
//                             isInvalid={!!errors.end_date} // Apply error style
//                             value={formData.end_date}
//                             onChange={handleChange}
//                         />
//                         <Form.Control.Feedback type="invalid">End date is required.</Form.Control.Feedback>
//                     </Form.Group>
//                     <Form.Group controlId="image">
//                         <Form.Label>Image</Form.Label>
//                         <Form.Control
//                             type="file"
//                             {...register("image")} // Register input without validation for optional file
//                             name="image"
//                             onChange={handleImageChange}
//                         />
//                     </Form.Group>
//                     <Button
//                         type="submit"
//                         variant="primary"
//                         className="mt-3"
//                         disabled={isSubmitting} // Disable button during submission
//                     >
//                         {isSubmitting ? ( // Display loading indicator while submitting
//                             <>
//                                 <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                                 {" Adding..."}
//                             </>
//                         ) : (
//                             "Add Education"
//                         )}
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default AddEducationModal;

import React from "react";
import {useAuth} from "../contexts/Contexts";
import {Modal, Button, Form, Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";

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

    const submitEducation = async (data) => {
        const formDataToSend = new FormData();
        formDataToSend.append("institution", data.institution);
        formDataToSend.append("description", data.description);
        formDataToSend.append("start_date", data.start_date);
        formDataToSend.append("end_date", data.end_date);

        if (data.image[0]) {
            formDataToSend.append("image", data.image[0]);
        }

        fetch(`${import.meta.env.VITE_API_URL}educations/create/`, {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
            method: "POST",
            body: formDataToSend,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Education added successfully:", data);
                reset();
                handleClose();
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
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
