import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities";

const PostedJobCard = (props:any) => {

  const {id}=useParams();
  return (
    <Link to={`/posted-jobs/${props.id}`} className={` rounded-xl p-2 border-l-2 border-l-bright-sun-400 ${props.id==id?"bg-bright-sun-400 text-black":"bg-mine-shaft-900 text-mine-shaft-300"}`}>
        <div className="text-sm font-semibold">{props.jobTitle}</div>
        <div className="text-xs  font-medium">{props.location}</div>
        <div className="text-xs ">{props.jobStatus=="DRAFT"?"DRAFTED":props.jobStatus=="CLOSED"?"Closed":"Posted"} {timeAgo(props.postTime)}</div>
    </Link>
  )
}

export default PostedJobCard