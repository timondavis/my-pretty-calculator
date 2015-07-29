var CalcButton = function CalcButton() {

  var that = this;

  this.Signal = '~';
  this.Label = '~';

  this.Pushed = function Pushed( callback ) {

    var thisButton = $( '#calc-' + this.Label );

    thisButton.off( 'click' );
    thisButton.click( function( e ) { 

    });
  };

  // INIT
};