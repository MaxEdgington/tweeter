// Ready function
$(() => {

  
  const createTweetElement = function(tweet) {
  //Default entries for Tweet elements to handle incomplete data
    let avatars = "https://i.imgur.com/73hZDYK.png";
    let name = "No name";
    let handle = "No handle";
    let text = "No text";
    let createdAt = "Undefined";

    //Handling user data assignment
    if (tweet.user.avatars) {
      avatars = tweet.user.avatars;
    }

    if (tweet.user.name) {
      name = tweet.user.name;
    }

    if (tweet.user.handle) {
      handle = tweet.user.handle;
    }

    if (tweet.content.text) {
      text = tweet.content.text;
    }

    if (tweet.created_at) {
      createdAt = timeago.format(tweet.created_at);
    }

    // creating an escape function to prevent textarea script hacking
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //Tweet template with template literals
    const tweetMessage = `
       <article>
        <section class="tweet-header flex-justify">
          <div class="avatar-name">
            <img src = "${avatars}" class="avatar"/>
            <h4>${name}</h4>
          </div>
          <h4>${handle}</h4>
        </section>
        <h2 class="tweeted-text">${escape(text)}</h2>
        <hr>
        <footer class="tweet-footer flex-justify">
          <h4>${createdAt}</h4>
          <div class="tweet-icons">
            <i class="fa-solid fa-flag" ></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            
          </div>
        </footer>

      </article>

    `;
    $(".main-container").prepend(tweetMessage);
  };

  const renderTweets = function(tweets) {
  // clearing the DOM so duplicate entries are not visible
    $(".main-container").empty();
    for (let tweet of tweets) {
      createTweetElement(tweet);
    }
  };

  //Loads tweets with get, puts them all on page with render
  const loadTweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  $("#tweetForm").on("submit", function(event) {

    // preventing refresh
    event.preventDefault();

    //this is element triggering this event, using find to find any selector/child component and using property.length
    const inputValLength = ($(this).find("textarea").val().trim().length);
    console.log(inputValLength);

    // error messages which stop submission on line 108
    if (inputValLength === 0) {
      $(".error-no-message").removeClass("display-none");
      return;
    }

    if (inputValLength > 140) {
      $(".error-length").removeClass("display-none");
      return;
    }

    //  serializing form data
    const data = $(this).serialize();

    //Ajax call
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: data,
      success: function(result) {
        // Reversing error message if input provided after no input
        $(".error-no-message").addClass("display-none");
        $(".error-length").addClass("display-none");

        // Reseting color along with chaining html method to reset counter action
        $(".counter").removeClass("red").html(140);
        
        // Emptying text area
        $("#tweet-text").val("");
        loadTweets();
      },
      error: function(error) {
        //Jquery sending error message if post does not work
        $(".error-no-message").removeClass("display-none");
      },
    });
  });
  loadTweets();
});
