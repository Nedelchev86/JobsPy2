import {useAuth} from "../../contexts/authContexts";
import JobSeekerDashboard from "./JobSeekerDashboard";
import CompanyDashboard from "./CompanyDashboard";
export default function Dashboard() {
    const {user, isAuthenticated, fetchUserData} = useAuth();

    if (!isAuthenticated) {
        return <div>Not authenticated...</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return <div>{user.user_type === "company" ? <CompanyDashboard /> : <JobSeekerDashboard />}</div>;
}
