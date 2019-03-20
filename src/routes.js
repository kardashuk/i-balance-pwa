import GuestRoutes from './pages/guest';
import AuthRoutes from './pages/auth';
import SplashScreen from './pages/splash';
import Favicon512 from './resources/img/i-balance-pwa.png';
import Favicon192 from './resources/img/i-balance-pwa-192x192.png';
export default class Routes {
    apply(routeHandler) {
        routeHandler.setPwaSchema({
            name: 'iBalance PWA',
            short_name: 'iBalance PWA',
            start_url: '/i-balance-pwa/',
            icons: [
                {
                    src: Favicon512,
                    sizes: '512x512',
                },
                {
                    src: Favicon192,
                    sizes: '192x192',
                }
            ]
        });
        routeHandler.setDefaultSeoSchema({
            title: 'iBalance PWA',
        });

        const routes = [
            ...GuestRoutes,
            ...AuthRoutes,
            ...SplashScreen,
        ];

        routeHandler.hooks.initRoutes.tapPromise('AppRoutes', async () => {
            routeHandler.addRoutes(routes);
        });
    }
}
