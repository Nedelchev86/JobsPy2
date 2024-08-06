import React, {useState, useEffect} from "react";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {getAllBlogs} from "../../api/blogApi.js";
import Loading from "../loading/Loading.jsx";
import BlogCard from "./BlogCard.jsx";

const Blog = () => {
    // const [blogs, setBlogs] = useState([]);

    const {data: blogs, loading, error} = getAllBlogs();


    return (
        <>
            <Breadcrumbs pageTitle="News and blogs / Django Rest Framework" pageInfo="First steps in Django Rest Framework" />

            <section className="section latest-news-area blog-list">
                <div className="container">
                    <div className="row">
                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="col-lg-8 col-md-7 col-12">
                                <div id="blog-list" className="row">
                                    {blogs.map((blog) => (
                                        <BlogCard blog={blog} key={blog.id} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <aside className="col-lg-4 col-md-5 col-12">
                            <div className="sidebar">
                                <div className="widget search-widget">
                                    <h5 className="widget-title">
                                        <span>Search ...</span>
                                    </h5>
                                    <form action="#">
                                        <input type="text" placeholder="Search Here..." />
                                        <button type="submit">
                                            <i className="lni lni-search-alt"></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="widget popular-feeds">
                                    <h5 className="widget-title">
                                        <span>Popular Feeds</span>
                                    </h5>
                                </div>
                                <div className="widget categories-widget">
                                    <h5 className="widget-title">
                                        <span>Categories</span>
                                    </h5>
                                </div>
                                <div className="widget popular-tag-widget">
                                    <h5 className="widget-title">
                                        <span>Popular Tags</span>
                                    </h5>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
