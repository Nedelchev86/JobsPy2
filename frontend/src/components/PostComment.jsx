import React, {useState} from "react";
import {useAuth} from "../contexts/Contexts";
import useFetch from "../hooks/useFetch";
import {toast} from "react-toastify";

function AddCommentForm({blogId}) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {auth} = useAuth();

    const [formData, setFormData] = useState({
        post: blogId,
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        fetch("http://127.0.0.1:8000/api/blogs/comments/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${auth}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setFormData({
                    post: blogId,
                    title: "",
                    content: "",
                });

                toast.success("Comment added successfully");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                toast.error("Failed to add comment");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12">
                    <div className="form-box form-group">
                        <input type="title" name="title" className="form-control form-control-custom" placeholder="Your title" value={formData.title} onChange={handleChange} required />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-box form-group">
                        <textarea name="content" rows="6" className="form-control form-control-custom" placeholder="Your Comments" value={formData.content} onChange={handleChange} required></textarea>
                    </div>
                </div>
                <div className="col-12">
                    <div className="button">
                        <button type="submit" className="btn mouse-dir white-bg">
                            Post Comment <span className="dir-part"></span>
                        </button>
                    </div>
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </form>
    );
}

export default AddCommentForm;
