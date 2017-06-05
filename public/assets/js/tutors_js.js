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



$(document).ready(function() {
    
    $(document).on("click", function(){
        $('.sub-main').addClass('animated rollOut');
        $('.header-bg').addClass('animated rollOut');
    });
    //Time Picker:
    // $('.timepicker').pickatime({
    //     default: 'now',
    //     twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
    //     donetext: 'OK',
    //   autoclose: false,
    //   vibrate: true // vibrate the device when dragging clock hand
    // });

});
