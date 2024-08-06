import {toast} from "react-toastify";
import GoogleMapsBig from "./GoogleMapBIgComponent";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {API_URL} from "../../config";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link} from "react-router-dom";

export default function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({mode: "onBlur"});

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${API_URL}contacts/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit contact form");
            }

            const result = await response.json();
            console.log("Success:", result);
            toast.success("Your message has been submitted successfully.");
            reset();
        } catch (error) {
            console.error("Error:", error);
            toast.error("There was an error submitting your message. Please try again.");
        }
    };

    return (
        <>
            <Breadcrumbs pageTitle="Contact Us" pageInfo="What do you seek? Whether it’s a work-from-home role or a bigger salary, we’ll help you find the right job. There’s no secret – just better job matches than ever before. Seek and you shall find." />

            <section id="contact-us" className="contact-us section">
                <div className="container">
                    <div className="contact-head wow fadeInUp" data-wow-delay=".4s">
                        <div className="row">
                            <div className="col-lg-7 col-12">
                                <div className="form-main">
                                    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        {...register("name", {
                                                            required: "Name is required",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Name cannot exceed 50 characters",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                    />
                                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="subject">Subject</label>
                                                    <input
                                                        type="text"
                                                        id="subject"
                                                        {...register("subject", {
                                                            required: "Subject is required",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Subject cannot exceed 50 characters",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                                                    />
                                                    {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                                                message: "Please enter a valid email address",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        {...register("phone", {
                                                            required: "Phone number is required",
                                                            pattern: {
                                                                value: /^\+?[0-9\s()-]{7,15}$/i,
                                                                message: "Please enter a valid phone number",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                    />
                                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group message">
                                                    <label htmlFor="message">Message</label>
                                                    <textarea
                                                        id="message"
                                                        rows="5"
                                                        {...register("message", {
                                                            required: "Message is required",
                                                            maxLength: {
                                                                value: 500,
                                                                message: "Message cannot exceed 500 characters",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                                    ></textarea>
                                                    {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group button">
                                                    <button type="submit" className="btn" disabled={isSubmitting}>
                                                        {isSubmitting ? "Submitting..." : "Submit Message"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-5 col-12">
                                <div className="single-head">
                                    <div className="contant-inner-title">
                                        <h4>Contact Information</h4>
                                        <p>Business consulting excepteur sint occaecat cupidatat consulting non proident.</p>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-phone"></i>
                                        <ul>
                                            <li>+359 899 899-899</li>
                                        </ul>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-envelope"></i>
                                        <ul>
                                            <li>
                                                <Link href="mailto:t******.n******@gmail.com">t******.n******@gmail.com</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-info">
                                        <i className="lni lni-map"></i>
                                        <ul>
                                            <li>8000 Burgas , Bulgaria</li>
                                        </ul>
                                    </div>
                                    <div className="contact-social">
                                        <h5>Follow Us on</h5>
                                        <ul>
                                            <li>
                                                <Link target="_blank" href="https://facebook.com/tihmir.nedelchev">
                                                    <i className="lni lni-facebook-original"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link target="_blank" href="https://www.linkedin.com/in/tihomir-nedelchev/">
                                                    <i className="lni lni-linkedin-original"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link target="_blank" href="https://github.com/Nedelchev86">
                                                    <i className="lni lni-github-original"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="map-container">
                                    <div className="mapouter">
                                        <div className="gmap_canvas">
                                            <GoogleMapsBig city={"Burgas"} address={"Kalofer 6"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
