import React from 'react'
import 'react-modern-drawer/dist/index.css'
import Drawer from 'react-modern-drawer'

const index = ({ open, onClose, children }) => {
  return (
    <Drawer open={open} onClose={onClose} direction='left' className='bla bla bla'>
      {children}
    </Drawer>
  )
}

export default index
