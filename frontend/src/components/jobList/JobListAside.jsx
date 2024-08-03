import {Slide} from "react-awesome-reveal";
import {useState} from "react";
import {Form, Button, InputGroup, FormControl, Card} from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import LastFiveBlogs from "../lastFiveBlogs/LastFiveBlogs";
import JobsCategory from "./JobsCategory";
import PopularTags from "../popularTag/PopularTag";

export default function JobListAside({title, seniority, location, category, skill, handleInputChange, handleSubmit}) {
    const {data: seniorityList, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}seniorities/`, []);

    return (
        <aside className="col-lg-4 col-md-12 col-12">
            <Slide direction="right" duration="1000" triggerOnce="true">
                <div className="sidebar">
                    <Card className="p-3 shadow-sm">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label>Search by Title</Form.Label>
                                    <InputGroup>
                                        <FormControl type="text" name="title" placeholder="Search by job title" value={title} onChange={handleInputChange} className="form-control" aria-label="Job Title" />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formSeniority" className="mb-3">
                                    <Form.Label>Filter by Seniority</Form.Label>
                                    <InputGroup>
                                        <Form.Select name="seniority" value={seniority} onChange={handleInputChange} className="form-control">
                                            <option value="">All</option>
                                            {seniorityList.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formLocation" className="mb-3">
                                    <Form.Label>Filter by City</Form.Label>
                                    <InputGroup>
                                        <FormControl type="text" name="location" placeholder="Enter city" value={location} onChange={handleInputChange} className="form-control" aria-label="Location" />
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" type="button" onClick={handleSubmit}>
                                    Clear
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <JobsCategory category={category} handleInputChange={handleInputChange} />

                    <LastFiveBlogs />
                </div>
            </Slide>
        </aside>
    );
}
