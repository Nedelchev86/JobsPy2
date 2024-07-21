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
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onBlur"});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const {login} = useAuth();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const submitForm = async (e) => {
        // e.preventDefault();

        try {
            await login(formData); // Call login method from AuthContext

            handleClose(); // Close modal after successful login
            setError("");
            setFormData({email: "", password: ""});

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submitForm)}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address",
                                },
                            })}
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors?.email?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                        {errors?.email?.type === "pattern" && <div className="alert alert-danger">{errors.email.message}</div>}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="form-control" placeholder="Enter your password" {...register("password", {required: true, minLength: 4})} value={formData.password} onChange={handleChange} />
                        {errors?.password?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                        {errors?.password?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
