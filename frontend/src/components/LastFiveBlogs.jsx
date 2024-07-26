import useFetch from "../hooks/useFetch";

export default function LastFiveBlogs() {
    const {data: blogs, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}blogs/latest-blog-posts/`, []);

    return (
        <div className="widget popular-feeds">
            <h5 className="widget-title">
                <span>Latest Blog Posts </span>
            </h5>
            <div className="popular-feed-loop">
                {blogs.map((blog) => (
                    <div key={blog.id} className="single-popular-feed">
                        <div className="feed-desc">
                            <h6 className="post-title">
                                <a href={`/blogs/${blog.id}/`}>{blog.title}</a>
                            </h6>
                            <span className="time">
                                <i className="lni lni-calendar"></i> {blog.created_at}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
