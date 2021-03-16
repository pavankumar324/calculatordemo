const phantomcss = require('phantomcss');

casper.test.begin('Calculator Visual Tests', function () {

    phantomcss.init( {
        rebase: casper.cli.get('rebase')
    } );

    // Initialize URL
    casper.start( 'https://calculator-demo-238014.appspot.com/' );
    // Establish resolution
    casper.viewport( 1024, 768 );

    // Test
    casper.then( function () {
        casper.waitForSelector( 'body',
            function success() {
                phantomcss.screenshot( 'body', 'simple calculator body');
            },
            function timeout() {
                casper.test.fail( 'Failed to find calculator body' );
            }
        );
    });

    casper.then( function () {
        casper.click( '#one' );
        casper.click( '#plus' );
        casper.click( '#one' );
        casper.waitForSelector( '#result',
            function success() {
                phantomcss.screenshot( '#result', 'validate calculation display');
            },
            function timeout() {
                casper.test.fail( 'Failed to find result' );
            }
        );
    });

    casper.then( function() {
        // compare screenshots
        phantomcss.compareAll();
    });


    casper.run( function () {
        casper.test.done();
    } );
} );