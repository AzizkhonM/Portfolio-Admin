<script setup>
import { NModal, NCard } from "naive-ui";
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
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
import { onMounted } from "vue";
import { studyStore } from "../../stores/study/studyStore";
import { useStudy } from "../../service/study/index";

let id = ref(null);

const studyInfo = reactive({
  place: "",
  faculty: "",
  start_year: "",
  end_year: "",
});

const updateInfo = reactive({
  place: "",
  faculty: "",
  start_year: "",
  end_year: "",
});

const store = studyStore();

const listUpdate = () => {
  useStudy.list().then((res) => {
    console.log(res);
    store.SET_LIST(res?.data);
  });
};

const deleteStudy = async (id) => {
  const res = await useStudy.remove(id);
  console.log(res);
  toast.success("O'qish joyi muvaffaqiyatli o'chirildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const updateStudy = async (el) => {
  id.value = "";
  id.value = el._id;
  showUpdateModal.value = true;
};

const updateStudy2 = async () => {
  console.log(id.value);
  const res = await useStudy.update(id.value, updateInfo);
  console.log(res);

  toast.success("O'qish joy muvaffaqiyatli tahrirlandi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });
  setTimeout(() => {
    location.reload();
  }, 2800);
};

const addStudy = async () => {
  const res = await useStudy.create(studyInfo);
  console.log(res);
  toast.success("O'qish joy muvaffaqiyatli qo'shildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  studyInfo.image = "";
  studyInfo.site = "";
  studyInfo.username = "";

  setTimeout(() => {
    location.reload();
  }, 2800);
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
    List of studied places
  </h1>

  <section class="dark:bg-gray-900 p-3 sm:p-5 h-auto">
    <div class="mx-auto max-w-screen px-4 lg:px-12">
      <!-- Start coding here -->
      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <div class="w-full md:w-1/2"></div>
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
              Add new place
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
                <th scope="col" class="px-4 py-3">Place name</th>
                <th scope="col" class="px-4 py-3">Department or faculty</th>
                <th scope="col" class="px-4 py-3">Started year</th>
                <th scope="col" class="px-4 py-3">Graduated year</th>
                <th scope="col" class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(el, ind) in store.LIST" class="border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-xl text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.place }}
                </th>
                <td class="px-4 py-3">{{ el.faculty }}</td>
                <td class="px-4 py-3">{{ el.start_year }}</td>
                <td class="px-4 py-3">{{ el.end_year }}</td>
                <td class="px-4 py-3 flex items-center justify-start">
                  <abbr title="Remove"
                    ><i
                      class="bx bx-trash text-2xl mr-6 text-red-600 hover:text-red-900 duration-300 hover:cursor-pointer"
                      @click="deleteStudy(el._id)"
                    ></i
                  ></abbr>
                  <abbr title="Edit"
                    ><i
                      class="bx bx-pencil text-2xl text-green-600 hover:text-green-900 duration-300 hover:cursor-pointer"
                      @click="updateStudy(el)"
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
      <h1 class="text-3xl font-bold mb-9">Add new place</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Place name:</h1>
          <h1 class="w-full text-lg">Department or faculty:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="studyInfo.place" type="text" class="w-full rounded-xl" />
          <input v-model="studyInfo.faculty" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Started year:</h1>
          <h1 class="w-full text-lg">Graduated year:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="studyInfo.start_year" type="number" class="w-full rounded-xl" />
          <input v-model="studyInfo.end_year" type="number" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="addStudy"
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
      <h1 class="text-3xl font-bold mb-9">Edit the place</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Place name:</h1>
          <h1 class="w-full text-lg">Department or faculty:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="updateInfo.place" type="text" class="w-full rounded-xl" />
          <input v-model="updateInfo.faculty" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Started year:</h1>
          <h1 class="w-full text-lg">Graduated year:</h1>
        </div>
        <div class="flex gap-7">
          <input
            v-model="updateInfo.start_year"
            type="number"
            class="w-full rounded-xl"
          />
          <input v-model="updateInfo.end_year" type="number" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="updateStudy2"
        >
          SEND
        </button>
      </div>
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped></style>
