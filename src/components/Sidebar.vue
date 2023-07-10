<script setup>
import { sidebar } from "../constants/sidebar";
import { RouterLink } from "vue-router";

const login = () => {
  localStorage.clear("token");
  document.location = "/login";
};
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full pl-3 py-4 overflow-y-auto bg-[#fafafa]">
      <router-link to="/"
        ><img src="logo.png" alt="" class="mb-[40px] mt-[15px]"
      /></router-link>
      <ul v-for="el in sidebar" class="space-y-2 font-medium">
        <router-link
          :to="el.link"
          :key="el.id"
          class="mb-[20px] flex items-center p-2 hover:bg-[#bfbfbf] duration-200 rounded-l-lg"
        >
          <i :class="el.icon" class="mr-[15px] text-[28px]"></i>
          <h1 class="text-[20px]">{{ el.title }}</h1>
        </router-link>
      </ul>
    </div>
    <ul class="absolute bottom-2 px-3 py-4">
      <li class="hover:bg-[#bfbfbf] duration-200 rounded-lg">
        <button @click="login" class="flex items-center p-2">
          <i class="bx bxs-door-open mr-[15px] text-[28px]"></i>
          <h1 class="text-[20px]">Log out</h1>
        </button>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.router-link-exact-active {
  background-color: rgb(69, 123, 200);
  color: white;
}
</style>
