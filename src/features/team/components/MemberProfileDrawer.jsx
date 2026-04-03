import React from 'react';
import { 
  Drawer, Box, Typography, Avatar, IconButton, Stack, 
  Chip, Divider, Button, List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedIcon from '@mui/icons-material/Verified';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const MemberProfileDrawer = ({ open, onClose, member }) => {
  if (!member) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 450 }, border: 'none', backgroundColor: '#fcfcfd' }
      }}
    >
      <Box sx={{ p: 4, height: '100%', position: 'relative' }}>
        {/* Close Button */}
        <IconButton 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 16, top: 16, color: '#64748B' }}
        >
          <CloseIcon />
        </IconButton>

        {/* Profile Header */}
        <Stack spacing={3} alignItems="center" sx={{ mt: 2, mb: 4 }}>
          <Avatar 
            src={member.avatar} 
            sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} 
          />
          <Box textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A' }}>
              {member.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b46c1', fontWeight: 700, mt: 0.5 }}>
              {member.role}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              <Chip 
                label={member.status} 
                size="small" 
                sx={{ 
                  backgroundColor: member.status === 'Available' ? '#22C55E10' : '#F59E0B10',
                  color: member.status === 'Available' ? '#22C55E' : '#F59E0B',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }} 
              />
              <Chip label={member.timezone} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Bio Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.1em' }}>
            About
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mt: 1, lineHeight: 1.6 }}>
            {member.bio || "No bio available."}
          </Typography>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.1em' }}>
            Expertise
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
            {(member.skills || []).map(skill => (
              <Chip 
                key={skill} 
                label={skill} 
                size="small" 
                sx={{ backgroundColor: '#F1F5F9', color: '#475569', fontWeight: 600, px: 0.5 }} 
              />
            ))}
          </Box>
        </Box>

        {/* Projects Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.1em' }}>
            Active Projects
          </Typography>
          <List sx={{ mt: 1 }}>
            {(member.projects || []).map(project => (
              <ListItem key={project} disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <VerifiedIcon sx={{ fontSize: 18, color: '#6b46c1' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={project} 
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600, color: '#1E293B' }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Quick Contact */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.1em' }}>
            Contact & Socials
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<EmailIcon />}
              sx={{ justifyContent: 'flex-start', py: 1.2, borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}
            >
              {member.email}
            </Button>
            <Stack direction="row" spacing={2}>
              <IconButton sx={{ backgroundColor: '#F1F5F9', borderRadius: '12px' }}><LinkedInIcon /></IconButton>
              <IconButton sx={{ backgroundColor: '#F1F5F9', borderRadius: '12px' }}><GitHubIcon /></IconButton>
              <IconButton sx={{ backgroundColor: '#F1F5F9', borderRadius: '12px' }}><LanguageIcon /></IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Primary Action */}
        <Button 
          fullWidth 
          variant="contained" 
          sx={{ 
            py: 1.8, 
            borderRadius: '14px', 
            backgroundColor: '#6b46c1', 
            boxShadow: '0 10px 20px rgba(107, 70, 193, 0.2)',
            textTransform: 'none',
            fontWeight: 800,
            '&:hover': { backgroundColor: '#553c9a' }
          }}
        >
          Send Message
        </Button>
      </Box>
    </Drawer>
  );
};
