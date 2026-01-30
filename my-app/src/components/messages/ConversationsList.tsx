import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import './ConversationsList.css'

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

interface ConversationsListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelectConversation: (id: string) => void
}

function ConversationsList({ conversations, selectedId, onSelectConversation }: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="conversations-list-container">
      {/* Header */}
      <div className="conversations-header">
        <div className="header-top">
          <h1>Messages</h1>
          <button className="new-message-btn" title="Start new message">
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="conversations-list">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedId === conversation.id ? 'active' : ''}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="conversation-avatar-wrapper">
                <img src={conversation.avatar} alt={conversation.name} className="conversation-avatar" />
                <div className={`status-indicator ${conversation.status}`}></div>
              </div>

              <div className="conversation-content">
                <div className="conversation-header-row">
                  <span className="conversation-name">{conversation.name}</span>
                  <span className="conversation-time">{conversation.lastMessageTime}</span>
                </div>
                <div className="conversation-message-row">
                  <p className="conversation-message">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <div className="unread-badge">{conversation.unread}</div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-conversations">
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationsList
