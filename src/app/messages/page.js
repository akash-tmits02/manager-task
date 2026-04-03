"use client";

import React, { useState } from 'react';
import { Box, Paper, Typography, alpha } from '@mui/material';
import { ConversationList } from '../../features/messages/components/ConversationList';
import { ChatWindow } from '../../features/messages/components/ChatWindow';
import { conversations as initialConversations } from '../../features/messages/mockMessages';

export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(null);

  const activeConversation = conversations.find(c => c.id === selectedId);

  const handleSendMessage = (text) => {
    if (!selectedId) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedId) {
        return {
          ...conv,
          lastMessage: text,
          timestamp: 'Just now',
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    }));
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 80px)', 
      p: { xs: 0, md: 4, lg: 5 },
      backgroundColor: '#f4f6fa'
    }}>
      <Paper sx={{ 
        height: '100%', 
        display: 'flex', 
        borderRadius: { xs: 0, md: '24px' },
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
        border: 'none',
        backgroundColor: '#ffffff'
      }}>
        {/* Left Sidebar (Conversation List) */}
        <Box sx={{ width: { xs: '100%', md: '360px', lg: '400px' }, height: '100%' }}>
          <ConversationList 
            conversations={conversations} 
            activeId={selectedId} 
            onSelect={setSelectedId} 
          />
        </Box>

        {/* Right Chat Window */}
        <Box sx={{ 
          flexGrow: 1, 
          height: '100%', 
          display: { xs: selectedId ? 'flex' : 'none', md: 'flex' } 
        }}>
          <ChatWindow 
            conversation={activeConversation} 
            onSendMessage={handleSendMessage} 
          />
        </Box>
      </Paper>
    </Box>
  );
}
