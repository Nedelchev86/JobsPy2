import {react} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Index from "./components/home/Index";
import Blog from "./components/blog/Blog";
import CompanyList from "./components/companyList/CompanyList";
import JobseekersList from "./components/jobseekers/Jobseekers";
import JobSeekerDetails from "./components/jobseekersDetails/JobSeekerDetails";
import CompanyDetails from "./components/companyDetails/CompanyDetails";
import RegisterForm from "./components/register/RegisterForm";
import LoginModal from "./components/loginModal/LoginModal";
import {AuthProvider} from "./contexts/authContexts"; // Import AuthProvider
import Dashboard from "./components/dashboard/Dashboard";
import JobDetails from "./components/jobDetails/JobDetails";
import JobsFavoriteList from "./components/favoriteList/JobsFavoriteList";
import MenuLayout from "./components/dashboardMenu/MenuLayout";
import EditProfile from "./components/editProfile/EditProfile";
import CreateJob from "./components/createJob/CreateJob";
import ApplicantsList from "./components/applicantsList/ApplicantsList";
import CreatedJobs from "./components/createdJobs/CreatedJobs";
import ChangePassword from "./components/changePassword/ChangePassword";
import ApplicantsForJob from "./components/applicantForJob/ApplicantsForJob";
import EditJob from "./components/editJob/EditJob";
import JobsApplyed from "./components/applyedJobs/JobseekerApplyedJobs";
import {JobProvider} from "./contexts/JobContext";
import BlogDetails from "./components/blogDetails/BlogDetails";
import PageNotFound from "./components/PageNotFound";
import Notifications from "./components/notifications/Notifications";
import ContactUs from "./components/contacsUs/ContactUs";
import JobsList from "./components/jobList/JobsList";
import ScrollToTop from "./components/ScrolToTop"; // Import ScrollToTop
import CompanyGuard from "./routeGuards/CompanyGuard";
import JobseekerGuard from "./routeGuards/JobseekerGuard";
import GuestsGuard from "./routeGuards/GuestsGuard";
import PageNoAccess from "./components/PageNoAccess";

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
                    <Route
                        path="signup"
                        element={
                            <GuestsGuard>
                                <RegisterForm />
                            </GuestsGuard>
                        }
                    />
                    <Route path="login" element={<LoginModal />} />
                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    {/* <Route path="/bookmarked" element={<JobsFavoriteList />} /> */}
                    {/* <Route path="/profile/edit" element={<EditProfile />} /> */}
                    <Route path="jobs/:id" element={<JobDetails />} />
                    <Route
                        path="dashboard"
                        element={
                            <AuthGuard>
                                <MenuLayout />
                            </AuthGuard>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="edit" element={<EditProfile />} />
                        <Route
                            path="bookmarked"
                            element={
                                <JobseekerGuard>
                                    <JobsFavoriteList />
                                </JobseekerGuard>
                            }
                        />
                        <Route
                            path="applyed-jobs"
                            element={
                                <JobseekerGuard>
                                    <JobsApplyed />
                                </JobseekerGuard>
                            }
                        />
                        <Route
                            path="create-job"
                            element={
                                <CompanyGuard>
                                    <CreateJob />
                                </CompanyGuard>
                            }
                        />
                        <Route
                            path="edit-job/:id"
                            element={
                                <CompanyGuard>
                                    <EditJob />
                                </CompanyGuard>
                            }
                        />
                        <Route path="applicants" element={<ApplicantsList />} />
                        <Route
                            path="applicants/jobs/:id"
                            element={
                                <CompanyGuard>
                                    <ApplicantsForJob />
                                </CompanyGuard>
                            }
                        />
                        <Route
                            path="created-jobs"
                            element={
                                <CompanyGuard>
                                    <CreatedJobs />
                                </CompanyGuard>
                            }
                        />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="change-password" element={<ChangePassword />} />
                    </Route>
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="403" element={<PageNoAccess />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </JobProvider>
            <ScrollToTop />
        </AuthProvider>
    );
}

export default App;
