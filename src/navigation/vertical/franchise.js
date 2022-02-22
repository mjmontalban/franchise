export default [
  {
    title: 'Dashboard',
    route: 'franchise',
    icon: 'HomeIcon',
  },
  {
    title: 'Create Order',
    route: 'createorder',
    icon: 'PlusCircleIcon',
  },
  {
    title: 'Incoming Orders',
    route: 'incoming',
    icon: 'ArrowDownRightIcon',
  },
  {
    title: 'Outgoing Orders',
    route: 'outgoing',
    icon: 'ArrowUpLeftIcon',
  },
  {
    title: 'DO Generate',
    route: 'dogenerate',
    icon: 'CastIcon',
  },
  {
    title: 'Singapore Orders',
    icon: 'MapIcon',
    children: [
      {
        title: 'Create Order',
        route: 'createordersingapore',
        icon: 'PlusCircleIcon',
      },
      {
        title: 'Orders List',
        route: 'outgoingsingapore',
        icon: 'ArrowUpLeftIcon',
      },
      {
        title: 'Generate DO',
        route: 'dogeneratesingapore',
        icon: 'CastIcon',
      },
    ],
  },
  {
    title: 'DHL Orders',
    icon: 'MapIcon',
    children: [
      {
        title: 'Create DHL Order',
        route: 'createorderdhl',
        icon: 'PlusCircleIcon',
      },
      {
        title: 'DHL Orders List',
        route: 'dhlOrders',
        icon: 'ArrowUpLeftIcon',
      }
    ]
  },
]