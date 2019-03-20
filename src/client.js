
export default class Client {
    apply(clientHandler) {
        clientHandler.options.env.appRootUrl = '.';
    }
}
