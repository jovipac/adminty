'use strict';
$(document).ready(function() {

    // Idle timeout
    $.sessionTimeout({
        heading: 'h5',
        title: 'Idle Timeout',
        message: 'Your session is about to expire. Do you want to stay connected?',
        warnAfter: 5000,
        redirAfter: 15000,
        keepAliveUrl: '/',
        redirUrl: 'session-idle-timeout.html',
        logoutUrl: 'session-idle-timeout.html'
    });
    
});