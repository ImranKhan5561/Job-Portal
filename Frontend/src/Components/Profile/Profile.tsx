import { Avatar, Divider, FileInput, Overlay} from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import Info from "./Info"
import { changeProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certificate"
import { useHover } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { successNotification } from "../../Services/NotificationService"
import { getBase64 } from "../../Services/Utilities"


const Profile = () => {
  const dispatch=useDispatch();
  const profile=useSelector((state:any)=>state.profile);
   const handleFileChange=async(image:any)=>{
    let picture:any=await getBase64(image);
    let updatedProfile={...profile,picture:picture.split(',')[1]};
    dispatch(changeProfile(updatedProfile));
    successNotification("Success","Profile Picture Updated Successfully");
   }

  const {hovered,ref}=useHover();
  return (
    <div className="w-4/5 mx-auto">
<div className="relative w-full">
<img className="rounded-t-2xl w-[100%] h-40" src="/Profile/Banner.jpg" alt="Banner" />

<div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
<Avatar className="!w-48 !h-48 rounded-full border-8 border-mine-shaft-950" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="Banner" />

{hovered && <Overlay  className=" !rounded-full" color="#000" backgroundOpacity={0.75}  />}
{hovered && <IconEdit className="absolute z-[300] !w-16 !h-16"/>}

{hovered&&<FileInput onChange={handleFileChange} className="absolute w-full !h-full [&_*]:!rounded-full [&_*]:!h-full z-[301]" variant="transparent" size="lg" radius="xl" accept="image/png,image/jpeg" />}

</div>

</div>

<div className="px-3 mt-16">
<Info/>


</div>

  <Divider mx="xs" my="xl"  />
<About/>

<Divider mx="xs" my="xl"  />
<Skills/>

<Divider mx="xs" my="xl"  />
<Experience/>
<Divider mx="xs" my="xl"  />

<Certificate/>

    </div>
  )
}

export default Profile