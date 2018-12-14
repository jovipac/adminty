$(document).ready(function(){

			// Validation
			$( "#j-pro" ).justFormsPro({
				rules: {
					"newsletter[]": {
						required: true
					},
					"news[]": {
						required: true
					},
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					"newsletter[]": {
						required: "Select type of newsletter"
					},
					"news[]": {
						required: "Select type of news"
					},
					email: {
						required: "Add your email",
						email: "Incorrect email format"
					}
				}
			});
		});