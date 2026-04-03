"use client";

import React, { useState } from 'react';
import { Box, Typography, Container, Tabs, Tab, Paper, Divider, Stack, Chip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { teamMembers } from '../../features/team/mockData';
import { TeamOverviewStats } from '../../features/team/components/TeamOverviewStats';
import { TeamWorkloadTable } from '../../features/team/components/TeamWorkloadTable';
import { TeamDirectory } from '../../features/team/components/TeamDirectory';
import { TeamHierarchy } from '../../features/team/components/TeamHierarchy';
import { TeamCalendar } from '../../features/team/components/TeamCalendar';
import { MemberProfileDrawer } from '../../features/team/components/MemberProfileDrawer';
import { MeetingSchedulerModal } from '../../features/team/components/MeetingSchedulerModal';

export default function TeamMembersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [meetings, setMeetings] = useState([
    { memberId: '1', title: 'Product Sync', date: '2026-04-02', time: '10:00' },
    { memberId: '2', title: 'Code Review', date: '2026-04-03', time: '14:00' }
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleScheduleMeeting = (member) => {
    setSelectedMember(member);
    setIsSchedulerOpen(true);
  };

  const handleViewProfile = (member) => {
    setSelectedProfile(member);
    setIsProfileOpen(true);
  };

  const onScheduleSubmit = (payload) => {
    setMeetings([...meetings, payload]);
    // Optional: Auto-switch to calendar tab to show new meeting
    // setActiveTab(3); 
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6fa', py: 5, px: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl" sx={{ p: 0 }}>
        {/* Header Area */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#0F172A', mb: 1, letterSpacing: '-0.02em' }}>
              Team Center
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <AutoGraphIcon sx={{ fontSize: 18, color: '#6b46c1' }} />
              <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 500 }}>
                High-performance team management and workload distribution.
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Top Summary Stats */}
        <TeamOverviewStats members={teamMembers} />

        {/* Main Content Area with Tabs */}
        <Paper sx={{ 
          borderRadius: '24px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
          border: 'none',
          backgroundColor: '#ffffff'
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{ 
              px: 4, 
              pt: 3, 
              backgroundColor: '#fff',
              borderBottom: '1px solid #F1F5F9',
              '& .MuiTab-root': { 
                textTransform: 'none', 
                fontWeight: 700, 
                fontSize: '1rem',
                minHeight: 64,
                color: '#64748B',
                '&.Mui-selected': { color: '#6b46c1' }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: '#6b46c1'
              }
            }}
          >
            <Tab icon={<DashboardCustomizeIcon sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="Overview" />
            <Tab icon={<PeopleAltIcon sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="Team Directory" />
            <Tab icon={<AccountTreeIcon sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="Org Structure" />
            <Tab icon={<CalendarMonthIcon sx={{ mr: 1, fontSize: 20 }} />} iconPosition="start" label="Team Calendar" />
          </Tabs>

          <Box sx={{ p: 5 }}>
            {activeTab === 0 && (
              <Box>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B' }}>Workload Distribution</Typography>
                  <Chip label="Live Updates" size="small" sx={{ backgroundColor: '#6b46c110', color: '#6b46c1', fontWeight: 800, fontSize: '0.7rem' }} />
                </Box>
                <TeamWorkloadTable members={teamMembers} />
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B' }}>Talent Directory</Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', mt: 1 }}>Manage individual profiles and project assignments.</Typography>
                </Box>
                <TeamDirectory 
                  members={teamMembers} 
                  onScheduleMeeting={handleScheduleMeeting} 
                  onViewProfile={handleViewProfile}
                />
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B' }}>Reporting Hierarchy</Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', mt: 1 }}>Visual map of organizational reporting lines and management.</Typography>
                </Box>
                <TeamHierarchy members={teamMembers} />
              </Box>
            )}

            {activeTab === 3 && (
              <Box>
                <TeamCalendar meetings={meetings} />
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Reusable Meeting Scheduler Modal */}
      <MeetingSchedulerModal 
        open={isSchedulerOpen} 
        onClose={() => setIsSchedulerOpen(false)} 
        selectedMember={selectedMember} 
        onSchedule={onScheduleSubmit}
      />

      {/* Member Profile Drawer */}
      <MemberProfileDrawer 
        open={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        member={selectedProfile} 
      />
    </Box>
  );
}
