<script setup>
import { NModal, NCard } from "naive-ui";
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { projectStore } from "../../stores/project/projectStore";
import { useProject } from "../../service/project/index";
import { onMounted } from "vue";
import { Uploader } from "uploader";

let imgFile = ref(null);

const options = { multi: true };

const uploader = Uploader({
  apiKey: "free",
});

const onFileSelected = async () => {
  uploader
    .open(options)
    .then((files) => {
      if (files.length === 0) {
        console.log("No files selected.");
      } else {
        console.log("Files uploaded:");
        console.log(files.map((f) => f.fileUrl));
        updateInfo.image = files.map((f) => f.fileUrl)[0];
        projectInfo.image = files.map((f) => f.fileUrl)[0];
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

let id = ref(null);

const projectInfo = reactive({
  title: "",
  image: "",
  link: "",
});

const updateInfo = reactive({
  title: "",
  image: "",
  link: "",
});

const store = projectStore();

const listUpdate = () => {
  useProject.list().then((res) => {
    console.log(res);
    store.SET_LIST(res?.data);
  });
};

const deleteProject = async (id) => {
  const res = await useProject.remove(id);
  console.log(res);
  toast.success("Loyiha muvaffaqiyatli o'chirildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const updateProject = async (el) => {
  id.value = "";
  id.value = el._id;
  updateInfo.title = el.title;
  updateInfo.link = el.link;
  showUpdateModal.value = true;
};

const updateProject2 = async () => {
  console.log(id.value);
  const res = useProject.update(id.value, updateInfo);
  console.log(res);

  toast.success("Loyiha muvaffaqiyatli tahrirlandi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });
  setTimeout(() => {
    location.reload();
  }, 2800);
};

const addProject = async () => {
  const res = await useProject.create(projectInfo);
  console.log(res);
  toast.success("Loyiha muvaffaqiyatli qo'shildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  projectInfo.title = "";
  projectInfo.text = "";

  setTimeout(() => {
    location.reload();
  }, 2800);
};

let showCreateModal = ref(false);
let showUpdateModal = ref(false);

onMounted(() => {
  AOS.init();

  listUpdate();
});
</script>

<template>
  <h1
    data-aos="fade-down"
    data-aos-delay="500"
    class="text-center my-5 text-5xl font-bold"
  >
    List of projects
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
                <th scope="col" class="px-4 py-3 min-w-[300px]">Name</th>
                <th scope="col" class="px-4 py-3">Link</th>
                <th scope="col" class="px-4 py-3">Image</th>
                <th scope="col" class="px-4 py-3 min-w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700" v-for="(el, ind) in store.LIST">
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-xl text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.title.toUpperCase() }}
                </th>
                <td class="px-4 py-3">
                  <a :href="el.link">{{ el.link }}</a>
                </td>
                <td class="px-4 py-3"><img width="300" :src="el.image" alt="" /></td>
                <td class="px-4 py-3">
                  <abbr title="Remove"
                    ><i
                      class="bx bx-trash text-2xl mr-6 text-red-600 hover:text-red-900 duration-300 hover:cursor-pointer"
                      @click="deleteProject(el._id)"
                    ></i
                  ></abbr>
                  <abbr title="Edit"
                    ><i
                      class="bx bx-pencil text-2xl text-green-600 hover:text-green-900 duration-300 hover:cursor-pointer"
                      @click="updateProject(el)"
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
      <h1 class="text-3xl font-bold mb-9">Add new post</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Title:</h1>
          <h1 class="w-full text-lg">Link:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="projectInfo.title" type="text" class="w-full rounded-xl" />
          <input v-model="projectInfo.link" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Image:</h1>
        </div>
        <div class="flex gap-7">
          <input type="file" class="w-full" @change="onFileSelected" />
        </div>
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="addProject"
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
      <h1 class="text-3xl font-bold mb-9">Add new post</h1>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Title:</h1>
          <h1 class="w-full text-lg">Link:</h1>
        </div>
        <div class="flex gap-7">
          <input v-model="updateInfo.title" type="text" class="w-full rounded-xl" />
          <input v-model="updateInfo.link" type="text" class="w-full rounded-xl" />
        </div>
      </div>
      <div class="mb-7">
        <div class="flex gap-7">
          <h1 class="w-full text-lg">Image:</h1>
        </div>
        <div class="flex gap-7">
          <input type="file" class="w-full" @change="(e) => onFileSelected(e)" />
        </div>
      </div>
      <div class="w-full flex justify-end items-center">
        <button
          class="w-auto bg-[#457BC8] px-5 py-3 rounded-xl hover:bg-[#2d5184] duration-300 text-white text-xl"
          @click="updateProject2"
        >
          SEND
        </button>
      </div>
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped></style>
