import React, { useState } from 'react';
import { 
  Box, Grid, Card, CardContent, Typography, Avatar, 
  Chip, Button, TextField, InputAdornment, MenuItem, 
  Select, FormControl, InputLabel, IconButton, 
  ToggleButton, ToggleButtonGroup, LinearProgress, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getWorkloadColor, getStatusColor, TEAM_ROLES, AVAILABILITY_STATUS } from '../mockData';

const MemberCard = ({ member, viewMode, onSchedule, onViewProfile }) => {
  const isGrid = viewMode === 'grid';
  
  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: '20px', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
      border: 'none',
      backgroundColor: '#ffffff',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': { 
        transform: 'translateY(-6px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
      }
    }}>
      <CardContent sx={{ p: isGrid ? 4 : 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isGrid ? 'column' : 'row', 
          alignItems: isGrid ? 'center' : 'center',
          gap: 3 
        }}>
          <Avatar 
            src={member.avatar} 
            alt={member.name} 
            sx={{ 
              width: isGrid ? 80 : 50, 
              height: isGrid ? 80 : 50, 
              mb: isGrid ? 1 : 0,
              border: '3px solid #F1F5F9'
            }} 
          />
          
          <Box sx={{ flexGrow: 1, textAlign: isGrid ? 'center' : 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isGrid ? 'center' : 'flex-start', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>{member.name}</Typography>
              <Chip 
                label={member.roleType} 
                size="small" 
                sx={{ 
                  height: 20, 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  backgroundColor: '#6b46c115', 
                  color: '#6b46c1',
                  borderRadius: '6px'
                }} 
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1 }}>{member.role}</Typography>
            
            <Stack direction="row" spacing={2} sx={{ justifyContent: isGrid ? 'center' : 'flex-start', mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EmailIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>{member.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PublicIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>{member.timezone}</Typography>
              </Box>
            </Stack>

            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.02em', fontSize: '0.65rem' }}>Current Capacity</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#1E293B' }}>{member.workload}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={member.workload} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4, 
                  backgroundColor: '#F1F5F9',
                  '& .MuiLinearProgress-bar': { backgroundColor: getWorkloadColor(member.workload), borderRadius: 4 }
                }} 
              />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: isGrid ? 'column' : 'row', 
              gap: 1.5 
            }}>
              <Button 
                variant="contained" 
                fullWidth={isGrid}
                size="medium"
                startIcon={<EventAvailableIcon />}
                onClick={() => onSchedule(member)}
                sx={{ 
                  backgroundColor: '#6b46c1', 
                  borderRadius: '12px', 
                  textTransform: 'none',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(107, 70, 193, 0.2)',
                  '&:hover': { backgroundColor: '#553c9a', boxShadow: '0 6px 16px rgba(107, 70, 193, 0.3)' }
                }}
              >
                Schedule Sync
              </Button>
              <Button 
                variant="outlined" 
                fullWidth={isGrid}
                size="medium"
                onClick={() => onViewProfile(member)}
                sx={{ 
                  borderRadius: '12px', 
                  textTransform: 'none', 
                  fontWeight: 700,
                  borderColor: '#E2E8F0',
                  color: '#475569',
                  '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' }
                }}
              >
                View Profile
              </Button>
            </Box>
          </Box>

          <Box sx={{ alignSelf: 'flex-start', mt: isGrid ? 0 : 0 }}>
             <Chip 
              label={member.status} 
              size="small"
              sx={{ 
                backgroundColor: `${getStatusColor(member.status)}15`, 
                color: getStatusColor(member.status),
                fontWeight: 800,
                fontSize: '0.7rem',
                borderRadius: '6px',
                border: `1px solid ${getStatusColor(member.status)}30`
              }} 
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const TeamDirectory = ({ members = [], onScheduleMeeting, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || member.roleType === roleFilter;
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        mb: 6, 
        alignItems: { xs: 'stretch', md: 'center' } 
      }}>
        <TextField
          placeholder="Search team members by name or email..."
          size="medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94A3B8' }} />
              </InputAdornment>
            ),
            sx: { borderRadius: '14px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }
          }}
        />
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <FormControl size="medium" sx={{ minWidth: 160 }}>
            <InputLabel>All Roles</InputLabel>
            <Select
              value={roleFilter}
              label="All Roles"
              onChange={(e) => setRoleFilter(e.target.value)}
              sx={{ borderRadius: '14px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              <MenuItem value="All">All Roles</MenuItem>
              {TEAM_ROLES.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="medium" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: '14px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
            >
              <MenuItem value="All">Any Status</MenuItem>
              {AVAILABILITY_STATUS.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, next) => next && setViewMode(next)}
            size="medium"
            sx={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', p: 0.5 }}
          >
            <ToggleButton value="grid" sx={{ border: 'none', borderRadius: '10px !important', px: 2 }}>
              <GridViewIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" sx={{ border: 'none', borderRadius: '10px !important', px: 2 }}>
              <ViewListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredMembers.map(member => (
          <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} lg={viewMode === 'grid' ? 4 : 12} key={member.id}>
            <MemberCard 
              member={member} 
              viewMode={viewMode} 
              onSchedule={onScheduleMeeting} 
              onViewProfile={onViewProfile} 
            />
          </Grid>
        ))}
        {filteredMembers.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 10, textAlign: 'center', backgroundColor: '#fff', borderRadius: '24px', border: '2px dashed #E2E8F0' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#64748B' }}>No candidates found</Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>Try adjusting your search or filters.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
