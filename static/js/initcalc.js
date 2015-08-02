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
        new CalcButton( btnNum.toString(), btnNum.toString(), 
          function( options, currentValue, totalValue, lastOp, calcSets, currentCalcSet ) { 

            if ( lastOp == '#' ) {  

              currentCalcSet.AppendCurrentValue( btnNum );
              this.DisplayCurrent.Print( currentCalcSet.CurrentValue );
              this.LastOperation = '#';
            }
            else { 

              currentCalcSet.SetCurrentValue( 0 );
              currentCalcSet.AppendCurrentValue( btnNum );
              this.DisplayCurrent.Print( currentCalcSet.CurrentValue );
              this.LastOperation = '#';
            }
          }
        )
      );
     } 

    f();
  }

  window.Calculator.PlaceButton( 

    // Add Button Registry
    new CalcButton( 'PLUS', '+', 
      function( options, currentValue, totalValue, lastOp, calcSets, currentCalcSet ) {

        var newValue = currentValue + totalValue;
        currentCalcSet.SetTotal( newValue );
        this.DisplayCurrent.Print( newValue );
        currentCalcSet.SetCurrentValue( 0 );
        this.LastOperation = 'PLUS';

      }
    ),
    'side'
  );


  window.Calculator.Initialize();
});

