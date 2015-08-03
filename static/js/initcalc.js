// Register all of the buttons 0 - 9
$(document).ready( function() { 
  var ints = [];

  for ( var btnCounter = 0 ; btnCounter < 10 ; btnCounter ++ ) { 

    function f() { 

      var btnNum = btnCounter;

      window.Calculator.PlaceButton( 

        // Submit handler function in constructor.
        // 'this' is the calculator in this context, the calculator will 
        // bind the function unto itself.
        new CalcButton( btnNum.toString(), btnNum.toString(), false,
          function( state ) { 

            state.currentCalcSet.AppendCurrentValue( btnNum );
          }
        )
      );
     } 

    f();
  }

  // Add Button Registry
  window.Calculator.PlaceButton( 

    new CalcButton( 'PLUS', '+', true,
      // Process a PLUS operation
      function( state ) {

        var newValue = state.totalValue + state.currentValue;
        return newValue;
      } 
    ),
    'side'
  );

  // Subtract Button Registry
  window.Calculator.PlaceButton(

    new CalcButton( 'MINUS', '-', true,
      function( state ) {

        var newValue = state.totalValue - state.currentValue;
        return newValue;
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 
    new CalcButton( 'TIMES', '*', true, 
      function( state ) {

        var newValue = state.totalValue * state.currentValue;
        return newValue;
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 
    new CalcButton( 'DIVIDE', '/', true, 
      function( state ) {

        if ( parseFloat( state.currentValue.toPrecision(8) ) == 0 ) { return state.currentValue; }
        var newValue = state.totalValue / state.currentValue;
        return ( parseFloat( newValue.toPrecision(8) ) );
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'EQUALS', '=', true,
      function( state ) { 

        // DOES NOTHING. 
      }
    ),
    'side'
  );


  window.Calculator.Initialize();
});

