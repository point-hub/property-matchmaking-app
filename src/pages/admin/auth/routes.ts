export default {
  path: '',
  children: [
    {
      path: '',
      redirect: 'signin',
    },
    {
      path: 'signin',
      component: () => import('@/pages/admin/auth/signin/index.vue'),
    },
    {
      path: 'signup',
      component: () => import('@/pages/admin/auth/signup/index.vue'),
    },
    {
      path: 'verify-email',
      component: () => import('@/pages/admin/auth/verify-email/index.vue'),
    },
    {
      path: 'verify-new-email',
      component: () => import('@/pages/admin/auth/verify-new-email/index.vue'),
    },
    {
      path: 'forgot-password',
      component: () => import('@/pages/admin/auth/forgot-password/index.vue'),
    },
    {
      path: 'reset-password',
      component: () => import('@/pages/admin/auth/reset-password/index.vue'),
    },
  ],
};
