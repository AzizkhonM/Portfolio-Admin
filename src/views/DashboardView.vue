<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <main class="">
    <section id="main" class="w-full">
      <Sidebar />
      <div class="p-4 sm:ml-64">
        <div class="">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </main>
</template>
