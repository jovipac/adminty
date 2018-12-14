  'use strict';
  $(document).ready(function() {

      validate.extend(validate.validators.datetime, {

          parse: function(value, options) {

              return +moment.utc(value);
          },
          // Input is a unix timestamp
          format: function(value, options) {

              var format = options.dateOnly ? "DD/MM/YYYY" : "DD/MM/YYYY";
              return moment.utc(value).format(format);
          }
      });

      // These are the constraints used to validate the form
      var constraints = {
          email: {
              // Email is required
              presence: true,
              // and must be an email (duh)
              email: true
          },
          password: {
              // Password is also required
              presence: true,
              // And must be at least 5 characters long
              length: {
                  minimum: 5
              }
          },
          "repeat-password": {
              // You need to confirm your password
              presence: true,
              // and it needs to be equal to the other password
              equality: {
                  attribute: "password",
                  message: "^The passwords does not match"
              }
          },
          name: {
              // You need to pick a username too
              presence: true,
              // And it must be between 3 and 20 characters long
              length: {
                  minimum: 3,
                  maximum: 20
              },

              format: {
                  // We don't allow anything that a-z and 0-9
                  pattern: "[a-z0-9]+",
                  // but we don't care if the username is uppercase or lowercase
                  flags: "i",
                  message: "can only contain a-z and 0-9"
              }
          },
          addon: {
              // You need to pick a username too
              presence: true,
              // And it must be between 3 and 20 characters long
              length: {
                  minimum: 3,
                  maximum: 20
              },

              format: {
                  // We don't allow anything that a-z and 0-9
                  pattern: "[a-z0-9]+",
                  // but we don't care if the username is uppercase or lowercase
                  flags: "i",
                  message: "can only contain a-z and 0-9"
              }
          },
          maxlength: {
              presence: true,
              numericality: {
                  onlyNumeric: true,
                  greaterThan: 10
              }
          },
          minlength: {
              presence: true,
              numericality: {
                  onlyNumeric: true,
                  lessThan: 5
              }
          },
          gender: {
              // You need to pick a gender too
              presence: true,
          }
      };

      // Hook up the form so we can prevent it from being posted
      var form = document.querySelector("form#main");
      form.addEventListener("submit", function(ev) {

          ev.preventDefault();
          handleFormSubmit(form);
      });

      // Hook up the inputs to validate on the fly
      var inputs = document.querySelectorAll("input, textarea, select")
      for (var i = 0; i < inputs.length; ++i) {

          inputs.item(i).addEventListener("change", function(ev) {

              var errors = validate(form, constraints) || {};
              showErrorsForInput(this, errors[this.name]);

          });
      }

      function handleFormSubmit(form, input) {


          // validate the form aainst the constraints
          var errors = validate(form, constraints);
          // then we update the form to reflect the results
          showErrors(form, errors || {});
          if (!errors) {

              showSuccess();
          }
      }

      // Updates the inputs with the validation errors
      function showErrors(form, errors) {

          // We loop through all the inputs and show the errors for that input
          _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
              // Since the errors can be null if no errors were found we need to handle
              // that
              showErrorsForInput(input, errors && errors[input.name]);
          });
      }

      // Shows the errors for a specific input
      function showErrorsForInput(input, errors) {
          // This is the root of the input

          var formGroup = closestParent(input.parentNode, "form-group")
              // Find where the error messages will be insert into
              ,
              messages = formGroup.querySelector(".messages");
          // First we remove any old messages and resets the classes
          resetFormGroup(formGroup);
          // If we have errors
          if (errors) {
              // we first mark the group has having errors
              formGroup.classList.add("has-error");
              // then we append all the errors
              _.each(errors, function(error) {

                  addError(messages, error, input);
              });
          } else {
              // otherwise we simply mark it as success
              formGroup.classList.add("has-success");
          }
      }

      // Recusively finds the closest parent that has the specified class
      function closestParent(child, className) {
          if (!child || child == document) {
              return null;
          }
          if (child.classList.contains(className)) {
              return child;
          } else {
              return closestParent(child.parentNode, className);
          }
      }

      function resetFormGroup(formGroup) {

          // Remove the success and error classes
          formGroup.classList.remove("has-error");
          formGroup.classList.remove("has-success");
          // and remove any old messages
          _.each(formGroup.querySelectorAll(".text-danger"), function(el) {
              el.parentNode.removeChild(el);
          });
      }

      // Adds the specified error with the following markup
      // <p class="help-block error">[message]</p>
      function addError(messages, error, input) {

          var block = document.createElement("p");
          block.classList.add("text-danger");
          block.classList.add("error");
          block.innerText = error;
          messages.appendChild(block);
          $(input).addClass("input-danger");
      }

      function showSuccess() {

          // We made it \:D/
          alert("Success!");
      }

      /*Second form*/
      // These are the constraints used to validate the form
      var constraints1 = {
          Username: {
              // You need to pick a username too
              presence: true,
              // And it must be between 3 and 20 characters long
              length: {
                  minimum: 3,
                  maximum: 20
              },

              format: {
                  // We don't allow anything that a-z and 0-9
                  pattern: "[a-z0-9]+",
                  // but we don't care if the username is uppercase or lowercase
                  flags: "i",
                  message: "can only contain a-z and 0-9"
              }
          },
          Email: {
              // Email is required
              presence: true,
              // and must be an email (duh)
              email: true
          }

      };

      // Hook up the form so we can prevent it from being posted
      var form1 = document.querySelector("form#second");
      form1.addEventListener("submit", function(ev) {

          ev.preventDefault();
          handleFormSubmit1(form1);
      });

      // Hook up the inputs to validate on the fly
      var inputs1 = document.querySelectorAll("input, textarea, select")
      for (var i = 0; i < inputs.length; ++i) {
          inputs.item(i).addEventListener("change", function(ev) {

              var errors = validate(form1, constraints1) || {};
              showErrorsForInput1(this, errors[this.name])
          });
      }

      function handleFormSubmit1(form, input) {
          // 
          // validate the form aainst the constraints
          var errors = validate(form, constraints1);
          // then we update the form to reflect the results
          showErrors1(form, errors || {});
          if (!errors) {
              showSuccess1();
          }
      }
      // Updates the inputs with the validation errors
      function showErrors1(form, errors) {
          // 
          // We loop through all the inputs and show the errors for that input
          _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
              // Since the errors can be null if no errors were found we need to handle
              // that
              showErrorsForInput1(input, errors && errors[input.name]);
          });
      }

      // Shows the errors for a specific input
      function showErrorsForInput1(input, errors) {

          // This is the root of the input
          var formGroup = closestParent1(input.parentNode, "form-group")
              // Find where the error messages will be insert into
              ,
              messages = formGroup.querySelector(".messages");
          // First we remove any old messages and resets the classes
          resetFormGroup1(formGroup);
          // If we have errors
          if (errors) {
              // we first mark the group has having errors
              formGroup.classList.add("has-error");
              // then we append all the errors
              _.each(errors, function(error) {
                  addError1(messages, error);
              });
          } else {

              // otherwise we simply mark it as success

              formGroup.classList.add("has-success");

          }
      }

      // Recusively finds the closest parent that has the specified class
      function closestParent1(child, className) {
          // 
          if (!child || child == document) {
              return null;
          }
          if (child.classList.contains(className)) {
              return child;
          } else {
              return closestParent1(child.parentNode, className);
          }
      }

      function resetFormGroup1(formGroup) {

          // Remove the success and error classes
          formGroup.classList.remove("has-error");
          formGroup.classList.remove("has-success");

          // and remove any old messages
          _.each(formGroup.querySelectorAll(".text-danger"), function(el) {
              el.parentNode.removeChild(el);
          });
      }

      // Adds the specified error with the following markup
      // <p class="help-block error">[message]</p>
      function addError1(messages, error) {
          // 

          var block = document.createElement("i");
          block.classList.add("text-danger");
          block.classList.add("error");
          block.classList.add("icofont");
          block.classList.add("icofont-close-circled");
          messages.appendChild(block);
          $(block).attr("data-toggle", "tooltip");
          $(block).attr("data-placement", "top");
          $(block).attr("data-trigger", "hover");
          $(block).attr("title", error);
          $('[data-toggle="tooltip"]').tooltip();
          return false;
      }

      function showSuccess1() {
          // We made it \:D/
          alert("Success!");
      }

      /*number validation*/
      // These are the constraints used to validate the form
      var constraints2 = {
          integer: {
              // You need to pick a integer too
              presence: true,
              numericality: {
                  onlyInteger: true

              }

          },
          numeric: {
              // You need to pick a numeric too
              presence: true,
              numericality: {
                  onlyNumeric: true

              }

          },
          Number: {
              presence: true,
              numericality: {
                  onlyNumeric: true,
                  greaterThan: 50
              }
          },
          Numbers: {
              presence: true,
              numericality: {
                  onlyNumeric: true,
                  lessThan: 50
              }
          }
      };

      // Hook up the form so we can prevent it from being posted
      var form2 = document.querySelector("form#number_form");
      form2.addEventListener("submit", function(ev) {

          ev.preventDefault();
          handleFormSubmit2(form2);
      });

      // Hook up the inputs to validate on the fly
      var inputs2 = document.querySelectorAll("input, textarea, select")
      for (var i = 0; i < inputs.length; ++i) {
          inputs.item(i).addEventListener("change", function(ev) {
              var errors = validate(form, constraints2) || {};
              showErrorsForInput2(this, errors[this.name])
          });
      }

      function handleFormSubmit2(form, input) {

          // validate the form aainst the constraints
          var errors = validate(form, constraints2);
          // then we update the form to reflect the results
          showErrors2(form, errors || {});
          if (!errors) {
              showSuccess2();
          }
      }
      // Updates the inputs with the validation errors
      function showErrors2(form, errors) {

          // We loop through all the inputs and show the errors for that input
          _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
              // Since the errors can be null if no errors were found we need to handle
              // that
              showErrorsForInput2(input, errors && errors[input.name]);
          });
      }

      // Shows the errors for a specific input
      function showErrorsForInput2(input, errors) {

          // This is the root of the input
          var formGroup = closestParent2(input.parentNode, "form-group")
              // Find where the error messages will be insert into
              ,
              messages = formGroup.querySelector(".messages");
          // First we remove any old messages and resets the classes
          resetFormGroup2(formGroup);
          // If we have errors
          if (errors) {
              // we first mark the group has having errors
              formGroup.classList.add("has-error");
              // then we append all the errors
              _.each(errors, function(error) {
                  addError2(messages, error, input);
              });
          } else {
              // otherwise we simply mark it as success
              formGroup.classList.add("has-success");
          }
      }

      // Recusively finds the closest parent that has the specified class
      function closestParent2(child, className) {

          if (!child || child == document) {
              return null;
          }
          if (child.classList.contains(className)) {
              return child;
          } else {
              return closestParent2(child.parentNode, className);
          }
      }

      function resetFormGroup2(formGroup) {
          // Remove the success and error classes
          formGroup.classList.remove("has-error");
          formGroup.classList.remove("has-success");
          // and remove any old messages
          _.each(formGroup.querySelectorAll(".text-danger"), function(el) {
              el.parentNode.removeChild(el);
          });
      }

      // Adds the specified error with the following markup
      // <p class="help-block error">[message]</p>
      function addError2(messages, error, input) {

          var block = document.createElement("p");
          block.classList.add("text-danger");
          block.classList.add("error");
          block.innerText = error;
          messages.appendChild(block);
          $(input).addClass("input-danger");

      }

      function showSuccess2() {

          // We made it \:D/
          alert("Success!");
      }

      /*checkbox and dropdown validation*/
      var constraints3 = {

          member: {
              // You need to pick a member too
              presence: true,


          },
          Language: {
              presence: true,
          }
      };

      // Hook up the form so we can prevent it from being posted

      var form3 = document.querySelector("form#checkdrop");
      form3.addEventListener("submit", function(ev) {

          ev.preventDefault();
          handleFormSubmit3(form3);
      });

      // Hook up the inputs to validate on the fly
      var inputs3 = document.querySelectorAll("input, textarea, select")
      for (var i = 0; i < inputs3.length; ++i) {
          inputs.item(i).addEventListener("change", function(ev) {
              var errors = validate(form3, constraints3) || {};
              showErrorsForInput3(this, errors[this.name])
          });
      }

      function handleFormSubmit3(form, input) {


          // validate the form aainst the constraints
          var errors = validate(form, constraints3);
          // then we update the form to reflect the results
          showErrors3(form, errors || {});
          if (!errors) {
              showSuccess3();
          }
      }

      // Updates the inputs with the validation errors
      function showErrors3(form, errors) {

          // We loop through all the inputs and show the errors for that input
          _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
              // Since the errors can be null if no errors were found we need to handle
              // that
              showErrorsForInput3(input, errors && errors[input.name]);
          });
      }

      // Shows the errors for a specific input
      function showErrorsForInput3(input, errors) {
          // This is the root of the input

          var formGroup = closestParent3(input.parentNode, "form-group")
              // Find where the error messages will be insert into
              ,
              messages = formGroup.querySelector(".messages");
          // First we remove any old messages and resets the classes
          resetFormGroup3(formGroup);
          // If we have errors
          if (errors) {
              // we first mark the group has having errors
              formGroup.classList.add("has-error");
              // then we append all the errors
              _.each(errors, function(error) {
                  // 
                  addError3(messages, error, input);
              });
          } else {
              // otherwise we simply mark it as success
              formGroup.classList.add("has-success");
          }
      }

      // Recusively finds the closest parent that has the specified class
      function closestParent3(child, className) {
          if (!child || child == document) {
              return null;
          }
          if (child.classList.contains(className)) {
              return child;
          } else {
              return closestParent3(child.parentNode, className);
          }
      }

      function resetFormGroup3(formGroup) {
          // Remove the success and error classes
          formGroup.classList.remove("has-error");
          formGroup.classList.remove("has-success");
          // and remove any old messages
          _.each(formGroup.querySelectorAll(".text-danger"), function(el) {
              el.parentNode.removeChild(el);
          });
      }

      // Adds the specified error with the following markup
      // <p class="help-block error">[message]</p>
      function addError3(messages, error, input) {

          var block = document.createElement("p");
          block.classList.add("text-danger");
          block.classList.add("error");
          block.innerText = error;
          messages.appendChild(block);
          $(input).addClass("input-danger");
      }

      function showSuccess3() {
          // We made it \:D/
          alert("Success!");
      }
  });
