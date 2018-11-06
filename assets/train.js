// Initialize Firebase--api info for my project on firebase
  var config = {
    apiKey: "AIzaSyCaK1SttWIwuuFEt8LX4k4k7vwpLq1wtP0",
    authDomain: "train-time-f20a0.firebaseapp.com",
    databaseURL: "https://train-time-f20a0.firebaseio.com",
    projectId: "train-time-f20a0",
    storageBucket: "",
    messagingSenderId: "197165125567"
  };
  firebase.initializeApp(config);

   // Get a reference to the database service
   var database = firebase.database();

     // Initial Variables (SET the first set IN FIREBASE FIRST)
    // Note remember to create these same variables in Firebase!

    //-- I think frequency Mins and Minutes away can both be calculated??
    // leaving off of the firebase database for now until I confirm. Can next Arrival also be calculated? now thinking freMin should go on the database. going to add. 

    var nextArrival = "";
    var minsAway = "";

     // Click Button for adding train information
     $("#click-button").on("click", function(event) {
        // Prevent the page from refreshing
        event.preventDefault();

        // Get inputs--- you add variable here not above
      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input" ).val().trim();
      var freMin = $("#frequency-input").val().trim();


        // Creates local "temporary" object for holding train info
        var newTrain = {
        name: trainName,
        travel: destination,
        time: freMin
  
       };

        // Uploads inputted data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        // console.log(newTrain.trainName);
        // console.log(newTrain.destination);
        // console.log(newTrain.freMin);

        // alert("this works");
        
    //    // Change what is saved in firebase
    //    database.ref().set({
    //     trainName: trainName,
    //     destination: destination,
    //     freMin: freMin
         // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");

      });
    // });

        // Firebase is always watching for changes to the data.
        // When changes occurs it will print them to console and html
        database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());

        // Store the value received from the above function to a variable

        var trainName = snapshot.val().name;
        var destination = snapshot.val().travel;
        var freMin = snapshot.val().time;

        // console.log(trainName);
        // console.log(destination);
        // console.log(freMin);

        // trainName = snapshot.val().name;
        // $("#train-name-input").text(trainName);

        // create a new text line with the info inputted
        var newInfo = $("<tr>").append(
          $("<td>").text(trainName),

        );

        $("#train-table > tbody").append(newInfo);
      });
        // Log the value of the various properties
        // console.log(snapshot.val().trainName);
        // console.log(snapshot.val().destination);
        // console.log(snapshot.val().freMin);
        //     // ---these are commented out since I confirmed they showed up on the log and on the database.
    // });


// why is this code not showing anything on the html?????
    // database.ref().on("value", function(snapshot) {
    //     // console.log(snapshot.val().trainName);
        
   

        // clickCounter = snapshot.val().clickCount;
        // clickCounter = snapshot.val().clickCount;
        // $("#click-value").text(clickCounter);
        // $("#click-value").text(clickCounter);
        // $("#click-value").text(snapshot.val().clickCount);
        // clickCounter = snapshot.val().clickCount;
      // }, function(errorObject) {
      //   console.log("The read failed: " + errorObject.code);
      // });
      