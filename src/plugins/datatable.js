try {
  require( 'jquery' );
  require( 'jszip' );
  require( 'pdfmake' );
  require( 'datatables.net-bs' )();
  require( 'datatables.net-buttons-bs' )();
  require( 'datatables.net-buttons/js/buttons.colVis.js' )();
  require( 'datatables.net-buttons/js/buttons.html5.js' )();
  require( 'datatables.net-buttons/js/buttons.print.js' )();
  require( 'datatables.net-fixedcolumns-bs' )();
  require( 'datatables.net-responsive-bs' )();
  require( 'datatables.net-select-bs' )();
  var $  = require( 'jquery' );
  require( 'datatables.net' )( window, $ );
} catch (e) {
	document.querySelector('body')
}