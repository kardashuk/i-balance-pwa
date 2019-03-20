
export default [

    {
        path: '/logout',
        exact: true,
        component: import('../components/logout'),
        seo: {
            title: 'Logging out...',
        },
    },
    {
        path: '/dashboard',
        exact: true,
        component: import('../components/dashboard'),
        seo: {
            title: 'User dashboard | ReactPWA Demo',
        },
    },
];
