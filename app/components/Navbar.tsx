import { Menubar } from 'primereact/menubar';        
import React from 'react'

import SigninButton from './SigninButton';

function Navbar() {
  const userName = SigninButton;
  console.log(userName)
    const items = [
      {
        label: 'Home',
        url: '/Landing',
        visible: false
      },
      {
        label: 'Register',
        url: '/Register',
        visible: true
      }
    ]
   
    const end = <SigninButton />

  return (
    <div><Menubar model={items} end={end} /></div>
  )
}

export default Navbar