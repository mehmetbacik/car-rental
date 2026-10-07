import { defineStore } from "pinia";

export interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  status: "online" | "offline";
  unreadCount: number;
  messages: Message[];
}

export const useInboxStore = defineStore("inbox", {
  state: () => ({
    chats: [
      {
        id: "1",
        userName: "John Smith",
        userAvatar: "/images/avatar/avatar-1.jpg",
        lastMessage: "Where is the vehicle delivery location?",
        status: "online",
        unreadCount: 2,
        messages: [
          {
            id: "m1",
            sender: "John Smith",
            text: "Hello, I made a reservation for the Koenigsegg.",
            time: "10:30 AM",
            isMe: false,
          },
          {
            id: "m2",
            sender: "Me",
            text: "Hello John, how can I assist you?",
            time: "10:32 AM",
            isMe: true,
          },
          {
            id: "m3",
            sender: "John Smith",
            text: "Where is the vehicle delivery location?",
            time: "10:35 AM",
            isMe: false,
          },
        ],
      },
      {
        id: "2",
        userName: "Emily Johnson",
        userAvatar: "/images/avatar/avatar-2.jpg",
        lastMessage: "Can we update the billing address?",
        status: "offline",
        unreadCount: 0,
        messages: [],
      },
    ] as Chat[],
    activeChatId: "1",
  }),
  getters: {
    activeChat: (state) => state.chats.find((c) => c.id === state.activeChatId),
  },
  actions: {
    setActiveChat(id: string) {
      this.activeChatId = id;
      const chat = this.chats.find((c) => c.id === id);
      if (chat) chat.unreadCount = 0;
    },
    sendMessage(text: string) {
      const chat = this.chats.find((c) => c.id === this.activeChatId);
      if (chat && text.trim()) {
        chat.messages.push({
          id: Date.now().toString(),
          sender: "Me",
          text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isMe: true,
        });
        chat.lastMessage = text;
      }
    },
  },
});
