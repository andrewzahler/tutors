$(document).ready(function(){
   // event.preventDefault();
  var tutorsSelect = $("#tutors-select");
  var subjectsSelect = $("#subjects-select");
  var selectedSubject = $("#subjects-select");
  var selectedTutor = $("#tutors-select");
  var selectedDate = $("#date-picker");
  var selectedTime = $("#time-select");
  var selectedHours = $("#hours-select");
  var selectedDesc = $("#description");
  var appointmentForm = $("#appointment");
  
 
  var url = window.location.search;
  
  console.log(url);

  

    $('select').material_select();
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year

    });
    //Here we get the Tutors, then specify them according to subject

    $("#subjects-select").change(function() {
        // $("#tutors-select").prop( "disabled", false );

      $.get("/api/tutors", function(tutors) {
      // console.log(tutors);

        tutorsSelect.find("option:not(:first)").remove();

        $.each(tutors, function(i, item) {
          // trigger event
          tutorsSelect.trigger('contentChanged');

          $('select').on('contentChanged', function() {
            // re-initialize (update)
            $(this).material_select();
          });
            // console.log(item.subjects);
            // console.log(subjectsSelect.val().trim());
            if (item.subjects.trim() === subjectsSelect.val().trim()) {
              console.log(item);
              tutorsSelect.append($('<option>', {
                value: item.name,
                text: item.name
                }));
              tutorsSelect.data(item);
                // trigger event
                tutorsSelect.trigger('contentChanged');

                $('select').on('contentChanged', function() {
                  // re-initialize (update)
                  $(this).material_select();
                });
              }
            });
        });
    });

    $(appointmentForm).on("submit", function(event){
      event.preventDefault();
      console.log(selectedTutor.data("id"));
      console.log(selectedSubject.val(), selectedTutor.val(), selectedDate.val(), 
      selectedTime.val(), selectedHours.val(), selectedDesc.val());

      // var newApp = {
      //   subject: selectedSubject.val().trim(),
      //   date: selectedDate.val(),
      //   time: selectedTime.val().trim(),
      //   hours: selectedHours.val().trim(),
      //   description: selectedDesc.val().trim(),
      //   TutorId: selectedTutor.data("id"),
      //   StudentId: 
      // }


   });
});
  