;(function ( $ ) {
"use strict";

/* Defaul options */
var defaults = {
	rules: {},
	messages: {},
	error: {
		scroll: true,
		highlight: true,
		inBlock: false,
		inTooltip: false,
		underField: true,
		inTooltipClass: "j-tooltip-right-top",
	},
	success: {
		highlight: true,
	},
	validationEvent: {
		onsubmit: true,
		onchange: true,
		onkeyup: true,
	},
	formType: {
		modal: false,
		multistep: false,
	},
	formRedirect: {
		redirect: false,
		address: "http://codecanyon.net/user/lazycode"
	},
	formHide: {
		hide: false,
		closeBtn: false
	},
	formTotalData: false,
	timeoutSuccessMsg: 5000,
	repeatSubmission: true,
	submit: true,
	debug: false,
	debugArr: [],
	afterInitHandler:function() { return true; },
	beforeSubmitHandler:function() { return true; },
	afterSubmitHandler:function() { return true; },
	dict: {
		debugError: "Oops! Debug errors occurred. Enable debug mode for JavaScript code",
		rulesError: "User settings: You have to specify validation rules for a form",
		messagesError: "User settings: You have to specify validation messages for a form",
		modalOpenError: "Could not find a link/button with class='j-modal-open' to open modal form",
		responseBlockError: "Could not find a block with class='j-response' for server response",
		submitBtnError: "Could not find a button[type='submit'] for form submission",
		totalDataBlockError: "Could not find a block with class='j-total-data' for total form data",
		multistepOneStepError: "Multistep form has only one step. At least two steps are required!",
		rulesUnknownRuleError: "User settings -> 'rules' array: Unknown validation rule: ",
		rulesNotAllowedValueError: "User settings -> 'rules' array -> Not allowed value: ",
		rulesMessagesMismatchError: "User settings: field names in 'rules' and 'messages' are mismatched",
		formDataError: "FormData is not supported in this browser. Please update it to the latest version or use another browser",
		disabledBtn: "Thanks!",
		multistepNextBtn: "Next",
		multistepPrevBtn: "Back",
		errorBlockText: "Oops! The following errors occurred:",
		successBlockText: "Thank you! We got your email successfully",
	},
	mimeTypes: {
		"jpeg": "image/jpeg",
		"tiff": "image/tiff",
		"jpg": "image/jpg",
		"png": "image/png",
		"gif": "image/gif",
		"ico": "image/vnd.microsoft.icon",
		"doc": "application/msword",
		"xls": "application/vnd.ms-excel",
		"docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"txt": "text/plain",
		"csv": "text/csv",
		"zip": "application/zip",
		"gzip": "application/gzip",
		"rar": "application/x-rar-compressed",
		"odf": ["application/vnd.oasis.opendocument.text",
				"application/vnd.oasis.opendocument.spreadsheet",
				"application/vnd.oasis.opendocument.presentation",
				"application/vnd.oasis.opendocument.graphics"],
		"pdf": "application/pdf",
		"powerpoint": ["application/vnd.ms-powerpoint",
						"application/vnd.openxmlformats-officedocument.presentationml.presentation"],
		"mpeg": ["audio/mpeg","video/mpeg"],
		"mp4": ["audio/mp4","video/mp4"],
		"ogg": ["audio/ogg","video/ogg","application/ogg"],
	},
};

/* File validation */
function _fileCheck( fileObj, rules, messages, mimeTypes ) {
	var type, len, i,
		file 		 = fileObj[0].files[0],
		required	 = rules.required,
		validate	 = rules.validate,
		extension	 = rules.extension.toLowerCase(),
		size		 = rules.size * 1024 * 1024,
		allowedTypes = [],
		extensionArr = extension.split("|");

	// Add required valid types
	for ( type in mimeTypes ) {
		if ( extensionArr.indexOf(type) === -1 ) {
			continue;
		}
		if ( $.isArray( mimeTypes[type] ) ) {
			len = mimeTypes[type].length;
			for ( i=0; i<len; i++ ) {
				allowedTypes.push( mimeTypes[type][i] );
			}
			continue;
		}
		allowedTypes.push( mimeTypes[type] );
	}

	// Validation
	if ( validate || required ) {
		// If file is required
		if ( required ) {
			// If file is empty
			if ( !file ) {
				return messages.required;
			}
		}
		// If file is not required
		// Validate file only if it exists
		if ( file ) {
			// Check allowed file types
			if ( allowedTypes.indexOf(file.type) === -1 ) {
				return messages.size_extension;
			}
			// Check allowed file size
			if ( file.size > size) {
				return messages.size_extension;
			}
			return false;
		}
	}
}

/* Email validation */
function _emailCheck( value ) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
	return !re.test( value );
}

/* Url validation */
function _urlCheck( value ){
	var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	return !re.test( value );
}

/* EqualTo validation */
function _equalToCheck( value, targetValue ) {
	return ( value.trim() !== targetValue.trim() ) ? true : false;
}

/* Min value validation */
function _minValueCheck( value, minVal ) {
	var val = value.trim();

	if ( _numberCheck( val ) ) {
		return true;
	}
	return ( val < minVal ) ? true : false;
}

/* Max value validation */
function _maxValueCheck( value, maxVal ) {
	var val = value.trim();

	if ( _numberCheck( val ) ) {
		return true;
	}
	return ( val > maxVal ) ? true : false;
}

/* Range value validation */
function _rangeValueCheck( value, rangeVal ) {
	var val = value.trim();

	if ( _numberCheck( val ) ) {
		return true;
	}
	return ( val < rangeVal[0] || val > rangeVal[1] ) ? true : false;
}

/* Min length validation */
function _minLengthCheck( value, minLen ) {
	return ( value.trim().length < minLen ) ? true : false;
}

/* Max length validation */
function _maxLengthCheck( value, maxLen ) {
	return ( value.trim().length > maxLen ) ? true : false;
}

/* Range length validation */
function _rangeLengthCheck( value, rangeLen ) {
	var val = value.trim().length;
	return ( val < rangeLen[0] || val > rangeLen[1] ) ? true : false;
}

/* Integer validation */
function _integerCheck( value ) {
	var re = /^-?\d+$/;
	return !re.test( value );
}

/* Number validation */
function _numberCheck( value ) {
	var re = /^-?\d+(?:\.\d+)?$/;
	return !re.test( value );
}

/* Validate rules object */
function _rulesCheck( obj ) {
	var self = this,
		config = self.config,
		message = self.config.dict.rulesNotAllowedValueError;

	$.each(obj, function( name, value ) {
		$.each(value, function( rule, val ) {
			switch( rule ) {
			case "required":
			case "email":
			case "url":
			case "integer":
			case "number":
			case "validate":
				if ( $.type( val ) !== "boolean" ) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "minlength":
			case "maxlength":
				if ( _integerCheck( val ) || val < 0 ) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "minvalue":
			case "maxvalue":
				if ( _numberCheck( val ) ) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "rangelength":
				if ( !$.isArray( val ) ||
						val.length !== 2 ||
						_integerCheck( val[0] ) ||
						_integerCheck( val[1] ) ||
						val[0] > val[1]
					) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "rangevalue":
				if ( !$.isArray( val ) ||
						val.length !== 2 ||
						_numberCheck( val[0] ) ||
						_numberCheck( val[1] ) ||
						val[0] > val[1]
					) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "size":
				if ( _numberCheck( val ) || val <= 0 ) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "extension":
			case "equalTo":
				if ( $.type( val ) !== "string" ) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			case "requiredFromGroup":
				if ( !$.isArray( val ) ||
						val.length !== 2 ||
						_integerCheck( val[0] ) ||
						$.type( val[1] ) !== "string"
					) {
					config.debugArr.push( _errorMsg( message, rule, val ) );
				}
				break;
			default:
				config.debugArr.push( config.dict.rulesUnknownRuleError + rule );
			}
		});
	});
}

/* Validate messages object */
function _messagesCheck( obj ) {
	var rKeys = Object.keys( obj.rules ).sort(),
		mKeys = Object.keys( obj.messages ).sort();

	if ( JSON.stringify( rKeys ) !== JSON.stringify( mKeys ) ) {
		this.config.debugArr.push( this.config.dict.rulesMessagesMismatchError );
	}
}

/* Config check error message */
function _errorMsg( message, rule, val ) {
	return message + rule + ": " + val +" ( " + $.type(val) + " )";
}

/* Get field value */
function _getValue( obj ) {
	var res;

	obj.each( function() {
		if ( $( this ).is( ":checkbox" ) || $( this ).is( ":radio" ) ) {
			if ( $( this ).is( ":checked" ) ) {
				if ( res !== undefined ) {
					res += ", "+$( this ).val();
				} else {
					res = $( this ).val();
				}
			}
		} else {
			res = $( this ).val();
		}
	});

	if ( $.isArray( res ) ) {
		res = res.join(", ");
	}
	return ( res === undefined || res === null ) ? "" : res;
}

/* Check if field is hidden or has "display:none;" */
function _hiddenCheck( field ) {
	if ( $( field ).css("display") === "none" ||
		 $( field ).css("visibility") === "hidden" ||
		 $( field ).is(":disabled") ){
			return true;
		}
	return false;
}

/* Constructor */
function JustFormsPro( obj, options ) {
	this.config = $.extend( true, {}, defaults, options );
	this.form = obj[0];
	this.$form = obj;
	this.$formObj = {};
	this.$formObjActiveStep = {};
	this.errorExists = false;
	this.errorMessages = {};

	// Form elements processing
	this.$formResponseBlock = this.$form.find( ".j-response" );
	this.$submitBtn = this.$form.find( "button[type='submit']" );

	// Form plugin init
	this.init();
}

JustFormsPro.prototype = {

	/* Init */
	init: function() {
		var self = this,
			$form = self.$form,
			config = self.config,
			$formObj = self.$formObj,
			str, $el;

		// FormData support
		if ( typeof window.FormData === "undefined" ) {
			config.debugArr.push( config.dict.formDataError );
		}

		// User input validaion
		if ( $.isEmptyObject( config.rules ) ) {
			config.debugArr.push( config.dict.rulesError );
		} else {
			_rulesCheck.call( self, config.rules );
		}
		if ( $.isEmptyObject( config.messages ) ) {
			config.debugArr.push( config.dict.messagesError );
		} else {
			_messagesCheck.call( self, config );
		}

		// Response block availability
		if ( !self.$formResponseBlock.length ){
			config.debugArr.push( config.dict.responseBlockError );
		}

		// Submit button availability
		if ( !self.$submitBtn.length ){
			config.debugArr.push( config.dict.submitBtnError );
		}

		// Hide form
		if ( config.formHide.hide ) {
			self.initHideForm();
		}

		// Modal form
		if ( config.formType.modal ) {
			self.initModalForm();
		}

		// Multistep form
		if ( config.formType.multistep ) {
			self.initMultistepForm();
		}

		// Init total form data
		if ( config.formTotalData ) {
			self.initTotalData();
		}

		// Debug result
		if ( config.debugArr.length ) {
			if ( !config.debug ){
				alert( config.dict.debugError );
				$form.on( "submit", false );
				return false;
			}
			str = config.debugArr.join( '\n -------------- \n' );
			console.warn( str );
			alert( str );
			config.debugArr = [];
			$form.on( "submit", false );
			return false;
		}

		// Object with html entities
		$.each( config.rules, function( name, rules ) {
			$el = $form.find( "[name='"+name+"']" );
			if ( $el.length ) {
				$formObj[name] = $el;
			}
		});

		// Events
		if ( config.validationEvent.onchange || config.validationEvent.onkeyup ) {
			self.initEvent();
		}

		// Processing total form data
		if ( config.formTotalData ) {
			self.processingTotalData();
		}

		// Bind submit event
		$form.on( "submit", self.submitForm.bind(self) );
	},

	/* Init events */
	initEvent: function() {
		var self = this,
			config = self.config,
			$formObj = self.$formObj,
			eventsArr = [];

		// Create events
		if ( config.validationEvent.onchange ) {
			eventsArr.push("change");
		}
		if ( config.validationEvent.onkeyup ) {
			eventsArr.push("keyup");
		}

		// Add events
		eventsArr.forEach( function(event) {
			self.$form.on( event, ":input", function() {
				self.clearField( this );
				self.validateField( this );
			});
			$.each( config.rules, function( name, rules ) {
				$.each( rules, function( rule, value ){
					if ( rule === "equalTo" ) {
						$( value ).on( event, function(){
							self.clearField( $formObj[name][0] );
							self.validateField( $formObj[name][0] );
						});
					}
				});
			});
		});
	},

	/* Submit a form */
	submitForm: function(e) {
		var self = this,
			config = self.config,
			$prevBtn = self.$prevBtn,
			$submitBtn = self.$submitBtn;

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		// After init custom handler
		if ( !config.afterInitHandler() ) {
			return false;
		}

		// Form validation
		if ( config.validationEvent.onsubmit ) {
			// Buttons disabled
			$submitBtn.toggleClass( "j-processing", true ).attr( "disabled", true );
			if ( config.formType.multistep ) {
				$prevBtn.attr( "disabled", true );
			}

			// Clear a form
			self.clearForm();

			// Validate form
			self.validateForm();
		}

		// If errors exist
		if ( self.errorExists ) {
			// Scroll to first element with error
			if ( config.error.scroll ) {
				self.scrollToError();
			}

			// Show errors within an error block
			if ( config.error.inBlock ) {
				self.createErrorBlock( self.errorMessages );
			}

			// Buttons enabled
			$submitBtn.toggleClass( "j-processing", false ).removeAttr( "disabled" );
			if ( config.formType.multistep ) {
				$prevBtn.removeAttr( "disabled" );
			}
			return false;
		}

		// Before submit custom handler
		if ( !config.submit || !config.beforeSubmitHandler() ) {
			// Buttons enabled
			$submitBtn.toggleClass( "j-processing", false ).removeAttr( "disabled" );
			if ( self.config.formType.multistep ) {
				$prevBtn.removeAttr( "disabled" );
			}
			return false;
		}

		// Send form data
		self.getServerResponse();
	},

	/* AJAX request */
	sendFormDataAsync: function() {
		var self = this,
			form = self.form,
			formData;

		// Form data
		formData = new FormData( form );

		return $.ajax({
			url: form.action,
			type: form.method,
			contentType: false,
			processData: false,
			data: formData
		});
	},

	/* Send form data */
	getServerResponse: function() {
		var self = this,
			config = self.config,
			$prevBtn = self.$prevBtn,
			$submitBtn = self.$submitBtn,
			$formResponseBlock = self.$formResponseBlock,
			result;

		self.sendFormDataAsync().then(function( data ) {

			// Server error processing
			if ( config.debug ) {
				console.warn( data );
			}

			result = $.parseJSON( data );

			// Error message from server
			if ( result.error ) {

				// Add class "j-error-message"
				$formResponseBlock.toggleClass( "j-error-message j-unit", true );
				$formResponseBlock.html( result.error );

				// Buttons enabled
				$submitBtn.removeClass( "j-processing" ).removeAttr( "disabled" );
				if ( config.formType.multistep ) {
					$prevBtn.removeAttr( "disabled" );
				}
			}

			// Success message from server
			if ( result.success ) {

				// Custom function applied after submission
				if ( !config.afterSubmitHandler() ) {
					// Buttons enabled
					$submitBtn.removeClass( "j-processing" ).removeAttr( "disabled" );
					if ( config.formType.multistep ) {
						$prevBtn.removeAttr( "disabled" );
					}
					return false;
				}

				// Hide form after successful submitting
				if ( config.formHide.hide ) {
					self.processingHideForm();
					return false;
				}

				// Redirect form after success submitting
				if ( config.formRedirect.redirect ) {
					self.redirectForm();
					return false;
				}

				// Clear a form
				// Show success message
				self.resetForm();
				self.createSuccessBlock( result.success );
			}
		});
	},

	/* Validate field */
	validateField: function( field ) {
		var self = this,
			config = self.config,
			$formObj = self.$formObj,
			fieldName = $( field ).attr( "name" ),
			fieldValue;

		// If a form does not have a field
		if ( $formObj[fieldName] === undefined || $formObj[fieldName] === null ) {
			return false;
		}

		fieldValue = _getValue( $formObj[fieldName] );

		self.validation( config.rules[fieldName], field, fieldValue, fieldName);

		// Show errors within an error block
		if ( config.error.inBlock ) {
			self.createErrorBlock();
		}
	},

	/* Validate all form fields */
	validateForm: function() {
		var self = this,
			config = self.config,
			$formObj, fieldValue;

		// If form is mulultistep
		// Get fields from "active" step only
		if ( config.formType.multistep ) {
			self.$formObjActiveStep = {};
			self.getActiveStepField();
			$formObj = self.$formObjActiveStep;
		} else {
			$formObj = self.$formObj;
		}

		$.each( config.rules, function( name, rules ) {

			// If a form does not have a field
			if ( $formObj[name] === undefined || $formObj[name] === null ) {
				return;
			}
			
			// Skip the validation if field is hidden
			if ( _hiddenCheck( $formObj[name] ) ){
				return;
			}

			// Get field value
			fieldValue = _getValue( $formObj[name] );

			// Fields processing
			self.validation( rules, $formObj[name], fieldValue, name );
		});
	},

	/* Validation functions */
	validation: function( rules, field, fieldValue, fieldName ) {
		var self = this,
			config = self.config,
			count = 0,
			groupObj = {},
			res, groupClass, id;

		// Files processing
		if ( $( field ).attr( "type" ) && $( field ).attr( "type" ) === "file" ) {
			if ( config.rules[fieldName].required === true ||
					config.rules[fieldName].validate === true ) {

				res = _fileCheck( $( field ), config.rules[fieldName],
						config.messages[fieldName], config.mimeTypes );

				if ( res ) {
					self.setErrorState( $( field ), res );
					return false;
				}
				self.setSuccessState( field );
			}
		}

		// Fields processing
		$.each( rules, function( rule, ruleValue ){
			switch( rule ) {
			case "required":
				if ( ruleValue === true ) {
					if ( _minLengthCheck( fieldValue, 1 ) ) {
						self.setErrorState( field, config.messages[fieldName][rule] );
						return false;
					}
					self.setSuccessState( field );
				}
				break;
			case "email":
				if ( ruleValue === true ) {
					if ( _emailCheck( fieldValue ) ) {
						self.setErrorState( field, config.messages[fieldName][rule] );
						return false;
					}
					self.setSuccessState( field );
				}
				break;
			case "url":
				if ( ruleValue === true ) {
					if ( _urlCheck( fieldValue ) ) {
						self.setErrorState( field, config.messages[fieldName][rule] );
						return false;
					}
					self.setSuccessState( field );
				}
				break;
			case "integer":
				if ( ruleValue === true ) {
					if ( _integerCheck( fieldValue ) ) {
						self.setErrorState( field, config.messages[fieldName][rule] );
						return false;
					}
					self.setSuccessState( field );
				}
				break;
			case "number":
				if ( ruleValue === true ) {
					if ( _numberCheck( fieldValue ) ) {
						self.setErrorState( field, config.messages[fieldName][rule] );
						return false;
					}
					self.setSuccessState( field );
				}
				break;
			case "minlength":
				if ( _minLengthCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "maxlength":
				if ( _maxLengthCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "rangelength":
				if ( _rangeLengthCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "minvalue":
				if ( _minValueCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "maxvalue":
				if ( _maxValueCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "rangevalue":
				if ( _rangeValueCheck( fieldValue, config.rules[fieldName][rule] ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "equalTo":

				// Get id
				id = ruleValue.slice(1);

				// Get element's value with id
				$.each( self.$formObj, function(){
					if ( this.attr( "id" ) === id ) {
						res = this.val();
					}
				});
				if ( _equalToCheck( fieldValue, res ) ) {
					self.setErrorState( field, config.messages[fieldName][rule] );
					return false;
				}
				self.setSuccessState( field );
				break;
			case "requiredFromGroup":

				// Get class name
				groupClass = ruleValue[1].slice(1);

				// Get elements with class
				$.each( self.$formObj, function( fieldName, fieldObj ){
					if ( fieldObj.hasClass( groupClass ) ) {
						groupObj[fieldName] = fieldObj;
						self.clearField( fieldObj );
					}
				});

				// Validation
				$.each( groupObj, function(){
					if ( !_minLengthCheck( _getValue( this ), 1 ) ) {
						count++;
					}
				});

				// Add error state
				if ( count < ruleValue[0] ) {
					$.each( groupObj, function(){
						self.setErrorState( this, config.messages[fieldName][rule] );
					});
					return false;
				}

				// Add success state
				$.each( groupObj, function(){
					self.setSuccessState( this );
				});
				break;
			}
		});
	},

	/* Set error conditions for form fields */
	setErrorState: function( field, msg ) {
		var self = this,
			config = self.config,
			$input = $( field ).closest( ".j-input" ),
			elem;

		// Error exists
		self.errorExists = true;

		/* Remove class "j-success-view" */
		$input.toggleClass( "j-success-view", false );

		// Add class "j-error-view"
		if ( config.error.highlight ) {
			$input.addClass( "j-error-view" );
		}

		// Show errors in tooltips
		if ( config.error.inTooltip ) {
			elem = $( "<span />", {
				class: "j-tooltip j-error-view " + config.error.inTooltipClass,
				text: msg
			});
			$input.append( elem );
		}

		// Show errors under appropriate fields
		if ( config.error.underField ) {
			elem = $( "<span />", {
				class: "j-error-view",
				text: msg
			});
			$input.append( elem );
		}

		// Add error message into an array
		// For showing into error block
		if ( config.error.inBlock ) {
			var fieldName = $( field ).attr( "name" );
			self.errorMessages[fieldName] = msg;
		}
	},

	/* Set success conditions for form fields */
	setSuccessState: function( field ) {
		var self = this,
			$input = $( field ).closest( ".j-input" );

		// Add class "j-success-view"
		if ( self.config.success.highlight ) {
			$input.toggleClass( "j-success-view", true );
		}
	},

	/* Init total form data */
	initTotalData: function() {
		var self = this;

		self.$totalDataBlock = self.$form.find( ".j-total-data" );
		if ( !self.$totalDataBlock.length ){
			self.config.debugArr.push( self.config.dict.totalDataBlockError );
		}
	},

	/* Total form data processing */
	processingTotalData: function() {
		var self = this,
			$formObj = self.$formObj,
			$totalDataBlock = self.$totalDataBlock,
			$totalDataList, $totalDataValue, $fieldName, $elem;

		// List of fields to insert data in
		$totalDataList = $totalDataBlock.find("span[data-field]");

		$.each( $totalDataList, function(){

			// Get form field with the name
			$fieldName = $( this ).attr("data-field");
			$elem = self.$form.find( "[name='"+$fieldName+"']" );

			if ( $elem.length ) {

				if ( $formObj[$fieldName] === undefined || $formObj[$fieldName] === null ){
					return;
				}

				// Add event listener
				$elem.on("change", (function(obj, name){
					return function(){
						$totalDataValue = _getValue( obj[name] );
						$totalDataBlock.find( "span[data-field='"+name+"']" ).html( $totalDataValue );
					};
				})($formObj, $fieldName));
			}
		});
	},

	/* Init multistep form */
	initMultistepForm: function() {
		var self = this,
			$form = self.$form;

		self.$nextBtn = $form.find( ".j-multi-next-btn" );
		self.$prevBtn = $form.find( ".j-multi-prev-btn" );
		self.$stepTitleList = $form.find( ".j-step-title" );
		self.$contentBlock = $form.children( ".j-content" );
		self.$footerBlock = $form.children( ".j-footer" );
		self.$stepList = self.$contentBlock.children( "fieldset" );

		self.createMultistepForm();
		self.processingMultistepForm();
	},

	/* Make a layout for multistep form */
	createMultistepForm: function() {
		var self = this,
			$form = self.$form,
			$stepTitleBlock, $elem, $elems, $elemsLen, $tempStep, $tempStepList, i;

		// Add class "j-multistep"
		$form.toggleClass( "j-multistep", true );

		// If a form doesn't have "next" button
		if ( !self.$nextBtn.length ) {
			$elem = $("<button />", {
				type: "button",
				class: "j-primary-btn j-multi-next-btn",
				text: self.config.dict.multistepNextBtn
			});
			if ( self.$footerBlock.length ) {
				self.$footerBlock.append( $elem );
			} else {
				self.$contentBlock.append( $elem );
			}
			self.$nextBtn = self.$form.find( ".j-multi-next-btn" );
		}

		// If a form doesn't have "previous" button
		if ( !self.$prevBtn.length ) {
			$elem = $("<button />", {
				type: "button",
				class: "j-secondary-btn j-multi-prev-btn",
				text: self.config.dict.multistepPrevBtn
			});
			if ( self.$footerBlock.length ) {
				self.$footerBlock.append( $elem );
			} else {
				self.$contentBlock.append( $elem );
			}
			self.$prevBtn = self.$form.find( ".j-multi-prev-btn" );
		}

		// If a form doesn't have fieldsets
		if ( !self.$stepList.length ) {

			// Find form fields
			$elems = self.$contentBlock.children( ".j-unit, .j-row" ).filter(":not(.j-step-titles)");
			$stepTitleBlock = self.$contentBlock.children( ".j-step-titles" );

			$elemsLen = $elems.length;

			// Cerate steps for every set of fields
			for ( i=0; i<$elemsLen; i+=3 ) {

				// Add fields to a step
				$tempStep = $( "<fieldset />" ).append( $elems.slice( i, i+3 ) );

				// Add step to a form
				$tempStepList = self.$contentBlock.children( "fieldset" );
				if ( !$tempStepList.length ){
					if ( !$stepTitleBlock.length ){
						self.$contentBlock.prepend( $tempStep );
						continue;
					}
					$tempStep.insertAfter( $stepTitleBlock );
					continue;
				}
				$tempStep.insertAfter( $tempStepList.last() );
			}
			self.$stepList = self.$contentBlock.children( "fieldset" );
		}
	},

	/* Multistep form processing */
	processingMultistepForm: function() {
		var self = this,
			config = self.config,
			$stepList = self.$stepList,
			$nextBtn = self.$nextBtn,
			$prevBtn = self.$prevBtn,
			$submitBtn = self.$submitBtn,
			$stepTitleList = self.$stepTitleList,
			len = self.$stepList.length;

		// If multistep form has one step only
		if ( len === 1 ){
			config.debugArr.push( config.dict.multistepOneStepError );
			$stepList.eq( 0 ).addClass( "j-active-fieldset" );
			return false;
		}

		// Processing of the first fieldset
		$stepList.eq( 0 ).addClass( "j-active-fieldset" );
		$submitBtn.addClass( "j-hiddenBtn" );
		$prevBtn.addClass( "j-hiddenBtn" );

		// Set active step title
		if ( $stepTitleList.length ){
			$stepTitleList.eq(0).addClass( "j-active-step" );
		}

		// Click on the "next" button
		$nextBtn.on( "click", function( e ){
			if ( e ) {
				e.preventDefault();
				e.stopPropagation();
			}

			// Clear a form
			self.clearForm();

			// Form validation
			self.validateForm();

			// If errors don"t exist
			if ( !self.errorExists ) {

				// Switch the "active" class to the next fieldset
				$stepList.filter( ".j-active-fieldset" ).removeClass( "j-active-fieldset" ).
					next( "fieldset" ).addClass( "j-active-fieldset" );

				// Switch the "active" class to the next step
				if ( $stepTitleList.length ) {
					$stepTitleList.filter( ".j-active-step" ).removeClass( "j-active-step" ).
					addClass( "j-passed-step" ).next( ".j-step-title" ).addClass( "j-active-step" );
				}

				// Display "prev" button
				$prevBtn.removeClass( "j-hiddenBtn" );

				// If active fieldset is a last
				// processing the buttons
				if ( $stepList.eq( len-1 ).hasClass( "j-active-fieldset" ) ) {
					$submitBtn.removeClass( "j-hiddenBtn" );
					$nextBtn.addClass( "j-hiddenBtn" );
				}
			
			// If current fieldset has validation errors
			} else {
				// Scroll to first element with error
				if ( config.error.scroll ) {
					self.scrollToError();
				}
				// Show errors within an error block
				if ( config.error.inBlock ) {
					self.createErrorBlock();
				}
				return false;
			}
		});

		// Click on the "prev" button
		$prevBtn.on( "click", function( e ){
			if ( e ) {
				e.preventDefault();
				e.stopPropagation();
			}

			// Clear a form
			self.clearForm();

			// Switch the "active" class to the previous fieldset
			$stepList.filter( ".j-active-fieldset" ).removeClass( "j-active-fieldset" ).
				prev( "fieldset" ).addClass( "j-active-fieldset" );


			// Switch the "active" class to the next step
			if ( $stepTitleList.length ) {
				$stepTitleList.filter( ".j-active-step" ).removeClass( "j-active-step" ).
					prev( ".j-step-title" ).removeClass( "j-passed-step" ).addClass( "j-active-step" );
			}

			// If active fieldset is a first
			// processing the buttons
			if ( $stepList.eq(0).hasClass( "j-active-fieldset" ) ) {
				$prevBtn.addClass( "j-hiddenBtn" );
			}

			// If active fieldset is a penultimate
			// processing the buttons
			if ( $stepList.eq( len-2 ).hasClass( "j-active-fieldset" ) ) {
				$submitBtn.addClass( "j-hiddenBtn" );
				$nextBtn.removeClass( "j-hiddenBtn" );
			}

			// Get fields from active step
			self.getActiveStepField();
		});
	},

	/* Get fields from active step only */
	getActiveStepField: function() {
		var self = this,
			config = self.config,
			$form = self.$form,
			$el;

		if ( config.formType.multistep ) {
			$.each( config.rules, function( name, rules ) {
				$el = $form.find( "fieldset.j-active-fieldset [name='"+name+"']" );
				if ( $el.length ) {
					self.$formObjActiveStep[name] = $el;
				}
			});
		}
	},

	/* Init modal form */
	initModalForm: function() {
		var self = this,
			$form = self.$form;

		self.$modalWrap  = $form.closest( ".j-modal-form" );
		self.$modalClose = $form.find( ".j-modal-close" );
		self.$modalOpen  = $( document ).find( ".j-modal-open" );

		// If modal links dont exist
		if ( !self.$modalOpen.length ) {
			self.config.debugArr.push( self.config.dict.modalOpenError );
			return false;
		}

		self.createModalForm();
		self.processingModalForm();
	},

	/* Make a layout for modal form */
	createModalForm: function() {
		var self = this,
			$form = self.$form,
			$elem, $formWrap;

		// If a form doesn't have modal wrapper
		if ( !self.$modalWrap.length ) {
			$formWrap = $form.closest( ".j-wrapper" );

			// Modal wrapper
			$elem = $( "<div />", {
				class: "j-modal-form",
				id: "j-modalwrap-" + $form.attr( "id" )
			});

			// Wrap a form with modal wrapper
			$formWrap.wrap( $elem );
			self.$modalWrap = $form.closest( ".j-modal-form" );
		}

		// If a form doesn't have modal close button
		if ( !self.$modalClose.length ) {

			// Close button
			$elem = $( "<label />", {
				class: "j-modal-close"
			}).append( "<i></i>" );

			// Add close modal button to form
			$form.append( $elem );
			self.$modalClose = $form.find( ".j-modal-close" );
		}
	},

	/* Modal form processing */
	processingModalForm: function() {
		var self = this;

		// Modal links processing
		self.$modalOpen.each( function(){
			$( this ).on( "click", function( e ){
				if ( e ) {
					e.preventDefault();
					e.stopPropagation();
				}

				// Show modal form for approriate modal link
				if ( $( this ).data( "modal-wrap" ) === self.$modalWrap.attr( "id" ) ) {
					self.$modalWrap.addClass( "j-modal-visible" );
					$( "body" ).addClass( "j-modal-scroll" );
				}
			});
		});

		// Close button processing
		self.$modalClose.on( "click", function(){
			self.$modalWrap.removeClass( "j-modal-visible" );
			$( "body" ).removeClass( "j-modal-scroll" );
		});
	},

	/* Init hide form feature */
	initHideForm: function() {
		var self = this;

		self.$finalBlock = $( document ).find( ".j-final-block" );
		self.$finalBlockCloseBtn = self.$finalBlock.find( ".j-close" );

		self.createHideForm();
	},

	/* Make a layout for final block after form hidding */
	createHideForm: function() {
		var self = this,
			config = self.config,
			$form = self.$form,
			$elem;

		// If final block doesn't exist
		if ( !self.$finalBlock.length ) {
			$elem = $("<div />", {
				class: "j-final-block j-hidden"
			});
			$form.after( $elem.html( config.dict.successBlockText ) );
			self.$finalBlock = $form.siblings( ".j-final-block" );
		}

		// If "Close" btn doesn't exist
		if ( !self.$finalBlockCloseBtn.length ) {
			if ( config.formHide.closeBtn ) {
				$elem = $( "<label />", {
					class: "j-close"
				}).append( "<i></i>" );
				self.$finalBlock.append( $elem );
				self.$finalBlockCloseBtn = self.$finalBlock.find( ".j-close" );
			}
		} else {
			if ( !config.formHide.closeBtn ) {
				self.$finalBlockCloseBtn.addClass( "j-hidden" );
			}
		}
	},

	/* Hide form processing */
	processingHideForm: function() {
		var self = this,
			$finalBlock = self.$finalBlock,
			$finalBlockCloseBtn = self.$finalBlockCloseBtn;

		self.$form.addClass( "j-hidden" );
		$finalBlock.removeClass( "j-hidden" );

		if ( $finalBlockCloseBtn.length ) {
			$finalBlockCloseBtn.on("click", function() {
				if ( self.config.formType.modal ) {

					var $modalForm = $( document ).find( "div.j-modal-form" );
					if ( $modalForm.hasClass( "j-modal-visible" ) ) {
						$modalForm.removeClass( "j-modal-visible" );
						$( "body" ).removeClass( "j-modal-scroll" );
					}
				} else {
					$finalBlock.addClass( "j-hidden" );
				}
			});
		}
	},

	/* Reset form */
	resetForm: function() {
		var self = this,
			config = self.config,
			$input, $totalDataList;

		// Reset a form
		self.form.reset();

		// Remove success condition from the fields
		if ( config.success.highlight ){
			$input = self.$form.find( ".j-input" );
			$input.each( function(){
				$( this ).toggleClass( "j-success-view", false );
			});
		}

		// Clear total form data block
		if ( config.formTotalData ){
			$totalDataList = self.$totalDataBlock.find("span[data-field]");
			$.each( $totalDataList, function(){
				$( this ).html( "" );
			});
		}
	},

	/* Redirect form */
	redirectForm: function() {
		var self = this;

		$( location ).attr( "href", self.config.formRedirect.address );
	},

	/* Scroll to first element with error */
	scrollToError: function() {
		var self = this,
			$form = self.$form,
			$err = $form.find( ".j-error-view" ).eq(0),
			$modalWrap, $wrapper, $offset;

		if ( !$err.length ) {
			return false;
		}

		// Scroll modal form
		if ( self.config.formType.modal ){

			$modalWrap = $( document ).find( "#j-modalwrap-"+$form.attr("id") );
			$wrapper = $( document ).find(".j-wrapper");
			$offset = $wrapper.offset().top - $err.offset().top;

			$modalWrap.animate({
				scrollTop: -$offset - 60
			}, 500);
			return false;
		}

		// Scroll not modal form
		$("html, body").animate({
			scrollTop: $err.offset().top - 60
		}, 500);
	},

	/* Create a block with error messages */
	createErrorBlock: function() {
		var self = this,
			$ul = $( "<ul></ul>" ),
			elems = false,
			$formResponseBlock = self.$formResponseBlock,
			$li;

		// If error object contains error messages
		$.each( self.errorMessages, function( key, val ) {
			if ( val !== null ) {
				elems = true;
				return false;
			}
		});

		if ( elems ) {

			// Add class "j-error-message"
			$formResponseBlock.toggleClass( "j-error-message j-unit", true );
			$formResponseBlock.text( self.config.dict.errorBlockText ).append( $ul );

			$.each( self.errorMessages, function( name, mes ) {
				if ( mes !== null ) {
					$li = $( "<li></li>" ).text( mes );
					$ul.append( $li );
				}
			});
		} else {
			self.clearBlock();
		}
	},

	/* Create a block with success message */
	createSuccessBlock: function( msg ) {
		var self = this,
			config = self.config,
			$submitBtn = self.$submitBtn,
			$formResponseBlock = self.$formResponseBlock,
			$recaptcha = self.$form.find(".g-recaptcha");

		// Clear response block
		if ( $formResponseBlock.hasClass( "j-error-message" ) ) {
			self.clearBlock();
		}

		// Add success message
		$formResponseBlock.addClass( "j-success-message j-unit" ).text( msg );

		// Button enabled
		$submitBtn.removeClass( "j-processing" );

		// If repeated form submission is not allowed
		if ( !config.repeatSubmission ) {

			// Disable submit button
			$submitBtn.addClass( "j-disabled-view" ).html( config.dict.disabledBtn );
		}

		setTimeout(function(){

			self.clearBlock();

			// Google reCaptcha reloading
			if ( $recaptcha.length ) {
				grecaptcha.reset();
			}

			// If repeated form submission is allowed
			if ( config.repeatSubmission ) {
				$submitBtn.removeAttr( "disabled" );
			}

			// Modal form processing
			if ( config.formType.modal ) {
				$( "div.j-modal-form" ).removeClass( "j-modal-visible" );
				$( "body" ).removeClass( "j-modal-scroll" );
			}

			// Multistep form processing
			if ( config.formType.multistep ) {

				// Buttons processing
				self.$prevBtn.removeAttr( "disabled" ).addClass( "j-hiddenBtn" );
				self.$nextBtn.removeClass( "j-hiddenBtn" );
				$submitBtn.addClass( "j-hiddenBtn" );

				// Steps processing
				self.$stepList.removeClass( "j-active-fieldset" ).eq( 0 ).addClass( "j-active-fieldset" );

				// Step titles processing
				if ( self.$stepTitleList.length ){
					self.$stepTitleList.removeClass('j-active-step j-passed-step').eq(0).addClass('j-active-step');
				}
			}
		}, config.timeoutSuccessMsg);
	},

	/* Delete all error messages, all "error" CSS classes */
	clearForm: function() {
		var self = this,
			$form = self.$form,
			config = self.config,
			$spanErr, $tooltipErr, $input;

		// Clear error variables
		self.errorExists = false;
		self.errorMessages = {};

		// Delete error messages under the fields
		if ( config.error.underField ) {
			$spanErr = $form.find("span.j-error-view");
			$spanErr.each(function(){
				$( this ).remove();
			});
		}

		// Delete error messages from an error block
		if ( config.error.inBlock ) {
			self.clearBlock();
		}

		// Remove error condition from the fields
		if ( config.error.highlight ) {
			$input = $form.find( ".j-input" );
			$input.each( function(){
				$( this ).toggleClass( "j-error-view", false );
			});
		}

		// Delete tooltip error messages
		if ( config.error.inTooltip ) {
			$tooltipErr = $form.find( "span.j-tooltip.j-error-view" );
			$tooltipErr.each(function(){
				$( this ).remove();
			});
		}
	},

	/* Delete field's error message, field's "error" CSS classes */
	clearField: function( field ) {
		var self = this,
			config = self.config,
			errorMessages = self.errorMessages,
			fieldName = $( field ).attr("name"),
			$input, $span, $tooltip;

		// If a form does not have a field
		if ( self.$formObj[fieldName] === undefined || self.$formObj[fieldName] === null ){
			return false;
		}

		self.errorExists = false;
		$input = $( field ).closest( ".j-input" );

		// Delete error messages under the fields
		if ( config.error.underField ){
			$span = $input.find( "span.j-error-view" );
			if ( $span.length ) {
				$span.remove();
			}
		}

		// Remove error condition from the fields
		if ( config.error.highlight ) {
			$input.toggleClass( "j-error-view", false );
		}

		// Delete tooltip error messages
		if ( config.error.inTooltip ) {
			$tooltip = $input.find( "span.j-tooltip.j-error-view" );
			if ( $tooltip.length ) {
				$tooltip.remove();
			}
		}

		// Delete error message from error object
		if ( config.error.inBlock ){
			if ( errorMessages[fieldName] !== undefined && errorMessages[fieldName] !== null ) {
				errorMessages[fieldName] = null;
			}
		}
	},

	/* Clear a block with validation result */
	clearBlock: function() {
		var self = this;

		self.$formResponseBlock.removeClass( "j-error-message j-success-message j-unit" ).html( "" );
	},
};

$.fn.justFormsPro = function( options ){
	new JustFormsPro( this, options );
	return this;
};
}( jQuery ));