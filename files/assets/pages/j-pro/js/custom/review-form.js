$(document).ready(function(){

			// Validation
			$( "#j-pro" ).justFormsPro({
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true
					}
				},
				messages: {
					name: {
						required: "Add your name"
					},
					email: {
						required: "Add your email",
						email: "Incorrect email format"
					},
					message: {
						required: "Enter your message"
					}
				}
			});
		});