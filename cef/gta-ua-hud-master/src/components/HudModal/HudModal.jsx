import React, { useState } from 'react'
import HudModalItem from './HudModalItem'

const HudModal = () => {
  const [modal, setModal] = useState([
    {
      title: 'ghbdfndsm',
      text: 'ghbdfndsmdsadasdsadasdasdxczdasdxczdsadxnLNJADSKDAS',
      btn1: 'ghbdfndsm',
      btn2: 'ghbdfn'
    }
  ])
  
  const [modalOpen, setModalOpen] = useState(true)

  return (
    <div className={modalOpen ? 'absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-[40%]' : 'hidden'}>
      {modal?.map((item) => (
        <HudModalItem modal={item} key={item.title + item.text} />
      ))}
    </div>
  )
}

export default HudModal
