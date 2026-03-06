import { createRouter, createWebHistory } from "vue-router";
import axiosInstance from "../plugins/axios";

const routes = [
    {
        path: '/',
        component: () => import('../userPage/layouts/contentWrapper.vue'),
        children: [
            {
                path: '',
                component: () => import('../userPage/pages/home.vue')
            },
            {
                path: 'resume',
                component: () => import('../userPage/pages/resume.vue')
            },
            {
                path: 'portfolio',
                name: 'portfolio',
                component: () => import('../userPage/pages/portfoliot.vue')
            },
            {
                path: 'projectDetail/:slug',
                component: () => import('../userPage/pages/projectDetail.vue')
            },
        ]
    },
    {
      path: '/admins',
      meta: { requiresAuth: true },
      component: () => import('../adminPage/layouts/contentWrapper.vue'),
      children:[
        {
          path: '',
          name: 'adminHome',
          component: () => import('../adminPage/pages/home.vue')
        },
        {
          path:'portfolio',
          name:'adminPortfolio',
          component: () => import('../adminPage/pages/portfolio.vue')
        },
        {
          path:'contact',
          name:'adminContact',
          component: () => import('../adminPage/pages/contact.vue')
        },
        {
          path:'profils',
          name:'adminProfils',
          component: () => import('../adminPage/pages/profil.vue')
        },
      ]
    },
    {
      path: '/admins/login',
      name: 'adminLogin',
      component: () => import('../adminPage/pages/login.vue')
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 0 };
    } else {
      return { top: 0 };
    }
  }
});

// 🔎 Vérification de l’authentification
export async function isAuthenticated() {
  try {
    const res = await axiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 200) {
      return res.data.user;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification :", error);
    return null;
  }
}

// 🧠 Middleware global
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const auth = await isAuthenticated();
      const token = localStorage.getItem("token");

      if (auth && token) {

        next();

      } else {
        localStorage.setItem('redirectAfterLogin', to.fullPath);
        window.location.href = '/admins/login';
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification :", error);
      next("/admins/login");
    }
  } else {
    // Rediriger si déjà connecté et essaie d'aller sur /admins/login
    if (to.path === '/admins/login') {
      const auth = await isAuthenticated();
      const token = localStorage.getItem("token");
      if (auth && token) {
        next('/admins');
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;