function validateForm() {
    var type = document.getElementsByName('type')[0].value;
    var theme = document.getElementsByName('theme')[0].value;
    var details = document.getElementsByName('details')[0].value;
    var amount = document.getElementsByName('amount')[0].value;
    var date = document.getElementsByName('date')[0].value;

    if (type === '' || theme === '' || details === '' || amount === '' || date === '') {
      window.alert('Missing data!');
      return false;
    }

    if (details.length > 20) {
    window.alert('Details should not exceed 20 characters');
    return false; // Prevent form submission
  }

    window.alert('Submitted successfully');
    return true;
  }