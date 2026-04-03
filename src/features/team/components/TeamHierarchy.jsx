import React, { useState } from 'react';
import { Box, Card, Typography, Avatar, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const OrgNode = ({ node, members, level = 0, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const children = members.filter(m => m.reportsTo === node.id);
  const hasChildren = children.length > 0;

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      position: 'relative',
      mt: level === 0 ? 0 : 4
    }}>
      {/* Connector line from above */}
      {level > 0 && (
        <Box sx={{ 
          position: 'absolute', 
          top: -32, 
          left: '50%', 
          width: 2, 
          height: 32, 
          backgroundColor: '#CBD5E1' 
        }} />
      )}

      {/* Member Card */}
      <Card 
        onClick={() => onSelect(node)}
        sx={{ 
          p: 2, 
          minWidth: 200, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          borderRadius: '12px',
          boxShadow: isSelected ? '0 0 0 2px #2563EB' : '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #E2E8F0',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backgroundColor: isSelected ? '#EFF6FF' : '#fff',
          zIndex: 2,
          '&:hover': { boxShadow: isSelected ? '0 0 0 2px #2563EB' : '0 4px 6px -1px rgba(0,0,0,0.1)' }
        }}
      >
        <Avatar src={node.avatar} sx={{ width: 40, height: 40 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isSelected ? '#2563EB' : '#0F172A' }}>
            {node.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">{node.role}</Typography>
        </Box>
        {hasChildren && (
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            sx={{ p: 0.5 }}
          >
            {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        )}
      </Card>

      {/* Children Container */}
      {hasChildren && isExpanded && (
        <Box sx={{ display: 'flex', gap: 4, position: 'relative', mt: 4 }}>
          {/* Horizontal line for children */}
          {children.length > 1 && (
            <Box sx={{ 
              position: 'absolute', 
              top: -32, 
              left: `${100 / (children.length * 2)}%`, 
              right: `${100 / (children.length * 2)}%`, 
              height: 2, 
              backgroundColor: '#CBD5E1' 
            }} />
          )}
          {children.map(child => (
            <OrgNode 
              key={child.id} 
              node={child} 
              members={members} 
              level={level + 1} 
              isSelected={isSelected?.id === child.id}
              onSelect={onSelect}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export const TeamHierarchy = ({ members = [] }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const roots = members.filter(m => m.reportsTo === null);

  return (
    <Box sx={{ p: 4, overflowX: 'auto', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <Box sx={{ minWidth: roots.length * 250, display: 'flex', justifyContent: 'center' }}>
        {roots.map(root => (
          <OrgNode 
            key={root.id} 
            node={root} 
            members={members} 
            isSelected={selectedMember?.id === root.id}
            onSelect={setSelectedMember}
          />
        ))}
      </Box>
      {selectedMember && (
         <Typography variant="caption" sx={{ display: 'block', mt: 4, textAlign: 'center', color: '#64748B' }}>
            Selected: <strong>{selectedMember.name}</strong> • {selectedMember.role}
         </Typography>
      )}
    </Box>
  );
};
