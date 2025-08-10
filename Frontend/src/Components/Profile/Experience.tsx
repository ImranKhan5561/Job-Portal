import { ActionIcon } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExInput from "./ExInput";
import ExpCard from "./ExpCard";
import {  IconPencil, IconPlus, IconX } from "@tabler/icons-react";

const Experience=()=>{
    const profile=useSelector((state:any)=>state.profile)
    const [edit,setEdit]=useState(false);
    const [addExp,setAddExp]=useState(false);
    const handleClick=()=>{
        setEdit(!edit);
    }
    return <div className="px-3">
    <div className="text-2xl font-semibold mb-5 flex justify-between">Experience <div className="flex gap-2">
      <ActionIcon variant="subtle" color="brightSun.4" size="lg" onClick={()=>setAddExp(true)}>
          <IconPlus className="h-4/5 w-4/5" stroke={1.5}/>
        </ActionIcon>
        <ActionIcon variant="subtle" color={edit?"red.8":"brightSun.4"} size="lg" onClick={handleClick}>
          {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/>}
        </ActionIcon></div></div>
    <div className="flex flex-col gap-8">
    {
    profile?.experiences?.map((exp:any,index:number)=><ExpCard key={index} {...exp} index={index} edit={edit}/>
    )
    }
    {addExp&&<ExInput add setEdit={setAddExp}/>}
    </div>
    
    </div>
    
}
export default Experience;