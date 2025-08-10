import { Menu, Avatar, Switch, rem } from '@mantine/core';

import {
  
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';
import { setProfile } from '../../Slices/ProfileSlice';
import { removeJwt } from '../../Slices/JwtSlice';

const  ProfileMenu=()=> {
  const profile=useSelector((state:any)=>state.profile);
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user)
  const [checked,setChecked]=useState(false);
  const [opened,setOpened]=useState(false);
  const handleLogout=()=>{
   dispatch(removeUser());
   dispatch(setProfile({}));
   dispatch(removeJwt());
  }

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
        <div>{user.name}</div>
        <Avatar src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to="/profile">
        <Menu.Item leftSection={<IconUserCircle size={14} />}>
          Profile
        </Menu.Item>
        </Link>        
       
       <Link to="/chat">
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconFileText size={14} />}>
         Resume
        </Menu.Item>
        <Menu.Item
  leftSection={<IconMoon size={14} />}
  rightSection={
    <Switch checked={checked} onChange={(event)=>setChecked(event.currentTarget.checked)}
      size="md"
      color="brightSun.4"
      onLabel={
        <IconSun
          style={{ width: rem(16), height: rem(16) }}
          stroke={2.5}
          color="yellow"
        />
      }
      offLabel={
        <IconMoonStars
          style={{ width: rem(16), height: rem(16) }}
          stroke={2.5}
          color="cyan"
        />
      }
    />
  }
>
  Dark Mode
</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 style={{width:rem(14),height:rem(14)}}/>}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;