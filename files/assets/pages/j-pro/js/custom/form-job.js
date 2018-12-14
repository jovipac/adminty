$(document).ready(function(){

			// Phone masking
			$('#phone').mask('(999) 999-9999', {placeholder:'x'});

			// Validation
			$( "#j-pro" ).justFormsPro({
				rules: {
					first_name: {
						required: true
					},
					last_name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					phone: {
						required: true
					},
					country: {
						required: true
					},
					city: {
						required: true
					},
					post_code: {
						required: true
					},
					address: {
						required: true
					},
					position: {
						required: true
					},
					message: {
						required: false
					},
					file1: {
						validate: true,
						required: false,
						size: 1,
						extension: "xls|xlsx|docx|doc"
					},
					file2: {
						validate: true,
						required: false,
						size: 1,
						extension: "xls|xlsx|docx|doc"
					}
				},
				messages: {
					first_name: {
						required: "Add your first name"
					},
					last_name: {
						required: "Add your last name"
					},
					email: {
						required: "Add your email",
						email: "Incorrect email format"
					},
					phone: {
						required: "Add your phone"
					},
					country: {
						required: "Select your country"
					},
					city: {
						required: "Add your city"
					},
					post_code: {
						required: "Add your post code"
					},
					address: {
						required: "Add your address"
					},
					position: {
						required: "Select desired position"
					},
					message: {
						required: "Add your message"
					},
					file1: {
						size_extension: "File types: xls/xlsx/docx/doc. Size: 1Mb"
					},
					file2: {
						size_extension: "File types: xls/xlsx/docx/doc. Size: 1Mb"
					}
				},
				debug: true
			});
		});