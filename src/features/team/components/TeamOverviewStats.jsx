import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ 
    height: '100%', 
    borderRadius: '20px', 
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { 
      transform: 'translateY(-6px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
    }
  }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'relative', zIndex: 2 }}>
        <Typography variant="overline" sx={{ fontWeight: 800, color: '#64748B', letterSpacing: '0.1em' }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ 
        position: 'absolute',
        right: -20,
        bottom: -20,
        opacity: 0.1,
        color: color,
        transform: 'rotate(-15deg)',
        '& svg': { fontSize: '100px' }
      }}>
        {icon}
      </Box>
    </CardContent>
  </Card>
);

export const TeamOverviewStats = ({ members = [] }) => {
  const total = members.length;
  const available = members.filter(m => m.status === 'Available').length;
  const busy = members.filter(m => m.status === 'Busy').length;
  const overloaded = members.filter(m => m.workload >= 80).length;

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Headcount" value={total} icon={<GroupsIcon />} color="#6b46c1" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Available Now" value={available} icon={<CheckCircleIcon />} color="#22C55E" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="In Meetings" value={busy} icon={<AccessTimeIcon />} color="#F59E0B" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Capacity Risk" value={overloaded} icon={<ErrorOutlineIcon />} color="#EF4444" />
      </Grid>
    </Grid>
  );
};
