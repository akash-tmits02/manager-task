import { teamMembers } from '../team/mockData';

export const conversations = [
  {
    id: 1,
    member: teamMembers.find(m => m.id === 1), // Sarah
    lastMessage: "I've reviewed the enterprise sync specs. Looks solid!",
    timestamp: "10:45 AM",
    unreadCount: 2,
    messages: [
      { id: 101, sender: 'them', text: "Hey! Did you see the new sync specs?", time: "10:30 AM" },
      { id: 102, sender: 'me', text: "Just opening them now. Give me 5 minutes.", time: "10:32 AM" },
      { id: 103, sender: 'them', text: "I've reviewed the enterprise sync specs. Looks solid!", time: "10:45 AM" }
    ]
  },
  {
    id: 2,
    member: teamMembers.find(m => m.id === 2), // Michael
    lastMessage: "The performance audit is done. Found 2 bottlenecks.",
    timestamp: "Yesterday",
    unreadCount: 0,
    messages: [
      { id: 201, sender: 'them', text: "Progress on the backend audit?", time: "2:15 PM" },
      { id: 202, sender: 'me', text: "Found some potential leaks in the task worker.", time: "2:45 PM" },
      { id: 203, sender: 'them', text: "The performance audit is done. Found 2 bottlenecks.", time: "Yesterday" }
    ]
  },
  {
    id: 3,
    member: teamMembers.find(m => m.id === 3), // Emily
    lastMessage: "Sent the Figma link for the new dark mode.",
    timestamp: "Monday",
    unreadCount: 0,
    messages: [
      { id: 301, sender: 'them', text: "Dark mode concept is ready!", time: "9:00 AM" },
      { id: 302, sender: 'me', text: "Awesome! Send the link over.", time: "9:15 AM" },
      { id: 303, sender: 'them', text: "Sent the Figma link for the new dark mode.", time: "Monday" }
    ]
  },
  {
    id: 4,
    member: teamMembers.find(m => m.id === 5), // Alex
    lastMessage: "Animations for the dashboard are looking smooth!",
    timestamp: "Monday",
    unreadCount: 1,
    messages: [
      { id: 401, sender: 'them', text: "Check out the new dashboard transitions.", time: "11:00 AM" },
      { id: 402, sender: 'me', text: "They look great!", time: "11:05 AM" },
      { id: 403, sender: 'them', text: "Animations for the dashboard are looking smooth!", time: "Monday" }
    ]
  }
];
