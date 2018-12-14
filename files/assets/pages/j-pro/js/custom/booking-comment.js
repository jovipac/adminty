$(document).ready(function(){
      // Validation
      $( "#j-pro" ).justFormsPro({
        rules: {
          first_name: {
            requiredFromGroup: [1, ".name-group"]
          },
          last_name: {
            requiredFromGroup: [1, ".name-group"]
          },
          email: {
            required: true,
            email: true
          },
          url: {
            required: true,
            url: true
          },
          message: {
            required: true
          }
        },
        messages: {
          first_name: {
            requiredFromGroup: "Add your name"
          },
          last_name: {
            requiredFromGroup: "Add your name"
          },
          email: {
            required: "Add your email",
            email: "Incorrect email format"
          },
          url: {
            required: "Add your url",
            url: "Incorrect url format"
          },
          message: {
            required: "Enter your message"
          }
        }
      });
    });