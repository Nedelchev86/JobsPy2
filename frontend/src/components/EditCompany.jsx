import React, {useState, useEffect} from "react";
import JobSeekerMenu from "./JobseekerMenu";
import Breadcrumbs from "./Breadcrumbs";
import {useAuth} from "../contexts/Contexts";
import {useNavigate} from "react-router-dom";
import Loading from "./loading/Loading";

export default function EditCompany() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const {auth, isAuthenticated} = useAuth();
    const [skills, setSkills] = useState([]);
    const [company, setCompany] = useState({
        name: "",
        description: "",
        location: "",
        phone: "",
        address: "",
        email: "",
        website_url: "",
        linkedin_url: "",
        facebook_url: "",
        employees: 0,
        foundation_year: 0,
        skills: [],
        image: null,
    });

    useEffect(() => {
        // Fetch skills from the API
        fetch(`${import.meta.env.VITE_API_URL}skills/`)
            .then((response) => response.json())
            .then((data) => setSkills(data))
            .catch((error) => console.error("Error fetching skills:", error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}user/company/update/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setCompany(data))
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
        setLoading(false);
    }, [auth]);

    const handleSkillChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setCompany((prevProfile) => ({
                ...prevProfile,
                skills: [...prevProfile.skills, value],
            }));
        } else {
            setCompany((prevProfile) => ({
                ...prevProfile,
                skills: prevProfile.skills.filter((skill) => skill !== value),
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setCompany((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCompany((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        const addFormData = (key, value) => {
            // if (value !== "" && value !== null && value !== undefined) {
            formData.append(key, value);
            // }
        };

        addFormData("image", company.image);
        addFormData("name", company.name);
        addFormData("description", company.description);
        addFormData("location", company.location);
        addFormData("phone", company.phone);
        addFormData("address", company.address);
        addFormData("email", company.email);
        addFormData("website_url", company.website_url);
        addFormData("linkedin_url", company.linkedin_url);
        addFormData("facebook_url", company.facebook_url);
        addFormData("employees", company.employees);
        addFormData("foundation_year", company.foundation_year);
        company.skills.forEach((skill) => {
            formData.append("skills", skill);
        });

        fetch(`${import.meta.env.VITE_API_URL}user/company/update/`, {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
            method: "PUT",
            body: formData,
        })
            .then((response) => response.json().then((data) => ({status: response.status, body: data})))
            .then(({status, body}) => {
                if (status === 400) {
                    setErrors(body);
                } else {
                    console.log("Profile updated successfully:", body);
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log("Profile updated successfully:", data);
        //     navigate("/dashboard");
        // })
        // .catch((error) => {
        //     console.error("Error updating profile:", error);
        // });
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="change-password section">
                    <div className="container">
                        <div className="alerts-inner">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="password-content">
                                        <h3>Edit Profile</h3>
                                        <p>Here you can edit your Profile.</p>

                                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="id_name" className="required">
                                                        Name:
                                                    </label>
                                                    <input type="text" name="name" maxLength="40" className="form-control" required id="id_name" value={company.name} onChange={handleChange} />
                                                    {errors.name && <div className="error">{errors.name.join(", ")}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_description" className="required">
                                                        Description:
                                                        <textarea name="description" cols="100" rows="10" maxLength="40" className="form-control" required id="id_description" value={company.description} onChange={handleChange} />
                                                    </label>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_location" className="required">
                                                        Location:
                                                    </label>
                                                    <input type="text" name="location" maxLength="40" className="form-control" required id="id_location" value={company.location} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_phone">Phone:</label>
                                                    <input type="text" name="phone" maxLength="20" className="form-control" id="id_phone" value={company.phone} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_address" className="required">
                                                        Address:
                                                    </label>
                                                    <input type="text" name="address" maxLength="200" className="form-control" required id="id_address" value={company.address} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_email" className="required">
                                                        Email:
                                                    </label>
                                                    <input type="email" name="email" maxLength="254" className="form-control" required id="id_email" value={company.email} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_image">Image:</label>
                                                    <input type="file" name="image" className="form-control" id="id_image" onChange={handleImageUpload} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_website_url">Website URL:</label>
                                                    <input type="url" name="website_url" maxLength="200" className="form-control" id="id_website_url" value={company.website_url} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_linkedin_url">LinkedIn URL:</label>
                                                    <input type="url" name="linkedin_url" maxLength="200" className="form-control" id="id_linkedin_url" value={company.linkedin_url} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_facebook_url">Facebook URL:</label>
                                                    <input type="url" name="facebook_url" maxLength="200" className="form-control" id="id_facebook_url" value={company.facebook_url} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_employees" className="required">
                                                        Employees:
                                                    </label>
                                                    <input type="number" name="employees" min="0" className="form-control" required id="id_employees" value={company.employees} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_foundation_year" className="required">
                                                        Foundation Year:
                                                    </label>
                                                    <input type="number" name="foundation_year" min="0" className="form-control" required id="id_foundation_year" value={company.foundation_year} onChange={handleChange} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="required">Technologies:</label>
                                                    <div className="form-check">
                                                        {skills.map((skill) => (
                                                            <div key={skill.id}>
                                                                <label htmlFor={skill.name} className="form-check-label">
                                                                    {skill.name}
                                                                </label>
                                                                <input id={skill.name} type="checkbox" name="skills" value={skill.name} className="form-check" checked={company.skills.includes(skill.name)} onChange={handleSkillChange} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="button">
                                                        <button className="btn">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                        {/* {% if form.errors %}
                            <div className="alert alert-danger">
                            {{ form.errors }}
                            </div>
                            {% endif %} */}

                                        {/* <form method="post">
                                        <div className="row"> */}
                                        {/* {{ form.media }} */}
                                        {/* {% for field in form %}
                    <div className="form-group">
                    {{ field.label_tag }}
                    {{ field }}
                     </div>
                    {% for error in field.errors %}
                      <p style="color: red">{{ error }}</p>
                    {% endfor %}

                {% endfor %} */}
                                        {/* 
                                            <div className="col-lg-12">
                                                <div className="button">
                                                    <button className="btn">Save</button>
                                                </div>
                                            </div> */}
                                        {/* </div>
                                    </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
