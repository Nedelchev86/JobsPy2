import useFetch from "../../hooks/useFetch";
export default function EducationList({id}) {
    const {data: educations, error, isLoading, refetch} = useFetch(`${import.meta.env.VITE_API_URL}educations/user/${id}/`, []);

    return (
        <>
            {educations.map((education) => (
                <div key={education.id} className="single-edu mb-30">
                    <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                        <div className="image">{education.image ? <img src={`https://res.cloudinary.com/drjgddl0y/${education.image}`} alt="#" width="80" height="80" /> : <img src="/images/resume/education.jpg" alt="#" width="80" height="80" />}</div>
                        <div className="w-100 mt-n2">
                            <div className="mb-0">
                                <h5>{education.institution}</h5>
                            </div>
                            <p>{education.description}</p>
                            <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                                <p>
                                    {education.start_date} - {education.end_date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
