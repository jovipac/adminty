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
					login: {
						required: true
					},
					password: {
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
					login: {
						required: "Add your login"
					},
					password: {
						required: "Add your password"
					}
				}
			});
		});