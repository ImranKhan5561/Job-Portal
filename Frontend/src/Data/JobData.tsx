import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

const dropdownData=[
    {title:"Job Title",icon:IconSearch,options:['Designer','Developer','Product Manager','Marketing Specialist', 'Data Analyst', 'Sales Executive',' Content Writer','Customer Support']},
    {
        title:"Location", icon:IconMapPin, options:['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto']
    },
    {
        title:"Experience", icon:IconBriefcase, options:['Entry Level','Intermediate','Expert']
    },
    {
        title:"Job Type", icon:IconRecharging, options:['Full Time','Part Time','Contract','FreeLance','Internship']
    }
];

const jobList=[

{
    jobTitle:"Product Designer",
    company:"Meta",
    applicants:25,
    experience:"Entry Level",
    jobType:"Full Time",
    location:"New York",
    package:"32 LPA",
    PostedDaysAgo:12,
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus suscipit quos, neque provident nam illum? Ex pariatur voluptate ipsa eligendi esse!"
},

{
    jobTitle: "Product Designer",
    company: "Google",
    applicants: 40,
    experience: "Mid Level",
    jobType: "Full Time",
    location: "San Francisco",
    package: "28 LPA",
    PostedDaysAgo: 10,
    description: "Join Google as a Product Designer to craft intuitive user experiences and shape the future of technology products used by millions worldwide. Collaborate with cross-functional teams and innovate in a dynamic environment."
},
{
    jobTitle: "iOS Developer",
    company: "Apple",
    applicants: 30,
    experience: "Entry Level",
    jobType: "Full Time",
    location: "Cupertino",
    package: "30 LPA",
    PostedDaysAgo: 5,
    description: "Work with Apple’s cutting-edge technology as an iOS Developer. Build seamless mobile applications for iPhone and iPad users, working closely with designers and engineers in a collaborative environment."
},
{
    jobTitle: "Software Engineer",
    company: "Amazon",
    applicants: 50,
    experience: "Mid Level",
    jobType: "Full Time",
    location: "Seattle",
    package: "35 LPA",
    PostedDaysAgo: 15,
    description: "Amazon is looking for passionate Software Engineers to design, develop, and deploy scalable software systems that power its global e-commerce platform. Solve challenging technical problems in a fast-paced environment."
},
{
    jobTitle: "UI/UX Designer",
    company: "Adobe",
    applicants: 20,
    experience: "Experienced",
    jobType: "Contract",
    location: "Los Angeles",
    package: "25 LPA",
    PostedDaysAgo: 8,
    description: "Adobe seeks a creative UI/UX Designer to transform ideas into beautiful designs. Work on innovative projects, ensuring exceptional user experiences across Adobe’s suite of creative tools."
},
{
    jobTitle: "Data Scientist",
    company: "Meta",
    applicants: 35,
    experience: "Experienced",
    jobType: "Full Time",
    location: "New York",
    package: "40 LPA",
    PostedDaysAgo: 7,
    description: "Meta is hiring a Data Scientist to analyze complex datasets and generate insights that drive impactful decisions. Work on cutting-edge AI/ML projects to connect billions of users worldwide."
}




]


export {jobList,dropdownData}