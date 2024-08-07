import {getEducationsOfJobseeker} from "../../api/JobSeekerApi";
import {CLOUDINARY_URL} from "../../config";
export default function EducationList({id}) {
    const {data: educations, error, isLoading, refetch} = getEducationsOfJobseeker(id);

    return (
        <>
            {educations.map((education) => (
                <div key={education.id} className="single-edu mb-30">
                    <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                        <div className="image">{education.image ? <img src={`${CLOUDINARY_URL}${education.image}`} alt="#" width="80" height="80" /> : <img src="/images/resume/education.jpg" alt="#" width="80" height="80" />}</div>
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
