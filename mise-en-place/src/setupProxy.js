const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            // caso queira testar local, comente a NUVEM, caso queira testar na nuvem, comente a LOCAL.
            target: 'http://127.0.0.1:8080', // LOCAL
            // target: 'http://10.0.0.156:8080', // NUVEM
            changeOrigin: true,
        })
    );
};