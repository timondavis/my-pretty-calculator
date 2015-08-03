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

    new CalcButton( 'plus', '+', true,
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

    new CalcButton( 'minus', '-', true,
      function( state ) {

        var newValue = state.totalValue - state.currentValue;
        return newValue;
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 
    new CalcButton( 'times', '*', true, 
      function( state ) {

        var newValue = state.totalValue * state.currentValue;
        return newValue;
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 
    new CalcButton( 'divide', '/', true, 
      function( state ) {

        if ( parseFloat( state.currentValue.toPrecision(8) ) == 0 ) { return state.currentValue; }
        var newValue = state.totalValue / state.currentValue;
        return ( parseFloat( newValue.toPrecision(8) ) );
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'equals', '=', true,
      function( state ) { 

        // DOES NOTHING. 
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'clear', 'C', false,
      function( state ) { 

        state.currentCalcSet.SetCurrentValue ( 0 );
      }
    ),
    'util'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'clear-all', 'CA', false,
      function( state ) { 

        state.currentCalcSet.SetCurrentValue( 0 );
        state.currentCalcSet.SetTotal( 0 );
      }
    ),
    'util'
  );


  window.Calculator.Initialize();
});

