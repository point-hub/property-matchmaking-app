export default {
  path: '/admin/problems',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module'] },
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module', 'admin:problems:create'] },
    },
    {
      path: ':id',
      component: () => import('./details/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module'] },
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module', 'admin:problems:update'] },
    },
    {
      path: ':id/histories',
      component: () => import('./histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module'] },
    },
    {
      path: ':id/audits',
      component: () => import('./audits/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module', 'audit-logs:module'] },
    },
    {
      path: ':id/field-histories/:field',
      component: () => import('./field-histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:problems:module'] },
    },
  ],
};
