<script setup>
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { commentStore } from "../../stores/comment/commentStore";
import { useComment } from "../../service/comment/index";
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

let id = ref(null);

const store = commentStore();

const listUpdate = () => {
  useComment.list_verified().then((res) => {
    console.log(res);
    store.SET_LIST_UNVERIFIED(res?.data);
  });

  useComment.list_unverified().then((res) => {
    console.log(res);
    store.SET_LIST_VERIFIED(res?.data);
  });
};

const deleteComment = async (id) => {
  const res = await useComment.remove(id);
  console.log(res);
  toast.success("Izoh muvaffaqiyatli o'chirildi!", {
    autoClose: 2500,
    pauseOnHover: true,
  });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const unverify = async (id) => {
  const res = await useComment.unverify(id);
  console.log(res);
  toast.success("Tasdiq olib tashlandi!", { autoClose: 2500, pauseOnHover: true });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

const verify = async (id) => {
  const res = await useComment.verify(id);
  console.log(res);
  toast.success("Tasdiqlandi!", { autoClose: 2500, pauseOnHover: true });

  setTimeout(() => {
    location.reload();
  }, 2800);
};

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
    List of confirmed comments
  </h1>

  <section class="dark:bg-gray-900 p-3 sm:p-5 mb-[100px]">
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
        </div>
        <div data-aos="fade-up" data-aos-delay="1000" class="overflow-x-auto">
          <table
            v-if="store.LIST_UNVERIFIED.length"
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">User</th>
                <th scope="col" class="px-4 py-3">Comment</th>
                <th scope="col" class="px-4 py-3">Post Title</th>
                <th scope="col" class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, ind) in store.LIST_UNVERIFIED"
                class="border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.name }}
                </th>
                <td class="px-4 py-3">{{ el.comment }}</td>
                <td class="px-4 py-3">{{ el.post_id.title }}</td>
                <td class="px-4 py-3 flex items-center justify-start">
                  <abbr title="Remove"
                    ><i
                      class="bx bx-trash text-2xl mr-6 text-red-600 hover:text-red-900 duration-300 hover:cursor-pointer"
                      @click="deleteComment(el._id)"
                    ></i
                  ></abbr>
                  <abbr title="Unverify"
                    ><i
                      class="bx bxs-x-square text-2xl text-green-600 hover:text-green-900 duration-300 hover:cursor-pointer"
                      @click="unverify(el._id)"
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

  <h1
    data-aos="fade-down"
    data-aos-delay="500"
    class="text-center my-5 text-5xl font-bold"
  >
    List of unconfirmed comments
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
        </div>
        <div data-aos="fade-up" data-aos-delay="1000" class="overflow-x-auto">
          <table
            v-if="store.LIST_VERIFIED.length"
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">User</th>
                <th scope="col" class="px-4 py-3">Comment</th>
                <th scope="col" class="px-4 py-3">Post Title</th>
                <th scope="col" class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(el, ind) in store.LIST_VERIFIED"
                class="border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ el.name }}
                </th>
                <td class="px-4 py-3">{{ el.comment }}</td>
                <td class="px-4 py-3">{{ el.post_id.title }}</td>
                <td class="px-4 py-3 flex items-center justify-start">
                  <abbr title="Remove"
                    ><i
                      class="bx bx-trash text-2xl mr-6 text-red-600 hover:text-red-900 duration-300 hover:cursor-pointer"
                      @click="deleteComment(el._id)"
                    ></i
                  ></abbr>
                  <abbr title="Verify"
                    ><i
                      class="bx bxs-check-square text-2xl text-green-600 hover:text-green-900 duration-300 hover:cursor-pointer"
                      @click="verify(el._id)"
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
</template>

<style lang="scss" scoped></style>
