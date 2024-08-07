import {Slide} from "react-awesome-reveal";
import {useState} from "react";
import {Form, Button, InputGroup, FormControl, Card} from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import LastFiveBlogs from "../lastFiveBlogs/LastFiveBlogs";
import JobSeekersPopularTags from "../popularTag/JobSeekersPopularTag";
import {API_URL} from "../../config";

export default function JobSeekersAside({seniority, city, skill, handleInputChange, handleSubmit}) {
    const {data: seniorityList, error, isLoading, refetch} = useFetch(`${API_URL}seniorities/`, []);
    return (
        <aside className="col-lg-4 col-md-12 col-12">
            <Slide direction="right" duration="1000" triggerOnce="true">
                <div className="sidebar">
                    {/* <div className="widget search-widget"> */}
                    <Card className="p-3 shadow-sm">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
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

                                <Button variant="primary" type="button" onClick={handleSubmit}>
                                    Clear
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    {/* </div> */}
                    <JobSeekersPopularTags />

                    <LastFiveBlogs />
                </div>
            </Slide>
        </aside>
    );
}
