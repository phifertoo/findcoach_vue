import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetail';
import CoachesList from './pages/coaches/CoachesList';
import CoachRegistration from './pages/coaches/CoachRegistration';
import ContactCoach from './pages/requests/ContactCoach';
import RequestsReceived from './pages/requests/RequestsReceived';
import NotFound from './pages/NotFound';

const router = createRouter({
  // creates a router history object
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      //   when you set prop: true, params will be passed into the component as props
      props: true,
      //   do not include a '/' in the child path
      //   /coaches/:id/contact
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register/', component: CoachRegistration },
    { path: '/requests/', component: RequestsReceived },
    // covers all undefined routes
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
