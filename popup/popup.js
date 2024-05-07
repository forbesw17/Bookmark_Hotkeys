
// document.getElementById('flexSwitchCheckChecked').addEventListener('change', function() {
//     if(this.checked) {
//       console.log('Checkbox is checked');
//     } else {
//       console.log('Checkbox is unchecked');
//     }
//   });

window.addEventListener('keydown', function(event) {
    // Check if Alt key and 1 key are pressed simultaneously
    if (event.altKey && event.key === '1') {
      // Your code to handle Alt + 1 key press goes here
      console.log('Alt + 1 pressed');
    }
  });
