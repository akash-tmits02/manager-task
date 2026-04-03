import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, MenuItem, Box, Typography, Avatar,
  Stack, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { teamMembers } from '../mockData';

export const MeetingSchedulerModal = ({ open, onClose, selectedMember: initialMember, onSchedule }) => {
  const [formData, setFormData] = useState({
    memberId: initialMember?.id || '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: '30m',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSchedule = () => {
    // In a real app, this would call an API
    if (onSchedule) {
      onSchedule(formData);
    }
    console.log('Scheduling meeting:', formData);
    onClose();
  };

  const selectedMember = teamMembers.find(m => m.id === parseInt(formData.memberId)) || initialMember;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
    >
      <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A' }}>
          Schedule Meeting
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#64748B' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Stack spacing={3}>
          {selectedMember && (
            <Box sx={{ 
              p: 2, 
              backgroundColor: '#F8FAFC', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              border: '1px solid #E2E8F0'
            }}>
              <Avatar src={selectedMember.avatar} sx={{ width: 44, height: 44 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{selectedMember.name}</Typography>
                <Typography variant="caption" color="text.secondary">{selectedMember.role} • {selectedMember.timezone}</Typography>
              </Box>
            </Box>
          )}

          <TextField
            select
            label="Team Member"
            name="memberId"
            variant="outlined"
            fullWidth
            value={formData.memberId}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          >
            {teamMembers.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Meeting Title"
            name="title"
            placeholder="e.g. Project Sync-up"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
            <TextField
              label="Time"
              name="time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.time}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
          </Stack>

          <TextField
            select
            label="Duration"
            name="duration"
            fullWidth
            value={formData.duration}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          >
            <MenuItem value="15m">15 minutes</MenuItem>
            <MenuItem value="30m">30 minutes</MenuItem>
            <MenuItem value="1h">1 hour</MenuItem>
            <MenuItem value="2h">2 hours</MenuItem>
          </TextField>

          <TextField
            label="Notes"
            name="notes"
            multiline
            rows={3}
            placeholder="Add any context or agenda items..."
            fullWidth
            value={formData.notes}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', textTransform: 'none', fontWeight: 600 }}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSchedule}
          disabled={!formData.title}
          sx={{ 
            backgroundColor: '#2563EB', 
            borderRadius: '8px', 
            textTransform: 'none', 
            fontWeight: 700,
            px: 4,
            '&:hover': { backgroundColor: '#1E40AF' }
          }}
        >
          Schedule Meeting
        </Button>
      </DialogActions>
    </Dialog>
  );
};
