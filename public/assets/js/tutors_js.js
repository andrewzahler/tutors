$('.body').vegas({
        slides: [{
            src: '/assets/images/slide1.jpg'
        }, {
            src: '/assets/images/slide2.jpg'
        }, {
            src: '/assets/images/slide3.jpg'
        }, {
            src: '/assets/images/slide4.jpg'
        }]
    });
$('select').material_select();

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  //Time Picker:



$('.timepicker').pickatime({
    default: 'now',
    twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
    donetext: 'OK',
  autoclose: false,
  vibrate: true // vibrate the device when dragging clock hand
});

  });






