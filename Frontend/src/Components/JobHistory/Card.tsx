import { Button, Divider,Text } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { formatInterviewTime, timeAgo } from "../../Services/Utilities"
import { changeProfile } from "../../Slices/ProfileSlice"
import { useDispatch, useSelector } from "react-redux"
import { changeAppStatus } from "../../Services/JobService"
import { errorNotification, successNotification } from "../../Services/NotificationService"

const Card = (props:any) => {
  const dispatch=useDispatch();
  const profile=useSelector((state:any)=>state.profile);
  const userApplication = props.applicants?.find(
    (applicant: any) => applicant.applicantId === profile.id
  );

  const handleOffer = (value: string) => {
    let interview: any = { id: props.id, applicantId: profile.id, applicationStatus: value };

    changeAppStatus(interview)
        .then(() => {
            if (value === "OFFER_ACCEPTED") {
                successNotification("Success", "We will connect to you through email or phone number shortly");
            } else if (value === "OFFER_REJECTED") {
                successNotification("Offer Declined", "Thank you for the application, we will not proceed with your application");
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
        .catch((err) => {
            errorNotification("Error", err.response.data.errorMessage);
        });
};


const handleSaveJob = () => {
  let savedJobs: any = [...(profile.savedJobs ?? [])];

  if (savedJobs.includes(props.id)) {
    savedJobs = savedJobs.filter((id: any) => id !== props.id);
  } else {
    savedJobs = [...savedJobs, props.id];
  }

  const updatedProfile = { ...profile, savedJobs };
  dispatch(changeProfile(updatedProfile));
};

    return (
      <div className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_2px_yellow] transition duration-300 ease-in-out !shadow-bright-sun-400">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-md">
                <img className="h-7" src={`/icons/${props.company}.png`} alt="microsoft" /></div>
              <div>
                  <div className="font-semibold">{props.jobTitle}</div>
                  <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants?props.applicants.length:0}Applicants</div>
              </div>
          </div>
          {profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer"/>:<IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"/>}
        </div>
  
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
  
  <div>{props.experience}</div>
  <div>{props.jobType}</div>
  <div>{props.location}</div>
  
        </div>
        <Text className="!text-xs !text-justify !text-mine-shaft-300" lineClamp={3}>
  {props.about}
        </Text>
         <Divider size="sm" color="mineShaft.7" />
  
  
        <div className="flex justify-between">
  <div className="font-semibold text-mine-shaft-200">
    &#8377; {props.packageOffered} LPA
  </div>
  <div className="flex gap-1text-xs text-mine-shaft-400 items-center">
   <IconClockHour3 className="h-5 w-5" stroke={1.5}/>{props.applied||props.interviewing?"Applied":props.offered?"Interviewed":"Posted"} {timeAgo(props.postTime)}
  </div>
  
        </div>
        {
          props.offered||props.interviewing&&<Divider color="mineShaft.7" />
        }
  {
    props.offered&&<div className="flex gap-2">
         <Button color="brightSun.4" variant="outline" onClick={()=>{handleOffer("OFFER_ACCEPTED")}} fullWidth>Accept</Button>
          <Button color="brightSun.4" variant="light" fullWidth onClick={()=>{handleOffer("SETTLED")}}>Reject</Button>
    </div>
  }
  
  {
    props.interviewing&&<div className="flex gap-1  text-sm  items-center">
    <IconCalendarMonth className="text-bright-sun-400 w-5 h-5" stroke={1.5}/> {formatInterviewTime(userApplication.interviewTime)}
               </div>
  }
  <Link to={`/jobs/${props.id}`} >
      <Button fullWidth color="brightSun.4" size="md" variant="outline">View Job</Button>
      </Link>
        </div>
    )
  }
  
  export default Card