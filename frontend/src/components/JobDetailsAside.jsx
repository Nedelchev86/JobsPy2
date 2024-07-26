import {Slide} from "react-awesome-reveal";
import {useState} from "react";

export default function JobDescriptionAside({handleChangeUrl}) {
    const [title, setTitle] = useState(""); // For job title search
    const [seniority, setSeniority] = useState(""); // For seniority filter
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleInputChange = (e) => {
        console.log("title");
        const {name, value} = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "seniority") {
            setSeniority(value);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleChangeUrl(`${apiUrl}jobs/?title=${title}&seniority=${seniority}`);
    };

    return (
        <aside className="col-lg-4 col-md-12 col-12">
            <Slide direction="right" duration="1000" triggerOnce="true">
                <div className="sidebar">
                    <div className="widget search-widget">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Search by job title" value={title} onChange={handleInputChange} />
                            <button type="submit">
                                <i className="lni lni-search-alt"></i>
                            </button>
                        </form>
                    </div>

                    <div className="widget search-widget">
                        <form method="GET">
                            <select style={{maxWidth: "70%"}} className="form-select form-select-sm" name="seniority">
                                <option value="">All</option>

                                {/* {% for seniority in seniorities %}
        <option value="{{ seniority.name }}">{{ seniority.name }}</option>
    {% endfor %} */}
                            </select>
                            <div>
                                <button type="submit">Filter</button>
                            </div>
                        </form>
                    </div>
                    {/* 
{% include "jobs/category_slide.html" %} */}

                    <div className="widget popular-feeds">
                        <h5 className="widget-title">
                            <span>Latest Blog Posts with DRF</span>
                        </h5>
                        <div className="popular-feed-loop"></div>
                    </div>

                    <div className="widget popular-tag-widget">
                        <h5 className="widget-title">
                            <span>Popular Tags</span>
                        </h5>
                        <div className="tags">
                            <a href="#">ToDo</a>
                        </div>
                    </div>
                </div>
            </Slide>
        </aside>
    );
}
