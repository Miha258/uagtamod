import React, { useState, useEffect } from 'react'
import HudChatStroke from './HudChatStroke'

const HudChat = () => {
  const [hudChat, setHudChat] = useState([
    
  ])
  const [newMessage, setNewMessage] = useState('')
  const [chatVisible, setChatVisible] = useState(true)
  const chatlength = 10
  const handleKeyDown = (e) => {
    if(e.key === 'u') {
      setChatVisible((prev) => !prev)
    }
  }
  if (chatVisible) {
    if (hudChat.length > chatlength) {
      while (hudChat.length > chatlength) {
        hudChat.shift()
      }
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const sendMessage = (e) => {
    e.preventDefault()
    setNewMessage('')
    if (newMessage.length > 0) {
      hudChat.push({ text: newMessage })
    }
  }
  return (
    <div className={chatVisible ? 'absolute top-1 left-2 min-h-[50%] flex flex-col' : 'hidden'}>
      <div>
        {hudChat.map((stroke, index) => (
          <HudChatStroke key={index + 1} hudstroke={stroke} />
        ))}
      </div>
      <form className='relative mt-auto'>
        <input
          type="text"
          placeholder="Введіть повiдомлення"
          value={newMessage}
          className="pl-2 pr-5 py-1 rounded-sm text-white text-base bg-gray-600/50 outline-none w-full"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-2 text-white rounded-sm text-xl absolute right-1 bottom-1/2 translate-y-1/2 h-[85%]"
        >
          →
        </button>
      </form>
    </div>
  )
}

export default HudChat
