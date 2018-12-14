'use strict';
$(document).ready(function() {
    $('#issue-list-table').DataTable();


    var progression1 = 0;

    var progress = setInterval(function() {

        $('.progress .issue-text1').text(progression1 + '%');
        $('.progress .issue-text1').css({ 'left': progression1 + '%' });
        $('.progress .issue-text1').css({ 'top': '-20px' });
        $('.progress .issue-bar1').css({ 'width': progression1 + '%' });

        if (progression1 == 70) {
            clearInterval(progress);

        } else
            progression1 += 1;

    }, 100);
});
