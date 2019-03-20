export default [
    {
        path: '/login',
        exact: true,
        component: import('../components/auth/login/login'),
        seo: {
            title: 'Auth | iBalancePWA',
            description: 'iBalancePWA',
        },
    }
];
