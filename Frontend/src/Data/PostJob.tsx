const fields=[
    {label:"Job Title",placeholder:"Enter Job Title",options:['Designer','Developer','Product Manager','Marketing Specialist', 'Data Analyst', 'Sales Executive',' Content Writer','Customer Support']},
    {label:"company",   placeholder:"Enter Company Name",options:['Google','Meta','Amazon','Microsoft','Apple','Daru','Drugs','Bhaang','Afeem','smake']},
    {label:"Experience", placeholder:"Enter Experience",options:['Entry Level','Intermediate','Expert']},
    {label:"Job Type",   placeholder:"Enter Job Type",options:['Full Time','Part Time','Contract','FreeLance','Internship']},
    {label:"Location",placeholder:"Enter Job Location",options:['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto']},
    {
     label:"Salary", placeholder:"Enter Salary",options:["10 LPA","15 LPA","20 LPA","25 LPA","30 LPA","35 LPA","40 LPA","45 LPA"]    
    }
]

const content='<h4>About The Job</h4> <p>Write Description here...</p><h4>Responsibilities</h4><ul><li>Write Responsibilities here</li></ul><h4>Requirements</h4><ul><li>Write Requirements here</li></ul>'
export {fields,content};