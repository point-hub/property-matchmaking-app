export default {
  path: '/admin/land-titles',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module'] },
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module', 'admin:certificates:create'] },
    },
    {
      path: ':id',
      component: () => import('./details/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module'] },
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module', 'admin:certificates:update'] },
    },
    {
      path: ':id/histories',
      component: () => import('./histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module'] },
    },
    {
      path: ':id/audits',
      component: () => import('./audits/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module', 'audit-logs:module'] },
    },
    {
      path: ':id/field-histories/:field',
      component: () => import('./field-histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:certificates:module'] },
    },
  ],
};
