
const akasha  = require('akasharender');

const config = new akasha.Configuration();

// Fill this with the URL of your site
config.rootURL("https://akashacms.github.io");

config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addAssetsDir({
        src: 'node_modules/popper.js/dist',
        dest: 'vendor/popper.js'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials');

config
    .use(require('@akashacms/theme-bootstrap'))
    .use(require('@akashacms/plugins-base'), {
        generateSitemapFlag: true
    })
    .use(require('@akashacms/plugins-breadcrumbs'))
    .use(require('@akashacms/plugins-booknav'))
    .use(require('@akashacms/plugins-embeddables'))
    .use(require('@akashacms/plugins-tagged-content'));

// Add any stylesheets or JavaScript here
// The /vendor/jquery and /vendor/bootstrap files come from the corresponding
// modules under node_modules.  The last comes from the assets directory.
//
// If you wish to use LESS, you instead add css/style.css.less under
// the documents directory.  Remember that files in the assets directory
// are copied as-is, while files in the documents directory may be processed
// depending on the file extension.  The .css.less extension invokes the
// LESS compiler.
config
    .addFooterJavaScript({ href: "/vendor/jquery/jquery.min.js" })
    .addFooterJavaScript({ href: "/vendor/bootstrap/js/bootstrap.min.js"  })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap.min.css" })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap-theme.min.css" })
    .addStylesheet({       href: "/css/style.css" });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true,
    decodeEntities: true
});

config.plugin("@akashacms/plugins-tagged-content")
    .sortBy('title')
    .headerTemplate("---\ntitle: @title@\nlayout: tagpage.html.ejs\n---\n<p>Pages with tag @tagName@</p>")
    .tagsDirectory('/tags/');

config.prepare();
module.exports = config;
