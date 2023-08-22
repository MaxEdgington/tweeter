$(document).ready(function() {
  const characterLimit = 140;

  $("#tweet-text").on("input", function() {
    // converting DOM this into Jquery object

    const input = $(this);
    const text = input.val();
    const form = input.parent();
    const counter = form.find(".counter");
    let counterVal = characterLimit - text.length;
    $(counter).text(counterVal);

    // Error if counter less than zero
    if (counterVal < 0) {
      $(".error-length").removeClass("display-none");
      $(".counter").addClass("red");
    } else {
      $(".error-length").addClass("display-none");
      $(".counter").removeClass("red");
    }
  });
});
