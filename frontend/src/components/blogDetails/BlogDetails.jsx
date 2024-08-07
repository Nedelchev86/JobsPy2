import React from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import AddCommentForm from "./PostComment";
import CommentList from "./CommentList";
import {formatDate} from "../../utils/formatDate";
import {Link} from "react-router-dom";
import {getBlog} from "../../api/blogApi.js";
import Loading from "../loading/Loading.jsx";

export default function BlogDetails() {
    // const [blog, setBlog] = useState({});
    const {id} = useParams();

    const {data: blog, loading, error} = getBlog(id);

    return (
        <>
            <Breadcrumbs pageTitle="News and blogs / Django Rest Framework" pageInfo="First steps in Django Rest Framework" />

            <section className="section blog-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 col-12">
                            {loading ? (
                                <Loading />
                            ) : (
                                <div className="single-inner">
                                    <div className="post-thumbnils">
                                        <img src={blog.image_url_1} alt="#" />
                                    </div>
                                    <div className="post-details">
                                        <div className="detail-inner">
                                            <h2 className="post-title">
                                                <Link to="#">{blog.title}</Link>
                                            </h2>

                                            <ul className="custom-flex post-meta">
                                                <li>
                                                    <Link to="#">
                                                        <i className="lni lni-calendar"></i>
                                                        {formatDate(blog.created_at)}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i className="lni lni-comments"></i>
                                                        {blog.comments_count} Comments
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i className="lni lni-eye"></i>
                                                        {blog.views} View
                                                    </Link>
                                                </li>
                                            </ul>
                                            <p>{blog.description}</p>

                                            <div className="post-image">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <Link to="#" className="mb-4">
                                                            <img src={blog.image_url_2} alt="#" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <Link to="#">
                                                            <img src={blog.image_url_3} alt="#" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <p>{blog.more_info}</p>

                                            <blockquote>
                                                <div className="icon">
                                                    <i className="lni lni-quotation"></i>
                                                </div>

                                                <span>{blog.blockquote}</span>
                                            </blockquote>
                                        </div>

                                        <div className="comment-form">
                                            <h3 className="comment-reply-title">
                                                <span>Leave a comment</span>
                                            </h3>
                                            <CommentList blogId={id} commentsNumber={blog.comments_count} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
