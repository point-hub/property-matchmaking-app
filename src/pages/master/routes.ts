import roleRoutes from './roles/routes';
import userRoutes from './users/routes';

export default {
  path: 'master',
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true },
    },
    userRoutes,
    roleRoutes,
  ],
};
