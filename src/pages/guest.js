export default [
    {
        path: '/login',
        exact: true,
        component: import('../components/login'),
        seo: {
            title: 'Auth | ReactPWA Demo',
            description: 'Implementing Auth with ReactPWA is simple. Check out this fake auth example for more details',
        },
    }
];
