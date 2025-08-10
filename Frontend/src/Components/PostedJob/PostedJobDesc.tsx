import { Badge, Tabs } from "@mantine/core"
import JobDesc from "../JobDesc/JobDesc"
import TalentCard from "../findTalent/TalentCard"
import { useEffect, useState } from "react"

const PostedJobDesc = (props:any) => {
  const [tab,setTab]=useState('overview');
  const [arr,setArr]=useState<any>([]);
 const handleTabChange=(value:any)=>{
  setTab(value);
  if(value=="applicants"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="APPLIED"));
  }
  else if(value=="invited"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"));
  }
  else if(value=="offered"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFERED"));
  }
  else if(value=="rejected"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="REJECTED"));
  }
  else if(value=="accepted"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFER_ACCEPTED"));
  }
}

useEffect(()=>{
  handleTabChange('overview');
},[props])

  return (
    <div className="mt-5 w-3/4 px-5">
        {props.jobTitle?<><div className="text-2xl font-semibold items-center">{props.jobTitle}<Badge variant="light" ml="sm" color="brightSun.4">{props.jobStatus}</Badge></div>
        <div className="font-medium text-mine-shaft-300 ">{props.location}</div>
        <div>
        <Tabs onChange={handleTabChange} variant="outline" radius="lg" value={tab}>
      <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
        <Tabs.Tab value="overview">Overview </Tabs.Tab>
        <Tabs.Tab value="applicants">Applicants </Tabs.Tab>
        <Tabs.Tab value="invited">Invited </Tabs.Tab>
        <Tabs.Tab value="offered">Offered </Tabs.Tab>
        <Tabs.Tab value="rejected">Rejected </Tabs.Tab>
        <Tabs.Tab value="accepted">Offers Accepted</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" className="[&>div]:w-full">
     <JobDesc {...props} edit={true} closed={props.jobStatus=="CLOSED"}/>
      </Tabs.Panel>

      <Tabs.Panel value="applicants">      
              <div className="mt-10 flex flex-wrap gap-5 justify-around ">
              {
  arr?.length?arr.map((talent: any, index: any) => 
    <TalentCard key={index} {...talent} posted={true} />):<div className="text-xl font-semibold">No Applicants</div>
             }

              </div>
             
      </Tabs.Panel>
      <Tabs.Panel value="invited">
      <div className="mt-10 flex flex-wrap gap-5 justify-around ">
              {
                 arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} invited={true}/>):<div className="text-xl font-semibold">No Invited Candidates</div>
              }   
              </div>
             
      </Tabs.Panel>
      <Tabs.Panel value="offered">
      <div className="mt-10 flex flex-wrap gap-5 justify-around ">
              {
                   arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} offered/>):<div className="text-xl font-semibold">No Offered Candidates</div>
              }   
              </div>
             
      </Tabs.Panel>
      <Tabs.Panel value="rejected">
      <div className="mt-10 flex flex-wrap gap-5 justify-around ">
              {
                  arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} rejected/>):<div className="text-xl font-semibold">No Rejected Candidates</div>
              }   
              </div>
             
      </Tabs.Panel>
      <Tabs.Panel value="accepted">
      <div className="mt-10 flex flex-wrap gap-5 justify-around ">
              {
                  arr?.length?arr.map((talent:any,index:any)=><TalentCard key={index} {...talent} accepted/>):<div className="text-xl font-semibold">No Results</div>
              }   
              </div>
             
      </Tabs.Panel>
    </Tabs>
        </div>
        </>:<div className="text-2xl flex min-h-[70vh] items-center font-semibold justify-center">No job selected</div>}
    </div>
  )
}

export default PostedJobDesc