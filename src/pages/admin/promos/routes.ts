export default {
  path: '/admin/promos',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module'] },
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module', 'admin:promos:create'] },
    },
    {
      path: ':id',
      component: () => import('./details/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module'] },
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module', 'admin:promos:update'] },
    },
    {
      path: ':id/histories',
      component: () => import('./histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module'] },
    },
    {
      path: ':id/audits',
      component: () => import('./audits/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module', 'audit-logs:module'] },
    },
    {
      path: ':id/field-histories/:field',
      component: () => import('./field-histories/index.vue'),
      meta: { requiresAuth: true, permissions: ['admin:promos:module'] },
    },
  ],
};
