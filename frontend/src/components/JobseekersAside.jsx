import {Slide} from "react-awesome-reveal";
import {useState} from "react";
import {Form, Button, InputGroup, FormControl, Card} from "react-bootstrap";
import useFetch from "../hooks/useFetch";

import LastFiveBlogs from "./LastFiveBlogs";

export default function JobDetailsnAside({seniority, city, handleInputChange, handleSubmit}) {
    const {data: seniorityList, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}seniorities/`, []);
    return (
        <aside className="col-lg-4 col-md-12 col-12">
            <Slide direction="right" duration="1000" triggerOnce="true">
                <div className="sidebar">
                    {/* <div className="widget search-widget"> */}
                    <Card className="p-3 shadow-sm">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label>Search by Title</Form.Label>
                                    <InputGroup>
                                        <FormControl type="text" name="title" placeholder="Search by job title" value={title} onChange={handleInputChange} className="form-control" aria-label="Job Title" />
                                    </InputGroup>
                                </Form.Group> */}

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
                                <Form.Group controlId="formCity" className="mb-3">
                                    <Form.Label>Filter by City</Form.Label>
                                    <InputGroup>
                                        <FormControl type="text" name="city" placeholder="Enter city" value={city} onChange={handleInputChange} className="form-control" aria-label="City" />
                                    </InputGroup>
                                </Form.Group>
                                {/* 
                                <Form.Group controlId="formJobCategory" className="mb-3">
                                    <Form.Label>Filter by Job Category</Form.Label>
                                    <InputGroup>
                                        <Form.Select name="category" value={category} onChange={handleInputChange} className="form-control">
                                            <option value="">All Categories</option>
                                            <option value="1">Software</option>
                                            <option value="2">Design</option>
                                            <option value="3">Marketing</option>
                                            <option value="4">Finance</option>
                                          
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group> */}

                                {/* <Form.Group controlId="formSkills" className="mb-3">
                                <Form.Label>Filter by Skills</Form.Label>
                                <div>
                                    {skills.map((skill) => (
                                        <Form.Check key={skill.id} type="checkbox" label={skill.name} value={skill.name} checked={selectedSkills.includes(skill.id)} onChange={handleSkillChange} />
                                    ))}
                                </div>
                            </Form.Group> */}
                                <Button variant="primary" type="button" onClick={handleSubmit}>
                                    Clear
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* </div> */}

                    <LastFiveBlogs />

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
