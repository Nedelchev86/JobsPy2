import {useJobs} from "../../contexts/JobContext";
import React, {useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {useAuth} from "../../contexts/authContexts";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import styles from "./LoginModal.module.css";
import Spinner from "react-bootstrap/Spinner";

const LoginModal = ({show, handleClose}) => {
    const {notifications, fetchNotifications, auth} = useJobs();
    const [loading, setLoading] = useState(false);

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: {errors, isDirty, isValid},
    } = useForm({mode: "onChange", delayError: 1000});

    const [error, setError] = useState("");
    const {login} = useAuth();

    const submitForm = async (data) => {
        setLoading(true);

        try {
            await login(data);

            handleClose();
            // setError("");

            reset();

            fetchNotifications();

            toast.success("Login successful!");
        } catch (error) {
            // console.error("Login failed:", error.message);
            // setError("Invalid email or password");
            toast.error(`Login failed. Invalid email or password`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <p className="text-center">
                <strong>
                    <img className={styles["img-center"]} src="/images/logo/login.jpg" alt="" width="100" height="100" />
                </strong>
            </p>
            <Modal.Header className={styles.red} closeButton>
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

                    <Button variant="primary" type="submit" className={`w-100 ${styles["dark-blue"]}`} disabled={!isValid}>
                        {/* Log in */}
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {" Loading..."}
                            </>
                        ) : (
                            "Log in"
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
