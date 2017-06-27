/**
 * Node Configuration
 *
 * @author Banco de Chile
 *
 */
var info = require('./package.json');
var open = require('open');
var colors = require('colors');
var httpProxy = require('http-proxy');
var connect = require('connect');
var http = require('http');

var options = {
    //'weblogic': 'http://lablnx297:7011',
    'weblogic': 'http://localhost:7001',
    'static': 'http://localhost:3000'
};

var API_URL_LOCAL = '/miplataforma/';
var API_URL_SERVER = '/miplataforma/';

var proxy = httpProxy.createProxyServer({});

var proxyApp = connect().use(function(req,res) {
    console.log(('request to node server: ' + req.url).green);

    req.headers.OAM_REMOTE_KEY = "122637247";
    req.headers.OAM_REMOTE_USER = "bvalenzuela";
    //req.headers.OAM_REMOTE_KEY = "122412407";
    //req.headers.OAM_REMOTE_USER = "acuartasp";
    //req.headers.OAM_REMOTE_KEY = "104220886";
    //req.headers.OAM_REMOTE_USER = "mavilches";
    //req.headers.OAM_REMOTE_KEY = "85441442";
    // req.headers.OAM_REMOTE_USER = "rlabbef";


    var target = options.static;
    if(req.url.indexOf(API_URL_LOCAL) > -1) {
        target = options.weblogic;
        req.url = req.url.replace(API_URL_LOCAL, API_URL_SERVER);
        console.log(('request to rest api: ' + target + req.url).blue);
    }
    proxy.web(req, res, {
        target: target
    });
});

http.createServer(proxyApp).listen(8004);
console.info('Running HTTP Proxy');

var app = connect()
    .use(connect.static('www/'))
    .use(connect.directory('www/'))
    .use(connect.cookieParser())
    .use(connect.session({ secret: 'my secret here' }));

http.createServer(app).listen(3000, openBrowser);


function openBrowser(){
    console.log('Open browser'.green);
    open('http://localhost:' + 8004 + '/miplataforma-web/');
    console.log('Running Web Server'.green);
}
