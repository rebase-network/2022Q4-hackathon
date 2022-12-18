import message from '@/utils/messagePlugin';
import { createRouter, createWebHistory } from 'vue-router';

import pinia from '@/stores/store'
import { useUserStore } from '@/stores/userStore';
// const { profile } = storeToRefs();
const store = useUserStore(pinia);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 当页面切换时, 回到页面顶部
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('@/components/Layout/FreeLayout.vue'),
      children: [
        // {
        //   path: '',
        //   component: () => import('@/views/Home/HomePage.vue')
        // },
        {
          path: '/',
          component: () => import('@/views/Square/SquarePage.vue'),
        },
        {
          path: '/mydaos',
          component: () => import('@/views/Home/MyDaos.vue'),
          beforeEnter: (to, from, next) => {
            if (store.profile.result.wallet_address) {
              next();
            } else {
              next('/');
            }
          },
        },
        {
          path: '/thedao',
          component: () => import('@/views/Home/TheDao.vue'),
        },
        {
          path: '/404',
          component: () => import('@/views/NotDefindPage.vue'),
        },
        {
          path: '/:pathMatch(.*)',
          redirect: '/404',
        },
      ],
    },
    // Create Dao
    {
      path: '/createdao',
      component: () => import('@/views/Dao/CreateDaoPage.vue'),
    },
  ],
});

export default router;

/**
      children: [
        {
          path: "",
          component: () => import("@/views/home/HomePage.vue"),
        },
        {
          path: "category/:id",
          component: () => import("@/views/category/TopCategoryPage.vue"),
        },
        {
          path: "category/sub/:top/:sub",
          component: () => import("@/views/category/SubCategoryPage.vue"),
        },
        {
          path: "goods/:id",
          component: () => import("@/views/goods/GoodsDetailPage.vue"),
        },
        {
          path: "/cart",
          component: () => import("@/views/cart/CartPage.vue"),
        },
        {
          path: "checkout/order",
          component: () => import("@/views/pay/CheckoutPage.vue"),
        },
        {
          path: "checkout/pay",
          component: () => import("@/views/pay/PayPage.vue"),
        },
        {
          path: "member",
          component: () => import("@/components/XtxMemberLayout.vue"),
          redirect: "/member/home",
          children: [
            {
              path: "home",
              component: () => import("@/views/member/home/MemberHomePage.vue"),
            },
            {
              path: "order",
              component: h(RouterView),
              children: [
                {
                  path: "",
                  component: () =>
                    import("@/views/member/order/OrderListPage.vue"),
                },
                {
                  path: ":id",
                  component: () =>
                    import("@/views/member/order/OrderDetailPage.vue"),
                },
              ],
            },
          ],
        },
      ],
 */
