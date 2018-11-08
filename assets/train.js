var trainName = "";
var whereTo = "";
var trainTime= "";
var freMin =0;
var newTrain;


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
  var trainTime = moment($("#first-train-input").val(), "HH:mm").format("X");
  // var freMin = $("frequency-input").val();

  // removed the .trim() at the end of all these as I kept getting a console error

  // Creates local "temporary" object for holding train input
  var newTrain  = {
    name: trainName,
    destination: whereTo,
    first: trainTime
    // frequency: freMin
  };

  // Uploads train input to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.trainName);
  // console.log(newTrain.whereTo);
  // console.log(newTrain.trainTime);
  // console.log(newTrain.freMin);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  // $("#frequency-input").val("");
});

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());

  var trainName = snapshot.val().name;
  var whereTo = snapshot.val().destination;
  var trainTime = snapshot.val().first;
  // var frequency = childSanpshot.val().FREQUENCY;

//   // Store everything into a variable.
  // trainName = Object.values(snapshot.val());
  // whereTo = Object.values(snapshot.val());
  // trainTime = Object.values(snapshot.val());
  // freMin = Object.values(snapshot.val());

  // Train Info
  // console.log(trainName);
  // console.log(whereTo);
  // console.log(trainTime);
  // console.log(freMin);

  // for (let i = 0; i < trainName.length; i++) {
  //   data = $('<tr>').text(trainName[i].name);
  //   data = $('<tr>').text(trainName[i].destination);
  //   // data = $('<tr>').text(freMin[i].time);
    
    // $("tbody").append(data[i]);
    

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Create the new row
    var data = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(whereTo),
    $("<td>").text(trainTime)
    // $("<td>").text(freMin)
// //     $("<td>").text(empRate),
// //     $("<td>").text(empBilled)
  );

// //   // Append the new row to the table
  $("#train-table > tbody").append(data);
});

// Example Time Math
// // -----------------------------------------------------------------------------
// // Assume Employee start date of January 1, 2015
// // Assume current date is March 1, 2016

// // We know that this is 15 months.
// // Now we will create code in moment.js to confirm that any attempt we use meets this test case