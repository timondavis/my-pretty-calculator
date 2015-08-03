var Calculator = {
  'CalcSets': [],
  'Buttons': [],
  'Display': {},
  'LastButton' : null,
  'LastOperationButton' : null,
  'MaxValueLength' : 8,

  /** 
   * Display the current value in the current calcset
   */
  'DisplayCurrent': function DisplayCurrent() {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    var displayString = this.CalcSets[ currentCalcSetIndex ].CurrentValue.toString();

    this.Display.DisplayValue( displayString );
  },

  'CurrentCalcSet': function CurrentCalcSet() { 

    var currentCalcSetIndex = this.CalcSets.length - 1;
    return this.CalcSets[currentCalcSetIndex];
  },

  /**
   * Execute a given callback function, usint the Calculator as 'this' context
   */
  'Compute' : function Compute( pressedButton ) {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    var currentValue = this.CalcSets[ currentCalcSetIndex ].CurrentValue;
    var totalValue = this.CalcSets[currentCalcSetIndex].Total;

    if ( this.LastOperationButton == null ) { 

      this.LastOperationButton = this.Buttons.filter( function( item ) { 
        return item.Signal == 'plus';
      });
      this.LastOperationButton = this.LastOperationButton[0];
      this.LastButton = this.LastOperationButton;
    }

    this.CurrentCalcSet().LastOperationButton = this.LastOperationButton;
    this.CurrentCalcSet().LastButton = this.LastOperationButton;

    var state = {
      'currentValue' : currentValue,
      'totalValue': totalValue,
      'lastOperationButton': this.LastOperationButton,
      'lastButton': this.LastButton,
      'calcSets': this.CalcSets,
      'currentCalcSet' : this.CurrentCalcSet(),
      'currentCalcSetIndex': currentCalcSetIndex
    }

    if ( pressedButton.IsOperator ) {

      // Special case for equals, otherwise
      if ( pressedButton.Signal == 'equals' ) { 

          var callback = this.LastOperationButton.Do;
        cb = callback.bind( this, state );
        var total = cb( state );
        this.CurrentCalcSet().SetTotal( total );
        this.DisplayCurrent.Print( this.CurrentCalcSet().Total );
        this.LastButton = pressedButton;
        this.CurrentCalcSet().LastButton = pressedButton;

        return;
      }          
      else { 

        if ( this.LastButton.IsOperator ) { 

        } else { 

          var callback = this.LastOperationButton.Do;
          cb = callback.bind( this, state );
          var total = cb( state );
          this.CurrentCalcSet().SetTotal( total );

          this.LastButton = pressedButton;
          this.CurrentCalcSet().LastButton = pressedButton;
        }
      }

      this.LastOperationButton = pressedButton;
      this.CurrentCalcSet().LastOperationButton = pressedButton;

      this.DisplayCurrent.Print( this.CurrentCalcSet().Total );

    } else { // PUSHED WAS NOT AN OPERATOR 

      if ( this.LastButton.IsOperator ) {

        if ( pressedButton.Signal != 'paren-end' ) { 
          this.CurrentCalcSet().SetCurrentValue( 0 ); 

          if ( this.LastButton.Signal == 'equals' ) { 

            this.CurrentCalcSet().SetTotal( 0 );
          }
        }
      }

      var callback = pressedButton.Do;
      cb = callback.bind( this, state );
      cb( state );
    }

    if ( pressedButton.Signal != 'paren-end' ) { 
      this.LastButton = pressedButton;
      this.CurrentCalcSet().Lastbutton = pressedButton;
    }
  },

  /**
   * Clear out the current value
   */
  'Clear' : function Clear() {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    this.CalcSets[ currentCalcSetIndex ].CurrentValue = 0;
    this.DisplayCurrent();
  },

  /**
   * Clear all entries
   */
  'ClearAll' : function ClearAll() {

    this.Initialize();
  },

  /**
   * Initialize the calculator
   */
  'Initialize': function Initialize() { 

    this.CalcSets = [new CalcSet()];
    this.DisplayCurrent = new Display();

    for ( var buttonCount = 0 ; buttonCount < this.Buttons.length ; buttonCount++ ) { 

      this.Buttons[buttonCount].Activate();
    }

    this.CalcSet = [ new CalcSet() ];
  },

  'PlaceButton': function PlaceButton( button, zone ) { 

    var buttonID = 'calc-' + button.Signal;
    var buttonLabel = button.Label;

    var pullDirection = ( zone == 'util' ) ? 'right' : 'left';

    var buttonString = '<button id="' + buttonID + '" class="button pull-' + pullDirection + '">' + buttonLabel + '</button>';
    this.Buttons.push( button );

    switch( zone ) { 

      case( 'util' ): {

        $('.buttons.util').append( buttonString );
        break;
      }
      case( 'side' ): { 

        $('.buttons.side').append( buttonString );
        break;
      }
      case ('primary'): 
      default: { 

        $('.buttons.primary').append( buttonString );
        break;
      }
    }
  }

}
