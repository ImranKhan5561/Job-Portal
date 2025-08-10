import { IconRecharging, IconSearch } from "@tabler/icons-react";

const searchFields=[
    {
        title:"Job Title", icon:IconSearch, options:['Designer','Developer','Product Manager','Marketing Specialist', 'Data Analyst', 'Sales Executive',' Content Writer','Customer Support']
    },
    {
        title:"Location", icon:IconSearch, options:['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto']
    },
    {
        title:"Skills", icon:IconRecharging, options:["HTML","CSS","Js","Angular","React","Vue","C++","C","Python","API Development","Google Cloud","Git","Devops","AWS","Agile","PostgreSQL","Post Methodologies","Azure","Testing and Debugging"]
    }

]

const talents=[
    {
name:"Peter Pop",
role:"Software Engineer",
company:"Google",
topSkills: ["React", "Spring Boot", "Agile"],
about:"As a sofware Engineer at Google, I specialized in building scalable and high-performance applications. My expertice lies in integrating front-end and back-end technologies to deliever seamless user experiences. With a strong foundation react and springboot, and a focus on agile methodologies, I excel in delivering innovative solutions that drive business growth and user satisfaction.",
expectedCtc:"₹48 - 60 LPA",
location:"New York,United States",
image:"avatar"
    },

    {
        name: "Alice Smith",
        role: "Data Scientist",
        company: "Microsoft",
        topSkills: ["Machine Learning", "Python", "R"],
        about: "As a Data Scientist at Microsoft, I specialize in predictive modeling and data analysis to inform strategic decisions. My expertise includes developing algorithms for big data and deploying machine learning models in production environments. Passionate about transforming raw data into actionable insights that drive success.",
        expectedCtc: "₹40 - 55 LPA",
        location: "Seattle, United States",
        image: "avatar1"
    },
    {
        name: "John Doe",
        role: "Cloud Architect",
        company: "Amazon Web Services",
        topSkills: ["AWS", "Kubernetes", "DevOps"],
        about: "As a Cloud Architect at AWS, I design and implement cloud solutions that optimize performance and cost efficiency. My focus is on leveraging Kubernetes and serverless architectures to deliver scalable, resilient systems tailored to client needs. Dedicated to simplifying complex cloud transformations.",
        expectedCtc: "₹50 - 70 LPA",
        location: "Austin, United States",
        image: "avatar2"
    },
    {
        name: "Maria Gonzalez",
        role: "UI/UX Designer",
        company: "Apple",
        topSkills: ["Figma", "Sketch", "User Research"],
        about: "As a UI/UX Designer at Apple, I focus on crafting intuitive and visually compelling designs. My work bridges the gap between user needs and business goals, resulting in products that are both functional and delightful. With expertise in user research and prototyping, I excel at bringing ideas to life.",
        expectedCtc: "₹30 - 45 LPA",
        location: "San Jose, United States",
        image: "avatar"
    },
    {
        name: "Michael Tan",
        role: "Full Stack Developer",
        company: "Meta",
        topSkills: ["JavaScript", "Node.js", "React"],
        about: "As a Full Stack Developer at Meta, I build end-to-end web applications with a focus on performance and scalability. My expertise spans front-end frameworks like React and robust back-end systems using Node.js. I am passionate about delivering user-friendly solutions that solve complex challenges.",
        expectedCtc: "₹45 - 58 LPA",
        location: "Los Angeles, United States",
        image: "avatar2"
    },


]

const profile={
    "name":"Peter Pop",
    "role":"Software Engineer",
    "company":"Google",
    "location":"New York, United States",
    "about":"As a Software Engineer at Google, I specialize in developing scalable web applications using React, Express.js, and MongoDB. My role involves designing and implementing efficient code, collaborating with cross-functional teams, and ensuring the seamless integration of new features to enhance user experience. ",
    "skills": ["React", "SpringBoot", "Node.js", "Express.js", "MongoDB", "JavaScript", "TypeScript", "HTML", "CSS", "Redux", "GraphQL", "Docker", "Kubernetes", "AWS", "Git"],
    "experience":[
        {
         "title":"Software Engineer",
         "company":"Google",
         "location":"New York, United States",
         "startDate":"Apr 2022",
         "endDate":"Present",
         "description":"As a Software Engineer at Google, I specialize in developing scalable web applications using React, Express.js, and MongoDB."
         },
         
        {
            "title": "Backend Developer",
            "company": "Amazon",
            "location": "Seattle, United States",
            "startDate": "Jul 2017",
            "endDate": "Dec 2019",
            "description": "Designed and optimized RESTful APIs using Node.js and Express.js. Implemented scalable solutions for data storage using MongoDB and AWS."
        }
],
"certifications": [
    {
        "name": "Google Professional Cloud",
        "issuer": "Google",
        "issueDate": "Aug 2023",
        "certificateId": "CB72882GG"
    },
    {
        "name": "MicroSoft Certified: Azure Solutions Architect Expert",
        "issuer": "Microsoft",
        "issueDate": "May 2022",
        "certificateId": "AWS12345SA"
    }

]
}
export {searchFields,talents,profile};