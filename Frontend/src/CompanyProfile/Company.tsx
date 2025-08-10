import { Avatar, Divider, Tabs } from "@mantine/core"
import {  IconMapPin } from "@tabler/icons-react"
import AboutComp from "./AboutComp"
import CompanyJobs from "./CompanyJobs"
import CompanyEmployee from "./CompanyEmployee"


const Company = () => {

  return (
    <div className="w-3/4">
        <div className="relative ">
<img className="rounded-t-2xl w-[100%] h-40" src="/Profile/Banner.jpg" alt="Banner" />
<img className=" w-48 h-36 rounded-3xl p-2 -bottom-1/4 left-5 bg-mine-shaft-950 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8" src="/icons/Meta.png" alt="Banner" />
</div>
<div className="px-3 mt-12">
<div className="text-3xl font-semibold flex justify-between">Meta<Avatar.Group>
  <Avatar src="avatar.png"/>
  <Avatar src="avatar1.png"/>
  <Avatar src="avatar2.png"/>
  <Avatar>10k+</Avatar>
  </Avatar.Group></div>


<div className="text-lg flex gap-1 text-mine-shaft-300 items-center">
   <IconMapPin className="h-5 w-5" stroke={1.5}/> New York, United States     
</div>
<Divider mx="xs" my="xl"  />

<div>

</div>
<Tabs variant="outline" radius="lg" defaultValue="first">
      <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
        <Tabs.Tab value="about">About </Tabs.Tab>
        <Tabs.Tab value="jobs">Jobs </Tabs.Tab>
        <Tabs.Tab value="employees">Employees </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
      <Tabs.Panel value="jobs"><CompanyJobs/></Tabs.Panel>
      <Tabs.Panel value="employees"><CompanyEmployee/></Tabs.Panel>
    </Tabs>
</div>

  
    </div>
  )
}

export default Company