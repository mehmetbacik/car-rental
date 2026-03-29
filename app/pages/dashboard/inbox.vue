<script setup lang="ts">
import { useInboxStore } from "@/stores/useInbox";

definePageMeta({ layout: "admin", middleware: "auth" });

const inboxStore = useInboxStore();
const newMessage = ref("");

const handleSend = () => {
  if (newMessage.value.trim()) {
    inboxStore.sendMessage(newMessage.value);
    newMessage.value = "";
  }
};
</script>

<template>
  <div class="inbox-page">
    <div class="inbox-container card">
      <aside class="chat-list">
        <div class="list-header">
          <h3>Messages</h3>
          <span class="badge">{{ inboxStore.chats.length }}</span>
        </div>
        <div class="search-messages">
          <input type="text" placeholder="Search chats..." />
        </div>
        <div class="users">
          <div
            v-for="chat in inboxStore.chats"
            :key="chat.id"
            class="user-item"
            :class="{ active: inboxStore.activeChatId === chat.id }"
            @click="inboxStore.setActiveChat(chat.id)"
          >
            <div class="avatar-box">
              <img :src="chat.userAvatar" />
              <span class="status-dot" :class="chat.status"></span>
            </div>
            <div class="user-info">
              <div class="top">
                <strong>{{ chat.userName }}</strong>
                <span v-if="chat.unreadCount > 0" class="unread">{{
                  chat.unreadCount
                }}</span>
              </div>
              <p class="last-msg">{{ chat.lastMessage }}</p>
            </div>
          </div>
        </div>
      </aside>

      <main class="chat-main">
        <template v-if="inboxStore.activeChat">
          <header class="chat-header">
            <div class="user-meta">
              <strong>{{ inboxStore.activeChat.userName }}</strong>
              <small>{{
                inboxStore.activeChat.status === "online"
                  ? "Active now"
                  : "Away"
              }}</small>
            </div>
            <div class="header-actions">
              <button class="btn-icon">📞</button>
              <button class="btn-icon">ℹ️</button>
            </div>
          </header>

          <div class="messages-area">
            <div
              v-for="msg in inboxStore.activeChat.messages"
              :key="msg.id"
              class="message-wrapper"
              :class="{ me: msg.isMe }"
            >
              <div class="message-bubble">
                <p>{{ msg.text }}</p>
                <span class="time">{{ msg.time }}</span>
              </div>
            </div>
          </div>

          <footer class="chat-footer">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              @keyup.enter="handleSend"
            />
            <button @click="handleSend" class="send-btn">Send</button>
          </footer>
        </template>
        <div v-else class="no-chat">
          <p>Select a conversation to start messaging</p>
        </div>
      </main>
    </div>
  </div>
</template>