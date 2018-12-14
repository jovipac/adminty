"use strict";
$(document).ready(function(){
	// Single Search Select
    $(".js-example-basic-single").select2();
    $(".js-example-disabled-results").select2();
    // Multi Select
    $(".js-example-basic-multiple").select2();

    // With Placeholder
    $(".js-example-placeholder-multiple").select2({
        placeholder: "Select Your Name"
    });

    //Limited Numbers
    $(".js-example-basic-multiple-limit").select2({
        maximumSelectionLength: 2
    });

    // Tagging Suppoort
    $(".js-example-tags").select2({
        tags: true
    });

    // Automatic tokenization
    $(".js-example-tokenizer").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });

    // Loading Array Data
    var data = [{
        id: 0,
        text: 'enhancement'
    }, {
        id: 1,
        text: 'bug'
    }, {
        id: 2,
        text: 'duplicate'
    }, {
        id: 3,
        text: 'invalid'
    }, {
        id: 4,
        text: 'wontfix'
    }];

    $(".js-example-data-array").select2({
        data: data
    });

    //RTL Suppoort

    $(".js-example-rtl").select2({
        dir: "rtl"
    });
    // Diacritics support
    $(".js-example-diacritics").select2();

    // Responsive width Search Select
    $(".js-example-responsive").select2();

    $(".js-example-basic-hide-search").select2({
        minimumResultsForSearch: Infinity
    });

    $(".js-example-disabled").select2({
        disabled: true
    });
    $(".js-programmatic-enable").on("click", function() {
        $(".js-example-disabled").prop("disabled", false);
    });
    $(".js-programmatic-disable").on("click", function() {
        $(".js-example-disabled").prop("disabled", true);
    });

    $(".js-example-theme-single").select2({
        theme: "classic"
    });

    function formatRepo(repo) {
        if (repo.loading) return repo.text;

        var markup = "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";

        if (repo.description) {
            markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
        }

        markup += "<div class='select2-result-repository__statistics'>" +
            "<div class='select2-result-repository__forks'><i class='icofont icofont-flash'></i> " + repo.forks_count + " Forks</div>" +
            "<div class='select2-result-repository__stargazers'><i class='icofont icofont-star'></i> " + repo.stargazers_count + " Stars</div>" +
            "<div class='select2-result-repository__watchers'><i class='icofont icofont-eye-alt'></i> " + repo.watchers_count + " Watchers</div>" +
            "</div>" +
            "</div></div>";

        return markup;
    }

    function formatRepoSelection(repo) {
        return repo.full_name || repo.text;
    }
    $(".js-data-example-ajax").select2({
        ajax: {
            url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function(data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function(markup) {
            return markup;
        }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });

	// Multi-select js start
	$('#my-select').multiSelect();
    $('#public-methods').multiSelect();
    $('#select-all').on('click',function() {
        $('#public-methods').multiSelect('select_all');
        return false;
    });
    $('#deselect-all').on('click',function() {
        $('#public-methods').multiSelect('deselect_all');
        return false;
    });
    $('#select-5').on('click',function() {
        $('#public-methods').multiSelect('select', ['elem_1', 'elem_3', 'elem_4', 'elem_5']);
        return false;
    });
    $('#deselect-5').on('click',function() {
        $('#public-methods').multiSelect('deselect', ['elem_1', 'elem_3', 'elem_4', 'elem_5']);
        return false;
    });
    $('#refresh').on('click', function() {
        $('#public-methods').multiSelect('refresh');
        return false;
    });
    $('#add-option').on('click', function() {
        $('#public-methods').multiSelect('addOption', {
            value: 42,
            text: 'test 42',
            index: 0
        });
        return false;
    });
    $('#optgroup').multiSelect({
        selectableOptgroup: true
    });
    $('#custom-headers1').multiSelect({
        selectableHeader: "<div class='custom-header'>Selectable items</div>",
        selectionHeader: "<div class='custom-header'>Selection items</div>",
        selectableFooter: "<div class='custom-header'>Selectable footer</div>",
        selectionFooter: "<div class='custom-header'>Selection footer</div>"
    });
    // Single Select
    // $('#example-single').multiselect();

    // // Multi Select
    // $('#example-multiple-selected').multiselect();

    // // Multi Group Select
    // $('#example-multiple-optgroups').multiselect();

    // // Select all group select
    // $('#example-enableClickableOptGroups').multiselect({
    //     enableClickableOptGroups: true
    // });

    // // Disable Options Select
    // $('#example-enableClickableOptGroups-init').multiselect({
    //     enableClickableOptGroups: true
    // });

    // // Collapse group select
    // $('#example-enableCollapsibleOptGroups').multiselect({
    //     enableCollapsibleOptGroups: true
    // });
    $('.searchable').multiSelect({
        selectableHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='try \"12\"'>",
        selectionHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='try \"4\"'>",
        afterInit: function(ms) {
            var that = this,
                $selectableSearch = that.$selectableUl.prev(),
                $selectionSearch = that.$selectionUl.prev(),
                selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

            that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                .on('keydown', function(e) {
                    if (e.which === 40) {
                        that.$selectableUl.focus();
                        return false;
                    }
                });

            that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                .on('keydown', function(e) {
                    if (e.which == 40) {
                        that.$selectionUl.focus();
                        return false;
                    }
                });
        },
        afterSelect: function() {
            this.qs1.cache();
            this.qs2.cache();
        },
        afterDeselect: function() {
            this.qs1.cache();
            this.qs2.cache();
        }
    });
// Multi-select js end



});