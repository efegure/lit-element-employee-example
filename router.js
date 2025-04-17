import {Router} from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  {path: '/', component: 'employee-list-page'},
  {path: '/add-employee', component: 'add-employee-page'},
]);
