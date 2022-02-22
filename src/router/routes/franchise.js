export default [
  {
    path: '/franchise/',
    name: 'franchise',
    component: () => import('@/views/pages/franchise/Dashboard.vue'),
    meta: {
      group: 11,
      pageTitle: 'Dashboard',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/create_order',
    name: 'createorder',
    component: () => import('@/views/pages/franchise/CreateOrder.vue'),
    meta: {
      group: 11,
      pageTitle: 'Create Order',
      breadcrumb: [
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  // {
  //   path: '/franchise/delivery_history',
  //   name: 'history',
  //   component: () => import('@/views/pages/franchise/DeliveryHistory.vue'),
  //   meta: {
  //     group: 11,
  //     pageTitle: 'Delivery History',
  //     breadcrumb: [
  //       {
  //         text: 'Delivery History',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  {
    path: '/franchise/incoming_orders',
    name: 'incoming',
    component: () => import('@/views/pages/franchise/IncomingOrders.vue'),
    meta: {
      group: 11,
      pageTitle: 'Incoming Orders',
      breadcrumb: [
        {
          text: 'Incoming Orders',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/incoming_orders/:date',
    name: 'incoming_orders',
    component: () => import('@/views/pages/franchise/IncomingOrders.vue'),
    meta: {
      group: 11,
      pageTitle: 'Incoming Orders',
      breadcrumb: [
        {
          text: 'Incoming Orders',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/outgoing_orders',
    name: 'outgoing',
    component: () => import('@/views/pages/franchise/OutgoingOrders.vue'),
    meta: {
      group: 11,
      pageTitle: 'Outgoing Orders',
      breadcrumb: [
        {
          text: 'Outgoing Orders',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/order/:id',
    name: 'order',
    component: () => import('@/views/pages/franchise/Tracking.vue'),
    meta: {
      // group: 11,
      resource: 'Auth',
      pageTitle: 'Order Details',
      breadcrumb: [
        {
          text: 'Order Details',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/do_generate',
    name: 'dogenerate',
    component: () => import('@/views/pages/franchise/DoGenerate.vue'),
    meta: {
      group: 11,
      pageTitle: 'DO Generate',
      breadcrumb: [
        {
          text: 'DO Generate',
          active: true,
        },
      ],
    },
  },
  // {
  //   path: '/franchise/deduct_report',
  //   name: 'deduct',
  //   component: () => import('@/views/pages/franchise/DeductReport.vue'),
  //   meta: {
  //     group: 11,
  //     pageTitle: 'Deduct Report',
  //     breadcrumb: [
  //       {
  //         text: 'Deduct Report',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/franchise/invoice',
  //   name: 'invoice',
  //   component: () => import('@/views/pages/franchise/Invoice.vue'),
  //   meta: {
  //     group: 11,
  //     pageTitle: 'Invoice',
  //     breadcrumb: [
  //       {
  //         text: 'Invoice',
  //         active: true,
  //       },
  //     ],
  //   },
  // },
  // {
  //   path: '/franchise/scanner',
  //   name: 'scanner',
  //   component: () => import('@/views/Scanner.vue'),
  //   meta: {
  //     group: 11,
  //     pageTitle: 'Scanner',
  //     breadcrumb: [
  //       {
  //         text: 'Scanner',
  //         active: true,
  //       },
  //     ],
  //   },
  // }
]
