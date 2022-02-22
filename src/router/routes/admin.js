export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/pages/admin/Dashboard.vue'),
    meta: {
      group: 1,
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
    path: '/admin/franchise_list',
    name: 'franchise_list',
    component: () => import('@/views/pages/admin/Franchise_List.vue'),
    meta: {
      group: 1,
      pageTitle: 'Manage Franchise',
      breadcrumb: [
        {
          text: 'Manage Franchise',
          active: true,
        },
      ],
    },
  },
  {
    path: '/admin/assign_postal',
    name: 'assigns',
    component: () => import('@/views/pages/admin/Assign.vue'),
    meta: {
      group: 1,
      pageTitle: 'Assign Postals',
      breadcrumb: [
        {
          text: 'Assign',
          active: true,
        },
      ],
    },
  },
  {
    path: '/admin/franchise_orders/:id',
    name: 'franchise_orders',
    component: () => import('@/views/pages/admin/Franchise_orders.vue'),
    meta: {
      group: 1,
      pageTitle: 'Franchise Orders',
      breadcrumb: [
        {
          text: 'Order',
          active: true,
        },
      ],
    },
  },
]
