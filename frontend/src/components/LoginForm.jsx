// import React, {useState} from "react";
// import {Modal, Button, Form} from "react-bootstrap";

// const LoginModal = ({show, handleClose}) => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState("");

//     const handleChange = (e) => {
//         setFormData({...formData, [e.target.name]: e.target.value});
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://127.0.0.1:8000/api/token/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error("Invalid email or password");
//             }

//             const data = await response.json();
//             localStorage.setItem("token", data.access); // Store token in local storage
//             localStorage.setItem("refresh_token", data.refresh);
//             handleClose(); // Close the modal after successful login
//             // Redirect or perform any action upon successful login
//         } catch (error) {
//             console.error("Login failed:", error.message);
//             setError(error.message);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Start Your Career Journey with JobsPy</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     {error && <div className="alert alert-danger">{error}</div>}
//                     <Form.Group controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
//                     </Form.Group>

//                     <Form.Group controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
//                     </Form.Group>
//                     <Button variant="primary" type="submit">
//                         Log in
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default LoginModal;

// LoginModal.js
import {useJobs} from "../contexts/JobContext";
import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {useAuth} from "../contexts/Contexts";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";

const LoginModal = ({show, handleClose}) => {
    const {notifications, fetchNotifications, auth} = useJobs();

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: {errors, isDirty, isValid},
    } = useForm({mode: "onChange", delayError: 1000});

    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    // });

    // const resetForm = () => {
    //     setFormData({
    //         email: "",
    //         password: "",
    //     });
    // };

    const [error, setError] = useState("");
    const {login} = useAuth();

    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value});
    // };

    const submitForm = async (data) => {
        // e.preventDefault();

        try {
            await login(data); // Call login method from AuthContext

            handleClose(); // Close modal after successful login
            setError("");
            // resetForm();
            reset();

            fetchNotifications();

            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Login failed:", error.message);
            setError("Invalid email or password");
            toast.error(`Login failed. Invalid email or password`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login to Your Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submitForm)}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            // value={formData.email}
                            // onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Password must be at least 4 characters long",
                                },
                            })}
                            // value={formData.password}
                            // onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={!isValid}>
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
