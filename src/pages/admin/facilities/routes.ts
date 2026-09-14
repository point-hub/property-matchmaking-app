export default {
  path: '/admin/facilities',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module'] },
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module', 'admin:facilities:create'] },
    },
    {
      path: ':id',
      component: () => import('./details/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module'] },
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module', 'admin:facilities:update'] },
    },
    {
      path: ':id/histories',
      component: () => import('./histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module'] },
    },
    {
      path: ':id/audits',
      component: () => import('./audits/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module', 'audit-logs:module'] },
    },
    {
      path: ':id/field-histories/:field',
      component: () => import('./field-histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:facilities:module'] },
    },
  ],
};
