import React from "react";
import {useAuth} from "../../contexts/authContexts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import AddEducationModal from "../educations/AddEducation";
import {Link} from "react-router-dom";
import DeleteEducationModal from "../educations/DeleteEducationModal";
import EditEducationModal from "../educations/EditEducationModal";
import {deleteEducation, getJobseekersEducations} from "../../api/JobSeekerApi";
import SkillsModule from "../skills/Skills";
import {CLOUDINARY_URL} from "../../config";

const JobSeekerDashboard = () => {
    const {user, isAuthenticated, fetchUserData, auth} = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [educationToDelete, setEducationToDelete] = useState(null);
    const [educationToEdit, setEducationToEdit] = useState(null);

    const {data: educations, error, loading, refetch} = getJobseekersEducations(user.user.user);
    const {data, deleteLoading, deleteError, deleteRequest} = deleteEducation(educationToDelete?.id);

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
            deleteRequest();
            // const response = await fetch(`${import.meta.env.VITE_API_URL}jobseekers/educations/delete/${educationToDelete.id}/`, {
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${auth}`,
            //     },
            //     method: "DELETE",
            // });

            if (deleteError) {
                throw new Error("Failed to delete education");
            }

            handleCloseDeleteModal();
            refetch();
        } catch (error) {
            console.error("Error deleting education:", error);
        }
    };

    return (
        <div className="cat-head job-category">
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
                                                            <img className="circle-54" src={`${CLOUDINARY_URL}${user.user.profile_picture}`} alt="" />
                                                        </a>
                                                    )}

                                                    {!user.user.profile_picture && <img className="circle-54" src="/images/clients/default_profile.png" alt="" />}

                                                    <h4>
                                                        <p className="name" href="#">
                                                            {user.user.first_name && user.user.first_name} {user.user.last_name && user.user.last_name}
                                                        </p>
                                                    </h4>

                                                    <p className="deg" href="#">
                                                        {user.user.occupation && user.user.occupation}
                                                    </p>

                                                    <ul className="social">
                                                        <li>
                                                            <Link target="_blank" to={`${user.user.facebook && user.user.facebook} `}>
                                                                <i className="lni lni-facebook-original"></i>
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link target="_blank" to={`${user.user.linkedin && user.user.linkedin}`}>
                                                                <i className="lni lni-linkedin-original"></i>
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link target="_blank" to={`${user.user.github && user.user.github}`}>
                                                                <i className="lni lni-github"></i>
                                                            </Link>
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
                                                            <Link target="_blank" to={user.user.website}>
                                                                Link
                                                            </Link>
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
                                    <SkillsModule skills={user.user.skills} />

                                    <div className="single-section exprerience">
                                        <h4>Work Experience</h4>
                                        <p>TO DO</p>
                                    </div>

                                    <div className="single-section education">
                                        <Link style={{float: "right"}} onClick={handleOpenModal} className="education-link" href="#">
                                            Add Education
                                        </Link>
                                        <AddEducationModal show={isModalOpen} handleClose={handleCloseModal} />
                                        <DeleteEducationModal show={isDeleteModalOpen} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />
                                        <EditEducationModal show={isEditModalOpen} handleClose={handleCloseEditModal} initialData={educationToEdit} />
                                        <h4>Education</h4>
                                        {educations.map((education) => (
                                            <div key={education.id} className="single-edu mb-30">
                                                <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                                                    <div className="image">{education.image ? <img src={`${CLOUDINARY_URL}${education.image}`} alt="#" width="80" height="80" /> : <img src="/images/resume/education.jpg" alt="#" width="80" height="80" />}</div>
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
