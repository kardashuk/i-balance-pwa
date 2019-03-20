
export default [

    {
        path: '/logout',
        exact: true,
        component: import('../components/auth/logout'),
        seo: {
            title: 'Logging out...',
        },
    },
    {
        path: '/dashboard',
        exact: true,
        component: import('../components/dashboard'),
        seo: {
            title: 'Dashboard | iBalancePWA',
        },
    },
];
