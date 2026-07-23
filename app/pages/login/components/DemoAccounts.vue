<script setup lang="ts">
import DemoAccountItem from "./DemoAccountItem.vue";
import { useClipboard } from "~/composables/useClipboard";

const { copied, copy } = useClipboard();

const accounts = [
  {
    title: "admin",
    email: "admin@morent.com",
    password: "123",
  },
  {
    title: "user",
    email: "user@morent.com",
    password: "123",
  },
];
</script>

<template>
  <div class="login-demoInfo">
    <span class="login-infoIcon">i</span>
    <div class="loginTooltip tooltip">
      <h4>Demo Accounts</h4>
      <DemoAccountItem
        v-for="account in accounts"
        :key="account.title"
        :title="account.title"
        :email="account.email"
        :password="account.password"
        :copied="copied"
        @copy="copy"
      />
    </div>
  </div>
</template>
