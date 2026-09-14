import { createRouter, createWebHistory } from 'vue-router';

import authConfig from '@/config/auth';
import routesAdminAccount from '@/pages/admin/account/routes';
import routesAdminAdministrator from '@/pages/admin/administrator/routes';
import routesAdminAuth from '@/pages/admin/auth/routes';
import routesAdminLandTitles from '@/pages/admin/land-titles/routes';
import routesAdminFacilities from '@/pages/admin/facilities/routes';
import routesAdminProblems from '@/pages/admin/problems/routes';
import routesAdminPromos from '@/pages/admin/promos/routes';
import routesAdminProperties from '@/pages/admin/properties/routes';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '/',
          component: () => import('@/layouts/web.vue'),
          children: [
            {
              path: '/',
              component: () => import('@/pages/index.vue'),
            },
          ],
        },
        {
          path: 'property-recommendations',
          component: () => import('@/pages/property-recommendations.vue'),
        },
        {
          path: '/customer-preferences',
          component: () => import('@/layouts/web.vue'),
          children: [
            {
              path: 'location',
              component: () => import('@/pages/customer-preferences/location.vue'),
            },
            {
              path: 'budget',
              component: () => import('@/pages/customer-preferences/budget.vue'),
            },
            {
              path: 'buying-problem',
              component: () => import('@/pages/customer-preferences/buying-problem.vue'),
            },
            {
              path: 'promotion-needs',
              component: () => import('@/pages/customer-preferences/promotion-needs.vue'),
            },
            {
              path: 'user-info',
              component: () => import('@/pages/customer-preferences/user-info.vue'),
            },
          ],
        },
        {
          path: '/admin',
          component: () => import('@/layouts/admin.vue'),
          children: [
            {
              path: '/admin',
              component: () => import('@/pages/home.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: '/admin/home',
              component: () => import('@/pages/home.vue'),
              meta: { requiresAuth: true },
            },
            routesAdminAccount,
            routesAdminAdministrator,
            routesAdminLandTitles,
            routesAdminFacilities,
            routesAdminProblems,
            routesAdminPromos,
            routesAdminProperties,
          ],
        },
        {
          path: '/admin',
          component: () => import('@/layouts/auth.vue'),
          children: [routesAdminAuth],
        },
        {
          // redirect signin to Pointhub SSO
          path: '/sso-signin',
          component: () => import('@/pages/empty.vue'),
          beforeEnter() {
            const queryParams = {
              client_id: authConfig.client_id,
              response_type: 'code',
              state: crypto.randomUUID(),
              redirect_uri: authConfig.redirect_uri,
            };
            const queryString = new URLSearchParams(queryParams).toString();
            window.location.href = `${authConfig.url}?${queryString}`;
          },
        },
        {
          path: '/403',
          component: () => import('@/pages/403.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('@/pages/404.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    // always scroll to top after navigation
    return { top: 0 };
  },
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  // try to reauthenticate if not authenticated
  if (!authStore.isAuthenticated && to.path !== '/signin') {
    // await authStore.reauthenticate().catch(() => {});
  }

  // check if user has permission to access route
  if (to.meta.permissions) {
    const required = Array.isArray(to.meta.permissions)
      ? to.meta.permissions
      : [to.meta.permissions];

    const hasAccess = required.every(p =>
      authStore.hasPermission(p),
    );

    // TODO: uncomment this to enable permission check
    if (!hasAccess) {
      // return '/403';
    }
  }

  if (to.path !== '/admin/signin') {
    return '/admin/signin';
  }

  // redirect to signin page if not authenticated
  // if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // return `/admin/signin?redirect=${encodeURIComponent(to.fullPath)}`;
  // }
});

export default router;
