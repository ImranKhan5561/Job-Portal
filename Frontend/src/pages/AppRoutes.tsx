import { Divider } from "@mantine/core"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "../Components/footer/footer"
import Header from "../Components/Header/Header"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import FindJobs from "./findJobs"
import FindTalentPage from "./findTalentPage"
import HomePage from "./HomePage"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import PostJobPage from "./PostJobPage"
import ProfilePage from "./ProfilePage"
import SignupPage from "./SignupPage"
import TalentProfilePage from "./TalentProfilePage"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"
import ChatUI from "../Components/findTalent/ChatUI"

const AppRoutes=()=>{
    return <BrowserRouter>
    <div className="relative">
    <Header/>
    <Divider size="xs" mx="md"  />
    <Routes>
      <Route path='/find-jobs' element={<ProtectedRoute allowedRoles={["APPLICANT"]}><FindJobs/></ProtectedRoute>}/>
      <Route path="/find-talent" element={<FindTalentPage/>}/>
      <Route path="/chat" element={<ChatUI />} />
      <Route path="/chat/:name" element={<ChatUI/>}/>
      <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostJobPage/></ProtectedRoute>}/>
      <Route path="/jobs/:id" element={<JobDescPage/>}/>
      <Route path="/company/:name" element={<CompanyPage/>}/>
      <Route path="/posted-jobs/:id" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}><PostedJobPage/></ProtectedRoute>}/>
      <Route path="/job-history" element={<ProtectedRoute allowedRoles={["APPLICANT"]}><JobHistoryPage/></ProtectedRoute>}/>
      <Route path="/apply-job/:id" element={<ApplyJobPage/>}/>
      <Route path="/talent-profile/:id" element={<TalentProfilePage/>}/> 
      <Route path="/signup" element={<PublicRoute><SignupPage/></PublicRoute>}/> 
      <Route path="/login" element={<PublicRoute><SignupPage/></PublicRoute>}/> 
      <Route path="/profile" element={<ProfilePage/>}/> 
      <Route path="*" element={<HomePage/>}/>
    </Routes>
    <Footer/>
    </div>
   </BrowserRouter>
}
export default AppRoutes