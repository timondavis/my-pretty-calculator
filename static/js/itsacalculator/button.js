var CalcButton = function CalcButton( signal, label, callback, options ) {

  var that = this;

  this.Signal = '~';
  this.Label = '~';
  this.Element = {}

  if ( signal ) { this.Signal = signal; }
  if ( label ) { this.Label = label; }


  this.Activate = function Activate() { 

    this.Element = thisButton = $( '#calc-' + this.Label );

    thisButton.off( 'click' );
    thisButton.click( function( e ) { 

      window.Calculator.Compute( callback, options );
      console.log( this.Signal + ' button clicked' );
    });
  }

  // INIT
};