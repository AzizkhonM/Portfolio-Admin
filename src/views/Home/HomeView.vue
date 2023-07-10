<script setup>
import { onMounted, ref } from "vue";
import { useHome } from "../../service/home/index";
import { homeStore } from "../../stores/home/homeStore";
import Chart from "../../components/Chart.vue";

const store = homeStore();

let data = JSON.parse(localStorage.getItem("data"));

const listUpdate = () => {
  useHome.list_socials().then((res) => {
    store.SET_LIST_SOCIALS(res?.data);
  });
  useHome.list_comments().then((res) => {
    store.SET_LIST_COMMENTS(res?.data);
  });
  useHome.list_posts().then((res) => {
    store.SET_LIST_POSTS(res?.data);
  });
  useHome.list_study().then((res) => {
    store.SET_LIST_STUDY(res?.data);
  });
  useHome.list_work().then((res) => {
    store.SET_LIST_WORK(res?.data);
  });
  useHome.list_skills().then((res) => {
    store.SET_LIST_SKILLS(res?.data);
  });
  useHome.list_services().then((res) => {
    store.SET_LIST_SERVICES(res?.data);
  });
  useHome.list_projects().then((res) => {
    store.SET_LIST_PROJECTS(res?.data);
  });
};

let currentTime = ref(new Date().toLocaleTimeString());

let time = new Date().getHours();
console.log(time);
let day = new Date().getDay();
console.log(day);
let date = new Date().toString().split(" ");
console.log();

onMounted(() => {
  AOS.init();

  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);

  listUpdate();
});
</script>

<template>
  <div class="w-full flex justify-end items-center">
    <h1 data-aos="fade-left" data-aos-delay="400" class="text-[35px]">
      <span v-if="day == 1">Monday</span><span v-if="day == 2">Tuesday</span
      ><span v-if="day == 3">Wednesday</span><span v-if="day == 4">Thursday</span
      ><span v-if="day == 5">Friday</span><span v-if="day == 6">Saturday</span
      ><span v-if="day == 0">Sunday</span>, {{ date[1] }} {{ date[2] }} {{ date[3] }},
      {{ currentTime }}
    </h1>
  </div>
  <div class="mt-[50px] mx-[50px] flex justify-between items-center">
    <h1 data-aos="fade-right" data-aos-delay="800" class="text-[50px]">
      <span v-if="time >= 5 && time < 12">Good Morning</span
      ><span v-if="time >= 12 && time < 17">Good Afternoon</span
      ><span v-if="time >= 17 && time < 20">Good Evening</span
      ><span v-if="(time >= 20 && time <= 24) || (time >= 0 && time < 5)">Good night</span
      >,
      <span class="font-bold">{{ data?.name }}</span>
    </h1>
    <img
      data-aos="fade-left"
      data-aos-delay="800"
      :src="data?.image"
      width="200"
      class="rounded-full"
      alt=""
    />
  </div>

  <Chart
    data-aos="fade-up"
    data-aos-delay="1200"
    :data="{
      study: store.LIST_STUDY.length,
      work: store.LIST_WORK.length,
      skills: store.LIST_SKILLS.length,
      services: store.LIST_SERVICES.length,
      projects: store.LIST_PROJECTS.length,
      socials: store.LIST_SOCIALS.length,
      comments: store.LIST_COMMENTS.length,
      posts: store.LIST_POST.length,
    }"
  />

  <!-- <div class="w-full px-[50px] mt-[50px]">
    <div class="w-full border-2 h-auto p-3 rounded-md">
      <div class="grid grid-cols-3 gap-5 justify-center items-center">
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bxs-graduation"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of studied places</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_STUDY.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bxs-briefcase"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of worked places</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_WORK.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bx-list-check"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of skills</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_SKILLS.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bx-list-ol"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of services</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_SERVICES.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bx-sitemap"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of projects</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_PROJECTS.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bxl-instagram-alt"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of pages on social media sites</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_SOCIALS.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bxs-comment-detail"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of comments</h1>
            <h1 class="text-4xl font-bold">{{ store.LIST_COMMENTS.length }}</h1>
          </div>
        </div>
        <div class="text-right items-center flex py-2 justify-between px-5">
          <div><i class="text-6xl bx bxs-detail"></i></div>
          <div class="grid grid-cols-1">
            <h1 class="font-black text-xl mb-3">Number of posts</h1>
            <h1 class="text-4xl font-bold text-right">{{ store.LIST_POST.length }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped></style>
