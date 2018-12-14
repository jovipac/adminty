  'use strict';
$(document).ready(function(){

        // $('#text_demo1').tooltip({'trigger':'focus', 'title': 'Dismissible popover','content': 'sdff fgfg'});

        $('#text_demo, #textarea_demo, #checkbox_demo, #select_demo').tm_editbale('init',{
            theme:'dotted-line-theme',
            full_length:{
                outside:false,
                inside:true
            },
            outside_btn:{
                onshow:"",
                new_line:false,
                onhover:''
            },
            inside_btn:{
                new_line:false,
                ok:"<i class='icofont icofont-ui-check'></i>",
                cancel:"<i class='icofont icofont-ui-close'></i>"
            }
        });
        setTimeout(function(){
            $('#radio_demo').tm_editbale('init',{
                theme:'dotted-line-theme',
                full_length:{
                    outside:false,
                    inside:true
                },
                outside_btn:{
                    onshow:"",
                    new_line:false,
                    onhover:''
                },
                inside_btn:{
                    new_line:false,
                    ok:"<i class='icofont icofont-ui-check'></i>",
                    cancel:"<i class='icofont icofont-ui-close'></i>"
                }
            });
        },350);
    });