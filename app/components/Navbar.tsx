import { Menubar } from 'primereact/menubar';
import React from 'react'

import SigninButton from './SigninButton';
import SessionInfo from './SessionInfo';
import NewRequestButton from './NewRequestButton';

const sesh = async () => {
  const session = await SessionInfo()
  const user = session
  if (session) {
    return user
  } else {
    return null
  }
}

async function Navbar() {
  const user = await sesh();
  let show = false;
  let admin = false;
  if (user) {
    if (user.firstname) {
      show = true;
      if (user.isAdmin) {
        admin = true;
      }
    }    
  }

  const items = [
    {
      label: 'Calendar',
      url: '/Calendar',
      visible: show
    },
    {
      label: 'Register',
      url: '/Register',
      visible: !show
    },
    {
      label: 'Administration',
      url: '/Admin',
      visible: admin,
    }    
  ]

  const newRequest = <NewRequestButton />
  const end = <SigninButton />

  return (
    <div><Menubar model={items} start={newRequest} end={end} /></div>
  )
}

export default Navbar