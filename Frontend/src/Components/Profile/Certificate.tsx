import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react"
import { useState } from "react";
import { useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";

const Certificate=()=>{
    const profile=useSelector((state:any)=>state.profile);
    const [edit,setEdit]=useState(false);
    const [addCerti,setAddCerti]=useState(false);

    const handleClick=()=>{
   setEdit(!edit);
    }

    return <div className="px-3">
    <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications<div className="flex gap-2">
      <ActionIcon variant="subtle" color="brightSun.4" size="lg" onClick={()=>setAddCerti(true)}><IconPlus className="h-4/5 w-4/5"/>
        </ActionIcon>
        <ActionIcon variant="subtle" color={edit?"red.8":"brightSun.4"} size="lg" onClick={handleClick}>
          {edit?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/>}
        </ActionIcon></div></div>
    
    <div className="flex flex-col gap-8">
    {
    profile?.certifications?.map((certi:any,index:number)=><CertiCard key={index} edit={edit} index={index} {...certi}/>
    )
    }
    {
      addCerti&&<CertiInput setEdit={setAddCerti}/>
    }
    </div>
    
    </div>
    
}
export default Certificate