import {Slide} from "react-awesome-reveal";
import {useState} from "react";
import {Form, Button, InputGroup, FormControl, Card} from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

import LastFiveBlogs from "../lastFiveBlogs/LastFiveBlogs";
import JobSeekersPopularTags from "../popularTag/JobSeekersPopularTag";

export default function JobSeekerDetailsAside({seniority, city, handleInputChange, handleSubmit}) {
    const {data: seniorityList, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}seniorities/`, []);
    return (
        <aside className="col-lg-4 col-md-12 col-12">
            <Slide direction="right" duration="1000" triggerOnce="true">
                <div className="sidebar">
                    <JobSeekersPopularTags />

                    <LastFiveBlogs />
                </div>
            </Slide>
        </aside>
    );
}
