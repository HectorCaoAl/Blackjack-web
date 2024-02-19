  $( function() {
    var spinner = $( "#spinner" ).spinner();
 
    $( "#disable" ).on( "click", function() {
      if ( spinner.spinner( "option", "disabled" ) ) {
        spinner.spinner( "enable" );
      } else {
        spinner.spinner( "disable" );
      }
    });
    $( "#destroy" ).on( "click", function() {
      if ( spinner.spinner( "instance" ) ) {
        spinner.spinner( "destroy" );
      } else {
        spinner.spinner();
      }
    });
    $( "#getvalue" ).on( "click", function() {
      alert("vas a apostar: "+ spinner.spinner( "value" ) + " euros");
    });
    $( "#setvalue" ).on( "click", function() {
      spinner.spinner( "value", 50 );
    });
 
    $( "button" ).button();
  } );