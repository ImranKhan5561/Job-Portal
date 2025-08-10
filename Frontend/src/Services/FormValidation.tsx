const signupValidation=(name:string,value:string)=>{
switch(name){
    case "name":
        if(value.length===0) return "Name is required.";
        return "";

    case "email":
        if(value.length===0) return "Email is required.";
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Invalid email address.";
        return "";

    case "password":
        if(value.length===0) return "Password is required.";
        if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)) return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";  
        return "";

        default:
        return "";
}
}

const loginValidation=(name:string,value:string)=>{
  switch(name){
      case "email":
          if(value.length===0) return "Email is required.";
          return "";
          case "password":
            if(value.length===0) return "Password is required.";
            return "";
          default:
          return "";
  }
}
export {signupValidation,loginValidation};