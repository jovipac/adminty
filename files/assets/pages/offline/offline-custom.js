"use strict";
$(document).ready(function($) {
        $(".browser iframe").each(function() {
                var a=$(this).data("theme");
                var doc=(this.contentWindow||this.documentWindow).document;
            doc.open(), doc.write('<link rel="stylesheet" href="../files/bower_components/offline/css/offline-theme-'+a+'.css" /><link rel="stylesheet" href="../files/bower_components/offline/css/offline-language-english'+(a.match(/\-indicator$/)?"-indicator": "")+'.css" /><div data-phase="0" class="offline-ui offline-ui-down offline-ui-down-5s"><div class="offline-ui-content"></div><a class="offline-ui-retry"></a></div>'), doc.close()
            }
        );
        var a=[[5,
                "offline-ui offline-ui-down offline-ui-down-5s",
                "",
                ""],
                [3,
                    "offline-ui offline-ui-down offline-ui-connecting offline-ui-waiting",
                    "5 seconds",
                    "5s"],
                [1,
                    "offline-ui offline-ui-down offline-ui-connecting offline-ui-waiting",
                    "4 seconds",
                    "4s"],
                [1,
                    "offline-ui offline-ui-down offline-ui-connecting offline-ui-waiting",
                    "3 seconds",
                    "3s"],
                [1,
                    "offline-ui offline-ui-down offline-ui-connecting offline-ui-waiting",
                    "2 seconds",
                    "2s"],
                [1,
                    "offline-ui offline-ui-down offline-ui-connecting offline-ui-waiting",
                    "1 seconds",
                    "1s"],
                [1,
                    "offline-ui offline-ui-up offline-ui-up-5s",
                    "",
                    ""]],
            b=function() {
                var c;
                $(".browser iframe").each(function() {
                        var b=$(this).contents().find(".offline-ui"), d=b.find(".offline-ui-content");
                        c=parseInt(b.attr("data-phase"), 10), b.get(0).className=a[c][1], d.attr("data-retry-in", a[c][2]), d.attr("data-retry-in-abbr", a[c][3]), c=(c+1)%a.length, b.attr("data-phase", c)
                    }
                ),
                    setTimeout(function() {
                            b()
                        }
                        ,
                        1e3*a[c][0])
            }
            ;
        b(),
            Offline.check();
        var c=$(".avatar-online"),
            d=$(".avatar-off");
        Offline.on("confirmed-down",
            function() {
                c.removeClass(".avatar-online").addClass("avatar-off")
            }
        ),
            Offline.on("confirmed-up",
                function() {
                    d.removeClass(".avatar-off").addClass("avatar-online")
                }
            )
});