// theme.js

document.addEventListener('DOMContentLoaded', function () {
    // Get the dropdown menu items
    var darkThemeBtn = document.getElementById('darkTheme');
    var defaultThemeBtn = document.getElementById('defaultTheme');
  
    // click event to the theme buttons
    darkThemeBtn.addEventListener('click', function () {
      setTheme('dark');
    });
  
    defaultThemeBtn.addEventListener('click', function () {
      setTheme('default');
    });
  
    // Function to set the theme
    function setTheme(theme) {
      // Update the body background-color based on the selected theme
      if (theme === 'dark') {
        document.body.style.backgroundColor = '#121212';
        setTextColor('white');
        setCardBodyBackgroundColor('#121212');
        setSideLayoutBackgroundColor('#121212');
        setOlBackgroundColor('#343a40');
        setCustomListItemBackgroundColor('#343a40');
        setLabelColor('white');
        setContactFormInputStyles('white', '#343a40');
        setLiBackgroundColor('#705d97');
      } else if (theme === 'default') {
        document.body.style.backgroundColor = '';
        setTextColor('');
        setCardBodyBackgroundColor('');
        setSideLayoutBackgroundColor('');
        setOlBackgroundColor('');
        setCustomListItemBackgroundColor('');
        setLabelColor('');
        setContactFormInputStyles('', '');
        setLiBackgroundColor('');
      }
  
      // Save the selected theme to localStorage
      localStorage.setItem('theme', theme);
    }
  
    // Function to set text color for headlines and paragraphs
    function setTextColor(color) {
      var headlineElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      var paragraphElements = document.querySelectorAll('p');
  
      headlineElements.forEach(function (element) {
        element.style.color = color;
      });
  
      paragraphElements.forEach(function (element) {
        element.style.color = color;
      });
    }
  
    // Function to set card body background-color
    function setCardBodyBackgroundColor(color) {
      var cardBodyElements = document.querySelectorAll('.card .card-body');
      cardBodyElements.forEach(function (cardBody) {
        cardBody.style.backgroundColor = color;
      });
    }
  
    // Function to set side layout background-color
    function setSideLayoutBackgroundColor(color) {
      var sideLayoutElements = document.querySelectorAll('.col-md-4.side-layout');
      sideLayoutElements.forEach(function (sideLayout) {
        sideLayout.style.backgroundColor = color;
      });
    }
  
    // Function to set ol background-color
    function setOlBackgroundColor(color) {
      var olElements = document.querySelectorAll('ol');
      olElements.forEach(function (ol) {
        ol.style.backgroundColor = color;
      });
    }
  
    // Function to set custom list item background-color
    function setCustomListItemBackgroundColor(color) {
      var customListItemElements = document.querySelectorAll('.custom-list-item');
      customListItemElements.forEach(function (customListItem) {
        customListItem.style.backgroundColor = color;
      });
    }

    function setLabelColor(color) {
        var labelElements = document.querySelectorAll('.form-label');
        labelElements.forEach(function (label) {
          label.style.color = color;
        });
    }

    function setContactFormInputBackgroundColor(color) {
        var contactFormInputElements = document.querySelectorAll('.contact-section .form-control');
        contactFormInputElements.forEach(function (input) {
          input.style.backgroundColor = color;
        });
    }

    function setContactFormInputColor(color) {
        var contactFormInputText = document.querySelectorAll('.contact-section .form-control');
        contactFormInputText.forEach(function (input) {
          input.style.Color = color;
        });
    }

    function setContactFormInputStyles(textColor, backgroundColor) {
        var contactFormInputElements = document.querySelectorAll('.contact-section .form-control');
        contactFormInputElements.forEach(function (input) {
          input.style.color = textColor;
          input.style.backgroundColor = backgroundColor;
        });
    }
    
    function setLiBackgroundColor(color) {
        var liElements = document.querySelectorAll('#unique-article li');
        liElements.forEach(function (li) {
          li.style.backgroundColor = color;
        });
    }
    
    // Retrieve the selected theme from localStorage on page load
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  });
  