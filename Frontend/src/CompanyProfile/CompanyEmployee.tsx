import { talents } from "../Data/TalentData"
import TalentCard from "../Components/findTalent/TalentCard"

const CompanyEmployee = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-10 ">
  {
      talents.map((talent,index)=>index<6&&<TalentCard key={index} {...talent}/>)
  }   
  </div>
  )
}

export default CompanyEmployee