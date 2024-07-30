import {react} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Index from "./components/Index";
import Blog from "./components/blog/Blog";
import CompanyList from "./components/CompanyList";
import JobseekersList from "./components/Jobseekers";
import JobSeekerDetails from "./components/JobSeekerDetails";
import JobsList from "./components/JobsList";
import CompanyDetails from "./components/CompanyDetails";
import RegisterForm from "./components/register/RegisterForm";
import LoginModal from "./components/loginModal/LoginModal";
import {AuthProvider} from "./contexts/Contexts"; // Import AuthProvider
import Dashboard from "./components/Dashboard";
import JobDetails from "./components/JobDetails";
import JobsFavoriteList from "./components/JobsFavoriteList";
import Breadcrumbs from "./components/Breadcrumbs";
import JobSeekerDashboard from "./components/JobSeekerDashboard";
import JobSeekerLayout from "./components/JobSeekerLayout";
import EditProfile from "./components/EditProfile";
import CreateJob from "./components/CreateJob";
import ApplicantsList from "./components/ApplicantsList";
import CreatedJobs from "./components/CreatedJobs";
import ChangePassword from "./components/ChangePassword";
import CompanyNotifications from "./components/CompanyNotifications";
import ApplicantsForJob from "./components/ApplicantsForJob";
import EditJob from "./components/EditJob";
import JobsApplyed from "./components/JobseekerApplyedJobs";
import {JobProvider} from "./contexts/JobContext";
import BlogDetails from "./components/BlogDetails";
import PageNotFound from "./components/PageNotFound";
import Notifications from "./components/Notifications";
import ContactUs from "./components/contacsUs/ContactUs";
import ScrollToTop from "./components/ScrolToTop"; // Import ScrollToTop

function App() {
    return (
        <AuthProvider>
            <JobProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="blogs" element={<Blog />} />
                    <Route path="blogs/:id" element={<BlogDetails />} />
                    <Route path="companies" element={<CompanyList />} />
                    <Route path="companies/:id" element={<CompanyDetails />} />
                    <Route path="jobseekers" element={<JobseekersList />} />
                    <Route path="jobseekers/:id" element={<JobSeekerDetails />} />
                    <Route path="jobs" element={<JobsList />} />
                    {/* <Route path="jobs/category/:id" element={<JobsByCategory />} /> */}
                    <Route path="signup" element={<RegisterForm />} />
                    <Route path="login" element={<LoginModal />} />
                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    {/* <Route path="/bookmarked" element={<JobsFavoriteList />} /> */}
                    {/* <Route path="/profile/edit" element={<EditProfile />} /> */}
                    <Route path="jobs/:id" element={<JobDetails />} />
                    <Route path="dashboard" element={<JobSeekerLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="edit" element={<EditProfile />} />
                        <Route path="bookmarked" element={<JobsFavoriteList />} />
                        <Route path="applyed-jobs" element={<JobsApplyed />} />
                        <Route path="create-job" element={<CreateJob />} />
                        <Route path="edit-job/:id" element={<EditJob />} />
                        <Route path="applicants" element={<ApplicantsList />} />
                        <Route path="applicants/jobs/:id" element={<ApplicantsForJob />} />
                        <Route path="created-jobs" element={<CreatedJobs />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="change-password" element={<ChangePassword />} />
                    </Route>
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </JobProvider>
            <ScrollToTop />
        </AuthProvider>
    );
}

export default App;
