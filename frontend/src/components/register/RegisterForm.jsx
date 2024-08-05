import React, {useState} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useNavigate} from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import {Slide} from "react-awesome-reveal";
import {useForm} from "react-hook-form";

const RegisterForm = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onBlur"});

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
        role: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const submitForm = async (e) => {
        // e.preventDefault();
        setIsLoading(true);
        console.log(e);
        try {
            if (formData.password !== formData.password2) {
                throw new Error("Passwords do not match");
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Check if email already exists
                const responseData = await response.json();
                if (responseData.email) {
                    throw new Error("Email already exists");
                }
                throw new Error("Registration failed");
            }

            navigate("/");

            console.log("User registered successfully");
            // Redirect or show success message
        } catch (error) {
            setIsLoading(false);
            console.error("Registration failed:", error.message);
            setError(error.message); // Set error message for display
            // Handle error (e.g., display error message)
        }
    };
    return (
        <>
            <Breadcrumbs
                pageTitle="Sing Up"
                pageInfo="JobsPy It helps you to increase your chances of finding a suitable job<br> disciplines.
                            and let recruiters contact you about jobs that are not needed to pay for advertising."
            />
            <Slide direction="right" duration="2000" triggerOnce="true">
                <section className="about-us section">
                    <div className="container">
                        <div className="row  justify-content-center">
                            <div className="col-lg-6 col-md-10 col-12">
                                <div className="content-left wow fadeInLeft">
                                    <div className="row">
                                        <div className="col-lg-11 col-12">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-6">
                                                    <img className="single-img" src="/images/about/small1.jpg" alt="#" />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-6">
                                                    <img className="single-img mt-50" src="/images/about/small2.jpg" alt="#" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-11 col-12">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-6">
                                                    <img className="single-img minus-margin" src="/images/about/small3.jpg" alt="#" />
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-6">
                                                    <div className="media-body">
                                                        <i className="lni lni-checkmark"></i>
                                                        <h6 className="">Sing Up!</h6>
                                                        <p className="">Join the JobsPy community</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-10 col-12">
                                <div className="login-information">
                                    <h3 className="title title-margin">Registration</h3>
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="row">
                                            {error && <div className="alert alert-danger">{error}</div>} {/* Render error message if present */}
                                            <div className="form-group">
                                                <label htmlFor="id_email">Email:</label>
                                                {/* <input type="email" name="email" maxLength="100" autoFocus className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required id="id_email" /> */}
                                                <input
                                                    id="id_email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
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
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="id_password">Password:</label>
                                                {/* <input type="password" name="password" autoComplete="new-password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} required aria-describedby="id_password1_helptext" id="id_password" /> */}
                                                <input type="password" id="id_password" className="form-control" placeholder="Enter your password" {...register("password", {required: true, minLength: 4})} value={formData.password} onChange={handleChange} />
                                                {/* errors will return when field validation fails  */}
                                                {errors?.password?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                                                {errors?.password?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="id_password2">Password confirmation:</label>
                                                {/* <input type="password" name="password2" autoComplete="new-password" className="form-control" placeholder="Enter your password" value={formData.password2} onChange={handleChange} required aria-describedby="id_password2_helptext" id="id_password2" /> */}
                                                <input
                                                    id="id_password2"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Repeat your password"
                                                    {...register("password2", {
                                                        required: true,
                                                        validate: (value) => {
                                                            return value === watch("password") || "Password does not match";
                                                        },
                                                    })}
                                                    value={formData.password2}
                                                    onChange={handleChange}
                                                />
                                                {errors?.password2?.type === "required" && <div className="alert alert-danger">This field is required</div>}
                                                {errors?.password2?.type === "minLength" && <div className="alert alert-danger">Your password is too short. Min length is 4</div>}
                                                {errors.password2?.type == "validate" && <div className="alert alert-danger">{errors.password2.message}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="id_role">Profile type:</label>
                                                <select name="role" className="form-control" value={formData.role} onChange={handleChange} required id="id_role">
                                                    <option value="">---------</option>
                                                    <option value="jobseeker">Job Seeker</option>
                                                    <option value="company">Company</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-12 button">
                                                <button className="btn" type="submit" disabled={isLoading}>
                                                    {isLoading ? "Loading..." : "Register"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Slide>

            <section className="apply-process section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="process-item">
                                <i className="lni lni-user"></i>
                                <h4>Register Your Account</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="process-item">
                                <i className="lni lni-book"></i>
                                <h4>Upload Your Resume</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="process-item">
                                <i className="lni lni-briefcase"></i>
                                <h4>Apply for Dream Job</h4>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterForm;
