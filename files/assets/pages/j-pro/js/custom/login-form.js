$( document ).ready( function(){
			$( "#j-pro" ).justFormsPro({
				rules:{
					login: {
						required: true
					},
					password: {
						required: true
					}
				},
				messages:{
					login: {
						required: "Login is required"
					},
					password: {
						required: "Password is required"
					}
				},
				debug: true
			});
		});