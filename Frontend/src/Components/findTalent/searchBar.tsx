
import { Divider, Input, RangeSlider } from "@mantine/core"
import { useState } from "react";
import MultiInput from "../findJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";


const SearchBar = () => {
  const dispatch=useDispatch();
    const [value,setValue]=useState<[number,number]>([0,50]);
    const [name,setName]=useState("");
    const handleChange=(name:any,event:any)=>{
       if(name=="exp") dispatch(updateFilter({exp:event}));
       else{
        dispatch(updateFilter({name:event.target.value}));
        setName(event.target.value);
       }
    }
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100 flex">

        <div className="flex items-center">
            <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20}/></div>
  
            <Input defaultValue={name} onChange={(e)=>handleChange("name",e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />


        </div>

{
  searchFields.map((item,index)=><><div key={index} className="w-1/5">
    <MultiInput {...item}/>
  </div>
  <Divider mr="xs" size="xs" orientation="vertical" />
  </>)
}

<div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">

<div className="flex text-sm justify-between">
  <div>Experience (Year)</div>
  <div>{value[0]}- {value[1]}</div>
</div>

<RangeSlider  color="brightSun.4" size="xs" min={1} minRange={1} max={50} value={value}  onChange={setValue} onChangeEnd={(e)=>handleChange("exp",e)} />   
</div>
 
  

    </div>
  )
}

export default SearchBar;