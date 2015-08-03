var CalcSet = function Calcset(){
  
  /** PUBLIC **/

  this.Calculator = window.Calculator;
  this.CurrentValue = 0;
  this.Total = 0; 

  /** PRIVILEGED **/
  
  this.AppendCurrentValue = function AppendCurrentValue( character ) {

    Append( character );
  };

  this.SetCurrentValue = function SetCurrentValue( val ) { 

    if ( parseFloat( val ) || "0" == val.toString() ) { 
      this.CurrentValue = val;
    }
  }

  this.SetTotal = function SetTotal( val ) { 

    if ( parseFloat( val ) || "0" == val.toString() ) { 

      this.Total = val;
    }
  }

  /** PRIVATE **/

  var that = this;

  var Append = function Append( character ) {

    character = character.toString();

    // create a string version of the current value
    var currentString = that.CurrentValue.toString();

    // Ignore invalid inputs
    if ( ! ValidateCharacterInput( character ) ) { return; }

    // Reset value if 0
    if ( "0" == currentString ) { 

      ResetCurrent( currentString );
    }

    // We're good!  Operate.
    currentString += character;
    that.CurrentValue = parseInt( currentString );
  }

  var ValidateCharacterInput = function ValidateCharacterInput( character ) { 

    var acceptable = /^[0-9.]{1}$/;
    var decimal = /./;

    // create a string version of the current value
    var currentString = that.CurrentValue.toString();

    // Validate Character Count
    if ( ( CountCharacters() + 1 ) > Calculator.MaxValueLength ) {

      // Do nothing if we're about to exceed char count.
      return false;
    }

    // Validate character input.
    if ( character.match( acceptable ) == null ) {

      // Ignore invalid inputs.
      return false;
    }

    // We can't allow more than one decimal point
    if ( "." == character && currentString.match(decimal) != null ) {

        return false;
    }

    return true;
  };

  var CountCharacters = function CountCharacters() {

    var currentString = that.CurrentValue.toString();
    return currentString.length;
  };

  var ResetCurrent = function ResetCurrent( currentString ) {

    currentString = "";
  };

  /** INIT **/
  Total = 0;
}