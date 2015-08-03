var CalcButton = function CalcButton( signal, label, isOperator, doFunction ) {

  var that = this;

  this.Signal = '~';
  this.Label = '~';
  this.Do = doFunction;
  this.Element = {}
  this.IsOperator = ( isOperator ) ? true : false;

  if ( signal ) { this.Signal = signal; }
  if ( label ) { this.Label = label; }

  this.Activate = function Activate() { 

    that = this;

    this.Element = thisButton = $( '#calc-' + signal );

    thisButton.off( 'click' );

    function onclick(e) {
      window.Calculator.Compute( that );
    }

    thisButton.click( onclick );
  }

  // INIT
};