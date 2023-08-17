$(document).ready(function() {
  console.log("working!");
  const characterLimit = 140;

  $("#tweet-text").on("input", function() {
    // converting DOM this into Jquery object

    const input = $(this);
    const text = input.val();
    const form = input.parent();
    const counter = form.find(".counter");
    let counterVal = counter.val();
    $(counter).text(characterLimit - text.length);

    // Error if counter less than zero
    if (counterVal < 0) {
      $(".error-length").removeClass("display-none");
    } else {
      $(".error-length").addClass("display-none");
    }
  });
});
