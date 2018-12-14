"use strict";
$(document).ready(function() {
	// Single swithces
	var elemsingle = document.querySelector('.js-single');
	var switchery = new Switchery(elemsingle, { color: '#4680ff', jackColor: '#fff' });

	// Multiple swithces
	var elem = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

	elem.forEach(function(html) {
		var switchery = new Switchery(html, { color: '#4680ff', jackColor: '#fff' });
	});

	// Disable enable swithces
	var elemstate = document.querySelector('.js-dynamic-state');
	var switcheryy = new Switchery(elemstate, { color: '#4680ff', jackColor: '#fff' });

	document.querySelector('.js-dynamic-disable').addEventListener('click', function() {
	  switcheryy.disable();
	});

	document.querySelector('.js-dynamic-enable').addEventListener('click', function() {
	  switcheryy.enable();
	});

	// Color Swithces
	var elemdefault = document.querySelector('.js-default');
	var switchery = new Switchery(elemdefault, { color: '#919aa3', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-primary');
	var switchery = new Switchery(elemprimary, { color: '#4680ff', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-success');
	var switchery = new Switchery(elemprimary, { color: '#93BE52', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-info');
	var switchery = new Switchery(elemprimary, { color: '#62d1f3', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-warning');
	var switchery = new Switchery(elemprimary, { color: '#FFB64D', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-danger');
	var switchery = new Switchery(elemprimary, { color: '#FC6180', jackColor: '#fff' });

	var elemprimary = document.querySelector('.js-inverse');
	var switchery = new Switchery(elemprimary, { color: '#303548', jackColor: '#fff' });

	// Switch sizes
	var elemlarge = document.querySelector('.js-large');
	var switchery = new Switchery(elemlarge, { color: '#4680ff', jackColor: '#fff', size: 'large' });

	var elemmedium = document.querySelector('.js-medium');
	var switchery = new Switchery(elemmedium, { color: '#4680ff', jackColor: '#fff', size: 'medium' });

	var elemsmall = document.querySelector('.js-small');
	var switchery = new Switchery(elemsmall, { color: '#4680ff', jackColor: '#fff', size: 'small' });



	// var elemdisable = document.querySelector('.js-disable');
	// var switchery = new Switchery(elemdisable, { color: '#1abc9c', jackColor: '#fff', disabled: true });

	// Tags plugins start

	// Color tags
	var cities = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: 'assets/pages/advance-elements/cities.json'
	});
	cities.initialize();

	var elt = $('.color-tags > input');
	elt.tagsinput({
		tagClass: function(item) {
			switch (item.continent) {
				case 'Europe'   : return 'label label-primary';
				case 'America'  : return 'label label-danger';
				case 'Australia': return 'label label-success';
				case 'Africa'   : return 'label label-default';
				case 'Asia'     : return 'label label-warning';
			}
		},
		itemValue: 'value',
		itemText: 'text',

		typeaheadjs: [
		{
			hint: true,
			highlight: true,
			minLength: 2
		},
		{
			name: 'cities',
			displayKey: 'text',
			source: cities.ttAdapter()
		}
		]
	});
	elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
	elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
	elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
	elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
	elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });

// Maximum tags option
$('.tags_max').tagsinput({
        maxTags: 3
    });

// Maximum charcters option
$('.tags_max_char').tagsinput({
        maxChars: 8
    });

// Multiple tags option
$(".tags_add_multiple").tagsinput('items');
// Tags plugins ends

// Max-length js start

// Default max-length
    $('input[maxlength]').maxlength();

    // Thresold value
    $('input.thresold-i').maxlength({
        threshold: 20
    });

    //Color class
    $('input.color-class').maxlength({
        alwaysShow: true,
        threshold: 10,
        warningClass: "label label-success",
        limitReachedClass: "label label-danger"
    });

    //Position class
    $('input.position-class').maxlength({
        alwaysShow: true,
        placement: 'top-left'
    });

    // Textareas max-length
    $('textarea.max-textarea').maxlength({
        alwaysShow: true
    });
// Max-length js ends

});
