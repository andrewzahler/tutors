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
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });