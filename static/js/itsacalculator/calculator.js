var Calculator = {
  'CalcSets': [],
  'Buttons': [],
  'Display': {},
  'LastOperation' : '~',
  'MaxValueLength' : 8,

  /** 
   * Display the current value in the current calcset
   */
  'DisplayCurrent': function DisplayCurrent() {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    var displayString = this.CalcSets[ currentCalcSetIndex ].CurrentValue.toString();

    this.Display.DisplayValue( displayString );
  },

  /**
   * Execute a given callback function, usint the Calculator as 'this' context
   */
  'Compute' : function Compute( callback, options ) {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    var currentValue = this.CalcSets[ currentCalcSetIndex ].CurrentValue;
    var totalValue = this.CalcSets[currentCalcSetIndex].CurrentValue.Total;

    callback.bind( this );
    callback( options, currentValue, totalValue, this.LastOperation, this.CalcSet );
  },

  /**
   * Clear out the current value
   */
  'Clear' : function Clear() {

    var currentCalcSetIndex = this.CalcSets.length - 1;
    this.CalcSets[ curretnCalcSetIndex ].CurrentValue = 0;
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
    this.DisplayCurrent;
  }
}
