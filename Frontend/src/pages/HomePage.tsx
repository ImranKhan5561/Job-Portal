import Companies from "../Components/LandingPage/Companies"
import DreamJob from "../Components/LandingPage/DreamJob"
import Jobcategory from "../Components/LandingPage/JobCategory"
import Subscribe from "../Components/LandingPage/Subcribe"
import Testimonials from "../Components/LandingPage/Testimonials"
import Working from "../Components/LandingPage/Working"


const Homepage=()=>{
    return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">

     
       <DreamJob/>
       <Companies/>
       <Jobcategory/>
       <Working/>
       <Testimonials/>
       <Subscribe/>
       
    </div>
    )
}
export default Homepage