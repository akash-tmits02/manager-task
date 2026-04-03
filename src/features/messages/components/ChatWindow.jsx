import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Avatar, IconButton, TextField, 
  InputAdornment, alpha, Divider, Tooltip, Stack,
  Paper
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getStatusColor } from '../../team/mockData';

export const ChatWindow = ({ conversation, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#F8FAFC',
        flexDirection: 'column'
      }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            backgroundColor: '#6b46c110', 
            color: '#6b46c1', 
            mb: 2 
          }}
        >
          <SendIcon sx={{ fontSize: 40, transform: 'rotate(-45deg)' }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
          Your Messages
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
          Select a conversation to start chatting.
        </Typography>
      </Box>
    );
  }

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: '#fff',
      position: 'relative'
    }}>
      {/* Chat Header */}
      <Box sx={{ 
        px: 4, 
        py: 2.5, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: alpha('#fff', 0.9),
        backdropFilter: 'blur(10px)',
        zIndex: 10
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar src={conversation.member.avatar} sx={{ width: 44, height: 44, border: '2px solid #F1F5F9' }} />
            <Box sx={{
              position: 'absolute',
              bottom: 2,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: getStatusColor(conversation.member.status),
              border: '2px solid #fff'
            }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {conversation.member.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#22C55E', fontWeight: 700 }}>
              {conversation.member.status === 'Available' ? 'Online' : conversation.member.status}
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Tooltip title="Start Voice Call"><IconButton size="medium" sx={{ color: '#64748B' }}><CallIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Start Video Call"><IconButton size="medium" sx={{ color: '#64748B' }}><VideocamIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Contact Info"><IconButton size="medium" sx={{ color: '#64748B' }}><InfoIcon fontSize="small" /></IconButton></Tooltip>
          <IconButton size="medium" sx={{ color: '#64748B' }}><MoreVertIcon fontSize="small" /></IconButton>
        </Stack>
      </Box>

      {/* Messages History */}
      <Box 
        ref={scrollRef}
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: '#F8FAFC',
          backgroundImage: 'radial-gradient(#E2E8F0 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px'
        }}
      >
        {conversation.messages.map((msg, index) => {
          const isMe = msg.sender === 'me';
          return (
            <Box 
              key={msg.id} 
              sx={{ 
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                display: 'flex',
                gap: 1.5,
                flexDirection: isMe ? 'row-reverse' : 'row'
              }}
            >
              {!isMe && <Avatar src={conversation.member.avatar} sx={{ width: 28, height: 28, mt: 'auto' }} />}
              <Box>
                <Paper 
                  elevation={0}
                  sx={{ 
                    px: 2.5, 
                    py: 1.5, 
                    borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    backgroundColor: isMe ? '#6b46c1' : '#fff',
                    color: isMe ? '#fff' : '#1E293B',
                    boxShadow: isMe ? '0 4px 12px rgba(107, 70, 193, 0.15)' : '0 2px 4px rgba(0,0,0,0.02)',
                    border: isMe ? 'none' : '1px solid #E2E8F0'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                    {msg.text}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ 
                  display: 'block', 
                  mt: 0.5, 
                  textAlign: isMe ? 'right' : 'left',
                  color: '#94A3B8',
                  fontWeight: 600,
                  fontSize: '0.65rem'
                }}>
                  {msg.time}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Input Area */}
      <Box sx={{ 
        px: 4, 
        py: 3, 
        backgroundColor: '#fff',
        borderTop: '1px solid #F1F5F9'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          backgroundColor: '#F1F5F9',
          borderRadius: '16px',
          px: 2,
          py: 0.5,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
        }}>
          <IconButton size="small" sx={{ color: '#64748B' }}>
            <AttachFileIcon sx={{ transform: 'rotate(45deg)' }} fontSize="small" />
          </IconButton>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="standard"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              disableUnderline: true,
              sx: { py: 1, fontWeight: 500, color: '#1E293B' }
            }}
          />
          <IconButton size="small" sx={{ color: '#64748B' }}>
            <EmojiEmotionsIcon fontSize="small" />
          </IconButton>
          <IconButton 
            disabled={!messageText.trim()}
            onClick={handleSend}
            sx={{ 
              backgroundColor: '#6b46c1', 
              color: '#fff', 
              ml: 1,
              '&:hover': { backgroundColor: '#553c9a' },
              '&.Mui-disabled': { backgroundColor: '#E2E8F0', color: '#94A3B8' }
            }}
          >
            <SendIcon fontSize="small" sx={{ transform: 'translate(2px, -1px) rotate(-30deg)' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
