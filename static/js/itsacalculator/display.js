var Display = function Display() { 

  var that = this;

  this.DisplayValue = "~";

  this.Print = function Print( string ) {

    this.Displayvalue = string;
    $('#lcd-display').val( string );
  };

  // INIT
};