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
  {
    path: '/franchise/create_order_singapore',
    name: 'createordersingapore',
    component: () => import('@/views/pages/franchise/CreateOrderSingapore.vue'),
    meta: {
      group: 11,
      pageTitle: 'Create Singapore Order',
      breadcrumb: [
        {
          text: 'Create Singapore Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/outgoing_orders_singapore',
    name: 'outgoingsingapore',
    component: () => import('@/views/pages/franchise/OutgoingOrdersSingapore.vue'),
    meta: {
      group: 11,
      pageTitle: 'Outgoing Singapore Orders',
      breadcrumb: [
        {
          text: 'Outgoing Singapore Orders',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/do_generate_singapore',
    name: 'dogeneratesingapore',
    component: () => import('@/views/pages/franchise/DoGenerateSingapore.vue'),
    meta: {
      group: 11,
      pageTitle: 'Generate Singapore DO',
      breadcrumb: [
        {
          text: 'Generate Singapore DO',
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
    path: '/franchise/generate/:id',
    name: 'generatedo',
    component: () => import('@/views/pages/franchise/DoRegenerate.vue'),
    meta: {
      // group: 11,
      layout: 'full',
      resource: 'Auth',
      pageTitle: 'Generate DO',
      breadcrumb: [
        {
          text: 'Generate DO',
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
  {
    path: '/franchise/create_order_dhl',
    name: 'createorderdhl',
    component: () => import('@/views/pages/franchise/CreateOrderDhl.vue'),
    meta: {
      group: 11,
      pageTitle: 'Create DHL Order',
      breadcrumb: [
        {
          text: 'Create DHL Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/franchise/dhlOrders',
    name: 'dhlOrders',
    component: () => import('@/views/pages/franchise/DhlOrders.vue'),
    meta: {
      group: 11 ,
      pageTitle: 'My DHL Orders',
      breadcrumb: [
        {
          text: 'My DHL Orders',
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
