var trainName = "";
var whereTo = "";
var firstTime= "";
var tFrequency = 5;
var next;
var minsAway=0;
var currentTime;
// var freMin=0;
// does firstTrain need to be a variable with an input for the future trains to calculate from??


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

   // 2. Button for adding train input
$("#click-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val();
  var whereTo = $("#destination-input").val();
  var firstTime = $("#first-train-input").val(); 
  var tFrequency = $("#frequency-input").val();
  console.log(firstTime);

  // removed the .trim() at the end of all these as I kept getting a console error

  // Creates local "temporary" object for holding train input
  var newTrain  = {
    name: trainName,
    destination: whereTo,
    first: firstTime,
    frequency: tFrequency
  };

  // Uploads train input to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.trainName);
  // console.log(newTrain.whereTo);
  // console.log(newTrain.trainTime);
  // console.log(newTrain.freMin);

  // alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});
// had to comment out the frequency lines because I kept getting an error that frequency was undefined. 

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
  //console.log(snapshot.val());

  var trainName = snapshot.val().name;
  var whereTo = snapshot.val().destination;
  var firstTime = snapshot.val().first;
  var tFrequency = snapshot.val().frequency;
  // console.log(tFrequency);
// new code test here_____________________________________________
// (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency;

    // Time is 3:00 AM
    var firstTime = "3:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("H:HH");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("H:HH"));


//   // Create the new row
    var data = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(whereTo),
    $("<td>").text(tFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(""),
    $("<td>").text(tMinutesTillTrain)
  );

// //   // Append the new row to the table
  $("#train-table > tbody").append(data);
});

$("tr").on("click", "span", function(event){
  $(this).parent().fadeOut(500, function(){
      $(this).remove();
// the first this refers to span. the second this refers to the parent! parent retrieves the li that's enclosing the span that was clicked on. 
  });
  event.stopPropagation();
});
