import { TextInput, rem, PasswordInput, Checkbox, Anchor, Button, LoadingOverlay } from "@mantine/core"
import { IconAt, IconLock} from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginValidation } from "../../Services/FormValidation"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"
import { jwtDecode } from 'jwt-decode';
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { setJwt } from "../../Slices/JwtSlice"
import { loginUser } from "../../Services/AuthService"


const Login = () => {
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const form={
    email:"",
    password:"",
   
  }
  const[data,setData]=useState<{[key:string]:string}>(form);
  const[formError,setFormError]=useState<{[key:string]:string}>(form);
  const [opened,{open,close}]=useDisclosure(false);
 const navigate=useNavigate();
const handleChange=(event:any)=>{
  setFormError({...formError,[event.target.name]:""})
 setData({...data,[event.target.name]:event.target.value})
}
const handleSubmit=()=>{
  let valid=true, newFormError:{[key:string]:string}={};
  for(let key in data){
    newFormError[key]=loginValidation(key,data[key]);
    if(newFormError[key])valid=false;
  }
  setFormError(newFormError);
  if(valid){
    setLoading(true);
    loginUser(data).then((res)=>{
    successNotification("Login Successfull","Redirecting to home page...");
    dispatch(setJwt(res.jwt));
    const decodedJwt=jwtDecode(res.jwt);
    dispatch(setUser({...decodedJwt,email:decodedJwt.sub}));
    setTimeout(()=>{
      setLoading(false); 
      navigate("/");
    },4000)
    }).catch((err)=>{
      setLoading(false); 
      console.log(err);
      errorNotification("Login Failed",err.response.data.errorMessage);
      });
  }
  
}
  return (
    <>   <LoadingOverlay
    visible={loading}
    zIndex={1000}
    overlayProps={{ radius: 'sm', blur: 2 }}
    loaderProps={{ color: 'brightSun.4', type: 'bars' }}
  /><div className="w-1/2 px-20 flex flex-col justify-center gap-3">
    <div className="text-2xl font-semibold">Create Account</div>
    <TextInput onChange={handleChange} error={formError.email} name="email" value={data.email} withAsterisk leftSection={<IconAt style={{width:rem(16),height:rem(16)}}/>} label="Email" placeholder="Your email"  />

  <PasswordInput name="password" error={formError.password} onChange={handleChange} value={data.password} withAsterisk leftSection={<IconLock style={{width:rem(18),height:rem(18)}} stroke={1.5}/>} label="Password" placeholder="Password"/>
  

<Checkbox autoContrast label={<>I Accept{' '}<Anchor>terms & conditions</Anchor></>}/>

<Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
<div className="mx-auto">Don't have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={()=>{navigate("/signup"); setFormError(form);setData(form)}}>SignUp</span></div>

<div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password?</div>
  </div>
  <ResetPassword opened={opened} close={close} />
  </>
  )
}

export default Login