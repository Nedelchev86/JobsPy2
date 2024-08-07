import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
export default function BlogCard({blog}) {
    return (
        <div className="col-lg-6 col-12" key={blog.id}>
            <div className="single-news wow">
                <div className="image">
                    <img className="thumb" src={blog.image_url_1} alt="#" />
                </div>
                <div className="content-body">
                    <h4 className="title">
                        <Link to={`/blogs/${blog.id}/`}>{blog.title}</Link>
                    </h4>
                    <div className="meta-details">
                        <ul>
                            <li>
                                <Link to="#">
                                    <i className="lni lni-tag"></i> {blog.author.first_name} {blog.author.last_name}
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="lni lni-calendar"></i> {formatDate(blog.created_at)}
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="lni lni-eye"></i>
                                    {blog.views}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="truncate-overflow">
                        <p>{blog.description}</p>
                    </div>
                    <div className="button">
                        <Link to={`/blogs/${blog.id}/`} className="btn">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
            `;
        </div>
    );
}
