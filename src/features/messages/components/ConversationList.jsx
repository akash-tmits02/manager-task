import React, { useState } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemAvatar, 
  Avatar, ListItemText, Badge, TextField, InputAdornment, 
  IconButton, Divider, Chip, ListItemButton, alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getStatusColor } from '../../team/mockData';

export const ConversationList = ({ conversations, activeId, onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.member.name.toLowerCase().includes(search.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: alpha('#fff', 0.8),
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid #E2E8F0'
    }}>
      {/* Header */}
      <Box sx={{ p: 4, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
            Messages
          </Typography>
          <IconButton sx={{ backgroundColor: '#6b46c110', color: '#6b46c1', '&:hover': { backgroundColor: '#6b46c120' } }}>
            <AddCommentIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search conversations..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
              </InputAdornment>
            ),
            sx: { 
              borderRadius: '12px', 
              backgroundColor: '#F1F5F9',
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: '1px solid #6b46c130' }
            }
          }}
        />
      </Box>

      {/* Categories / Quick Filters */}
      <Box sx={{ px: 4, mb: 1, display: 'flex', gap: 1 }}>
        <Chip label="All" size="small" sx={{ backgroundColor: '#6b46c1', color: '#fff', fontWeight: 700, px: 1 }} />
        <Chip label="Unread" size="small" variant="outlined" sx={{ fontWeight: 700, borderColor: '#E2E8F0', color: '#64748B' }} />
        <Chip label="Starred" size="small" variant="outlined" sx={{ fontWeight: 700, borderColor: '#E2E8F0', color: '#64748B' }} />
      </Box>

      {/* List */}
      <List sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 2 }}>
        {filteredConversations.map((conv) => (
          <ListItemButton
            key={conv.id}
            selected={activeId === conv.id}
            onClick={() => onSelect(conv.id)}
            sx={{
              borderRadius: '16px',
              mb: 1,
              p: 2,
              transition: 'all 0.2s ease',
              '&.Mui-selected': {
                backgroundColor: '#6b46c108',
                borderLeft: '4px solid #6b46c1',
                '&:hover': { backgroundColor: '#6b46c112' }
              },
              '&:hover': { backgroundColor: '#F8FAFC' }
            }}
          >
            <ListItemAvatar sx={{ position: 'relative' }}>
              <Avatar src={conv.member.avatar} sx={{ width: 48, height: 48, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
              <Box sx={{
                position: 'absolute',
                bottom: 2,
                right: 12,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: getStatusColor(conv.member.status),
                border: '2px solid #fff'
              }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#1E293B', fontSize: '0.95rem' }}>
                    {conv.member.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                    {conv.timestamp}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: activeId === conv.id ? '#64748B' : '#94A3B8', 
                      fontWeight: conv.unreadCount > 0 ? 700 : 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '160px'
                    }}
                  >
                    {conv.lastMessage}
                  </Typography>
                  {conv.unreadCount > 0 && (
                    <Badge 
                      badgeContent={conv.unreadCount} 
                      sx={{ 
                        '& .MuiBadge-badge': { 
                          backgroundColor: '#6b46c1', 
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.65rem',
                          height: 18,
                          minWidth: 18
                        } 
                      }} 
                    />
                  )}
                </Box>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
