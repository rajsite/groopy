
var ref = new Firebase("https://groopy.firebaseio.com");

ref.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});

ref.on("value", function(snapshot) {
  var data = snapshot.val();
  if( data.artist !== undefined && data.city !== undefined ) {
    console.log(data.artist);
    console.log(data.city);
  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


