import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form={
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  accountType:"APPLICANT",
}
const Signup = () => {
   const navigate=useNavigate();
  const[data,setData]=useState<{[key:string]:string}>(form);
  const[formError,setFormError]=useState<{[key:string]:string}>(form);
  const [loading,setLoading]=useState(false);

const handleChange=(event:any)=>{
if(typeof(event)=="string"){
  setData({...data,accountType:event});
  return;
}
let name=event.target.name,value=event.target.value;

 setData({...data,[name]:value})
 setFormError({...formError,[name]:signupValidation(name,value)})
 if(name==="password"&&data.confirmPassword!==""){
  let err="";
  if(data.confirmPassword!==value) err="Passwords do not match."
      setFormError({...formError,[name]:signupValidation(name,value),confirmPassword:err})
 }

 if(name=="confirmPassword"){
  if(data.password!==value) setFormError({...formError,[name]:"Passwords do not match."})
    else setFormError({...formError,confirmPassword:""})     
 }
 
}
const handleSubmit=()=>{
 
  let valid=true, newFormError:{[key:string]:string}={};
  for(let key in data){
    if(key==="accountType") continue;
    if(key!=="confirmPassword")newFormError[key]=signupValidation(key,data[key]);
    else if(data[key]!=data["password"]) newFormError[key]="passwords don't match."
    if(newFormError[key])valid=false;
  }
  setFormError(newFormError);
  
  if(valid===true){
    setLoading(true);
    registerUser(data).then((res)=>{
      console.log(res);
      setData(form);
      successNotification("Registration Successfull","Redirecting to login page...");

      setTimeout(()=>{
        setLoading(false);
        navigate("/login");
      },4000)

    }).catch((err)=>{
      setLoading(false);
      console.log(err.response.data)
     errorNotification("Registration Failed",err.response.data.errorMessage);
      })
    
  }

}

  return (
    <><LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'brightSun.4', type: 'bars' }}
      /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>

   <TextInput error={formError.name} onChange={handleChange} name="name" value={data.name} withAsterisk label="Full Name" placeholder="Your Name" />

      <TextInput error={formError.email} onChange={handleChange} name="email" value={data.email} withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"  />

    <PasswordInput error={formError.password} name="password" onChange={handleChange} value={data.password}withAsterisk leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} label="Password" placeholder="Password"/>

    <PasswordInput error={formError.confirmPassword} name="confirmPassword" onChange={handleChange} value={data.confirmPassword} leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} withAsterisk label="Confirm Password" placeholder="Confirm Password"/>
    <Radio.Group 
      value={data.accountType}
      onChange={handleChange}
      label="You are?"
      description="This is anonymous"
      withAsterisk
    >
      <Group mt="xs">
      <Radio className="py-4 px-6 border has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400 border-mine-shaft-800 rounded-lg hover:bg-mine-shaft-900" autoContrast value="APPLICANT" label="Applicant" />
      <Radio className="py-4 px-6 has-[:checked]:bg-bright-sun-400/5  has-[:checked]:border-bright-sun-400 border border-mine-shaft-800 rounded-lg hover:bg-mine-shaft-900"  autoContrast value="EMPLOYER" label="Employer" />
     
      </Group>
    </Radio.Group>
  <Checkbox autoContrast label={<>I Accept{' '}<Anchor>terms & conditions</Anchor></>}/>

<Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>
<div className="mx-auto">Have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={()=>{navigate("/login"); setFormError(form);setData(form)}}>Login</span></div>

    </div></>
  )
}

export default Signup