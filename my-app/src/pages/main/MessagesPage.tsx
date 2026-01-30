import React, { useState } from 'react'
import ConversationsList from '../../components/messages/ConversationsList'
import ChatWindow from '../../components/messages/ChatWindow'
import './MessagesPage.css'

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  status: 'online' | 'offline'
  role: string
}

interface Message {
  id: string
  sender: string
  senderId: string
  message: string
  timestamp: string
  read: boolean
}

function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [showChatWindow, setShowChatWindow] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      lastMessage: 'Please come 15 minutes before your appointment',
      lastMessageTime: '2:30 PM',
      unread: 0,
      status: 'online',
      role: 'Doctor',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      lastMessage: 'Your prescription is ready',
      lastMessageTime: '1:15 PM',
      unread: 2,
      status: 'offline',
      role: 'Doctor',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      lastMessage: 'Thank you for the referral!',
      lastMessageTime: '11:45 AM',
      unread: 0,
      status: 'online',
      role: 'Patient',
    },
    {
      id: '4',
      name: 'Dr. James Mitchell',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      lastMessage: 'See you tomorrow at 3 PM',
      lastMessageTime: '10:20 AM',
      unread: 0,
      status: 'offline',
      role: 'Doctor',
    },
  ])

  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1',
        sender: 'Dr. Sarah Johnson',
        senderId: '1',
        message: 'Hi! How are you feeling today?',
        timestamp: '10:30 AM',
        read: true,
      },
      {
        id: '2',
        sender: 'You',
        senderId: 'user',
        message: 'I am doing good, thank you for asking!',
        timestamp: '10:35 AM',
        read: true,
      },
      {
        id: '3',
        sender: 'Dr. Sarah Johnson',
        senderId: '1',
        message: 'Great! Your appointment is scheduled for tomorrow at 3 PM',
        timestamp: '10:40 AM',
        read: true,
      },
      {
        id: '4',
        sender: 'Dr. Sarah Johnson',
        senderId: '1',
        message: 'Please come 15 minutes before your appointment',
        timestamp: '2:30 PM',
        read: true,
      },
    ],
    '2': [
      {
        id: '1',
        sender: 'Dr. Michael Chen',
        senderId: '2',
        message: 'Your prescription is ready',
        timestamp: '1:15 PM',
        read: false,
      },
      {
        id: '2',
        sender: 'Dr. Michael Chen',
        senderId: '2',
        message: 'You can pick it up from the clinic',
        timestamp: '1:16 PM',
        read: false,
      },
    ],
    '3': [
      {
        id: '1',
        sender: 'You',
        senderId: 'user',
        message: 'Thanks for the good feedback!',
        timestamp: '11:40 AM',
        read: true,
      },
      {
        id: '2',
        sender: 'Emma Wilson',
        senderId: '3',
        message: 'Thank you for the referral!',
        timestamp: '11:45 AM',
        read: true,
      },
    ],
    '4': [
      {
        id: '1',
        sender: 'Dr. James Mitchell',
        senderId: '4',
        message: 'See you tomorrow at 3 PM',
        timestamp: '10:20 AM',
        read: true,
      },
    ],
  })

  const currentConversation = conversations.find((c) => c.id === selectedConversation)
  const currentMessages = messages[selectedConversation || '1'] || []

  const handleSendMessage = (message: string) => {
    if (!selectedConversation || !message.trim()) return

    const newMessage: Message = {
      id: String(Date.now()),
      sender: 'You',
      senderId: 'user',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage],
    }))

    // Update last message in conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: message.trim(),
              lastMessageTime: newMessage.timestamp,
            }
          : conv
        )
    )
  }

  return (
    <div className="messages-page-container">
      <div className="messages-layout">
        <ConversationsList
          conversations={conversations}
          selectedId={selectedConversation}
          onSelectConversation={(id) => {
            setSelectedConversation(id)
            setShowChatWindow(true)
          }}
        />
        {currentConversation && showChatWindow ? (
          <ChatWindow
            conversation={currentConversation}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            onBackClick={() => setShowChatWindow(false)}
          />
        ) : (
          <div className="messages-empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">💬</div>
              <h2>Select a conversation</h2>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage
