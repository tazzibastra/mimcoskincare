const routes = [
  {
    path: '/comingsoon',
    name: 'ComingSoon',
    component: () => import('src/pages/systempages/ComingSoonPage.vue'), // Default landing page
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: () => import('src/pages/systempages/ThankYouPage.vue'), // Default landing page
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: () => import('src/pages/systempages/PaymentSuccess.vue'),
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        path: '/managerportal',
        name: 'ManagerPortal',
        component: () => import('src/pages/systempages/ManagerPortalPage.vue'),
      },
      {
        path: '/neworders',
        name: 'NewOrdersPage',
        component: () => import('src/pages/systempages/NewOrdersPage.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('src/pages/systempages/CheckOut.vue'),
      },
      {
        path: '/orderconfirmation',
        name: 'OrderConfirmation',
        component: () => import('src/pages/systempages/OrderConfirmation.vue'),
      },
      {
        path: '/pretty',
        name: 'PrettyProductPage',
        component: () => import('src/pages/PrettyProductPage.vue'),
      },
      {
        path: '/rosa',
        name: 'RosaProductPage',
        component: () => import('src/pages/RosaProductPage.vue'),
      },
      {
        path: '/rekindle',
        name: 'RekindleProductPage',
        component: () => import('src/pages/RekindleProductPage.vue'),
      },
      {
        path: '/reglow',
        name: 'ReGlowProductPage',
        component: () => import('src/pages/ReGlowProductPage.vue'),
      },
      {
        path: '/repurify',
        name: 'RePurifyProductPage',
        component: () => import('src/pages/RePurifyProductPage.vue'),
      },
      {
        path: '/resparkle',
        name: 'ReSparkleProductPage',
        component: () => import('src/pages/ReSparkleProductPage.vue'),
      },
      {
        path: '/profilepage',
        name: 'ProfilePage',
        component: () => import('src/pages/ProfilePage.vue'),
      },
      {
        path: '/myturn',
        name: 'MyTurn',
        component: () => import('src/pages/MyTurnBundlePage.vue'),
      },
      {
        path: '/healingera',
        name: 'HealingEraProductPage',
        component: () => import('src/pages/HealingEraProductPage.vue'),
      },
      {
        path: '/travelbag',
        name: 'SkinCareTravelBag',
        component: () => import('src/pages/SkinCareTravelBag.vue'),
      },

      {
        path: '/therapyera',
        name: 'TherapyEra',
        component: () => import('src/pages/TherapyEraBundlePage.vue'),
      },

      {
        path: '/justagirl',
        name: 'JustAGirl',
        component: () => import('src/pages/JustAGirlBundlePage.vue'),
      },
      {
        path: '/all',
        name: 'AllProductsPage',
        component: () => import('src/pages/AllProductsPage.vue'),
      },
      {
        path: '/holyglaze',
        name: 'HolyGlaze',
        component: () => import('pages/TheHolyGlaze.vue'),
      },
      {
        path: '/shopall',
        name: 'ShopAll',
        component: () => import('pages/ShopAll.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('src/pages/systempages/LogInPage.vue'),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('src/pages/systempages/SignUp.vue'),
      },
    ],
  },
  {
    path: '/newpage',
    name: 'NewPage',
    component: () => import('src/pages/systempages/NewPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/systempages/ErrorNotFound.vue'),
  },
]

export default routes
