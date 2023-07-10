<template>
  <section
    class="bg-white dark:bg-gray-900 flex h-[100vh] w-full items-center justify-center"
  >
    <div
      data-aos="fade-right"
      data-aos-duration="3000"
      data-aos-delay="250"
      class="mx-auto max-w-screen-xl"
    >
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-1 text-[130px] font-extrabold text-primary-600 dark:text-primary-500"
        >
          404
        </h1>
        <p class="mb-1 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
          Something's missing.
        </p>
        <p class="mb-4 text-2xl font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <router-link
          to="/"
          class="inline-flex text-white bg-[#457BC8] hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >Back to Homepage</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  AOS.init();
});
</script>

<style lang="scss" scoped></style>
