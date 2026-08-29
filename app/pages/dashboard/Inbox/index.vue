<script setup lang="ts">
import { useInboxStore } from "@/stores/useInbox";

import ChatList from "./components/ChatList.vue";
import ChatHeader from "./components/ChatHeader.vue";
import MessageList from "./components/MessageList.vue";
import MessageComposer from "./components/MessageComposer.vue";
import EmptyChat from "./components/EmptyChat.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const inboxStore = useInboxStore();

const handleSend = (message: string) => {
  inboxStore.sendMessage(message);
};

const handleSelectChat = (chatId: string) => {
  inboxStore.setActiveChat(chatId);
};

const handleCall = () => {
  // Handle call action
};

const handleInfo = () => {
  // Handle chat information
};
</script>

<template>
  <div class="inbox-page">
    <div class="inbox-container card">
      <ChatList
        :chats="inboxStore.chats"
        :active-chat-id="inboxStore.activeChatId"
        @select-chat="handleSelectChat"
      />
      <main class="chat-main">
        <template v-if="inboxStore.activeChat">
          <ChatHeader
            :user-name="inboxStore.activeChat.userName"
            :status="inboxStore.activeChat.status"
            @call="handleCall"
            @info="handleInfo"
          />
          <MessageList :messages="inboxStore.activeChat.messages" />
          <MessageComposer @send="handleSend" />
        </template>
        <EmptyChat v-else />
      </main>
    </div>
  </div>
</template>
