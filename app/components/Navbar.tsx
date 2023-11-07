
import { Menubar } from 'primereact/menubar';        
import React from 'react'

import SigninButton from './SigninButton';

function Navbar() {
    const items = [
      {
        label: 'Home',
        url: '/Landing',
        visible: false
      }
    ]
   
    const end = <SigninButton />

  return (
    <div><Menubar model={items} end={end} /></div>
  )
}

export default Navbar