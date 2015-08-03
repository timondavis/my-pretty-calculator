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
            this.DisplayCurrent.Print( this.CurrentCalcSet().CurrentValue );
            this.LastButton = state.lastButton;
            this.CurrentCalcSet().Lastbutton = state.lastButton;
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
        this.LastButton = state.lastButton;
        this.CurrentCalcSet().Lastbutton = state.lastButton;
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
        this.LastButton = state.lastButton;
        this.CurrentCalcSet().Lastbutton = state.lastButton;
        return newValue;
      }
    ),
    'side'
  );

  window.Calculator.PlaceButton( 
    new CalcButton( 'times', '*', true, 
      function( state ) {

        var newValue = state.totalValue * state.currentValue;
        this.LastButton = state.lastButton;
        this.CurrentCalcSet().Lastbutton = state.lastButton;
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
        this.LastButton = state.lastButton;
        this.CurrentCalcSet().Lastbutton = state.lastButton;
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
        this.LastButton = state.lastButton;
        this.CurrentCalcSet().Lastbutton = state.lastButton;
        this.DisplayCurrent.Print( this.CurrentCalcSet().CurrentValue );
      }
    ),
    'util'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'clear-all', 'CA', false,
      function( state ) { 

        this.Initialize();
        this.DisplayCurrent.Print( this.CurrentCalcSet().CurrentValue );
      }
    ),
    'util'
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'paren-start', '(', false, 
      function( state ) { 

        // Get some buttons just in case we need them.
        var equalsButton = this.Buttons.filter( function( item ) { 

          return ( 'equals' == item.Signal );
        });
        equalsButton = equalsButton[0];

        var timesButton = this.Buttons.filter( function( item ) { 

          return ('times' == item.Signal );
        });
        timesButton = timesButton[0];

        // If the last button was an operation, we want that stored
        if ( this.LastButton.IsOperator ) { 

          this.CurrentCalcSet().LastButton = this.LastButton;
          this.CurrentCalcSet().LastOperationButton = this.LastButton;
          this.LastButton = this.LastOperationButton = null;
        }
        else { 

          this.Compute( equalsButton );

          // If the last button was an non-operation, we want to process what came before and add a times
          this.CurrentCalcSet().LastButton = this.CurrentCalcSet().LastOperationButton = timesButton;
          this.LastButton = this.LastOperationButton = null;
        }

        this.CalcSets.push( new CalcSet() );
      }
    )
  );

  window.Calculator.PlaceButton( 

    new CalcButton( 'paren-end', ')', false,
      function( state ) { 

        if ( state.calcSets.length <= 1 ) { return; }

        // Get the equals button so we can use it for processing
        var equalsButton = this.Buttons.filter( function( item ) { 
          return ( 'equals' == item.Signal );
        });
        equalsButton = equalsButton[0];

        // Complete the operation if not done already
        if ( ! this.LastButton.IsOperator ) { 

          this.Compute( equalsButton );
        }

        // Capture the previous state and the previous state's last operative button
        var previousState = this.CalcSets[state.currentCalcSetIndex - 1];
        var previousStateButton = previousState.LastOperationButton;

        // Take the currently processed state's value and apply it to the prior
        previousState.SetCurrentValue( this.CurrentCalcSet().Total );

        // Now release the current state in favor of the prior
        this.CalcSets.pop();

        // Clone over all the button controls as needed (this is to accommodate the needs
        // of equals in the short-term).
        this.LastOperationButton = previousStateButton;
        this.LastButton = previousStateButton;

        // Compute  w/ Equals
        this.Compute( equalsButton );

        // Given the new total, set the new current value.
        previousState.SetCurrentValue( previousState.Total )
        // Display the new current value.
        this.DisplayCurrent.Print( this.CurrentCalcSet().CurrentValue );

        // Set all operations to point at equals.  This refreshes the board.
        this.LastOperationButton = equalsButton;
        this.CurrentCalcSet().LastOperationButton = equalsButton;
        this.LastButton = equalsButton;
        this.CurrentCalcSet().Lastbutton = equalsButton;
      }
    )
  );


  window.Calculator.Initialize();
});

