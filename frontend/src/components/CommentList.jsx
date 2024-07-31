import React, {useState} from "react";
import useFetch from "../hooks/useFetch";
import {useParams} from "react-router-dom";
import {useAuth} from "../contexts/Contexts";
import {API_URL} from "../config";
import {toast} from "react-toastify";

export default function CommentList({blogId, commentsNumber}) {
    const {data, loading, error, refetch} = useFetch(`${API_URL}blogs/${blogId}/comments/`, []);

    const [formError, setformError] = useState("");
    const [success, setSuccess] = useState("");
    const {auth, isAuthenticated} = useAuth();

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
        setformError("");
        setSuccess("");

        fetch(`${API_URL}blogs/comments/`, {
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
                refetch();
                console.log("Profile updated successfully:", data);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                toast.error("Failed to add comment");
            });
    };

    return (
        <>
            <div className="post-comments">
                <h3 className="comment-title">
                    <span>{commentsNumber} comments on this post</span>
                </h3>
                <ul className="comments-list">
                    {data.map((comment) => (
                        <li key={comment.id}>
                            <div className="comment-img">
                                {comment.author.profile_picture && <img src={`https://res.cloudinary.com/drjgddl0y/${comment.author.profile_picture}`} className="rounded-circle" alt="img" />}
                                {comment.author.image && <img src={`https://res.cloudinary.com/drjgddl0y/${comment.author.image}`} className="rounded-circle" alt="img" />}
                            </div>
                            <div className="comment-desc">
                                <div className="desc-top">
                                    <h6>
                                        {comment.author.first_name} {comment.author.last_name}
                                    </h6>
                                    <span className="date">{comment.created_at}</span>
                                    <a href="#" className="reply-link">
                                        <i className="lni lni-reply"></i>Reply
                                    </a>
                                </div>
                                <p>{comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-box form-group">
                            <input disabled={!isAuthenticated} type="title" name="title" className="form-control form-control-custom" placeholder="Your title" value={formData.title} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-box form-group">
                            <textarea disabled={!isAuthenticated} name="content" rows="6" className="form-control form-control-custom" placeholder="Your Comments" value={formData.content} onChange={handleChange} required></textarea>
                        </div>
                    </div>
                    <div className="col-12">
                        {!isAuthenticated && (
                            <div className="alert alert-danger" role="alert">
                                Login to post a comment
                            </div>
                        )}

                        <div className="button">
                            <button type="submit" className="btn mouse-dir white-bg" disabled={!isAuthenticated}>
                                Post Comment <span className="dir-part"></span>
                            </button>
                        </div>
                    </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
            </form>
        </>
    );
}
