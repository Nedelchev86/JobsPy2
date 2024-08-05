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

    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}blogs/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setBlog(data);
    //             console.log(data);
    //         })
    //         .catch((error) => console.error("Error fetching blogs:", error));
    // }, []);

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
                                                <Link to="blog-single.html">{blog.title}</Link>
                                            </h2>

                                            <ul className="custom-flex post-meta">
                                                <li>
                                                    <a href="#">
                                                        <i className="lni lni-calendar"></i>
                                                        {formatDate(blog.created_at)}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="lni lni-comments"></i>
                                                        {blog.comments_count} Comments
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="lni lni-eye"></i>
                                                        {blog.views} View
                                                    </a>
                                                </li>
                                            </ul>
                                            <p>{blog.description}</p>

                                            <div className="post-image">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <a href="#" className="mb-4">
                                                            <img src={blog.image_url_2} alt="#" />
                                                        </a>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-12">
                                                        <a href="#">
                                                            <img src={blog.image_url_3} alt="#" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <p>{blog.more_info}</p>

                                            <blockquote>
                                                <div className="icon">
                                                    <i className="lni lni-quotation"></i>
                                                </div>

                                                <span>{blog.blockquote}</span>
                                                <img className="shape" src="assets/images/testimonial/patern1.png" alt="#" />
                                            </blockquote>

                                            <div className="post-tags-media">
                                                {/* <div className="post-tags popular-tag-widget mb-xl-40">
                    <h5 className="tag-title">Related Tags</h5>
                    <div className="tags">
                        <a href="#">Announcement</a>
                        <a href="#">Experiences</a>
                        <a href="#">Market News</a>
                    </div>
                </div> */}
                                                <div className="post-social-media">
                                                    <h5 className="share-title">Social Share</h5>
                                                    <ul className="custom-flex">
                                                        <li>
                                                            <a href="#">
                                                                <i className="lni lni-twitter-original"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="lni lni-facebook-original"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="lni lni-instagram"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="comment-form">
                                            <h3 className="comment-reply-title">
                                                <span>Leave a comment</span>
                                            </h3>
                                            <CommentList blogId={id} commentsNumber={blog.comments_count} />

                                            {/* <AddCommentForm blogId={id} /> */}
                                            {/* <form action="#" method="POST">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="form-box form-group">
                            <input type="text" name="#" className="form-control form-control-custom" placeholder="Your Name" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="form-box form-group">
                            <input type="email" name="#" className="form-control form-control-custom" placeholder="Your Email" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-box form-group">
                            <input type="email" name="#" className="form-control form-control-custom" placeholder="Your Subject" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-box form-group">
                            <textarea name="#" rows="6" className="form-control form-control-custom" placeholder="Your Comments"></textarea>
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
            </form> */}
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
