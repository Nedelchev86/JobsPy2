import React, {useState, useEffect} from "react";
import JobSeekerMenu from "./JobseekerMenu";
import Breadcrumbs from "./Breadcrumbs";
import {useAuth} from "../contexts/Contexts";
import {useNavigate} from "react-router-dom";

export default function EditJobseeker() {
    const navigate = useNavigate();
    const {auth, isAuthenticated} = useAuth();
    const [skills, setSkills] = useState([]);
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        city: "",
        nationality: "",
        occupation: "",
        website: "",
        linkedin: "",
        facebook: "",
        github: "",
        about: "",
        phone_number: "",
        gender: "",
        marital_status: "",
        skills: [],
        profile_picture: null,
    });

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    console.log(skills);
    useEffect(() => {
        // Fetch skills from the API
        fetch("http://127.0.0.1:8000/api/skills/")
            .then((response) => response.json())
            .then((data) => setSkills(data))
            .catch((error) => console.error("Error fetching skills:", error));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/user/jobseeker/update/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setProfile(data))
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
    }, [auth]);

    const handleSkillChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                skills: [...prevProfile.skills, value],
            }));
        } else {
            setProfile((prevProfile) => ({
                ...prevProfile,
                skills: prevProfile.skills.filter((skill) => skill !== value),
            }));
        }
        console.log(profile.skills);
    };

    const handleImageUpload = (e) => {
        console.log("test");
        const file = e.target.files[0];
        setProfile((prevState) => ({
            ...prevState,
            profile_picture: file,
        }));
        console.log("image");
        console.log(file);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        const addFormData = (key, value) => {
            if (value !== "" && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        };

        addFormData("profile_picture", profile.profile_picture);
        addFormData("first_name", profile.first_name);
        addFormData("last_name", profile.last_name);
        addFormData("city", profile.city);
        addFormData("nationality", profile.nationality);
        addFormData("occupation", profile.occupation);
        addFormData("website", profile.website);
        addFormData("linkedin", profile.linkedin);
        addFormData("facebook", profile.facebook);
        addFormData("github", profile.github);
        addFormData("about", profile.about);
        addFormData("phone_number", profile.phone_number);
        addFormData("gender", profile.gender);
        addFormData("marital_status", profile.marital_status);
        profile.skills.forEach((skill) => {
            formData.append("skills", skill);
        });

        fetch("http://127.0.0.1:8000/api/user/jobseeker/update/", {
            headers: {
                Authorization: `Bearer ${auth}`,
            },
            method: "PUT",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Profile updated successfully:", data);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    return (
        <>
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
                                                <label htmlFor="id_first_name" className="required">
                                                    First Name:
                                                </label>
                                                <input type="text" name="first_name" value={profile.first_name} maxLength="50" className="form-control" onChange={handleChange} required id="id_first_name" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_last_name" className="required">
                                                    Last name:
                                                </label>
                                                <input type="text" name="last_name" value={profile.last_name} maxLength="50" className="form-control" onChange={handleChange} required id="id_last_name" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_city" className="required">
                                                    City:
                                                </label>
                                                <input type="text" name="city" value={profile.city} maxLength="50" className="form-control" onChange={handleChange} required id="id_city" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_nationality" className="required">
                                                    Nationality:
                                                </label>
                                                <input type="text" name="nationality" value={profile.nationality} maxLength="50" className="form-control" onChange={handleChange} required id="id_nationality" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_occupation" className="required">
                                                    Occupation:
                                                </label>
                                                <input type="text" name="occupation" value={profile.occupation} maxLength="50" className="form-control" onChange={handleChange} required id="id_occupation" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_seniority">Seniority:</label>
                                                <select name="seniority" className="form-control" id="id_seniority">
                                                    <option value="">---------</option>

                                                    <option value="1">Junior / Intern</option>

                                                    <option value="2">1-2 year&#x27;s experience</option>

                                                    <option value="3">2-5 year&#x27;s experience</option>

                                                    <option value="4" selected>
                                                        5+ year&#x27;s experience
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_website">Website:</label>
                                                <input type="url" name="website" value={profile.website} onChange={handleChange} maxLength="70" className="form-control" id="id_website" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_linkedin">Linkedin:</label>
                                                <input type="url" value={profile.linkedin} onChange={handleChange} name="linkedin" maxLength="50" className="form-control" id="id_linkedin" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_facebook">Facebook:</label>
                                                <input type="url" name="facebook" maxLength="50" value={profile.facebook} onChange={handleChange} className="form-control" id="id_facebook" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_github">Github:</label>
                                                <input type="url" name="github" maxLength="50" value={profile.github} onChange={handleChange} className="form-control" id="id_github" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_about" className="required">
                                                    About:
                                                </label>
                                                <div className="django-ckeditor-widget" data-field-id="id_about">
                                                    <textarea
                                                        name="about"
                                                        cols="40"
                                                        rows="10"
                                                        className="form-control"
                                                        required
                                                        id="id_about"
                                                        data-processed="0"
                                                        data-config='{"skin": "moono-lisa", "toolbar_Basic": [["Source", "-", "Bold", "Italic"]], "toolbar_Full": [["Styles", "Format", "Bold", "Italic", "Underline", "Strike", "SpellChecker", "Undo", "Redo"], ["Link", "Unlink", "Anchor"], ["Image", "Flash", "Table", "HorizontalRule"], ["TextColor", "BGColor"], ["Smiley", "SpecialChar"], ["Source"]], "toolbar": "Full", "height": 291, "width": "100%", "filebrowserWindowWidth": 940, "filebrowserWindowHeight": 725, "removePlugins": "exportpdf", "versionCheck": false, "language": "en-us"}'
                                                        data-external-plugin-resources="[]"
                                                        data-id="id_about"
                                                        data-type="ckeditortype"
                                                        value={profile.about}
                                                        onChange={handleChange}
                                                    >
                                                        &lt;p&gt;fref&lt;/p&gt;
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_phone_number">Phone number:</label>
                                                <input type="text" name="phone_number" maxLength="50" className="form-control" id="id_phone_number" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="profile_picture">Profile Picture:</label>
                                                <input type="file" name="profile_picture" className="form-control" id="profile_picture" onChange={handleImageUpload} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_gender" className="required">
                                                    Gender:
                                                </label>
                                                <select name="gender" className="form-control" onChange={handleChange} required id="id_gender">
                                                    <option value="">---------</option>

                                                    <option value="M" selected>
                                                        Male
                                                    </option>

                                                    <option value="F">Female</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="id_marital_status">Marital status:</label>
                                                <select name="marital_status" className="form-control" id="id_marital_status">
                                                    <option value="" selected>
                                                        ---------
                                                    </option>

                                                    <option value="Married">Married</option>

                                                    <option value="Unmarried">Unmarried</option>

                                                    <option value="Devorced">Devorced</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Skills:</label>
                                                <div className="form-check">
                                                    {skills.map((skill) => (
                                                        <div key={skill.id}>
                                                            <input type="checkbox" name="skills" value={skill.name} className="form-check" checked={profile.skills.includes(skill.name)} onChange={handleSkillChange} />
                                                            <label className="form-check-label">{skill.name}</label>
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

                                    <form method="post">
                                        <div className="row">
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}