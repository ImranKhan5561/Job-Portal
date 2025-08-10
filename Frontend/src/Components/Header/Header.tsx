import {  Button } from "@mantine/core";
import { IconAnchor } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";

const Header = () => {
    const token=useSelector((state:any)=>state.jwt);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate=useNavigate();

  useEffect(() => {
    setupResponseInterceptor(navigate);  
  },[navigate]);

  useEffect(() => {
    if(token!=""){
        const decodedJwt=jwtDecode(localStorage.getItem("token")||"");
            dispatch(setUser({...decodedJwt,email:decodedJwt.sub}));
        }
    if(user){
      getProfile(user?.profileId).then((res: any) => {
              dispatch(setProfile(res));
          }).catch((error: any) => console.log(error));
        }
  }, [token,navigate]); 

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
      <div className="w-full bg-mine-shaft-950 px-6 text-white h-20 flex justify-between items-center font-['poppins']">
          <div className="flex gap-1 items-center text-bright-sun-400 ">
              <IconAnchor className="w-8 h-8" stroke={2.5} />
              <div className="text-3xl font-semibold">JobHook</div>
          </div>

          {NavLinks()}

          <div className="flex gap-3 items-center">
              {user ? <ProfileMenu /> : <Link to="/login">
                  <Button color="brightSun.4" variant="subtle">Login</Button>
              </Link>}
             {user?<NotiMenu/>:<></>}
          </div>
      </div>
  ) : <></>;
}

export default Header;