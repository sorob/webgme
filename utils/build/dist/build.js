/*globals*/
/*jshint node:true, camelcase:false*/
/**
 *
 *
 * node ./utils/build/dist/build.js
 *
 *
 * @author pmeijer / https://github.com/pmeijer
 */
'use strict';

var requirejs = require('requirejs'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q'),
    webgmeVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'package.json'), 'utf8')).version,
    webgmeEngineSrc = path.join(path.dirname(require.resolve('webgme-engine')), 'src'),
    config = {
        baseUrl: path.join(__dirname, '../../../src'),
        map: {
            '*': {
                // Map old paths to webgme-engine client path
                'js/client': 'client/client',
                'js/logger': 'client/logger',
                'js/Utils/SaveToDisk': 'client/SaveToDisk',
                'js/client/constants': 'client/constants'
            }
        },
        paths: {
            js: 'client/js',
            decorators: 'client/decorators',

            assets: 'empty:',

            blob: path.join(webgmeEngineSrc, 'common/blob'),
            client: path.join(webgmeEngineSrc, 'client'),
            common: path.join(webgmeEngineSrc, 'common'),
            executor: path.join(webgmeEngineSrc, 'common/executor'),
            plugin: path.join(webgmeEngineSrc, 'plugin'),

            css: 'client/bower_components/require-css/css',
            // Temporary fix to ensure that the CSS plugins internal modules are loaded correctly.
            // https://github.com/requirejs/r.js/issues/289
            'css-builder': 'client/bower_components/require-css/css-builder',
            normalize: 'client/bower_components/require-css/normalize',


            jszip: 'empty:',
            urlparse: 'empty:',
            underscore: 'empty:',
            ravenjs: 'empty:',
            backbone: 'empty:',
            moment: 'empty:',
            blockies: 'empty:',
            d3: 'empty:',
            clipboard: 'empty:',
            diff_match_patch: 'empty:',

            // common libs
            chance: 'empty:',
            ejs: 'empty:',
            ajv: 'empty:',
            debug: 'empty:',
            q: 'empty:',
            superagent: 'empty:',
            text: path.join(webgmeEngineSrc, 'common/lib/requirejs/text'),
            'webgme-ot': 'empty:',

            AutoRouterActionApplier: 'client/lib/autorouter/action-applier',

            jquery: 'empty:',
            'jquery-ui': 'empty:',
            'jquery-ui-iPad': 'empty:',
            'jquery-spectrum': 'empty:',
            'jquery-csszoom': 'empty:',
            'jquery-fancytree': 'empty:',
            'jquery-layout': 'empty:',
            'jquery-contextMenu': 'empty:',

            bootstrap: 'empty:',
            'bootstrap-multiselect': 'empty:',
            'bootstrap-notify': 'empty:',
            codemirror: 'empty:',

            raphaeljs: 'empty:',
            epiceditor: 'empty:',

            angular: 'empty:',
            'angular-ui-bootstrap': 'empty:',
            'isis-ui-components': 'empty:',
            'isis-ui-components-templates': 'empty:',
        },
        shim: {
            //'jquery-ui': ['jquery'],
            //'jquery-fancytree': ['jquery-ui'],
            //raphael_svg: ['raphael_core'],
            //raphael_vml: ['raphael_core']
        },
        exclude: ['normalize'],
        include: [
            '../utils/build/dist/includes',
        ],
        out: path.join(__dirname, '../../../src/client/dist/webgme.' + webgmeVersion + '.dist.build.js'),
        optimize: 'uglify2',
        //optimize: 'none',
        generateSourceMaps: true,
        preserveLicenseComments: false,
        inlineText: true,
        wrap: {
            startFile: path.join(__dirname, '../../../src/client/js/start.js')
        },
    },
    cssConfig = {
        optimizeCss: 'standard',
        cssIn: path.join(__dirname, '../../../src/client/cssfiles/main.css'),
        out: path.join(__dirname, '../../../src/client/dist/webgme.' + webgmeVersion + '.dist.main.css'),
    },
    libConfig = {
        baseUrl: path.join(__dirname, '../../../src/client'),
        paths: {
            css: 'bower_components/require-css/css',
            // Temporary fix to ensure that the CSS plugins internal modules are loaded correctly.
            // https://github.com/requirejs/r.js/issues/289
            'css-builder': 'bower_components/require-css/css-builder',
            normalize: 'bower_components/require-css/normalize',

            // common libs
            chance: path.join(webgmeEngineSrc, 'common/lib/chance/chance'),
            debug: path.join(webgmeEngineSrc, 'common/lib/debug/debug'),
            ejs: path.join(webgmeEngineSrc, 'common/lib/ejs/ejs'),
            ajv: path.join(webgmeEngineSrc, 'common/lib/ajv/ajv'),
            q: path.join(webgmeEngineSrc, 'common/lib/q/q'),
            superagent: path.join(webgmeEngineSrc, 'common/lib/superagent/superagent'),
            text: path.join(webgmeEngineSrc, 'common/lib/requirejs/text'),
            'webgme-ot': path.join(webgmeEngineSrc, 'common/lib/webgme-ot/webgme-ot'),

            jszip: 'bower_components/jszip/dist/jszip',
            urlparse: 'lib/purl/purl.min',
            underscore: 'bower_components/underscore/underscore',
            ravenjs: 'bower_components/raven-js/dist/raven',
            backbone: 'bower_components/backbone/backbone',
            moment: 'bower_components/moment/moment',
            blockies: 'lib/blockies/blockies',
            d3: 'bower_components/d3/d3',
            epiceditor: 'bower_components/EpicEditor/epiceditor/js/epiceditor',
            clipboard: 'bower_components/clipboard/dist/clipboard',
            diff_match_patch: 'bower_components/google-diff-match-patch/diff_match_patch_uncompressed',

            AutoRouterActionApplier: 'empty:',

            jquery: 'bower_components/jquery/dist/jquery',
            'jquery-ui': 'bower_components/jquery-ui/jquery-ui',
            'jquery-ui-iPad': 'lib/jquery/jquery.ui.ipad',
            'jquery-dataTables': 'lib/jquery/jquery.dataTables',
            'jquery-dataTables-bootstrapped': 'lib/jquery/jquery.dataTables.bootstrapped',
            'jquery-spectrum': 'bower_components/spectrum/spectrum',
            'jquery-csszoom': 'bower_components/jquery.csszoom/jquery.csszoom',
            'jquery-fancytree': 'bower_components/jquery.fancytree/dist/modules',
            'jquery-layout': 'lib/jquery/jquery.layout',
            'jquery-contextMenu': 'bower_components/jQuery-contextMenu/dist/jquery.contextMenu',

            bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
            'bootstrap-multiselect': 'bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect',
            'bootstrap-notify': 'bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify',

            eve: 'lib/raphael/eve',   //needed because of raphael.core.js uses require with 'eve'
            raphaeljs: 'lib/raphael/raphael.amd',
            raphael_core: 'lib/raphael/raphael.core',
            raphael_svg: 'lib/raphael/raphael.svg_fixed',
            raphael_vml: 'lib/raphael/raphael.vml',

            angular: 'bower_components/angular/angular',
            'angular-ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
            'isis-ui-components': 'bower_components/isis-ui-components/dist/isis-ui-components',
            'isis-ui-components-templates': 'bower_components/isis-ui-components/dist/isis-ui-components-templates',
        },
        generateSourceMaps: true,
        include: [
            '../../utils/build/dist/libIncludes',
        ],
        packages: [{
            name: 'codemirror',
            location: 'bower_components/codemirror',
            main: 'lib/codemirror'
        }],
        shim: {
            'angular-ui-bootstrap': ['angular'],
            'isis-ui-components': ['angular'],
            'isis-ui-components-templates': ['angular'],

            'jquery-ui': ['jquery'],
            'jquery-ui-iPad': ['jquery', 'jquery-ui'],
            'jquery-layout': ['jquery', 'jquery-ui'],

            ravenjs: ['jquery'],
            bootstrap: ['jquery'],
            'bootstrap-multiselect': ['jquery', 'bootstrap'],
            'bootstrap-notify': ['jquery', 'bootstrap'],

            backbone: ['underscore'],
            'js/util': ['jquery'],
            'js/jquery.WebGME': ['bootstrap'],
            'jquery-dataTables': ['jquery'],
            'jquery-dataTables-bootstrapped': ['jquery-dataTables'],
            'js/WebGME': ['js/jquery.WebGME'],
            'jquery-csszoom': ['jquery-ui'],
            'jquery-spectrum': ['jquery'],
            'jquery-fancytree': ['jquery-ui'],
            raphael_svg: ['raphael_core'],
            raphael_vml: ['raphael_core']
        },
        wrapShim: true, // https://stackoverflow.com/questions/11473709/require-js-r-js-optimizer-ignoring-shim
        exclude: ['normalize'],
        optimize: 'uglify2',
        preserveLicenseComments: false,
        out: path.join(__dirname, '../../../src/client/dist/webgme.' + webgmeVersion + '.lib.build.js')
    };

function doBuilds(callback) {
    var start = Date.now();

    function callOptimizer(theConfig) {
        var deferred = Q.defer();
        requirejs.optimize(theConfig, deferred.resolve, deferred.reject);
        return deferred.promise;
    }

    return Q.all([
        callOptimizer(config),
        callOptimizer(cssConfig),
        callOptimizer(libConfig)
    ])
        .then(function (result) {
            console.log('Build time', (Date.now() - start) / 1000, 's');
            return result;
        })
        .nodeify(callback);
}

if (require.main === module) {
    doBuilds(function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });
}

module.exports = doBuilds;
