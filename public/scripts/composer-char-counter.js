$(document).ready(function() {
  console.log("working!");
  const characterLimit = 140;

  
  $("#tweet-text").on('input', function() {
    // converting DOM this into Jquery object(this)
    // all jquery objects have the same functions, all have val (although it might not do anything)
    const input = $(this);
    // console.log(input);
    const text = input.val();
    const form = input.parent();
    const counter = form.find(".counter");
    let counterVal = counter.val();
    $(counter).text(characterLimit - text.length);
    
    if (counterVal < 0) {
      (counter.css("color", "red"));
    } else {
      (counter.css("color", "rgb(84, 81, 73)"));
    }
    
    console.log(counter.css("color"));
    //console.log(text.length);
    // console.log(text); //The this keyword is a reference to the button
  });
 

  /*
  const tweetText = document.getElementById("tweet-text");
  document.addEventListener("input", (event) =>{
    console.log(event);
    console.log(event.input);
  });
*/
  
});

