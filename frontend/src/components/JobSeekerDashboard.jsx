import React from "react";
import {useAuth} from "../contexts/Contexts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Breadcrumbs from "./Breadcrumbs";
import JobSeekerMenu from "./JobseekerMenu";
import useFetch from "../hooks/useFetch";
import AddEducationModal from "./AddEducation";
import {Link} from "react-router-dom";
import DeleteEducationModal from "./DeleteEducationModal";
import EditEducationModal from "./EditEducationModal";
const JobSeekerDashboard = () => {
    const {user, isAuthenticated, fetchUserData, auth} = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [educationToDelete, setEducationToDelete] = useState(null);
    const [educationToEdit, setEducationToEdit] = useState(null);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        refetch();
    };

    const handleOpenDeleteModal = (education) => {
        setEducationToDelete(education);
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setEducationToDelete(null);
    };

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleOpenEditModal = (education) => {
        setEducationToEdit(education);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        refetch();
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            fetchUserData();
            console.log("test");
        }
    }, [isAuthenticated]);

    const handleDelete = async () => {
        if (!educationToDelete) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}educations/delete/${educationToDelete.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete education");
            }

            handleCloseDeleteModal();
            refetch();
        } catch (error) {
            console.error("Error deleting education:", error);
        }
    };
    const {data: educations, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}educations/user/${user.user.user}/`, []);

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cat-head job-category">
            <div className="row">
                <div className="col-md-4 col-12">
                    <a href="{% url 'jobs-apply' %}" className="single-cat wow fadeInUp">
                        <div className="icon">{/* <i>{{all_jobs_accepted}}</i> */}</div>
                        <h3>
                            Approved <br /> applications
                        </h3>
                    </a>
                </div>
                <div className="col-md-4 col-12">
                    <a href="{% url 'jobs-apply' %}" className="single-cat wow fadeInUp">
                        <div className="icon">{/* <i>{{all_jobs_pending}}</i> */}</div>
                        <h3>
                            Pending
                            <br /> applications
                        </h3>
                    </a>
                </div>

                <div className="col-md-4 col-12">
                    <a href="{% url 'jobs-apply' %}" className="single-cat wow fadeInUp">
                        <div className="icon">{/* <i>{{all_jobs_rejected}}</i> */}</div>
                        <h3>
                            Rejected
                            <br /> applications
                        </h3>
                    </a>
                </div>
            </div>

            <div className="resume ">
                <div className="container">
                    <div className="resume-inner">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <div className="inner-content">
                                    <div className="personal-top-content">
                                        <div className="row">
                                            <div className="col-lg-5 col-md-5 col-12">
                                                <div className="name-head">
                                                    {user.user.profile_picture && (
                                                        <a className="mb-2" href="#">
                                                            <img className="circle-54" src={`https://res.cloudinary.com/drjgddl0y/${user.user.profile_picture}`} alt="" />
                                                        </a>
                                                    )}

                                                    {!user.user.profile_picture && <img className="circle-54" src="/images/clients/default_profile.png" alt="" />}

                                                    <h4>
                                                        <a className="name" href="#">
                                                            {user.user.first_name && user.user.first_name}
                                                            {user.user.last_name && user.user.last_name}
                                                        </a>
                                                    </h4>
                                                    <p>
                                                        <a className="deg" href="#">
                                                            {user.user.occupation && user.user.occupation}
                                                        </a>
                                                    </p>
                                                    <ul className="social">
                                                        <li>
                                                            <a target="_blank" href={`${user.user.facebook && user.user.facebook} `}>
                                                                <i className="lni lni-facebook-original"></i>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a target="_blank" href={`${user.user.linkedin && user.user.linkedin}`}>
                                                                <i className="lni lni-linkedin-original"></i>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a target="_blank" href={`${user.user.github && user.user.github}`}>
                                                                <i className="lni lni-github"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-md-7 col-12">
                                                <div className="content-right">
                                                    <h5 className="title-main">Profile Information</h5>

                                                    <div className="single-list">
                                                        <h5 className="title">Location</h5>
                                                        <p>{user.user.city}</p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">E-mail</h5>
                                                        <p> {user.email} </p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">Phone</h5>
                                                        <p>{user.user.phone_number}</p>
                                                    </div>

                                                    <div className="single-list">
                                                        <h5 className="title">Website</h5>
                                                        <p>
                                                            <a target="_blank" href={user.user.website}>
                                                                Link
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="single-section">
                                        <h4>About</h4>
                                        <p className="font-size-4 mb-8">{user.user.about}</p>
                                    </div>

                                    <div className="single-section skill">
                                        <h4>Skills</h4>
                                        <ul className="list-unstyled d-flex align-items-center flex-wrap">
                                            {/* {%  for skill in request.user.jobseeker.skills.all %}
                                      <li>
                                        <a href="#">{{ skill}}</a>
                                    </li>
                                    {% endfor %} */}
                                        </ul>
                                    </div>

                                    <div className="single-section exprerience">
                                        {/* <a style="float: right" className="education-link" href="{% url 'add-work-experience' user.jobseeker.pk %}">
                                                                Add Work Experience{" "}
                                                            </a> */}
                                        <h4>Work Experience</h4>
                                        {/*
                                {% for experience in user.jobseeker.experience.all %}

                                <div className="single-exp mb-30">
                                    <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                                        <div className="image">
                                            {% if experience.image %}
                                                <img src="{{ experience.image}}" alt="#" width="80" height="80">
                                            {% else %}
                                            <img  width="80" height="80" src="{% static '/images/resume/work.jpg' %}" alt="#">
                                            {% endif %}
                                        </div>
                                        <div className="w-100 mt-n2">
                                            <h3 className="mb-0">
                                                <a href="#"> {{ experience.company }} </a>
                                            </h3>

                                            <p>{{ experience.description|safe }}</p>
                                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                                                <p>{{ experience.start_date}} - {{ experience.end_date}}</p>
                                                <div>
                                                <a  href="{% url 'edit-work-experience' experience.pk %}" className="education-edit font-size-3">Edit</a>
                                                 <a  style="color: red; margin-left: 20px" href="{% url 'delete work experience' experience.pk %}" className="education-edit font-size-3">Delete</a>
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                {% endfor %} */}
                                    </div>

                                    <div className="single-section education">
                                        <Link style={{float: "right"}} onClick={handleOpenModal} className="education-link" href="#">
                                            Add Education
                                        </Link>
                                        <AddEducationModal show={isModalOpen} handleClose={handleCloseModal} />
                                        <DeleteEducationModal show={isDeleteModalOpen} handleClose={handleCloseDeleteModal} />
                                        <EditEducationModal show={isEditModalOpen} handleClose={handleCloseEditModal} initialData={educationToEdit} />
                                        <h4>Education</h4>
                                        {educations.map((education) => (
                                            <div key={education.id} className="single-edu mb-30">
                                                <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                                                    <div className="image">{education.image ? <img src={`https://res.cloudinary.com/drjgddl0y/${education.image}`} alt="#" width="80" height="80" /> : <img src="/images/resume/education.jpg" alt="#" width="80" height="80" />}</div>
                                                    <div className="w-100 mt-n2">
                                                        <h3 className="mb-0">
                                                            <a href="#">{education.institution} </a>
                                                        </h3>
                                                        <p>{education.description}</p>
                                                        <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                                                            <p>
                                                                {education.start_date}- {education.end_date}
                                                            </p>
                                                            <div>
                                                                <Link to="#" onClick={() => handleOpenEditModal(education)} className="education-edit font-size-3">
                                                                    Edit
                                                                </Link>
                                                                <Link style={{color: "red", marginLeft: 20}} onClick={() => handleOpenDeleteModal(education)} className="education-edit font-size-3" to="#">
                                                                    Delete
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerDashboard;
