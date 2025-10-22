import { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    senderName: "Thomas Banks",
    senderRole: "Tutor",
    receiverName: "James",
    receiverRole: "Student",
    message: "Let's go over the last experiment results together.",
    timestamp: "30 mins ago",
    courseCode: "BIO150",
    initials: "TB",
    bgColor: "bg-cyan-100",
  },
  {
    id: "2",
    senderName: "Alice Monroe",
    senderRole: "Tutor",
    receiverName: "Emily",
    receiverRole: "Student",
    message: "Don't forget to review the assigned readings before our session.",
    timestamp: "1 hr ago",
    courseCode: "ENG201",
    initials: "AM",
    bgColor: "bg-rose-100",
  },
];

export const olderNotifications: Notification[] = [
  {
    id: "3",
    senderName: "Michael Johnson",
    senderRole: "Tutor",
    receiverName: "Tom",
    receiverRole: "Student",
    message: "I noticed some errors in your last assignment. Can we clarify them?",
    timestamp: "18 June at 09:24 AM",
    courseCode: "MATH101",
    initials: "MJ",
    bgColor: "bg-purple-100",
  },
  {
    id: "4",
    senderName: "Sarah Smith",
    senderRole: "Tutor",
    receiverName: "Chris",
    receiverRole: "Student",
    message: "Great work on your presentation! Let's discuss the next steps.",
    timestamp: "15 June at 02:15 PM",
    courseCode: "CS202",
    initials: "SS",
    bgColor: "bg-green-100",
  },
];
