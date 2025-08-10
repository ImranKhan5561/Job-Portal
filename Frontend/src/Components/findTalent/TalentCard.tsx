import { Avatar, Button, Divider,Modal,Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../../Services/ProfileService"
import { changeAppStatus } from "../../Services/JobService"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities"


const TalentCard = (props:any) => {
  const {id}=useParams();
  const navigate=useNavigate();
  const [opened,{open,close}]=useDisclosure(false);
  const [app,{open:openApp,close:closeApp}]=useDisclosure(false);
  const [date,setDate]=useState<Date | null>(null);
  const [time,setTime]=useState<any>(null);
  const ref=useRef<HTMLInputElement>(null);
  const [profile,setProfile]=useState<any>({});

  useEffect(() => {
   
  if(props.applicantId){
    getProfile(props.applicantId).then((res)=>{
      console.log(res);
      setProfile(res);
      
    }).catch((err)=>{
      console.log(err);
    })
  }
    else{
      setProfile(props);
    }
  },[props])

const handleMessageClick=()=>{
  navigate(`/chat/${props.name}`);
}

  
const handleOffer=(status:string)=>{
  let interview:any={id,applicantId:profile?.id,applicationStatus:status};
  if(status=="INTERVIEWING"){
    const[hours,minutes]=time.split(":").map(Number);
  date?.setHours(hours,minutes);
  interview={...interview,interviewTime:date};
  }
  changeAppStatus(interview).then(()=>{
   if(status=="INTERVIEWING") successNotification("Success","Interview Scheduled Successfully");
   else if(status=="OFFERED") successNotification("Success","Offer Sent Successfully");
   else if(status=="OFFER_ACCEPTED") successNotification("Success","Application Accepted Successfully");
    else successNotification("Success","Application Declined Successfully");
    setTimeout(() => {
      window.location.reload();
  }, 3000);
  }).catch((err)=>{
    errorNotification("Error",err.response.data.errorMessage);
  })
}



    return (
      <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_2px_yellow] !shadow-bright-sun-400">
        <div className="flex justify-between p-4">
          <div className="flex gap-2 items-center">
              <div className="p-2 bg-mine-shaft-800 rounded-full">
                <Avatar size="lg" src={profile.picture?`data:image/jpeg;base64,${profile?.picture}`:"/avatar.png"} alt="img" /></div>
              <div>
                  <div className="font-semibold text-lg">{props.name}</div>
                  <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &bull; {profile?.company}</div>
              </div>
          </div>
          <div><IconHeart className="text-mine-shaft-300 cursor-pointer"/></div>
        </div>
  
        <div className="flex gap-2">
      {
       !props.accepted&& profile.skills?.map((skill:any, index:any)=>index<4 &&<div key={index} className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">{skill}</div>)
          }
  
        </div>
        <Text className="!text-xs !text-justify !text-mine-shaft-300" lineClamp={3}>
  {!props.accepted&&profile.about}
        </Text>
         <Divider size="sm" color="mineShaft.7" />
  
              {
     props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm  items-center">
     <IconCalendarMonth stroke={1.5}/> Interview: {formatInterviewTime(props.interviewTime)}
                </div>: <div className="flex justify-between">
  <div className=" text-mine-shaft-300">
  Ex: {props.totalExp?props.totalExp:1} Years
  </div>
  <div className="flex gap-1text-xs text-mine-shaft-400 items-center">
   <IconMapPin className="h-5 w-5" stroke={1.5}/>{profile?.location}
        </div>
        </div>
              }
              {
                props.accepted&&<div className="flex gap-1 text-mine-shaft-200 text-sm  items-center">
                 Email: &nbsp;   {profile?.email}
                
                  </div>
              }

        <Divider size="sm" color="mineShaft.7" />
<div className="flex [&>*]:w-1/2 [&>*]:p-1">

{
 !props.invited&& <><Link to={`/talent-profile/${profile?.id}`}>
  <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
  </Link>
 <div>
 {props.posted?<Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5"/>} color="brightSun.4" variant="light" fullWidth>Schedule</Button>:<Button color="brightSun.4" variant="light" fullWidth onClick={handleMessageClick}>Message</Button>
}
 </div>  </>
}
{
  props.invited && <>
  <div>
  <Button color="brightSun.4" onClick={()=>handleOffer("OFFERED")} variant="outline" fullWidth>Accept</Button>
  </div>
  <div>
  <Button color="brightSun.4" onClick={()=>handleOffer("REJECTED")} variant="light" fullWidth>reject</Button>
  </div>
  </>
}
  
  
</div>
{
  (props.invited||props.posted)&&<Button color="brightSun.4" variant="filled" fullWidth onClick={openApp} autoContrast>View Application</Button>
}
{
  props.accepted&&<Button color="brightSun.4" onClick={()=>handleOffer("SETTLED")} variant="light" fullWidth>Completed</Button>
}
<Modal opened={opened} onClose={close} title="Schedule Interview" centered>
  <div className="flex flex-col gap-4">
    <DateInput minDate={new Date()} value={date} onChange={setDate} label="Date" placeholder="Enter date"/>
    <TimeInput label="Time" value={time} ref={ref} onChange={(event)=>setTime(event.currentTarget.value)} onClick={()=>ref.current?.showPicker()}/>
    <Button onClick={()=>handleOffer("INTERVIEWING")} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
  </div>
</Modal>

<Modal opened={app} onClose={closeApp} title="Application" centered>
  <div className="flex flex-col gap-4">
    <div>
      Email: &emsp; <a className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={`mailto:${props.email}`}>{props.email}</a>
    </div>
    <div>
      Website: &emsp; <a target="_blank" className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={props.website}>{props.website}</a>
    </div>
    <div>
      Resume: &emsp; <span className="text-bright-sun-400 hover:underline cursor-pointer text-center" onClick={()=>openBase64PDF(props.resume)}>{props.name}</span>
    </div>
    <div>
      CoverLetter: &emsp; <div>{props.coverLetter}</div>
    </div>
  </div>
</Modal>

        </div>
    )
  }
  
  export default TalentCard