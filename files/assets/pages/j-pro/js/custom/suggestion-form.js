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
					department: {
						required: true
					},
					subject: {
						required: true
					},
					message: {
						required: true
					},
					file_name: {
						validate: true,
						required: false,
						size: 1,
						extension: "jpg|jpeg|png|doc|docx"
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
					department: {
						required: "Add your department"
					},
					subject: {
						required: "Add subject"
					},
					message: {
						required: "Enter your suggestion"
					},
					file_name: {
						size_extension: "File types: jpg, png, doc. Size: 1Mb",
					}
				}
			});
		});