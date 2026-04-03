import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Paper, IconButton, 
  Stack, Chip, Tooltip, Avatar, Badge 
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { teamMembers } from '../mockData';

export const TeamCalendar = ({ meetings = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCells = () => {
    const cells = [];
    // Empty cells for days of previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
       cells.push(<Grid item xs={1.71} key={`empty-${i}`} sx={{ height: 120, border: '0.5px solid #F1F5F9' }} />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayMeetings = meetings.filter(m => m.date === dateString);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      cells.push(
        <Grid item xs={1.71} key={day} sx={{ 
          height: 120, 
          border: '0.5px solid #F1F5F9', 
          p: 1,
          backgroundColor: isToday ? '#6b46c105' : '#fff',
          transition: 'all 0.2s',
          '&:hover': { backgroundColor: '#F8FAFC' }
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 800, 
              color: isToday ? '#6b46c1' : '#64748B',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: isToday ? '#6b46c115' : 'transparent'
            }}
          >
            {day}
          </Typography>
          <Stack spacing={0.5}>
            {dayMeetings.map((meeting, idx) => {
               const member = teamMembers.find(m => m.id === parseInt(meeting.memberId));
               return (
                 <Tooltip key={idx} title={`${meeting.title} with ${member?.name || 'Unknown'}`}>
                   <Chip 
                     icon={<VideoCallIcon style={{ fontSize: 14, color: '#fff' }} />}
                     label={meeting.title}
                     size="small"
                     sx={{ 
                       height: 20, 
                       fontSize: '0.65rem', 
                       fontWeight: 700,
                       backgroundColor: '#6b46c1',
                       color: '#fff',
                       borderRadius: '4px',
                       '& .MuiChip-label': { px: 0.5 },
                       '& .MuiChip-icon': { ml: 0.5, mr: -0.5 }
                     }}
                   />
                 </Tooltip>
               );
            })}
          </Stack>
        </Grid>
      );
    }
    return cells;
  };

  return (
    <Box>
      {/* Calendar Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
            You have {meetings.length} meetings scheduled this month
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
           <IconButton onClick={prevMonth} sx={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
             <ChevronLeftIcon />
           </IconButton>
           <IconButton onClick={nextMonth} sx={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
             <ChevronRightIcon />
           </IconButton>
        </Stack>
      </Box>

      {/* Calendar Grid */}
      <Paper sx={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        {/* Day Headers */}
        <Grid container>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Grid item xs={1.71} key={day} sx={{ p: 2, backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
               <Typography variant="caption" sx={{ fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                 {day}
               </Typography>
            </Grid>
          ))}
        </Grid>
        
        {/* Days Grid */}
        <Grid container>
          {renderCells()}
        </Grid>
      </Paper>
    </Box>
  );
};
