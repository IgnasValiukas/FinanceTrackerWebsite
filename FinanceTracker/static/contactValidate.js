document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.querySelector('form');

    // Add submit event listener to the form
    form.addEventListener('submit', function (event) {
      // Validate name field
      var nameField = document.getElementById('name');
      if (!isValidName(nameField.value)) {
        alert('Name cannot contain special symbols or numbers.');
        event.preventDefault(); // Prevent form submission
        return;
      }

      // Validate email field
      var emailField = document.getElementById('email');
      if (!isValidEmail(emailField.value)) {
        alert('Please enter a valid email address with "@gmail.___".');
        event.preventDefault(); // Prevent form submission
        return;
      }

      // Validate message field
      var messageField = document.getElementById('message');
      if (!isValidMessage(messageField.value)) {
        alert('Message cannot exceed 255 characters.');
        event.preventDefault(); // Prevent form submission
        return;
      }
    });

    // Function to validate name
    function isValidName(name) {
      // Check if name contains special symbols or numbers
      return /^[a-zA-Z ]+$/.test(name);  //  / - nurodo pradia ir pabaiga regularios israiskos, ^ - string start, [a-zA-Z ]+ - nurodo simbolių klasę, atitinkančią vieną ar daugiau
    }

    // Function to validate email
    function isValidEmail(email) {
      // Check if email is a valid Gmail address
      return /^[a-zA-Z0-9._-]+@gmail\.[a-zA-Z]{2,3}$/.test(email);
    }

    // Function to validate message length
    function isValidMessage(message) {
      // Check if message length does not exceed 255 characters
      return message.length <= 255;
    }
  });
