let ready = $(document).ready(function () {
    // hiding these id at first
    $('.hide-your-information-form').hide();
    $('.hide-partner-form').hide();
    $('.city').hide();
    $(".travelling-with-friends").hide();
    $(".travelling-with-childrens").hide();

  

   // declaring variable for form count and knowing the length of total form 
    var form_count = 1, form_count_form, next_form, total_forms;
    total_forms = $("fieldset").length;
    console.log("form count=" + total_forms);


    // showing other hidden field if user wants to travel with partner and don't want to travel 
    $("input[type='radio']").click(function () {
        var radioValue = $("input[name='travelling_with_partner']:checked").val();

        // showing field for travelling with partner
        if (radioValue == 'yes') {


            $(".travelling-with-friends").show();
            $(".travelling-with-childrens").show();
            $('.hide-your-information-form').show("slow");
            $('.hide-partner-form').show("slow");


        } else {
            $(".travelling-with-friends").show();
            $(".travelling-with-childrens").show();
            $('.hide-your-information-form').show("slow");
            $('.hide-partner-form').hide("slow");
        


        }
    });

    // selecting the country and showing respective city
    $('#countryselector').change(function () {
        $('.city').hide();
        $('#' + $(this).val()).show();
    });



    // code for keyup for making form dynamic of travelling with children with some validation
    $('#travelling-with-childrens').keyup(function (e) {
        
        $(".show-form-for-children").html('');
        if($('#travelling-with-childrens').val()  > 10){
            $("#error-travelling-with-childrens").html("<p class='error-msg' >maximum 10 children allowed.</p>").show().fadeOut(1500);
            return false;
        }
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message   
        $("#error-travelling-with-childrens").html("<p class='error-msg' >Please enter number only.</p>");
        $("#error-travelling-with-childrens").show().fadeOut(1500)
               return false;
        }

        $('#travelling-with-childrens').val();
        var length = ($('#travelling-with-childrens').val());
        for (i = 0; i < length; i++) {
            let html_data = `<br><input type="text" name="children_name_${i}" id="your-children-name-${i}" class="children-id-${i} form-control" placeholder="plese enter name"><div class="error-children-name-${i}></div>"<br>										
                            <input type="date" id="ÿour-children-dob-${i}" class="children-id-${i} form-control" name="your_children_dob_${i}" placeholder="Date of birth"><div class="error-children-dob-${i}></div>"<br>
                            <input type="radio" class="children-id-${i}" id="ÿour-male-gender-${i}" value="male" name="gender">male
                            <input type="radio" class="children-id-${i}" id="ÿour-female-gender-${i}" value="female" name="gender">female<br>
                <button type="button" class="children-id-${i}"  onclick="removeChildren(${i})">remove children</button><br><hr class="children-id-${i}"><br>`;

            $('.show-form-for-children').append(html_data)
        }




    });

    // code for keyup for making form dynamic of travelling with friend with some validation

    $('#travelling-with-friends').keyup(function (e) {
        $(".show-form-for-friend").html('');
        if($('#travelling-with-friends').val()  > 10){
            $("#error-travelling-with-friends").html("<p class='error-msg' >maximum 10 friend allowed.</p>").show().fadeOut(1500);
            return false;
        }
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message   
        $("#error-travelling-with-friends").html("<p class='error-msg' >Please enter number only.</p>");
        $("#error-travelling-with-friends").show().fadeOut(1500)
               return false;
        }
        $('#travelling-with-friends').val();
        var length = ($('#travelling-with-friends').val());
        for (i = 0; i < length; i++) {
            let html_data = `<input type="text" name="friend_name_${i}" class="friend-id-${i} form-control" placeholder="plese enter name"><br>
                            <input type="date" id="ÿour-friend-dob" class="friend-id-${i} form-control" name="your_friend_dob_${i}" placeholder="Date of birth"><br>
                            <input type="text" id="ÿour-friend-occupation" class="friend-id-${i} form-control" name="your_friend_occupation_${i}" placeholder="Occupation"><br>
                            <br>

                <button type="button" class="friend-id-${i}"  onclick="removeFriend(${i})">remove children</button><br><hr class="friend-id-${i}><br>`;

            $('.show-form-for-friend').append(html_data)
        }

    });
    
    

    

    //  function after clicking next button. shows next fieldset and hide previos field
    $(".next").click(function () {
        console.log("i am form " + form_count);
        form_count_form = $(this).parent();
        var validation, next_step;

        validation = true;
        next_step=true;
        console.log("next form value" + next_form);
       
        if( $("input[name='travelling_with_partner']:checked").val()==null){
            $('#error-travelling-with-partner').html("<p class='error-msg' >please choose one option.</p>").show().fadeOut(3000);

            return false;
        }

        if (validation) {
            if(form_count ==1){
                console.log('i am in' +form_count);


                if( $("input[name='travelling_with_partner']:checked").val()=="yes"){

                    console.log('i am inside validation');
                    var your_name=$('#ÿour-name').val();
                    var your_name_character=$('#ÿour-name').val().length;
                    // validating fullname
                    if(your_name=="") {
                        $('#error-fullname').html("<p class='error-msg' >Name is required.</p>");
                        $('#error-fullname').show();
                        next_step=false;
                    }else if(your_name_character > 30 ) {
                        $('#error-fullname').html("<p class='error-msg' >Maximum 30 characters allowed</p>");

                        next_step=false;

                    }else{
                        $('#error-fullname').hide();
                        next_step=true;
                    }






                    //validating date of birth  field
                    var your_dob=$('#ÿour-dob').val();
                    if(your_dob=="") {
                        $('#error-dob').html("<p class='error-msg' >Date of birth is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-dob').hide();
                        next_step=true;
                    }
                    //validating date of occupation field
                    var your_occupation=$('#ÿour-occupation').val();
                    if(your_occupation=="") {
                        $('#error-occupation').html("<p class='error-msg' >Occupation is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-occupation').hide();
                        next_step=true;
                    }
                    //validating date of occupation field
                    var your_dietary=$('#ÿour-dietary-requirement').val();
                    if(your_dietary=="") {
                        $('#error-dietary-requirement').html("<p class='error-msg' >Dietary field is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-dietary-requirement').hide();
                        next_step=true;
                    }



                    console.log('i am inside validation');
                    var your_partner_name=$('#ÿour-partner-name').val();
                    var your_partner_name_character=$('#ÿour-partner-name').val().length;
                    // validating fullname
                    if(your_partner_name=="") {
                        $('#error-partner-fullname').html("<p class='error-msg' >Name is required.</p>");
                        next_step=false;
                    }else if(your_partner_name_character > 30 ) {
                        $('#error-partner-fullname').html("<p class='error-msg' >Maximum 30 characters allowed</p>");

                        next_step=false;

                    }else{
                        $('#error-partner-fullname').hide();
                        next_step=true;
                    }

                    //validating email field
                    var pattern= /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var your_email =$('#ÿour-partner-emailID').val();
                    var valid_test=pattern.test(your_email);

                    if(your_email=="") {
                        $('#error-partner-emailID').html("<p class='error-msg' >email is required.</p>");
                        next_step=false;

                    }else if(valid_test==false){
                        $('#error-partner-emailID').html("<p class='error-msg' >email should follow pattern.</p>");
                        next_step=false;
                    }else{
                        $('#error-partner-emailID').hide();
                        next_step=true;
                    }

                    //validating date of birth  field
                    var your_dob=$('#ÿour-partner-dob').val();
                    if(your_dob=="") {
                        $('#error-partner-dob').html("<p class='error-msg' >Date of birth is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-partner-dob').hide();
                        next_step=true;
                    }
                    //validating date of occupation field
                    var your_occupation=$('#ÿour-partner-occupation').val();
                    if(your_occupation=="") {
                        $('#error-partner-occupation').html("<p class='error-msg' >Occupation is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-partner-occupation').hide();
                        next_step=true;
                    }
                    //validating date of occupation field
                    var your_dietary=$('#ÿour-partner-dietary-requirement').val();
                    if(your_dietary=="") {
                        $('#error-partner-dietary-requirement').html("<p class='error-msg' >Dietary field is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-partner-dietary-requirement').hide();
                        next_step=true;
                    }
                }else{
                    console.log('i am inside validation');
                    var your_name=$('#ÿour-name').val();
                    var your_name_character=$('#ÿour-name').val().length;
                    // validating fullname
                    if(your_name=="") {
                        $('#error-fullname').html("<p class='error-msg' >Name is required.</p>");
                        next_step=false;
                    }else if(your_name_character > 30 ) {
                        $('#error-fullname').html("<p class='error-msg' >Maximum 30 characters allowed</p>");

                        next_step=false;

                    }else{
                        $('#error-fullname').hide();
                        next_step=true;
                    }



                    //validating date of birth  field
                    var your_dob=$('#ÿour-dob').val();
                    if(your_dob=="") {
                        $('#error-dob').html("<p class='error-msg' >Date of birth is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-dob').hide();
                        next_step=true;
                    }



                    //validating date of occupation field
                    var your_occupation=$('#ÿour-occupation').val();
                    if(your_occupation=="") {
                        $('#error-occupation').html("<p class='error-msg' >Occupation is required.</p>");
                        $('#error-occupation').show();
                        next_step=false;
                    }else{
                        $('#error-occupation').hide();
                        next_step=true;
                    }
                    //validating date of occupation field
                    var your_dietary=$('#ÿour-dietary-requirement').val();
                    if(your_dietary=="") {
                        $('#error-dietary-requirement').html("<p class='error-msg' >Dietary field is required.</p>");
                        next_step=false;
                    }else{
                        $('#error-dietary-requirement').hide();
                        next_step=true;
                    }




                    console.log("inside else next_step status"+next_step);


                }
           
            }
            if(form_count==2){
                console.log(next_step);

                console.log('i am in'+ form_count);
                    //validating date of occupation field
                    var your_traveldate=$('#preffered-travel-date').val();
                    if(your_traveldate=="") {
                        $('#error-traveldate').html("<p class='error-msg' >travel date is required.</p>");
                        next_step=false;
                console.log(next_step);

                    }else{
                        $('#error-traveldate').hide();
                        next_step=true;
                    }
            }
            


            // Display error if any else go to next form
            if (next_step==false) {

                return false;
            } else {

             

                form_count_form = $(this).parent();

                console.log("form count"+form_count_form+ "next form value" + next_form + "next_step status"+next_step);
                var next_form = $(this).parent().next();

                console.log(next_form);
                next_form.show();
                form_count_form.hide();
                // console.log("form count text" + form_count_form);

                setProgressBar(++form_count);
                console.log('form count' + form_count);



            }



        }


    });

    // previous function : shows previous form with dynamic progress bar value
    $(".previous").click(function () {
        form_count_form = $(this).parent();
        next_form = $(this).parent().prev();
        next_form.show();
        form_count_form.hide();
        setProgressBar(--form_count);
    });



    setProgressBar(form_count);

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / total_forms) * curStep;
        percent = percent.toFixed();
        $("percentage_text").text(percent);
        $(".progress-bar")
            .css("width", percent + "%")
            .html(percent + "%");
    }

    // Handle form submit and validation
  $( "#user_form" ).submit(function(event) {    

            var selectValue = $("#countryselector option:selected").val();
            console.log("value of select"+selectValue);

            if(selectValue==""){
             $('#error-countryselector').html("<p class='error-msg' >travel date is required.</p>");
             event.preventDefault();

               return false;
            }else{
                return true;
            }

   
  });  

    // help section with toogle functionality
    $('.first-help-section').click(function () {
        var radioValue = $("input[name='first_help_section']:checked").val();

        if(radioValue){
            $("#display-first-help-section").css("display","block");
        }else{

            $("#display-first-help-section").css("display","none");


        }
    })

    // help section with toogle functionality

    $('.second-help-section').click(function () {
        var radioValue = $("input[name='second_help_section']:checked").val();

        if(radioValue){
            $("#display-second-help-section").css("display","block");
        }else{

            $("#display-second-help-section").css("display","none");


        }
    })
    // help section with toogle functionality

    $('.third-help-section').click(function () {
        var radioValue = $("input[name='third_help_section']:checked").val();

        if(radioValue){
            $("#display-third-help-section").css("display","block");
        }else{

            $("#display-third-help-section").css("display","none");


        }
    })
});

// remove dynamically created specific form field of children
function removeChildren(i) {
    $('.children-id-' + i).remove();
    
   
}

// remove dynamically created specific form field of friend

function removeFriend(i) {
    $('.friend-id-' + i).remove();
}
