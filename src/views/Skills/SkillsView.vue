<script setup>
import { NModal, NCard } from "naive-ui";
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { useSkill } from "../../service/skill/index";
import { skillStore } from "../../stores/skill/skillStore";
import { onMounted } from "vue";
import { Upload } from "upload-js";

import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from "flowbite";

let imgFile = ref(null);

let id = ref(null);

const skillInfo = reactive({
  skill: "",
  image: "",
});

const updateInfo = reactive({
  skill: "",
  image: "",
});

const store = skillStore();

const listUpdate = () => {
  useSkill.list().then((res) => {
    console.log(res);
    store.SET_LIST(res?.data);
  });
};

const deleteSkill = async (id) => {
  const res = await useSkill.remove(id);
  console.log(res);
  toast.success("Ijtimoiy tarmoqdagi sahifa muvaffaqiyatli o'chirildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const updateSkill = async (el) => {
  id.value = "";
  id.value = el._id;
  showUpdateModal.value = true;
};

const updateSkill2 = async () => {
  console.log(id.value);
  const { fileUrl } = await upload.uploadFile(imgFile.value);
  updateInfo.image = fileUrl;
  const res = await useSkill.update(id.value, updateInfo);
  console.log(res);

  toast.success("Qobiliyat muvaffaqiyatli tahrirlandi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });
  setTimeout(() => {
    location.reload();
  }, 2800);
};

const addSkill = async () => {
  const { fileUrl } = await upload.uploadFile(imgFile.value);
  skillInfo.image = fileUrl;
  const res = await useSkill.create(skillInfo);
  console.log(res);
  toast.success("Ijtimoiy tarmoqdagi sahifa muvaffaqiyatli qo'shildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  skillInfo.image = "";
  skillInfo.skill = "";

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const upload = Upload({
  apiKey: "public_FW25bRnE4fgNEhLnwfjq55kNjgyn",
});

const onFileSelected = async (event) => {
  imgFile.value = "";
  imgFile.value = event.target.files[0];
  console.log(imgFile.value);
};

let showCreateModal = ref(false);
let showUpdateModal = ref(false);

onMounted(() => {
  AOS.init();

  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();

  listUpdate();
});
</script>

<template>
  <h1
    data-aos="fade-down"
    data-aos-delay="500"
    class="text-center my-5 text-5xl font-bold"
  >
    List of skills
  </h1>

  <section class="dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen px-4 lg:px-12">
      <!-- Start coding here -->
      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full"></div>
            </form>
          </div>
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <button
              data-aos="fade-left"
              data-aos-delay="750"
              @click="showCreateModal = true"
              type="button"
              class="flex items-center justify-center text-white bg-[#457BC8] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                class="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add new skill
            </button>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="1000" class="overflow-x-auto">
          <table
            v-if="store.LIST.length"
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">Skill</th>
                <th scope="col" class="px-4 py-3">Icon</th>
                <th scope="col" class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(el, ind) in store.LIST" class="border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-xl text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.skill }}
                </th>
                <td class="px-4 py-3"><img :src="el.image" width="100" alt="" /></td>
                <td class="px-4 py-3">
                  <abbr title="Remove"
                    ><i
                      class="bx bx-trash text-2xl mr-6 text-red-600 hover:text-red-900 duration-300 hover:cursor-pointer"
                      @click="deleteSkill(el._id)"
                    ></i
                  ></abbr>
                  <abbr title="Edit"
                    ><i
                      class="bx bx-pencil text-2xl text-green-600 hover:text-green-900 duration-300 hover:cursor-pointer"
                      @click="updateSkill(el)"
                    ></i
                  ></abbr>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <n-modal v-model:show="showCreateModal">
    <n-card
      style="width: 900px; border-radius: 20px"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <h1 class="text-3xl font-bold mb-9">Add new skill</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Skill:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="skillInfo.skill" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <h1 class="w-full text-lg">Icon:</h1>
        <input type="file" class="w-full" @change="(e) => onFileSelected(e)" />
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="addSkill"
        >
          SEND
        </button>
      </div>
    </n-card>
  </n-modal>

  <n-modal v-model:show="showUpdateModal">
    <n-card
      style="width: 900px; border-radius: 20px"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <h1 class="text-3xl font-bold mb-9">Edit the skill</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Skill:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="updateInfo.skill" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <h1 class="w-full text-lg">Icon:</h1>
        <input type="file" class="w-full" @change="(e) => onFileSelected(e)" />
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="updateSkill2"
        >
          SEND
        </button>
      </div>
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped></style>
