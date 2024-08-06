// import React, {useState, useEffect} from "react";
// import {useAuth} from "../../contexts/authContexts";
// import {useNavigate} from "react-router-dom";
// import Loading from "../loading/Loading";
// import {toast} from "react-toastify";

// export default function EditCompany() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [errors, setErrors] = useState({});
//     const {auth, isAuthenticated} = useAuth();
//     const [skills, setSkills] = useState([]);
//     const [company, setCompany] = useState({
//         name: "",
//         description: "",
//         location: "",
//         phone: "",
//         address: "",
//         email: "",
//         website_url: "",
//         linkedin_url: "",
//         facebook_url: "",
//         employees: 0,
//         foundation_year: 0,
//         skills: [],
//         image: "",
//     });

//     useEffect(() => {
//         // Fetch skills from the API
//         fetch(`${import.meta.env.VITE_API_URL}skills/`)
//             .then((response) => response.json())
//             .then((data) => setSkills(data))
//             .catch((error) => console.error("Error fetching skills:", error));
//     }, []);

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_API_URL}user/company/update/`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${auth}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => setCompany(data))
//             .catch((error) => {
//                 toast.error("Failed to edit company profile");
//                 console.error("Error fetching profile data:", error);
//             });
//         setLoading(false);
//     }, [auth]);

//     const handleSkillChange = (e) => {
//         const {value, checked} = e.target;
//         if (checked) {
//             setCompany((prevProfile) => ({
//                 ...prevProfile,
//                 skills: [...prevProfile.skills, value],
//             }));
//         } else {
//             setCompany((prevProfile) => ({
//                 ...prevProfile,
//                 skills: prevProfile.skills.filter((skill) => skill !== value),
//             }));
//         }
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         setCompany((prevState) => ({
//             ...prevState,
//             image: file,
//         }));
//     };

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         setCompany((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         const addFormData = (key, value) => {
//             if (value !== null && value !== undefined) {
//                 formData.append(key, value);
//             }
//         };

//         addFormData("image", company.image);
//         addFormData("name", company.name);
//         addFormData("description", company.description);
//         addFormData("location", company.location);
//         addFormData("phone", company.phone);
//         addFormData("address", company.address);
//         addFormData("email", company.email);
//         addFormData("website_url", company.website_url);
//         addFormData("linkedin_url", company.linkedin_url);
//         addFormData("facebook_url", company.facebook_url);
//         addFormData("employees", company.employees);
//         addFormData("foundation_year", company.foundation_year);
//         company.skills.forEach((skill) => {
//             formData.append("skills", skill);
//         });

//         fetch(`${import.meta.env.VITE_API_URL}user/company/update/`, {
//             headers: {
//                 Authorization: `Bearer ${auth}`,
//             },
//             method: "PUT",
//             body: formData,
//         })
//             .then((response) => response.json().then((data) => ({status: response.status, body: data})))
//             .then(({status, body}) => {
//                 if (status === 400) {
//                     console.log("errors" + errors);
//                     console.log(body);
//                     setErrors(body);
//                     toast.error("Failed to edit profile");
//                 } else {
//                     console.log("Profile updated successfully:", body);
//                     toast.success("Profile updated successfully");
//                     navigate("/dashboard");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//                 toast.error("Failed to edit profile");
//             });
//     };

//     return (
//         <>
//             {loading ? (
//                 <Loading />
//             ) : (
//                 <div className="change-password section">
//                     <div className="container">
//                         <div className="alerts-inner">
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <div className="password-content">
//                                         <h3>Edit Profile</h3>
//                                         <p>Here you can edit your Profile.</p>

//                                         <form onSubmit={handleSubmit} encType="multipart/form-data">
//                                             <div className="row">
//                                                 <div className="form-group">
//                                                     <label htmlFor="id_name" className="required">
//                                                         Name:
//                                                     </label>
//                                                     <input type="text" name="name" maxLength="40" className="form-control" required id="id_name" value={company.name} onChange={handleChange} />
//                                                     {errors.name && <div className="error">{errors.name.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_description" className="required">
//                                                         Description:
//                                                         <textarea name="description" cols="100" rows="10" maxLength="40" className="form-control" required id="id_description" value={company.description} onChange={handleChange} />
//                                                     </label>
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_location" className="required">
//                                                         Location:
//                                                     </label>
//                                                     <input type="text" name="location" maxLength="40" className="form-control" required id="id_location" value={company.location} onChange={handleChange} />
//                                                     {errors.location && <div className="error">{errors.location.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_phone">Phone:</label>
//                                                     <input type="text" name="phone" maxLength="20" className="form-control" id="id_phone" value={company.phone || ""} onChange={handleChange} />
//                                                     {errors.phone && <div className="error">{errors.phone.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_address" className="required">
//                                                         Address:
//                                                     </label>
//                                                     <input type="text" name="address" maxLength="200" className="form-control" required id="id_address" value={company.address} onChange={handleChange} />
//                                                     {errors.address && <div className="error">{errors.address.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_email" className="required">
//                                                         Email:
//                                                     </label>
//                                                     <input type="email" name="email" maxLength="254" className="form-control" required id="id_email" value={company.email} onChange={handleChange} />
//                                                     {errors.email && <div className="error">{errors.email.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_image">Image:</label>
//                                                     <input type="file" name="image" className="form-control" id="id_image" onChange={handleImageUpload} />
//                                                     {errors.image && <div className="error">{errors.image.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_website_url">Website URL:</label>
//                                                     <input type="url" name="website_url" maxLength="200" className="form-control" id="id_website_url" value={company.website_url || ""} onChange={handleChange} />
//                                                     {errors.website_url && <div className="error">{errors.website_url.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_linkedin_url">LinkedIn URL:</label>
//                                                     <input type="url" name="linkedin_url" maxLength="200" className="form-control" id="id_linkedin_url" value={company.linkedin_url || ""} onChange={handleChange} />
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_facebook_url">Facebook URL:</label>
//                                                     <input type="url" name="facebook_url" maxLength="200" className="form-control" id="id_facebook_url" value={company.facebook_url || ""} onChange={handleChange} />
//                                                     {errors.facebook_url && <div className="error">{errors.facebook_url.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_employees" className="required">
//                                                         Employees:
//                                                     </label>
//                                                     <input type="number" name="employees" min="0" className="form-control" required id="id_employees" value={company.employees} onChange={handleChange} />
//                                                     {errors.employees && <div className="error">{errors.employees.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label htmlFor="id_foundation_year" className="required">
//                                                         Foundation Year:
//                                                     </label>
//                                                     <input type="number" name="foundation_year" min="0" className="form-control" required id="id_foundation_year" value={company.foundation_year} onChange={handleChange} />
//                                                     {errors.foundation_year && <div className="error">{errors.foundation_year.join(", ")}</div>}
//                                                 </div>

//                                                 <div className="form-group">
//                                                     <label className="required">Technologies:</label>
//                                                     <div className="form-check">
//                                                         {skills.map((skill) => (
//                                                             <div key={skill.id}>
//                                                                 <label htmlFor={skill.name} className="form-check-label">
//                                                                     {skill.name}
//                                                                 </label>
//                                                                 <input id={skill.name} type="checkbox" name="skills" value={skill.name} className="form-check" checked={company.skills.includes(skill.name)} onChange={handleSkillChange} />
//                                                             </div>
//                                                         ))}
//                                                         {errors.skills && <div className="error">{errors.skills.join(", ")}</div>}
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-lg-12">
//                                                     <div className="button">
//                                                         <button className="btn">Save</button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContexts";
import {useNavigate} from "react-router-dom";
import Loading from "../loading/Loading";
import {toast} from "react-toastify";
import {useForm, Controller} from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import useFetchWithToken from "../../hooks/useFetchWithToken";
import usePut from "../../hooks/usePut";
import {getAllSkills} from "../../api/commonApi";
import {getCompanyForEdit, putCompanyUpdate} from "../../api/companyApi";

export default function EditCompany() {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const {data: skills} = getAllSkills();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {
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
            image: "",
        },
        mode: "onBlur",
    });

    // Fetch current company data
    // const {data: companyData, loading: profileLoading} = useFetchWithToken(`${import.meta.env.VITE_API_URL}user/company/update/`);
    const {data: companyData, loading: profileLoading} = getCompanyForEdit();
    // const {put} = usePut(`${import.meta.env.VITE_API_URL}company/update/`);
    const {put} = putCompanyUpdate();

    useEffect(() => {
        if (companyData) {
            Object.keys(companyData).forEach((key) => {
                setValue(key, companyData[key]);
            });
        }
    }, [companyData, setValue]);

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const formDataObj = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] === null || formData[key] === undefined) {
                    formDataObj.append(key, "");
                } else {
                    if (key === "skills") {
                        formData[key].forEach((skill) => formDataObj.append("skills", skill));
                    } else if (key === "image") {
                        // Check if profile_picture is an object (File) or a string (URL)
                        if (typeof formData.image === "string") {
                            // If it's a string, append it directly
                            formDataObj.append("image", formData.image);
                        } else if (formData.image[0]) {
                            // If it's a File object, append the file
                            console.log(formData.image[0]);
                            formDataObj.append("image", formData.image[0]);
                        }
                    } else {
                        formDataObj.append(key, formData[key]);
                    }
                }
            });

            await put(formDataObj);
            toast.success("Profile updated successfully");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Failed to edit profile");
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {profileLoading ? (
                <Loading />
            ) : (
                <div className="change-password section">
                    <div className="container">
                        <div className="alerts-inner">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="password-content">
                                        <h3>Edit Company</h3>
                                        <p>Here you can edit your Company.</p>

                                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="id_name" className="required">
                                                        Name:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("name", {
                                                            required: "Name is required",
                                                            maxLength: {
                                                                value: 40,
                                                                message: "Name cannot exceed 40 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[A-Z].*$/,
                                                                message: "Name must start with an uppercase ",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                                        id="id_name"
                                                    />
                                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_description" className="required">
                                                        Description:
                                                    </label>
                                                    <textarea
                                                        {...register("description", {
                                                            required: "Description is required",
                                                            maxLength: {
                                                                value: 500,
                                                                message: "Description cannot exceed 500 characters",
                                                            },
                                                        })}
                                                        cols="40"
                                                        rows="10"
                                                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                                        id="id_description"
                                                    />
                                                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_location" className="required">
                                                        Location:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("location", {
                                                            required: "Location is required",
                                                            maxLength: {
                                                                value: 40,
                                                                message: "Location cannot exceed 40 characters",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.location ? "is-invalid" : ""}`}
                                                        id="id_location"
                                                    />
                                                    {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_phone">Phone:</label>
                                                    <input
                                                        type="text"
                                                        {...register("phone", {
                                                            maxLength: {
                                                                value: 50,
                                                                message: "Phone number cannot exceed 50 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[0-9]*$/,
                                                                message: "Phone number can only contain numbers",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                        id="id_phone"
                                                    />
                                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_address" className="required">
                                                        Address:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("address", {
                                                            required: "Address is required",
                                                            maxLength: {
                                                                value: 200,
                                                                message: "Address cannot exceed 200 characters",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                                        id="id_address"
                                                    />
                                                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_email" className="required">
                                                        Email:
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            maxLength: {
                                                                value: 254,
                                                                message: "Email cannot exceed 254 characters",
                                                            },
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Invalid email address",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                        id="id_email"
                                                    />
                                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_image">Image:</label>
                                                    <input type="file" {...register("image")} className={`form-control ${errors.image ? "is-invalid" : ""}`} id="id_image" />
                                                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_website_url">Website URL:</label>
                                                    <input
                                                        type="url"
                                                        {...register("website_url", {
                                                            maxLength: {
                                                                value: 200,
                                                                message: "URL cannot exceed 200 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Invalid URL format",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.website_url ? "is-invalid" : ""}`}
                                                        id="id_website_url"
                                                    />
                                                    {errors.website_url && <div className="invalid-feedback">{errors.website_url.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_linkedin_url">LinkedIn URL:</label>
                                                    <input
                                                        type="url"
                                                        {...register("linkedin_url", {
                                                            maxLength: {
                                                                value: 200,
                                                                message: "URL cannot exceed 200 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Invalid URL format",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.linkedin_url ? "is-invalid" : ""}`}
                                                        id="id_linkedin_url"
                                                    />
                                                    {errors.linkedin_url && <div className="invalid-feedback">{errors.linkedin_url.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="id_facebook_url">Facebook URL:</label>
                                                    <input
                                                        type="url"
                                                        {...register("facebook_url", {
                                                            maxLength: {
                                                                value: 200,
                                                                message: "URL cannot exceed 200 characters",
                                                            },
                                                            pattern: {
                                                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                                message: "Invalid URL format",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.facebook_url ? "is-invalid" : ""}`}
                                                        id="id_facebook_url"
                                                    />
                                                    {errors.facebook_url && <div className="invalid-feedback">{errors.facebook_url.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="required" htmlFor="id_employees">
                                                        Number of Employees:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        {...register("employees", {
                                                            required: "Email is required",
                                                            min: {
                                                                value: 1,
                                                                message: "Number of employees must be at least 1",
                                                            },
                                                            max: {
                                                                value: 100000,
                                                                message: "Number of employees cannot exceed 100000",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.employees ? "is-invalid" : ""}`}
                                                        id="id_employees"
                                                    />
                                                    {errors.employees && <div className="invalid-feedback">{errors.employees.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label className="required" htmlFor="id_foundation_year">
                                                        Foundation Year:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        {...register("foundation_year", {
                                                            required: "Email is required",
                                                            min: {
                                                                value: 1900,
                                                                message: "Foundation year cannot be before 1900",
                                                            },
                                                            max: {
                                                                value: new Date().getFullYear(),
                                                                message: "Foundation year cannot be in the future",
                                                            },
                                                        })}
                                                        className={`form-control ${errors.foundation_year ? "is-invalid" : ""}`}
                                                        id="id_foundation_year"
                                                    />
                                                    {errors.foundation_year && <div className="invalid-feedback">{errors.foundation_year.message}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label>Technologies:</label>
                                                    <div className="form-check">
                                                        {skills.map((skill) => (
                                                            <div key={skill.id}>
                                                                <input type="checkbox" {...register("skills")} value={skill.name} className="form-check" />
                                                                <label className="form-check-label">{skill.name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="button">
                                                        <button type="submit" className="btn" disabled={isLoading}>
                                                            {isLoading ? "Submitting..." : "Save"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
