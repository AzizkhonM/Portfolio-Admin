import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/Home/HomeView.vue')
        },
        {
          path: '/study',
          name: 'study',
          component: () => import('../views/Study/StudyView.vue')
        },
        {
          path: '/work',
          name: 'work',
          component: () => import('../views/Work/WorkView.vue')
        },
        {
          path: '/social_pages',
          name: 'socialpage',
          component: () => import('../views/SocialSites/SocialSitesView.vue')
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('../views/Services/ServicesView.vue')
        },
        {
          path: '/skills',
          name: 'skills',
          component: () => import('../views/Skills/SkillsView.vue')
        },
        {
          path: '/comments',
          name: 'comments',
          component: () => import('../views/Comments/CommentsView.vue')
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => import('../views/Posts/PostView.vue')
        },
        {
          path: '/projects',
          name: 'project',
          component: () => import('../views/Project/ProjectView.vue')
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/Error/ErrorView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/LoginView.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.name !== 'login') {
      console.log(to.name, 'page');
      next({name: 'login'})      
  } else {
    console.log('ksdfjsdkfnj');
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !token) next({ name: 'login' })
//   else next()
// })

    export default router;
