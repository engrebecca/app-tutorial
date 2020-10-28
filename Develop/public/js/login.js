$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    // Creating a object that contains the email and password inputs from the form that are trimmed
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // If there are no values for email and password, return
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
