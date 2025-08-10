import { jobList } from "../Data/JobData"
import JobCard from "../Components/findJobs/JobCard"

const CompanyJobs = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
    {
        jobList.map((job,index)=><JobCard key={index} {...job}/>)
      }
    </div>
  )
}

export default CompanyJobs