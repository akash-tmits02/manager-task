import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, LinearProgress, Avatar, Box, Typography, Chip 
} from '@mui/material';
import { getWorkloadColor } from '../mockData';

export const TeamWorkloadTable = ({ members = [] }) => {
  return (
    <TableContainer component={Paper} sx={{ 
      borderRadius: '20px', 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
      border: 'none',
      backgroundColor: '#ffffff',
      overflow: 'hidden'
    }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', py: 2.5 }}>Member</TableCell>
            <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Tasks Assigned</TableCell>
            <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Due This Week</TableCell>
            <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Overdue</TableCell>
            <TableCell sx={{ fontWeight: 800, color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Workload Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}>
              <TableCell sx={{ py: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40, border: '2px solid #F1F5F9' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A' }}>{member.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>{member.role}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#334155' }}>{member.tasksAssigned}</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#334155' }}>{member.tasksDue}</TableCell>
              <TableCell align="center">
                {member.overdue > 0 ? (
                  <Chip label={member.overdue} size="small" sx={{ 
                    backgroundColor: '#EF444415', 
                    color: '#EF4444', 
                    fontWeight: 800, 
                    fontSize: '0.7rem',
                    borderRadius: '6px'
                  }} />
                ) : (
                  <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>0</Typography>
                )}
              </TableCell>
              <TableCell sx={{ minWidth: 200 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={member.workload} 
                    sx={{ 
                      flexGrow: 1, 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: '#F1F5F9',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getWorkloadColor(member.workload),
                        borderRadius: 5
                      }
                    }} 
                  />
                  <Typography variant="caption" sx={{ fontWeight: 700, minWidth: 35, color: '#1E293B' }}>
                    {member.workload}%
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
