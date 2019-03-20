import React from 'react';
import ReactPWAIcon from './resources/img/i-balance-pwa.png';

export default class Server {

    apply(serverHandler) {
        serverHandler.options.env.appRootUrl = '.';

        serverHandler.hooks.beforeHtmlRender.tapPromise('DSNPreCache', async (Application) => {
            const {htmlProps: {head}} = Application;
            const {htmlProps: {env}} = Application;
            env.appRootUrl = './';
            head.push(<meta key="meta-theme-color" name="theme-color" content="#209cee"/>);
        });

        serverHandler.hooks.beforeHtmlRender.tapPromise('AddFavIcon', async (Application) => {
            const {htmlProps: {head}} = Application;
            head.push(<link key="favicon" rel="shortcut icon" type="image/png" href={ReactPWAIcon}/>);
        });

        serverHandler.hooks.beforeHtmlRender.tapPromise('No JS issues', async (Application) => {
            const {htmlProps: {head}} = Application;

            head.push(<noscript><p>JS is disabled! Come back to feature.</p></noscript>);
            return true;
        });
    }
}
