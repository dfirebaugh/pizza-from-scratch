/**
 * this is where we determine what shows up when we 
 * change the APP_MODE
 */
import { Router } from '@vaadin/router';

import "./pages/comic-feed";
import "./pages/comic-page";

const router = new Router(document.getElementById("pizza-from-scratch"));
router.setRoutes([
    { path: '/', component: 'comic-feed' },
    { path: '/comics/:slug', component: 'comic-page' },
]);

console.log(router.location)


export default router;
