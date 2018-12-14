/**
* jquery.postitall.js v1.0
* jQuery Post It All Plugin - released under MIT License
* Author: Javi Filella <txusko@gmail.com>
* http://github.com/txusko/PostItAll
* Copyright (c) 2015 Javi Filella
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished To Do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
*/

//Delay repetitive actions
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

(function ($, $localStorage) {
    "use strict";

    // Debug
    var debugging = true; // or true
    if (typeof console === "undefined") {
        console = {
            log: function () { return undefined; }
        };
    } else if (!debugging || console.log === undefined) {
        console.log = function () { return undefined; };
    }

    //Date
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };
    Date.prototype.addHours = function(hours) {
        var dat = new Date(this.valueOf());
        dat.setTime(dat.getTime() + (hours*60*60*1000));
        return dat;
    };
    Date.prototype.addMinutes = function(minutes) {
        var dat = new Date(this.valueOf());
        dat.setTime(dat.getTime() + (minutes*60*1000));
        return dat;
    };
    Date.prototype.addSeconds = function(seconds) {
        var dat = new Date(this.valueOf());
        dat.setTime(dat.getTime() + (seconds*1000));
        return dat;
    };
    Date.prototype.toFormat = function (f) {
        var nm = this.getMonthName();
        var nd = this.getDayName();
        f = f.replace(/yyyy/g, this.getFullYear());
        f = f.replace(/yy/g, String(this.getFullYear()).substr(2,2));
        f = f.replace(/MMM/g, nm.substr(0,3).toUpperCase());
        f = f.replace(/Mmm/g, nm.substr(0,3));
        f = f.replace(/MM\*/g, nm.toUpperCase());
        f = f.replace(/Mm\*/g, nm);
        f = f.replace(/mm/g, String(this.getMonth()+1).padLeft('0',2));
        f = f.replace(/DDD/g, nd.substr(0,3).toUpperCase());
        f = f.replace(/Ddd/g, nd.substr(0,3));
        f = f.replace(/DD\*/g, nd.toUpperCase());
        f = f.replace(/Dd\*/g, nd);
        f = f.replace(/dd/g, String(this.getDate()).padLeft('0',2));
        f = f.replace(/d\*/g, this.getDate());
        return f;
    };
    Date.prototype.getMonthName = function () {
        return this.toLocaleString().replace(/[^a-z]/gi,'');
    };
    //n.b. this is sooo not i18n safe :)
    Date.prototype.getDayName = function () {
        switch(this.getDay())
        {
        	case 0: return 'Sunday';
        	case 1: return 'Monday';
        	case 2: return 'Tuesday';
        	case 3: return 'Wednesday';
        	case 4: return 'Thursday';
        	case 5: return 'Friday';
        	case 6: return 'Saturday';
        }
    };
    String.prototype.padLeft = function (value, size) {
        var x = this;
        while (x.length < size) {x = value + x;}
        return x;
    };

    // PLUGIN Public methods
    $.extend($.fn, {
        postitall: function (method, data, callback) {
            var t = new PostItAll();
            var elem = $('.PIAeditable').find(this);
            //.filter(function(){ return !$(this).parents('#the_notes').length })
            if(elem.length <= 0)
                elem = $(this);
            elem = elem.filter(function(){ return !$(this).parents('#the_lights').length })
            switch (method) {

                // Destroy the control
                case 'destroy':
                    elem.each(function (i, e) {
                        if($(e).hasClass('PIApostit')) {
                            t.destroy($(e));
                        } else if($(e).attr('PIA-original') !== undefined) {
                            t.destroy($(e).parent().parent().parent().parent());
                        }
                    });
                return $(this);

                // Get/set options on the fly
                case 'options':
                    // Setter
                    //console.log('options', elem.length, data);
                    var obj = undefined;
                    elem.each(function (i, e) {
                        if($(e).hasClass('PIApostit')) {
                            if (data === undefined) {
                                obj = $(e).data('PIA-options');
                                return false;
                            } else {
                                t.destroy($(e), false);
                                var tempoptions = $(e).data('PIA-options') || {};
                                setTimeout(function() {$.PostItAll.new($.extend(true, tempoptions, data));}, 400);
                            }
                        } else if($(e).attr('PIA-original') !== undefined) {
                            var oldObj = $(e).parent().parent().parent().parent();
                            if (data === undefined) {
                                obj = oldObj.data('PIA-options');
                                return false;
                            } else {
                                t.destroy(oldObj, false);
                                var tempoptions = oldObj.data('PIA-options') || {};
                                setTimeout(function() { $.PostItAll.new($.extend(true, tempoptions, data)); }, 400);
                            }
                        }
                    });
                if(obj !== undefined) {
                    if($(obj).length == 1)
                        return $(obj)[0];
                    return $(obj);
                }
                return $(this);

                // hide note/s
                case 'hide':
                    elem.each(function (i, e) {
                        if($(e).hasClass('PIApostit')) {
                            t.hide($(e).data('PIA-id'));
                        } else if($(e).attr('PIA-original') !== undefined) {
                            t.hide($(e).parent().parent().parent().parent().data('PIA-id'));
                        }
                    });
                return $(this);

                //show note/s
                case 'show':
                    elem.each(function (i, e) {
                        if($(e).hasClass('PIApostit')) {
                            t.show($(e).data('PIA-id'));
                        } else if($(e).attr('PIA-original') !== undefined) {
                            t.show($(e).parent().parent().parent().parent().data('PIA-id'));
                        }
                    });
                return $(this);

                // Save object
                case 'save':
                    elem.each(function (i, e) {
                        if($(e).hasClass('PIApostit')) {
                            t.save($(e));
                        } else if($(e).attr('PIA-original') !== undefined) {
                            t.save($(e).parent().parent().parent().parent());
                        }
                    });
                return $(this);

                // Initializes the control
                case 'new':
                default:
                    var posX = 0, posY = 0, paso = false;
                    if (method !== 'new') {
                        data = method;
                        method = "new";
                    }
                    if(data === undefined || typeof data !== 'object') data = { };

                    //Position defined by the user
                    if(!paso) {
                        if(data.posX !== undefined) {
                            posX = data.posX;
                            paso = true;
                        }
                        if(data.posY !== undefined) {
                            posY = data.posY;
                            paso = true;
                        }
                    }

                    //Check if initialized
                    var initialized = false;
                    $.each($(this).filter(function(){ return !$(this).parents('#the_notes').length }), function (i,e) {
                        if($(e).attr('PIA-original') !== undefined) {
                            initialized = true;
                            return false;
                        }
                    });

                    if(!initialized) {
                        //Create the element/s
                        $.each($(this).filter(function(){ return !$(this).parents('#the_notes').length }), function (i,e) {
                            //Position relative to the element
                            if(!paso) {
                                posX = $(this).offset().left;
                                posY = $(this).offset().top;
                            }
                            $.extend(data, { posX: posX, posY: posY }, true);
                            //console.log('create', i, e);
                            $.PostItAll.new('', data, $(e), callback);
                        });
                    } else {
                        //Show previously initialized, show the notes
                        $.PostItAll.show();
                    }
                return $(this);
            }
        }
    });

    //Global vars : enable and disable features and change the notes behaviour
    $.fn.postitall.globals = {
        PIApostit_          : '#PIApostit_',//Id note prefixe
        filter          : 'domain',     //Options: domain, page, all
        savable         : false,        //Save postit in storage
        randomColor     : true,         //Random color in new postits
        toolbar         : true,         //Show or hide toolbar
        autoHideToolBar : true,         //Animation efect on hover over postit shoing/hiding toolbar options
        removable       : true,         //Set removable feature on or off
        askOnDelete     : true,         //Confirmation before note remove
        draggable       : true,         //Set draggable feature on or off
        resizable       : true,         //Set resizable feature on or off
        editable        : true,         //Set contenteditable and enable changing note content
        changeoptions   : true,         //Set options feature on or off
        blocked         : true,         //Postit can not be modified
        hidden          : true,         //The note can be hidden
        minimized       : true,         //true = minimized, false = maximixed
        expand          : true,         //Expand note
        fixed           : true,         //Allow to fix the note in page
        addNew          : true,         //Create a new postit
        showInfo        : true,         //Show info icon (info tab)
        showMeta        : true,         //Show info icon (meta tab)
        pasteHtml       : true,         //Allow paste html in contenteditor
        htmlEditor      : true,         //Html editor (trumbowyg)
        autoPosition    : true,         //Automatic reposition of the notes when user resize screen
        addArrow        : 'back',       //Add arrow to notes : none, front, back, all
        askOnHide       : true,         //Show configuration hideUntil back-panel (getBackPanelHideUntil)
        hideUntil       : null,         //Note will be hidden since that datetime
        export          : false          //Note can be exported
    };

    //Copy of the original global configuration
    $.fn.postitall.globalscopy = $.extend({}, $.fn.postitall.globals, true);

    //Note global vars : Properties, style, features and events of the note
    $.fn.postitall.defaults = {
        //Note properties
        id              : "",                       //Note id
        created         : Date.now(),               //Creation date
        domain          : window.location.origin,   //Domain in the url
        page            : window.location.pathname, //Page in the url
        osname          : navigator.appVersion,     //Browser informtion & OS name,
        content         : '',                       //Content of the note (text or html)
        position        : 'absolute',               //Position relative, fixed or absolute
        posX            : '10px',                   //x coordinate (from left)
        posY            : '10px',                   //y coordinate (from top)
        right           : '',                       //x coordinate (from right). This property invalidate posX
        height          : 200,                      //Note total height
        width           : 160,                      //Note total width
        minHeight       : 200,                      //Note resizable min-width
        minWidth        : 160,                      //Note resizable min-height
        oldPosition     : {},                       //Position when minimized/collapsed (internal use)
        //Config note style
        style : {
            tresd           : true,                 //General style in 3d format
            backgroundcolor : '#FFFA3C',            //Background color in new postits when randomColor = false
            textcolor       : '#333333',            //Text color
            textshadow      : true,                 //Shadow in the text
            fontfamily      : 'Open Sans',            //Default font
            fontsize        : 'medium',              //Default font size
            arrow           : 'none',               //Default arrow : none, top, right, bottom, left
        },
        //Enable / Disable features
        features : $.extend({}, $.fn.postitall.globals, true),
        //Note flags
        flags : {
            blocked         : false,                //If true, the note cannot be edited
            minimized       : false,                //true = Collapsed note / false = maximixed
            expand          : false,                //true = Expanded note / false = normal
            fixed           : false,                //Set position fixed
            highlight       : false,                //Higlight note
            hidden          : false,                //Hidden note
        },
        //Attach the note to al html element
        attachedTo : {
            element         : '',                   //Where to attach (string or object / '#idObject' or $('#idObject'))
            position        : 'right',              //Position relative to elemente : top, right, bottom or left
            fixed           : true,                 //Fix note to element when resize screen
            arrow           : true,                 //Show an arrow in the inverse position
        },
        //Meta data
        meta: {
            'Title': {
                'type': 'input',
                'maxlength': '20',
                'value': '',
                'placeholder': 'Note title'
            },
            'Category': {
                'type': 'combo',
                'value': '0',
                'values': {
                    '0': 'Select a category',
                    '1': 'Personal',
                    '2': 'Work',
                    '3': 'Other'
                }
            },
            'Observations': {
                'type': 'textarea',
                'value': '',
                'placeholder': 'Other considerations ...'
            }
        },
        // Callbacks / Event Handlers
        onCreated: function(id, options, obj) { return undefined; },    //Triggered after note creation
        onChange: function (id) { return undefined; },                  //Triggered on each change
        onSelect: function (id) { return undefined; },                  //Triggered when note is clicked, dragged or resized
        onDblClick: function (id) { return undefined; },                //Triggered on double click
        onRelease: function (id) { return undefined; },                 //Triggered on the end of dragging and resizing of a note
        onDelete: function (id) { return undefined; }                   //Triggered when a note is deleted
    };

    //Copy of the original note configuration
    $.fn.postitall.defaultscopy = $.extend({}, $.fn.postitall.defaults, true);
    $.fn.postitall.defaultscopy.style = $.extend({}, $.fn.postitall.defaults.style, true);
    $.fn.postitall.defaultscopy.features = $.extend({}, $.fn.postitall.defaults.features, true);
    $.fn.postitall.defaultscopy.flags = $.extend({}, $.fn.postitall.defaults.flags, true);
    $.fn.postitall.defaultscopy.attachedTo = $.extend({}, $.fn.postitall.defaults.attachedTo, true);

    //Global functions
    jQuery.PostItAll = {

        //Initialize environement
        __initialize : function() {

            //The notes
            if($('#the_notes').length <= 0) {
                $('<div id="the_notes"></div>').appendTo($('.sticky-card'));
            }

            //The ligths
            if($('#the_lights').length <= 0) {
                $('<div id="the_lights"><div id="the_lights_close"></div></div>').appendTo($('.card-block'));
                $('#the_lights').click(function() {
                    var note = new PostItAll();
                    note.switchOnLights();
                });
            }

            //Upload note
            if($('#the_imports').length <= 0) {
                //Import file
                var importFile = function() {
                    //Check support
                    if (!window.FileReader) {
                        console.log('Browser do not support FileReader.')
                        return;
                    }
                    //Get file
                    var input = $('#idImportFile').get(0);
                    if (input.files.length) {
                        //Get text
                        var textFile = input.files[0];
                        if(textFile.size > 0 && textFile.type == "text/plain") {
                            //Create a new FileReader & read content
                            var reader = new FileReader();
                            reader.readAsText(textFile);
                            $(reader).on('load', function(e) {
                                //Text readed
                                var file = e.target.result,results;
                                if (file && file.length) {
                                    //Check object
                                    var obj = JSON.parse(file);
                                    if(typeof obj === 'object') {
                                        //create new note
                                        var newNote = function(obj) {
                                            delete obj.id; //reset id
                                            //TODO : reset domain&page or redirect?
                                            delete obj.domain;
                                            delete obj.page;
                                            $.PostItAll.new(obj);
                                        }
                                        if(obj.id !== undefined) {
                                            //One note
                                            newNote(obj);
                                        } else if($(obj).length > 0) {
                                            //Various notes
                                            $(obj).each(function(n1,obj2) {
                                                if(obj2.id !== undefined) {
                                                    setTimeout(function() {
                                                        newNote(obj2);
                                                    }, 250 + ( n1 * 250 ));
                                                }
                                            });
                                        } else {
                                            alert('No notes to import');
                                        }
                                    } else {
                                        alert('Invalid file content');
                                    }
                                }
                            });
                        } else {
                            alert('The file is empty or is not a text file.');
                        }
                    } else {
                        alert('Please upload a file before continuing.')
                    }
                };
                //The imports
                var updString = $("<div />", { 'the_imports': '', 'style' : 'display:none;' });
                //Input fle
                var impFile = $('<input />', { id : "idImportFile", type : "file", name : "files" }).on("change", function () {
                    $('#idImportUpload').click();
                    $('#idImportFile').val("");
                });
                //Input button
                var impBut = $('<button />', { id : "idImportUpload", type : "file", name : "files" }).on("click", importFile);
                updString.append(impFile).append(impBut).prependTo($('body'));
            }
        },

        //Change configuration : type (global, note), opt (object)
        changeConfig : function(type, opt) {
            if(typeof type === 'string') {
                if(type == "global") {
                    if(typeof opt === 'object')
                        $.extend($.fn.postitall.globals, opt, true);
                    return $.fn.postitall.globals;
                } else if(type == "note") {
                    if(typeof opt === 'object') {
                        if(opt.style !== undefined) {
                            $.extend($.fn.postitall.defaults.style, opt.style, true);
                            delete opt.style;
                        }
                        if(opt.features !== undefined) {
                            $.extend($.fn.postitall.defaults.features, opt.features, true);
                            delete opt.features;
                        }
                        if(opt.flags !== undefined) {
                            $.extend($.fn.postitall.defaults.flags, opt.flags, true);
                            delete opt.flags;
                        }
                        if(opt.attachedTo !== undefined) {
                            $.extend($.fn.postitall.defaults.attachedTo, opt.attachedTo, true);
                            delete opt.attachedTo;
                        }
                        $.extend($.fn.postitall.defaults, opt, true);
                    }
                    return $.fn.postitall.defaults;
                }
            }
            return null;
        },

        //Retore configuration to factory defaults : type (all, global, note. default: all)
        restoreConfig : function(type) {
            if(type === undefined)
                type = "all";
            if(typeof type === "string") {
                if(type == "global" || type == "all") {
                    $.extend($.fn.postitall.globals, $.fn.postitall.globalscopy, true);
                    return $.fn.postitall.globals;
                }
                if(type == "note" || type == "all") {
                    $.extend($.fn.postitall.defaults, $.fn.postitall.defaultscopy, true);
                    return $.fn.postitall.defaults;
                }
            }
            return null;
        },

        storageManager : function(callback) {
            storageManager.getStorageManager(function(e) {
                callback(e);
            });
        },

        //New note
        new : function(content, opt, obj, callback) {

            var ok = false;
            if(callback !== undefined) {
                ok = true;
            }
            if(!ok && obj !== undefined && typeof obj === 'function') {
                callback = obj;
                obj = undefined;
                ok = true;
            }
            if(!ok && opt !== undefined && typeof opt === 'function' && content !== undefined && typeof content === 'object') {
                callback = opt;
                opt = content;
                content = "";
                ok = true;
            }
            if(!ok && opt !== undefined && typeof opt === 'function' && content !== undefined && typeof content === 'string') {
                callback = opt;
                opt = undefined;
                ok = true;
            }
            if (!ok && typeof content === 'object') {
                callback = obj;
                obj = opt;
                opt = content;
                content = "";
                ok = true;
            }
            if (!ok && typeof content === 'function') {
                callback = content;
                content = "";
                ok = true;
            }
            if(!ok && content === undefined) {
                content = "";
                ok = true;
            }

            //Position
            var optPos = {};
            optPos.posX = parseInt(window.pageXOffset, 10);
            optPos.posY = parseInt(window.pageYOffset, 10);
            optPos.use = false;

            //console.log('init opt', $.fn.postitall.defaults);
            if(opt === undefined) {
                opt = $.extend(true, {}, $.fn.postitall.defaults);
                opt.posX = optPos.posX;
                opt.posY = optPos.posY;
                optPos.use = true;
            } else {
                if(opt.posX === undefined && opt.posX === undefined) {
                    opt.posX = optPos.posX;
                    opt.posY = optPos.posY;
                    optPos.use = true;
                }
                opt = $.extend(true, {}, $.fn.postitall.defaults, opt);
            }

            if(opt.position == "relative" || opt.position == "fixed") {
                if(!optPos.use) {
                    opt.posX = parseInt(opt.posX, 10) + parseInt(optPos.posX, 10);
                    opt.posY = parseInt(opt.posY, 10) + parseInt(optPos.posY, 10);
                }
                if(opt.position == "fixed") {
                    opt.flags.fixed = true;
                }
                opt.position = "absolute";
            }

            if(optPos.use) {
                opt.posX = optPos.posX + parseInt($.fn.postitall.defaults.posX, 10);
                opt.posY = optPos.posY + parseInt($.fn.postitall.defaults.posX, 10);
            }
            opt.posX = parseInt(opt.posX, 10) + "px";
            opt.posY = parseInt(opt.posY, 10) + "px";

            //New note object
            var note = new PostItAll();
            if(obj === undefined) {
                obj = $('<div />', {
                    html: (content !== undefined ? content : '')
                }).hide();
            } else {
                var oldObj = obj;
                $(oldObj).attr('PIA-original', '1');
                var newObj = $('<div />').append(oldObj);
                $(newObj).attr('PIA-original', '1');
                obj = newObj;
            }
            $('#the_notes').append(obj);

            //Random color
            var randCol = function(opts) {
                //Random bg & textcolor
                if($.fn.postitall.globals.randomColor && opts.features.randomColor) {
                    if(opts.style.backgroundcolor === $.fn.postitall.defaults.style.backgroundcolor) {
                        opts.style.backgroundcolor = note.getRandomColor();
                    }
                    if(opts.style.textcolor === $.fn.postitall.defaults.style.textcolor) {
                        opts.style.textcolor = note.getTextColor(opts.style.backgroundcolor);
                    }
                    opts.features.randomColor = false;
                }
                return opts;
            };

            //Check if we have the id
            var options = opt;
            //console.log('options', options);
            if(options.id !== "") {
                //Random bg & textcolor
                options = randCol(options);
                //Initialize
                setTimeout(function() { note.init(obj, options); if(callback !== undefined) callback($.fn.postitall.globals.prefix + options.id, options, obj[0]); }, 100);
            } else {
                //Get new id
                //console.log('paso');
                note.getIndex(($.fn.postitall.globals.savable || options.features.savable), function(index) {
                    //Id
                    options.id = index;
                    //Random bg & textcolor
                    options = randCol(options);
                    //Initialize
                    setTimeout(function() { note.init(obj, options); if(callback !== undefined) callback($.fn.postitall.globals.prefix + options.id, options, obj[0]); }, 100);
                });
            }
        },

        options : function(id, opt) {
            if(typeof id === 'object') {
                //Change options for all notes
                $('.PIApostit').postitall('options', id);
            } else if (typeof opt === 'object') {
                //Change options for specific notes
                $(id).postitall('options', opt);
            } else {
                return $(id).postitall('options');
            }
        },

        //Hide all
        hide : function(id) {
            this.toggle(id, 'hide');
        },

        //Show all
        show : function(id) {
            this.toggle(id, 'show');
        },

        //hide/show all
        toggle : function(id, action) {
            var paso = false;
            if(action === undefined) action = "show";
            if(id !== undefined && typeof id === 'string') {
                if($($.fn.postitall.globals.prefix + id).length > 0) {
                    $($.fn.postitall.globals.prefix + id).postitall(action);
                    paso = true;
                } else if($(id.toString()).length) {
                    $(id.toString()).postitall(action);
                    paso = true;
                }
            }
            if(!paso) {
                $('.PIApostit').each(function () {
                    $(this).postitall(action);
                });
            }
        },

        //Get all notes
        getNotes : function(callback, filtered) {
          var len = -1;
          var iteration = 0;
          var finded = false;
          var notes = [];
          if(typeof filtered === 'undefined')
            filtered = $.fn.postitall.globals.filter;
          storageManager.getlength(function(len) {
              if(!len) {
                  if(typeof callback === 'function') callback(notes);
                  return;
              }
              for (var i = 1; i <= len; i++) {
                  storageManager.key(i, function(key) {
                      storageManager.getByKey(key, function(o) {
                          if (o != null) {
                              if(filtered == "domain")
                                  finded = (o.domain === window.location.origin);
                              else if(filtered == "page")
                                  finded = (o.domain === window.location.origin && o.page === window.location.pathname);
                              else
                                  finded = true;
                              if(finded) {
                                  notes.push(o);
                              }
                          }
                          if(iteration == (len - 1) && callback != null) {
                              if(typeof callback === 'function') callback(notes);
                              callback = null;
                          }
                          iteration++;
                      });
                  });
              }
          });
        },

        //Load all (from storage)
        load : function(callback, callbacks, highlight) {
            var len = -1;
            var iteration = 0;
            $.PostItAll.getNotes(function(notes) {
                if(notes.length > 0) {
                    len = notes.length;
                    $(notes).each(function(i,o) {
                        if($($.fn.postitall.globals.prefix + o.id).length <= 0) {
                            if(typeof callbacks === 'object') {
                                //console.log(callbacks);
                                if(callbacks.onCreated !== undefined) {
                                    o.onCreated = callbacks.onCreated;
                                }
                                if(callbacks.onChange !== undefined) {
                                    o.onChange = callbacks.onChange;
                                }
                                if(callbacks.onSelect !== undefined) {
                                    o.onSelect = callbacks.onSelect;
                                }
                                if(callbacks.onDblClick !== undefined) {
                                    o.onDblClick = callbacks.onDblClick;
                                }
                                if(callbacks.onRelease !== undefined) {
                                    o.onRelease = callbacks.onRelease;
                                }
                                if(callbacks.onDelete !== undefined) {
                                    o.onDelete = callbacks.onDelete;
                                }
                            }
                            if(o.flags !== undefined) {
                                o.flags.highlight = false;
                                if(highlight !== undefined && o.id == highlight) {
                                    //console.log('highlight note', highlight);
                                    o.flags.highlight = true;
                                }
                            }
                            $.PostItAll.new(o);
                        }
                        if(iteration == (len - 1) && callback != null) {
                            if(typeof callback === 'function') callback();
                            callback = null;
                        }
                        iteration++;
                    });
                } else {
                    if(typeof callback === 'function') callback();
                    return;
                }
            });
        },

        //Save all (to storage)
        save : function() {
            //if(!$.fn.postitall.globals.savable && )
            //    return;
            var options;
            var id;
            $('.PIApostit').each(function(i,e) {
                id = $(e).data('PIA-id');
                options = $(e).data('PIA-options');
                if(id !== undefined && options !== undefined && ($.fn.postitall.globals.savable || options.features.savable)) {
                    $(this).postitall('save');
                }
            });
        },

        //Get number of notes (only in storage)
        length : function(callback) {
            $.PostItAll.getNotes(function(notes) {
                if(callback !== undefined) callback(notes.length);
            });
        },

        //Remove all notes
        remove : function(delInline, delStorage, delDomain) {
            this.destroy(false, delInline, delStorage, delDomain);
        },
        delete : function(delInline, delStorage, delDomain) {
            this.destroy(false, delInline, delStorage, delDomain);
        },
        destroy : function(id, delInline, delStorage, delDomain) {
            if(delInline == undefined)
                delInline = true;
            if(delStorage == undefined)
                delStorage = true;

            if(delInline) {
                //Visible notes
                if(id !== undefined && typeof id === "string") {
                    //Specific note
                    var opt = $(id).postitall('options');
                    if(delStorage) { // && ($.fn.postitall.globals.savable || opt.features.savable)) {
                        $(id).postitall('destroy');
                    } else {
                        $(id).postitall('hide');
                    }
                } else {
                    //All notes
                    $('.PIApostit').each(function () {
                        var opt = $(this).postitall('options');
                        if(delStorage) { // && ($.fn.postitall.globals.savable || opt.features.savable)) {
                            $(this).postitall('destroy');
                        } else {
                            $(this).postitall('hide');
                        }
                    });
                }
            }
            //TODO : Revisar
            if(delStorage && delDomain !== "" && delDomain !== undefined) { //&& $.fn.postitall.globals.savable
                //Storage notes
                console.log('clearStorage',delDomain);
                $.PostItAll.clearStorage(delDomain);
            }
        },
        clearStorage : function(delDomain, callback) {
            if(delDomain !== undefined) {
                //Delete notes of an specific domain
                storageManager.removeDom({ domain : delDomain }, function() {
                    console.log("Storage cleared for domain", delDomain);
                    if(callback !== undefined) callback();
                });
            } else {
                //Delete all notes
                storageManager.clear(function() {
                    console.log("Storage cleared");
                    if(callback !== undefined) callback();
                });
            }
        },

        //Import note
        import : function() {
            //Show upload dialog
            $('#idImportFile').trigger('click');
        },

        //Export note
        export : function(opt) {
            var obj = null;
            if(typeof opt === 'undefined') {
                opt = "loaded";
            }
            if(typeof opt === 'string') {
                switch(opt) {
                    case "all":
                    case "domain":
                    case "page":
                        obj = [];
                        $.PostItAll.getNotes(function(notes, opt) {
                            if(notes.length > 0) {
                                $(notes).each(function(i,o) {
                                    var obj2 = $.PostItAll.options($.fn.postitall.globals.prefix + o.id);
                                    obj.push(obj2);
                                });
                            }
                        });
                        break;
                    case "loaded":
                        obj = [];
                        $('.PIApostit').each(function(i,e) {
                            var obj2 = $.PostItAll.options($.fn.postitall.globals.prefix + $(e).data('PIA-id'));
                            obj.push(obj2);
                        });
                        break;
                    default:
                        //Get options
                        obj = $.PostItAll.options($.fn.postitall.globals.prefix + opt);
                        break;
                }

                setTimeout(function() {
                    if(obj != null && (obj.id !== undefined || obj.length > 0)) {
                        var dat = new Date();
                        //Create element
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj)));
                        element.setAttribute('download', dat.toFormat("yyyymmdd") + $.fn.postitall.globals.prefix + opt + '.txt');
                        element.style.display = 'none';
                        //Append element to body
                        document.body.appendChild(element);
                        //Trigger download
                        element.click();
                        //Remove temporal element
                        document.body.removeChild(element);
                    } else {
                        alert('No notes to export');
                        console.log(obj);
                    }
                }, 250);
            }
        }
    };

    //Note class
    var PostItAll = function(obj, opt) {
        this.options = {};
        this.hoverState = false;
    };
    //Definition
    PostItAll.prototype = {

        // Initialize elements
        init : function(obj, opt) {
            //Default options
            this.options = $.extend({}, $.fn.postitall.defaults);
            //Set options
            if (typeof opt !== 'object') {
                opt = {};
            }
            this.setOptions(opt);
            // Do nothing if already initialized
            if (obj.data('PIA-initialized') || $($.fn.postitall.globals.prefix + opt.id).length > 0) {
                return;
            }
            //Modify page content
            opt = $.extend(this.options, opt);
            this.setOptions(opt);
            //obj id
            obj.attr('id', $.fn.postitall.globals.prefix.substring(1) + opt.id);

            //console.log('init');
            //this.attachedTo();

            //create stuff
            var newObj = this.create(obj);
            //Set on resize action
            if($.fn.postitall.globals.autoPosition && opt.features.autoPosition)
                $(window).on('resize', $.proxy(this.relativePosition, this));
            //return obj
            return newObj;
        },

        //Attach the note to a dom object
        attachedTo : function(options) {
            var t = this;
            var data = options;
            if(data === undefined) {
                data = t.options;
            }
            var id = data.id;
            var obj = $($.fn.postitall.globals.prefix + id);

            //Recovers object selector (http://stackoverflow.com/questions/2420970/how-can-i-get-selector-from-jquery-object/14093425#14093425)
            var get_selector = function (element) {
                var $el = element;
                var id = $el.attr("id");
                if (id) { //"should" only be one of these if theres an ID
                    return "#"+ id;
                }
                var selector = $el.parents()
                            .map(function() { return this.tagName; })
                            .get().reverse().join(" ");
                if (selector) {
                    selector += " "+ $el[0].nodeName;
                }
                var classNames = $el.attr("class");
                if (classNames) {
                    selector += "." + $.trim(classNames).replace(/\s/gi, ".");
                }
                var name = $el.attr('name');
                if (name) {
                    selector += "[name='" + name + "']";
                }
                if (!name){
                    var index = $el.index();
                    if (index) {
                        index = index + 1;
                        selector += ":nth-child(" + index + ")";
                    }
                }
                return selector;
            };

            //Position relative to a dom object
            if(data.attachedTo === undefined || typeof data.attachedTo !== 'object') data.attachedTo = { };

            //Dom object to attach (mandatory)
            var objToAttach
            if(data.attachedTo.element !== undefined) {
                //DOM object
                if(typeof data.attachedTo.element === 'object') {
                    //Get object selector
                    data.attachedTo.element = get_selector(data.attachedTo.element);
                }
                //String object
                if(typeof data.attachedTo.element === 'string' && data.attachedTo.element !== "") {
                    if($(''+data.attachedTo.element).length > 0) {
                        objToAttach = $(''+data.attachedTo.element).first();
                    } else {
                        console.log('Object to attach not found in DOM.');
                        return;
                    }
                } else {
                    console.log('Incorrect object to attach. Define a jQuery object or a DOM selector for the element property.');
                    return;
                }
            } else {
                return;
            }

            var position = {};
            if(this.elementOrParentIsFixed(data.attachedTo.element))
                position = objToAttach.position();
            else
                position = objToAttach.offset();

            if(data.attachedTo.arrow === undefined)
                data.attachedTo.arrow = true;

            if(data.attachedTo.position === undefined || data.attachedTo.position === "")
                data.attachedTo.position = "right middle";
            var tmpPos = data.attachedTo.position.split(" ");
            var pos1 = tmpPos[0], pos2 = tmpPos[1];
            var objWidth = objToAttach.width() + parseInt(objToAttach.css('padding-left'),10) + parseInt(objToAttach.css('padding-right'),10);
            var objHeight = objToAttach.height() + parseInt(objToAttach.css('padding-top'),10) + parseInt(objToAttach.css('padding-bottom'),10);
            var noteWidth = parseInt(obj.width(), 10) + parseInt(obj.css('padding-left'),10) + parseInt(obj.css('padding-right'),10);
            var noteHeight = parseInt(obj.height(), 10) + parseInt(obj.css('padding-top'),10) + parseInt(obj.css('padding-bottom'),10);

            //Breakpoints / responsive behaviour (https://github.com/txusko/PostItAll/issues/11)
            var fixVertical = function(callback) {
                var scrollPosition = self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
                //console.log(data.posY, scrollPosition, (data.posY + data.height), (scrollPosition + $(window).height()));
                if(data.posY < scrollPosition) {
                    data.posY = position.top + 20;
                    if(data.attachedTo.arrow && data.style.arrow != "top") {
                        data.style.arrow = "top";
                        t.hideArrow(data.id);
                    }
                    if(callback != null) setTimeout(function() { callback(); }, 100);
                } else if((data.posY + data.height) > (scrollPosition + $(window).height())) {
                    data.posY = position.top + objHeight - noteHeight - 20;
                    if(data.attachedTo.arrow && data.style.arrow != "bottom") {
                        data.style.arrow = "bottom";
                        t.hideArrow(data.id);
                    }
                    if(callback != null) setTimeout(function() { callback(); }, 100);
                }
            };
            var fixHorizontal = function(callback) {
                var dataPosX = data.posX;
                if(pos1 == "right")
                    dataPosX = dataPosX + noteWidth;
                //console.log(dataPosX, data.posX, $(window).width());
                if(dataPosX < 0) {
                    data.posX = position.left + 20;
                    if(data.attachedTo.arrow && data.style.arrow != "left") {
                        data.style.arrow = "left";
                        t.hideArrow(data.id);
                    }
                    if(callback != null) setTimeout(function() { callback(); }, 100);
                } else if(dataPosX > $(window).width()) {
                    data.posX = (position.left + objWidth) - data.width - 20 - getScrollWidth();
                    if(data.attachedTo.arrow && data.style.arrow != "right") {
                        data.style.arrow = "right";
                        t.hideArrow(data.id);
                    }
                    if(callback != null) setTimeout(function() { callback(); }, 100);
                }
            };

            var getScrollWidth = function() {
                var outer = $('<div>').css({visibility: 'hidden', width: 94, overflow: 'scroll'}).appendTo('body');
                var widthWithScroll = $('<div>').css({width: '100%'}).appendTo(outer).outerWidth();
                outer.remove();
                return 100 - widthWithScroll;
            }

            var updateNote = function() {
                if($($.fn.postitall.globals.prefix + data.id).length > 0) {
                    $($.fn.postitall.globals.prefix + data.id).animate({
                        'top': data.posY,
                        'left': data.posX
                    }, 200, function() {
                        if(data.style.arrow != "none") {
                            //t.hideArrow(data.id, function() {
                                t.showArrow(data.id, data);
                            //});
                        }
                    });
                }
            }

            switch(pos1) {
                case 'top':
                    data.posY = position.top - noteHeight - 20;
                    if(pos2 == "left") {
                        data.posX = (position.left + (objWidth * 0.1)) - (data.width / 2);
                    } else if(pos2 == "right") {
                        data.posX = (position.left + (objWidth - (objWidth * 0.1))) - (data.width / 2);
                    } else {
                        data.posX = (position.left + (objWidth / 2)) - (data.width / 2);
                    }
                    if(data.attachedTo.arrow && data.style.arrow != "bottom") {
                        data.style.arrow = "bottom";
                        t.hideArrow(data.id);
                    }
                break;
                case 'right':
                default:
                    data.posX = position.left + objWidth + 20;
                    if(pos2 == "top") {
                        data.posY = (position.top + (objHeight * 0.1)) - (data.height / 2);
                    } else if(pos2 == "bottom") {
                        data.posY = (position.top + (objHeight - (objHeight * 0.1))) - (data.height / 2);
                    } else {
                        data.posY = (position.top + (objHeight / 2)) - (data.height / 2);
                    }
                    if(data.attachedTo.arrow && data.style.arrow != "left") {
                        data.style.arrow = "left";
                        t.hideArrow(data.id);
                    }
                break;
                case 'bottom':
                    data.posY = position.top + objHeight + 20;
                    if(pos2 == "left") {
                        data.posX = (position.left + (objWidth * 0.1)) - (data.width / 2);
                    } else if(pos2 == "right") {
                        data.posX = (position.left + (objWidth - (objWidth * 0.1))) - (data.width / 2);
                    } else {
                        data.posX = (position.left + (objWidth / 2)) - (data.width / 2);
                    }
                    if(data.attachedTo.arrow && data.style.arrow != "top") {
                        data.style.arrow = "top";
                        t.hideArrow(data.id);
                    }
                break;
                case 'left':
                    data.posX = position.left - noteWidth - 20;
                    if(pos2 == "top") {
                        data.posY = (position.top + (objHeight * 0.1)) - (data.height / 2);
                    } else if(pos2 == "bottom") {
                        data.posY = (position.top + (objHeight - (objHeight * 0.1))) - (data.height / 2);
                    } else {
                        data.posY = (position.top + (objHeight / 2)) - (data.height / 2);
                    }

                    if(data.attachedTo.arrow && data.style.arrow != "right") {
                        data.style.arrow = "right";
                        t.hideArrow(data.id);
                    }
                break;
            }

            if(pos1 === "left" || pos1 === "right") {
                fixHorizontal(function() {
                    fixVertical();
                });
            } else if(pos1 === "top" || pos1 === "bottom") {
                fixVertical(function() {
                    fixHorizontal();
                });
            }

            if(data.attachedTo.fixed === undefined)
                data.attachedTo.fixed = true;

            setTimeout(function() { updateNote(); }, 200);
        },

        //Save object
        save : function(obj, callback) {
            var options = obj.data('PIA-options');
            if(!$.fn.postitall.globals.savable && !options.features.savable)
                return;
            //console.log('save', options);
            options.features.savable = true;
            this.saveOptions(options, callback);
        },

        //Save options
        saveOptions : function(options, callback) {
            if(options === undefined)
                options = this.options;
            //console.log('saveOptions', options.posX, options.posY, options.width, options.height);
            if ($.fn.postitall.globals.savable || options.features.savable) {
                //console.log(options);
                storageManager.add(options, function(error) {
                    if(error != "") {
                        if(callback != null) callback(error);
                        else alert('Error saving options: ' + error);
                    } else {
                        if(callback != null) callback();
                    }
                });
            }
            options.onChange($.fn.postitall.globals.prefix + options.id);
        },

        //Destroy and remove
        destroy : function(obj, callOnDelete) {

            //Swith on lights
            //this.switchOnLights();
            //this.disableKeyboardNav();

            //console.log(obj);
            if(obj === undefined)
                obj = $($.fn.postitall.globals.prefix + this.options.id);
            if(callOnDelete === undefined)
                callOnDelete = true;

            var options = obj.data('PIA-options');
            //console.log(this,options, obj);
            var id = options.id;

            //console.log('destroy', id, $.fn.postitall.globals.savable, options.features.savable);
            //Remove from localstorage
            if ($.fn.postitall.globals.savable || options.features.savable) {
                if(options.features.savable) {
                    storageManager.remove(id);
                    options.onChange($.fn.postitall.globals.prefix + id);
                } else {
                    storageManager.get(id, function(varvalue) {
                        if(varvalue != null && varvalue != "")
                            storageManager.remove(id);
                            options.onChange($.fn.postitall.globals.prefix + id);
                    });
                }
            }
            //Destroy object
            this.remove(options);

            //Event handler on delete
            if(callOnDelete) {
                options.onDelete($.fn.postitall.globals.prefix + id);
            }
        },

        //Hide note
        remove : function(options) {
            //hide object
            var id = options.id;
            //console.log('remove', id);
            $($.fn.postitall.globals.prefix + id).removeData('PIA-id')
                .removeData('PIA-initialized')
                .removeData('PIA-settings')
                .animate({
                          opacity: 0,
                          height: 0
                        }, function() {
                            $(this).remove();
                        });
                /*.hide("slow", function () {
                    $(this).remove();
                });*/
            if(this.length <= 0)
                $(window).off('resize');
        },

        hide : function(id) {
            //hide object
            if($($.fn.postitall.globals.prefix + id).length) {
                var options = $($.fn.postitall.globals.prefix + id).data('PIA-options');
                options.flags.hidden = true;
                $($.fn.postitall.globals.prefix + id).slideUp();
                this.saveOptions(options);
            }
        },

        show : function(id) {
            //show object
            if($($.fn.postitall.globals.prefix + id).length) {
                var options = $($.fn.postitall.globals.prefix + id).data('PIA-options');
                options.flags.hidden = false;
                options.features.hideUntil = null;
                $($.fn.postitall.globals.prefix + id).slideDown();
                this.saveOptions(options);
            }
        },

        //Show the note in a specific date
        showAgain : function(index, dat) {
            var t = this;
            var setToHappen = function(fn, date){
                var now = new Date().getTime();
                var diff = date.getTime() - now;
                return setTimeout(fn, diff);
            };
            var dateFinish = new Date(dat);
            if(dateFinish > Date.now()) {
                console.log('show again on ' + dateFinish, Date.now() );
                setToHappen(function() {
                    t.show(index);
                }, dateFinish);
            } else {
                t.show(index);
            }
        },

        //When user change arrow
        arrowChangeOption : function(value) {
            var index = this.options.id;
            var options = this.options;
            if($.fn.postitall.globals.addArrow == "none" && options.features == "none") {
                return;
            }
            //console.log('arrowChangeOption', options.style.arrow, value);
            //Get new position
            if(options.style.arrow == value || value == 'none') {
                //If this position is the same as before, remove arrow and show selectors
                options.style.arrow = 'none';
                $('.selectedArrow_'+index).show();
                $('.selectedArrow_'+index).find('span').show();
            } else {
                //Set arrow and hide selectors
                options.style.arrow = value;
                $('.selectedArrow_'+index).hide();
            }

            //Change options arrow select
            $('#idAddArrow_'+index).val(options.style.arrow);

            this.hideArrow(index);
            this.showArrow(index, options);
            this.saveOptions(options);
            return options;
        },

        //Hide arrow & icons
        hideArrow : function(ind, callback) {
            var index = this.options.id;
            if(ind !== undefined)
                index = ind;

            //Remove previous arrow
            $($.fn.postitall.globals.prefix + index).removeClass('arrow_box_top arrow_box_right arrow_box_bottom arrow_box_left', 1000, "easeInElastic");
            $($.fn.postitall.globals.prefix + index).find('.icon_box').hide();
            if(!$.ui) $($.fn.postitall.globals.prefix + index).css('overflow', 'hidden').css('resize', 'both');
            //console.log('hide');
            if(callback !== undefined) setTimeout(function() { callback(); }, 100);
        },

        //Show arrow and icons
        showArrow : function(ind, opt) {

            var index = this.options.id;
            if(ind !== undefined)
                index = ind;
            var options = this.options;
            if(opt !== undefined)
                options = opt;

            //delay(function() {
                //Add arrow
                //console.log(options.style.arrow, ($.fn.postitall.globals.prefix + index));
                switch(options.style.arrow) {
                    case 'top':
                        $($.fn.postitall.globals.prefix + index).addClass('arrow_box_top', 1000, "easeInElastic").css('overflow', '').css('resize', '');
                    break;
                    case 'right':
                        $($.fn.postitall.globals.prefix + index).addClass('arrow_box_right', 1000, "easeInElastic").css('overflow', '').css('resize', '');
                    break;
                    case 'bottom':
                        $($.fn.postitall.globals.prefix + index).addClass('arrow_box_bottom', 1000, "easeInElastic").css('overflow', '').css('resize', '');
                    break;
                    case 'left':
                        $($.fn.postitall.globals.prefix + index).addClass('arrow_box_left', 1000, "easeInElastic").css('overflow', '').css('resize', '');
                    break;
                }
                //console.log('options.style.arrow',options.style.arrow);
                if(options.style.arrow == 'none')
                    $($.fn.postitall.globals.prefix + index).find('.icon_box').show();
                var icon = $($.fn.postitall.globals.prefix + index).find('div[data-value="'+options.style.arrow+'"]');
                icon.show();
                icon.find('span').hide();
                //console.log('show');

            //}, 250);
        },

        //Autoresize note
        autoresize : function() {
            var t = this;
            var id = this.options.id;
            var options = this.options;
            var obj = $($.fn.postitall.globals.prefix + id);
            if(options.flags.minimized || options.flags.expand)
                return;
            var toolBarHeight = parseInt(obj.find('.PIAtoolbar').height(), 10);
            var contentHeight = parseInt(obj.find('.PIAeditable').height(), 10) + toolBarHeight,
                posX = obj.css('left'),
                posY = obj.css('top'),
                divWidth = parseInt(obj.css('width'), 10),//parseInt(obj.width(), 10) + parseInt(obj.css('padding-left'),10) + parseInt(obj.css('padding-right'),10) + 2,
                divHeight = parseInt(obj.css('height'), 10),
                minDivHeight = options.minHeight;
            var htmlEditorBarHeight = parseInt(obj.find('.trumbowyg-button-pane').height(), 10);
            if(isNaN(htmlEditorBarHeight) || htmlEditorBarHeight <= 30) {
                htmlEditorBarHeight = 35;
            }
            //console.log('divHeight',divHeight,'contentHeight',contentHeight);
            if(contentHeight > divHeight - 30) {
                divHeight = contentHeight + htmlEditorBarHeight;
            } else if(contentHeight > options.minHeight) {
                //Comment this line if we want to preserve user height
                divHeight = contentHeight + htmlEditorBarHeight;
            }
            //console.log('newHeight',divHeight);
            options.height = divHeight;
            //obj.animate({ 'height': divHeight }, 250);
            obj.css('height', divHeight);
            //console.log('auto', divWidth);
            options.width = divWidth;

            if(!$( "#pia_editable_" + id ).is(':focus')) {
                if(options.attachedTo.element !== "" && options.attachedTo.fixed)
                    t.attachedTo();
            }
        },

        //Get next note Id
        getIndex : function(savable, callback) {
            if(!savable) {
                callback(this.guid());
                return;
            }

            var len = 0;
            var content = "";
            var paso = false;
            storageManager.getlength(function(len) {
                //console.log('getIndex.len', len);
                var loadedItems = $('.PIApostit').length;
                var items = len + loadedItems + 1;
                //console.log('getIndex.items', items);
                for(var i = 1; i <= items; i++) {
                    (function(i) {
                        storageManager.get(i, function(content) {
                            //console.log('getIndex.get', paso, i, content);
                            if(!paso && (content == null || content == "") && $( "#idPostIt_" + i ).length <= 0) {
                                //console.log('nou index', i);
                                paso = true;
                            }
                            if(callback != null && (paso || i >= items)) {
                                callback(i);
                                callback = null;
                            }
                        });
                    })(i);
                }
            });
        },

        // Set options
        setOptions : function(opt, save) {
            var t = this;
            if (typeof opt !== 'object') {
                opt = {};
            }
            if (save === undefined) {
                save = false;
            }
            t.options = $.extend(t.options, opt);
            /*jslint unparam: true*/
            $.each(['onChange', 'onSelect', 'onRelease', 'onDblClick'], function (i, e) {
                if (typeof t.options[e] !== 'function') {
                    t.options[e] = function () { return undefined; };
                }
            });
            /*jslint unparam: false*/
            if (save) {
                //console.log('setOptions save', t.options);
                this.saveOptions(t.options);
            }
        },

        // Get user selection text on page
        getSelectedText : function() {
            var text = "";
            if (window.getSelection) {
                text = window.getSelection();
            } else if (document.selection) {
                text = document.selection.createRange().text;
            }
            return text;
        },

        // Get user selection html on page
        getSelectedHtml : function() {
            var html = "";
            if (typeof window.getSelection != "undefined") {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var container = document.createElement("div");
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    html = container.innerHTML;
                }
            } else if (typeof document.selection != "undefined") {
                if (document.selection.type == "Text") {
                    html = document.selection.createRange().htmlText;
                }
            }
            return html;
        },

        //Recover client OS name
        getOSName : function() {
            var OSName="Unknown OS";
            var browserNav = this.options.osname;
            if (browserNav.indexOf("Win")!=-1) OSName="Windows";
            if (browserNav.indexOf("Mac")!=-1) OSName="MacOS";
            if (browserNav.indexOf("X11")!=-1) OSName="UNIX";
            if (browserNav.indexOf("Linux")!=-1) OSName="Linux";
            return OSName;
        },

        //flip cover to back
        switchBackNoteOn : function(flipClass) {
            var id = this.options.id;
            $('#the_lights').data('highlightedId', id);
            this.enableKeyboardNav();
            $('#idPostIt_' + id + ' > .PIAback').css('visibility', 'visible');
            $($.fn.postitall.globals.prefix + id).addClass('PIAflip ' + flipClass, function () {
                $($.fn.postitall.globals.prefix + id + ' > .PIAfront').css('visibility', 'hidden');
                $($.fn.postitall.globals.prefix + id + ' > .ui-resizable-handle').css('visibility', 'hidden');
            });
            if($.fn.postitall.globals.resizable && $.ui) $($.fn.postitall.globals.prefix + id).resizable("disable");
            if($.fn.postitall.globals.draggable && $.ui) {
                setTimeout(function() {
                    $($.fn.postitall.globals.prefix + id).draggable({disabled: true});
                }, 500);
            }
            //$(this).parent().parent().parent().parent().addClass('PIAflip');
        },

        //flip back to cover
        switchBackNoteOff : function(flipClass) {
            var id = this.options.id;
            $('#the_lights_close').click();
            this.disableKeyboardNav();
            $('#idPostIt_' + id + ' > .PIAfront').css('visibility', 'visible');
            $($.fn.postitall.globals.prefix + id).removeClass('PIAflip ' + flipClass, function () {
                $($.fn.postitall.globals.prefix + id + ' > .PIAback').css('visibility', 'hidden');
                $($.fn.postitall.globals.prefix + id + ' > .ui-resizable-handle').css('visibility', '');
            });
            if($.fn.postitall.globals.resizable && $.ui) $($.fn.postitall.globals.prefix + id).resizable("enable");
            if($.fn.postitall.globals.draggable && $.ui) {
                setTimeout(function() {
                    //Enable draggable
                    $($.fn.postitall.globals.prefix + id).draggable({disabled: false});
                    //Show back-date
                    $('#idDateBackToolbar_' + id).show();
                }, 500);
            }
        },

        //add transparency to note
        switchTrasparentNoteOn : function() {
            var id = this.options.id;
            var options = this.options;
            var components = this.getRGBComponents(options.style.backgroundcolor);
            //$($.fn.postitall.globals.prefix + id).css('background', 'rgb('+components.R+', '+components.G+', '+components.B+')');
            $($.fn.postitall.globals.prefix + id).css('background-color', 'rgba('+components.R+', '+components.G+', '+components.B+', 0.8)');
        },

        //remove transparency to note
        switchTrasparentNoteOff : function() {
            var id = this.options.id;
            var options = this.options;
            var components = this.getRGBComponents(options.style.backgroundcolor);
            //$($.fn.postitall.globals.prefix + id).css('background', 'rgb('+components.R+', '+components.G+', '+components.B+')');
            $($.fn.postitall.globals.prefix + id).css('background-color', 'rgba('+components.R+', '+components.G+', '+components.B+', 1)');
        },

        //Switch off lights and highlight note
        switchOffLights : function() {
            var t = this;
            var id = t.options.id;
            if(id !== undefined) {
                $($.fn.postitall.globals.prefix + id).css({
                    'z-index': 999999,
                    'border': '1px solid rgb(236, 236, 0)',
                    'box-shadow': 'rgb(192, 195, 155) 1px 1px 10px 3px',
                });
            }
            setTimeout(function() {
              $("#the_lights").fadeTo("fast", 0.6, function() {
                  $("#the_lights").css('display','block');
                  $("#the_lights").css({'height':($(document).height())+'px'});
                  $("#the_lights").css({'width':($(document).width())+'px'});
                  $("#the_lights").data('highlightedId', id);
                  // lock scroll position, but retain settings for later
                  var scrollPosition = [
                      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                      self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
                  ];
                  $('html').data('scroll-position', scrollPosition);
                  $('html').data('previous-overflow', $('html').css('overflow'));
                  $('html').css('overflow', 'hidden');
                  $(window).on('resize', $.proxy(t.resizeAction, t));
                  window.scrollTo(scrollPosition[0], scrollPosition[1]);
              });
            }, 500);
        },

        //Switch lights on & remove highlighted note
        switchOnLights : function() {
            var id = $("#the_lights").data('highlightedId');
            var options = $($.fn.postitall.globals.prefix + id).data('PIA-options');
            var t = this;
            if(id !== "" && options !== null && options !== undefined) {
                $("#the_lights").data('highlightedId', '');
                $($.fn.postitall.globals.prefix + id).css({
                    'z-index': 999995,
                    'border': '1px solid ' + $($.fn.postitall.globals.prefix + id).css('background-color'),
                    'box-shadow': '',
                });
                if(options.flags.expand) {
                    $('#pia_expand_'+id).click();
                } else {
                    $('#pia_close_'+id).click();
                }
            }
            if($("#the_lights").css('display') != "none") {
                $("#the_lights").css('display','block');
                $("#the_lights").fadeTo("slow",0, function() {
                    $("#the_lights").css('display','none');
                });
                // un-lock scroll position
                var scrollPosition = $('html').data('scroll-position');
                if(scrollPosition != undefined) {
                    //console.log('unlock', scrollPosition);
                    var tmpOvf = $('html').data('previous-overflow');
                    $('html').css('overflow', (tmpOvf != "hidden") ? tmpOvf : "visible" );
                    window.scrollTo(scrollPosition[0], scrollPosition[1]);
                }
                $(window).off('resize');
                //Set on resize action
                if($.fn.postitall.globals.autoPosition) // && options.features.autoPosition)
                    $(window).on('resize', $.proxy(t.relativePosition, t));

            }
        },

        //On resize when lights are off
        switchOffLightsResize : function() {
            $("#the_lights").css({'height':($(document).height())+'px'});
        },

        //Enable keyboard actions
        enableKeyboardNav : function(callback) {
            //console.log('enableKeyboardNav');
            this.callback = callback;
            $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
        },

        //Disable keybord actions
        disableKeyboardNav : function() {
            //console.log('disableKeyboardNav');
            $(document).off('keyup.keyboard');
        },

        //Keyboard actions
        keyboardAction : function(event) {
            //console.log('keyboardAction', event);
            var KEYCODE_ESC        = 27;
            var keycode = event.keyCode;
            var key     = String.fromCharCode(keycode).toLowerCase();
            //On keypress ESC
            if (keycode === KEYCODE_ESC) { // || key.match(/x|o|c/)) {
                //console.log('key press ESC');
                if(this.callback != undefined) this.callback();
                this.switchOnLights();
                this.disableKeyboardNav();
            }
        },

        //Resize expanded note when screen size changes
        resizeAction : function(event) {
            var t = this;
            delay(function(){
                //console.log('resizeAction', t.options.id);
                //Lights switched off
                var highlightedId = $("#the_lights").data('highlightedId');
                if(highlightedId !== undefined && highlightedId !== ""){
                    t.switchOffLightsResize();
                    var options = $($.fn.postitall.globals.prefix + highlightedId).data('PIA-options');
                    if(options.flags.expand) {
                        $($.fn.postitall.globals.prefix + highlightedId).css({
                            top:'10px'
                        }).animate({
                            'height': $(window).height() - 30,
                            'width': $(window).width() - 30
                        });
                    }
                }
            }, 500);
        },

        //On screen resize, notes will preserve relative position to new width screen
        relativePosition : function(event) {
            var t = this;
            if(!$.fn.postitall.globals.autoPosition || !t.options.features.autoPosition) {
                $(window).off('resize');
                return;
            }
            var obj, options;
            delay(function(){
                $('.PIApostit').each(function(i,e) {
                    obj = $($.fn.postitall.globals.prefix + $(e).data('PIA-id'));
                    options = $($.fn.postitall.globals.prefix + $(e).data('PIA-id')).data('PIA-options');
                    //console.log(i,options,obj);
                    if(options !== undefined && options.attachedTo.element !== undefined && options.attachedTo.element !== "") {
                        //Attached elements
                        if(options.attachedTo.fixed !== undefined && options.attachedTo.fixed)
                            t.attachedTo(options);
                    } else {
                        //Floating elements
                        //console.log('new pos for note ', i, e);
                        var noteLoc = obj.offset();
                        var screenLoc = { 'height': $(window).height(), 'width': $(window).width() };
                        var top = noteLoc.top;
                        var left = noteLoc.left;
                        var width = parseInt($(e).css('width'), 10) + parseInt($(e).css('padding-left'), 10) + parseInt($(e).css('padding-right'), 10);
                        var height = parseInt($(e).css('height'), 10) + parseInt($(e).css('padding-top'), 10) + parseInt($(e).css('padding-bottom'), 10);

                        var x1 = left, x2 = (left + width), y1 = top, y2 = (top + height);
                        var relTop = (y1 / screenLoc.height) * 100;
                        var relLeft = (x1 / screenLoc.width) * 100;
                        var relWidth = ((x2 - x1) / screenLoc.width) * 100;
                        var relHeight = ((y2 - y1) / screenLoc.height) * 100;

                        $(e).css({
                            //'top': relTop + "%",
                            'left': relLeft + "%",
                            //'width': relWidth + "%",
                            //'height': relHeight + "%"
                        });
                        options.posX = obj.offset().left;
                    }
                    //Save
                    obj.data('PIA-options', options);
                    //console.log('options', options);
                });
                //$.PostItAll.save();
            }, 100);
        },

        //Save current note position in options.oldPosition
        saveOldPosition : function() {
            var obj = $($.fn.postitall.globals.prefix + this.options.id);
            var leftMinimized = obj.css('left');
            if(this.options.oldPosition !== undefined && this.options.oldPosition.leftMinimized !== undefined)
                leftMinimized = this.options.oldPosition.leftMinimized;
            var propCss = {
                'position': obj.css('position'),
                'left': obj.css('left'),
                'top': obj.css('top'),
                'height': obj.css('height'),
                'width': obj.css('width'),
                'leftMinimized': leftMinimized,
            };
            this.options.oldPosition = propCss;
            //console.log('saveOldPosition', this.options.oldPosition);
            this.setOptions(this.options, true);
        },

        //Scroll to note position
        scrollToNotePosition : function(tmpTop, tmpHeight, tmpLeft, tmpWidth, callback) {
            var scrollTop1 = self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
            var scrollBottom1 = scrollTop1 + $(window).height();
            var scrollTop2 = parseInt(tmpTop, 10);
            var scrollBottom2 = scrollTop2 + parseInt(tmpHeight,10);
            var scrollLeft1 = self.pageXOffset || document.documentElement.scrollLeft  || document.body.scrollLeft;
            var scrollRight1 = scrollLeft1 + $(window).width();
            var scrollLeft2 = parseInt(tmpLeft, 10);
            var scrollRight2 = scrollLeft2 + parseInt(tmpWidth,10);
            //console.log(scrollTop2,scrollTop1,scrollBottom2,scrollBottom1);
            if(scrollTop2 > scrollTop1 && scrollBottom2 < scrollBottom1 && scrollLeft2 > scrollLeft1 && scrollRight2 < scrollRight1) {
                if(callback !== undefined) callback();
            } else {
                $('html, body').animate({
                    scrollTop: scrollTop2 - parseInt(tmpHeight,10),
                    scrollLeft: scrollLeft2 - parseInt(tmpWidth,10)
                }, 400);

                setTimeout(function() {
                    if(callback !== undefined) callback();
                }, 500);
            }
        },

        //Restore note with options.oldPosition
        restoreOldPosition : function(scrollToNote, callback) {
            if(scrollToNote === undefined)
                scrollToNote = false;

            var t = this;
            var options = t.options;
            var id = options.id;
            var showNote = function() {
                if(options.oldPosition.position == "absolute") {
                    $($.fn.postitall.globals.prefix + id).css({
                        'top': parseInt($($.fn.postitall.globals.prefix + id).css('top'), 10) + $(document).scrollTop()
                    });
                } else {
                    $($.fn.postitall.globals.prefix + id).css({
                        'top': $($.fn.postitall.globals.prefix + id).css('top'),
                    });
                }
                $($.fn.postitall.globals.prefix + id).css({
                    'position': 'absolute',
                    'bottom': 'auto',
                });
                setTimeout(function(){
                    $($.fn.postitall.globals.prefix + id).animate({
                        'top': options.oldPosition.top,
                        'left': options.oldPosition.left,
                        'width': options.oldPosition.width,
                        'height': options.oldPosition.height,
                    }, 500, function() {
                        t.showArrow(id, options);
                        $(this).find( ".PIAeditable" ).css('height', 'auto');
                        t.autoresize();
                        //animate resize
                        if(options.flags.blocked) {
                            options.flags.blocked = false;
                            t.blockNote();
                        } else {
                            t.hoverOptions(id, true);
                        }
                        t.switchTrasparentNoteOff();
                        t.switchOnLights();

                        if(callback !== undefined) callback();

                    }).css({
                        'position': options.oldPosition.position,
                    });
                }, 100);
            };

            if(scrollToNote && options.position != "fixed") {
                t.scrollToNotePosition(options.oldPosition.top, options.height, options.oldPosition.left, options.width, showNote);
            } else {
                showNote();
            }

        },

        //hide/show divList objects
        toogleToolbar : function(action, divlist) {
            var t = this;
            var options = t.options;
            var index = options.id;
            var type = "";
            var fadeOuTime = 200;
            for(var i = 0; i < divlist.length; i++) {
                type = divlist[i].substring(0,1);
                if(type != "#" && type != ".") {
                    type = "#";
                } else {
                    divlist[i] = divlist[i].substring(1);
                }
                if(action == "hide") {
                    $(type + divlist[i] + index).fadeTo(0, 0, function() {
                        $(this).hide();
                    });
                } else {
                    $(type + divlist[i] + index).fadeTo(0, 1, function() {
                        $(this).show();
                    });
                }
            }
            if(action == "hide") {
                if ($.fn.postitall.globals.resizable && options.features.resizable) {
                    if ($.ui) $($.fn.postitall.globals.prefix + index).resizable("disable");
                }
                if ($.fn.postitall.globals.draggable && options.features.draggable) {
                    //draggable
                    if ($.ui) $($.fn.postitall.globals.prefix + index).draggable("disable");
                    $('#pia_toolbar_'+index).css('cursor', 'inherit');
                }
            } else {
                if ($.fn.postitall.globals.resizable && options.features.resizable) {
                    if ($.ui) $($.fn.postitall.globals.prefix + index).resizable("enable");
                }
                if ($.fn.postitall.globals.draggable && options.features.draggable) {
                    if ($.ui) $($.fn.postitall.globals.prefix + index).draggable("enable");
                    $('#pia_toolbar_'+index).css('cursor', 'move');
                }
                t.hoverState = true;
                //t.hoverOptions(index, true);
            }
        },

        //Expand note
        expandNote : function() {
            var t = this;
            var index = t.options.id;
            var options = t.options;
            $('#the_lights_close').hide();
            $('#pia_expand_' + index).removeClass('icofont icofont-plus').addClass('icofont icofont-minus');
            t.hoverOptions(index, false);
            t.saveOldPosition();
            t.toogleToolbar('hide', ['idPIAIconBottom_', 'idInfo_', 'pia_config_', 'pia_fixed_', 'pia_delete_', 'pia_blocked_', 'pia_minimize_', 'pia_new_', 'pia_hidden_']);
            t.hideArrow();
            t.switchTrasparentNoteOn();
            t.switchOffLights();
            // Expand note
            $($.fn.postitall.globals.prefix + index).css({
                'top':'10px',
                'position': 'fixed',
            }).animate({
                'height': $(window).height() - 30,
                'width': $(window).width() - 30,
                'top': '10px',
                'left': '10px',
            }, 500, function() {
                $('.PIApostit').css('z-index', 999995);
                $(this).css('z-index', '999999');
                $( "#pia_editable_" + index ).css('height',($(window).height() - 120));
                $( "#pia_editable_" + index ).focus();
            });
            options.flags.expand = true;
            t.enableKeyboardNav();
            t.saveOptions(options);
        },

        //Collapse note (restoreOldPosition)
        collapseNote : function() {
            var t = this;
            var index = t.options.id;
            var options = t.options;

            $('#the_lights_close').show();
            $('#pia_expand_' + index).removeClass('icofont icofont-minus').addClass('icofont icofont-plus');
            $($.fn.postitall.globals.prefix + index).css('position', options.position);
            // show toolbar
            t.toogleToolbar('show', ['idPIAIconBottom_', 'idInfo_', 'pia_config_', 'pia_fixed_', 'pia_delete_', 'pia_blocked_', 'pia_minimize_', 'pia_new_', 'pia_hidden_']);
            //restore oldposition
            t.restoreOldPosition();
            //newstate
            options.flags.expand = false;
            t.saveOptions(options);
        },

        //Minimize/Maximize note
        minimizeNote : function() {
            var t = this;
            var index = t.options.id;
            var options = t.options;
            var obj = $($.fn.postitall.globals.prefix + index);

            if(!$.fn.postitall.globals.minimized || !options.features.minimized)
                return;

            //minimize action
            var minimize = function() {
                t.hoverOptions(index, false);
                $('#pia_editable_'+index).hide();
                $('#pia_minimize_'+index).removeClass('icofont icofont-minus').addClass('icofont icofont-minus');
                options.flags.minimized = true;
                //Add some start text to minimized note
                var txtContent = " " + $('#pia_editable_'+index).text();
                if(txtContent.length > 18)
                    txtContent = txtContent.substring(0,15) + "...";
                var smallText = $('<div id="pia_minimized_text_'+index+'" class="PIAminimizedText" />').text(txtContent);
                $('#pia_toolbar_'+index).append(smallText);
                //hide toolbar
                t.toogleToolbar('hide', ['idPIAIconBottom_', 'idInfo_', 'pia_config_', 'pia_fixed_', 'pia_delete_', 'pia_blocked_', 'pia_expand_', 'pia_new_', 'pia_hidden_']);

                //Enable draggable x axis
                if ($.fn.postitall.globals.draggable && options.features.draggable) {
                    //draggable
                    if ($.ui) {
                        obj.draggable("enable");
                        obj.draggable({ axis: "x" });
                    }
                }
                t.saveOldPosition();
                //Minimize
                var hideNote = function() {
                    $($.fn.postitall.globals.prefix + index).animate({
                        'width': (options.minWidth + 20),
                        'height': '20px',
                        'bottom': '0',
                        'left': options.oldPosition.leftMinimized,
                    }, 500, function() {
                        t.hideArrow();
                        t.switchTrasparentNoteOn();
                        $($.fn.postitall.globals.prefix + index).css({position:'fixed'})
                    }).css({
                        'top': 'auto',
                    });
                };

                $($.fn.postitall.globals.prefix + index).css({
                    'position': 'fixed',
                });
                if(options.position == "absolute") {
                    $($.fn.postitall.globals.prefix + index).css({
                        'top': parseInt(options.posY, 10) - $(document).scrollTop(),
                    });
                }
                setTimeout(function(){
                    hideNote();
                }, 100);
            };
            //maximize action (restoreOldPosition)
            var maximize = function() {
                t.restoreOldPosition(true, function() {
                    $('#pia_editable_'+index).show();
                    $('#pia_minimize_'+index).removeClass('icofont icofont-minus').addClass('icofont icofont-minus');
                    options.flags.minimized = false;
                    // show toolbar
                    t.toogleToolbar('show', ['idPIAIconBottom_', 'idInfo_', 'pia_config_', 'pia_fixed_', 'pia_delete_', 'pia_blocked_', 'pia_expand_', 'pia_new_', 'pia_hidden_']);
                    $('#pia_minimized_text_'+index).remove();
                    //Remove draggable axis
                    if ($.fn.postitall.globals.draggable && options.features.draggable) {
                        if ($.ui) obj.draggable({ axis: "none" });
                    }
                    t.switchTrasparentNoteOff();
                });
            };
            //Action
            if(!options.flags.minimized) {
                minimize();
            } else {
                maximize();
            }
            //Save feature
            t.save(obj);
        },

        //Block note
        blockNote : function() {
            var t = this;
            var index = t.options.id;
            var options = t.options;
            var obj = $($.fn.postitall.globals.prefix + index);

            if(!$.fn.postitall.globals.blocked || !options.features.blocked)
                return;

            var ides = ['pia_config_', 'pia_fixed_', 'pia_delete_', 'idPIAIconBottom_', '.selectedArrow_'];
            if(!options.flags.expand)
                ides.push('pia_expand_');
            if(!options.flags.minimized)
                ides.push('pia_minimize_');

            if(options.flags.blocked) {
                $('#pia_blocked_'+index.toString()).removeClass('PIAblocked2').addClass('PIAblocked');
                $('#pia_editable_'+index.toString()).attr('contenteditable', true).css("cursor", "");
                //toolbar
                t.toogleToolbar('show', ides);
                //onhover actions
                t.hoverOptions(index, true);
                //new state
                options.flags.blocked = false;
            } else {
                $('#pia_blocked_'+index.toString()).removeClass('PIAblocked').addClass('PIAblocked2');
                $('#pia_editable_'+index.toString()).attr('contenteditable', false).css("cursor", "auto");
                //disabel onhover actios
                t.hoverOptions(index, false);
                //toolbar
                t.toogleToolbar('hide', ides);
                //new state
                options.flags.blocked = true;
            }
            //Save feature
            t.save(obj);
        },

        //Fix note position
        fixNote : function() {
            var t = this;
            var index = t.options.id;
            var options = t.options;
            var obj = $($.fn.postitall.globals.prefix + index);
            if(options.flags.fixed) {
                $('#pia_fixed_'+index).removeClass('PIAfixed2 PIAiconFixed').addClass('icofont icofont-tack-pin PIAicon');
                options.position = "absolute";
                options.posY = obj.offset().top;
                obj.removeClass("fixed");
                options.attachedTo.element = "";
                options.flags.fixed = false;
            } else {
                $('#pia_fixed_'+index).removeClass('icofont icofont-tack-pin PIAicon').addClass('PIAfixed2 PIAiconFixed');
                options.position = "fixed";
                options.posY = parseInt(options.posY, 10) - $(document).scrollTop();
                obj.addClass("fixed");
                obj.css('z-index', 999996);
                options.flags.fixed = true;
            }
            obj.css('position', options.position);
            //obj.css('left', parseInt(options.posX, 10) + "px");
            obj.css('top', parseInt(options.posY, 10) + "px");
            //Save features
            t.setOptions(options);
            t.save(obj);
        },

        //Enable/Disable auto-hide toolbar icons when hover over the note
        hoverOptions : function(index, enabled) {

            //Hide toolbar
            if(!$.fn.postitall.globals.toolbar || !this.options.features.toolbar)
                return;

            if(!$.fn.postitall.globals.autoHideToolBar || !this.options.features.autoHideToolBar)
                enabled = false;

            var fadeInTime = 200;
            var fadeOuTime = 600;
            var t = this;

            if(enabled) {
                setTimeout(function(){
                    //Options
                    $( $.fn.postitall.globals.prefix + index ).hover(function() {
                        $($.fn.postitall.globals.prefix + index).find('.PIAfront').find(".PIAicon, .PIAiconFixed").fadeTo(fadeInTime, 1);
                        if(t.options.style.arrow === undefined || t.options.style.arrow == "none")
                            $( $.fn.postitall.globals.prefix + index).find(".icon_box").fadeTo(fadeOuTime, 1);
                        $($.fn.postitall.globals.prefix + index + ' > .ui-resizable-handle').fadeTo(fadeInTime, 1);
                        t.hoverState = true;
                    }, function() {
                        setTimeout(function() {
                            if(!t.hoverState) {
                                $($.fn.postitall.globals.prefix + index).find('.PIAfront').find(".PIAicon, .PIAiconFixed").fadeTo(fadeOuTime, 0);
                                $($.fn.postitall.globals.prefix + index).find(".icon_box").fadeTo(fadeOuTime, 0);
                                $($.fn.postitall.globals.prefix + index + ' > .ui-resizable-handle').fadeTo(fadeOuTime, 0);
                            }
                        },(fadeOuTime - fadeInTime));
                        t.hoverState = false;
                    });
                    if(!t.hoverState) {
                        $($.fn.postitall.globals.prefix + index).find('.PIAfront').find(".PIAicon, .PIAiconFixed").fadeTo(fadeOuTime, 0);
                        $($.fn.postitall.globals.prefix + index).find(".icon_box").fadeTo(fadeOuTime, 0);
                        $($.fn.postitall.globals.prefix + index + ' > .ui-resizable-handle').fadeTo(fadeOuTime, 0);
                    }
                },100);
                return;
            }
            t.hoverState = false;
            //Options
            $( $.fn.postitall.globals.prefix + index ).unbind('mouseenter mouseleave');
            //console.log('t.options.style.arrow',t.options.style.arrow);
            if(t.options.style.arrow === undefined || t.options.style.arrow == "none")
                $( $.fn.postitall.globals.prefix + index).find(".icon_box").fadeTo(fadeOuTime, 1);
            $( $.fn.postitall.globals.prefix + index).find('.PIAfront').find(".PIAicon, .PIAiconFixed").fadeTo(fadeInTime, 1);
        },

        //Get a random color (if the feature is enabled, otherwhise will return default background color)
        getRandomColor : function() {
            var randomColor = "";
            if($.fn.postitall.globals.randomColor && $.fn.postitall.defaults.features.randomColor) {
                //Random color
                //var colors = ["red", "blue", "yellow", "black", "green"];
                //return colors[Math.floor(Math.random() * colors.length)];
                randomColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
            } else {
                //Default postit color
                randomColor = $.fn.postitall.defaults.style.backgroundcolor;
            }
            if(randomColor.length < 7) {
                var num = 7 - randomColor.length;
                var ret = new Array( num + 1 ).join("0");
                randomColor = randomColor + ret.toString();
            }
            return randomColor;
        },

        //Get text color relative tot hexcolor (if the featured is enabled, otherwise will return default text color)
        getTextColor : function(hexcolor) {
            if($.fn.postitall.globals.randomColor && $.fn.postitall.defaults.features.randomColor) {
                //Inverse of background (hexcolor)
                var nThreshold = 105;
                var components = this.getRGBComponents(hexcolor);
                var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
                return ((255 - bgDelta) < nThreshold) ? "#111111" : "#eeeeee";
            } else {
                //Default postit text color
                return $.fn.postitall.defaults.style.textcolor;
            }
        },

        //Get css text-shadow style
        getTextShadowStyle : function(hexcolor) {
            //console.log(hexcolor);
            var nThreshold = 105;
            var components = this.getRGBComponents(hexcolor);
            var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
            return ((255 - bgDelta) < nThreshold) ? "tresdblack" : "tresd";
        },

        //Get rgb from an hex color
        getRGBComponents : function(color) {
            var r = color.substring(1, 3);
            var g = color.substring(3, 5);
            var b = color.substring(5, 7);
            return {
               R: parseInt(r, 16),
               G: parseInt(g, 16),
               B: parseInt(b, 16)
            };
        },

        //Retrive unique random id (non savable notes)
        guid : function() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        },

        //Check if the element or her parents have a fixed position
        elementOrParentIsFixed : function(element) {
            var $element = $(element);
            var $checkElements = $element.add($element.parents());
            var isFixed = false;
            $checkElements.each(function(){
                if ($(this).css("position") === "fixed") {
                    isFixed = true;
                    return false;
                }
            });
            return isFixed;
        },

        //Create note from an object
        create : function(obj) {

            var t = this;
            var options = t.options;
            var index = options.id.toString();

            //Add data to object
            obj.data('PIA-id', index)
                .data('PIA-initialized', true)
                .data('PIA-options', options);
            //Postit editable content
            if (options.content === "") {
                if (obj.html() !== "") {
                    options.content = obj.html();
                }
            }
            //Front page: toolbar
            var barCursor = "cursor: inherit;";
            if ($.fn.postitall.globals.draggable && options.features.draggable) {
                barCursor = "cursor: move;";
            }
            var toolbar = $('<div />', {
                'id': 'pia_toolbar_' + index,
                'class': 'PIAtoolbar',
                'style': barCursor
            });

            //Drag support without jQuery UI - don't work so much well...
            if (!$.ui) {
                if ($.fn.postitall.globals.draggable && options.features.draggable) {
                    toolbar.drags();
                }
            }

            //Delete icon
            if($.fn.postitall.globals.removable) {
                if (options.features.removable) {
                    toolbar.append($('<div />', {
                        'id': 'pia_delete_' + index,
                        'class': 'PIAdelete icofont icofont-close PIAicon'
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            if($.fn.postitall.globals.askOnDelete && options.features.askOnDelete) {
                                if ($(this).parent().find('.ui-widget2').length <= 0) {
                                    $('.backContent_' + index).hide();
                                    $('#idBackDelete_' + index + ' > .PIABox').css({
                                        //'width': options.width - 10,
                                        'height': options.height - 40
                                    });
                                    $('#idBackDelete_' + index).show();
                                    t.switchBackNoteOn('PIAflip2');
                                    t.switchOffLights();
                                }
                            } else {
                                t.destroy();
                            }
                        }
                        e.preventDefault();
                    }));
                }
            }

            //Config icon
            if($.fn.postitall.globals.changeoptions) {
                if (options.features.changeoptions) {
                    toolbar.append(
                        $('<div />', {
                            'id': 'pia_config_' + index,
                            'class': 'PIAconfig PIAicon'
                        }).click(function (e) {
                            if (obj.hasClass('PIAdragged')) {
                                obj.removeClass('PIAdragged');
                            } else {
                                $('.backContent_'+index).hide();
                                $('#idBackConfig_'+index+' > .PIABox').css({
                                    //'width': options.width - 10,
                                    'height': options.height - 40
                                });
                                $('#idBackConfig_'+index).show();
                                t.switchBackNoteOn('PIAflip2');

                            }
                            e.preventDefault();
                        })
                    );
                }
            }

            //Fixed
            if($.fn.postitall.globals.fixed) {
                if(options.features.fixed) {
                    toolbar.append(
                        $('<div />', {
                            'id': 'pia_fixed_' + index,
                            'class': 'icofont icofont-tack-pin' + (options.flags.fixed ? '2 PIAiconFixed' : ' PIAicon') + ' '
                        }).click(function (e) {
                            if (obj.hasClass('PIAdragged')) {
                                obj.removeClass('PIAdragged');
                            } else {
                                t.fixNote();
                            }
                            e.preventDefault();
                        })
                    );
                }
            }

            //Hide
            if($.fn.postitall.globals.hidden && options.features.hidden) {
                toolbar.append(
                    $('<div />', {
                        'id': 'pia_hidden_' + index,
                        'class': 'PIAhide PIAicon'
                    }).click(function(e) {
                        if(obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            if($.fn.postitall.globals.askOnHide && options.features.askOnHide) {
                                $('.backContent_'+index).hide();
                                $('#idHideUntil_'+index+' > .PIABox').css({
                                    //'width': options.width - 10,
                                    'height': options.height - 40
                                });
                                $('#idHideUntil_'+index).show();
                                t.switchBackNoteOn('PIAflip2');
                            } else {
                                t.hide(index);
                            }
                        }
                        e.preventDefault();
                    })
                );
            } else {
                options.flags.hidden = false;
            }

            //MINIMIZE
            if($.fn.postitall.globals.minimized && options.features.minimized) {
                toolbar.append(
                    $('<div />', {
                        'id': 'pia_minimize_' + index,
                        'class': (options.flags.minimized ? 'icofont icofont-minus' : 'icofont icofont-minus') + ' PIAicon'
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            t.minimizeNote();
                        }
                        e.preventDefault();
                    })
                );
            } else {
                options.flags.minimized = false;
            }

            //Expand note / Maximize
            if($.fn.postitall.globals.expand && options.features.expand) {
                toolbar.append(
                    $('<div />', {
                        'id': 'pia_expand_' + index,
                        'class': (options.flags.expand ? 'PIAmaximize' : 'icofont icofont-plus') + ' PIAicon'
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            if(!options.flags.expand) {
                                t.expandNote();
                            } else {
                                t.collapseNote();
                            }
                        }
                        e.preventDefault();
                    })
                );
            } else {
                options.flags.expand = false;
            }

            //Blocked
            if($.fn.postitall.globals.blocked && options.features.blocked) {
                toolbar.append(
                    $('<div />', {
                        'id': 'pia_blocked_' + index,
                        'class': 'PIAblocked' + (options.flags.blocked == true ? '2' : '') + ' PIAicon',
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            t.blockNote();
                        }
                        e.preventDefault();
                    })
                );
            }

            //Front page: content
            var content = $('<div />', {
                'id': 'pia_editable_' + index,
                'class': 'PIAeditable PIAcontent',
                //Reset herisated contenteditable styles
                //color:'+options.style.textcolor+';min-width:99%;
                'style': 'width: auto;height: auto;padding: 10px;border-color: transparent;min-width:' + (options.minWidth) + 'px;box-shadow:none;min-height:' + (options.minHeight - 100) + 'px;'
            }).change(function (e) {
                if(!$.fn.postitall.globals.editable || !options.features.editable) {
                    return;
                }

                var oldContent = options.content;

                //Html format
                var text = $(this).text();
                if ($.fn.postitall.globals.pasteHtml || options.features.pasteHtml) {
                    text = $(this).html();
                    //Default sanitize
                    text = text.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                                 //replace(/<[\/\!]*?[^<>]*?>/gi, '').
                                 replace(/<style[^>]*?>.*?<\/style>/gi, '').
                                 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
                    //htmlClean sanitize plugin
                    if($.htmlClean !== undefined) {
                        //htmlClean plugin
                        text = $.htmlClean(text, { format: true });
                    }
                }
                t.options.content = text;
                t.autoresize();
                t.save(obj, function(error) {
                    if(error !== undefined && error !== "") {
                        alert('Error saving content! \n\n'+error+'\n\nReverting to last known content.');
                        t.options.content = oldContent;
                        $('#pia_editable_' + t.options.id).html(oldContent);
                        $('#pia_editable_' + t.options.id).trigger('change');
                        t.autoresize();
                    }
                });
            }).html(t.options.content);

            if($.fn.postitall.globals.editable && options.features.editable) {
                content.attr('contenteditable', true);
            } else {
                content.attr('contenteditable', false).css("cursor", "auto");
            }

            //Buttom icon toolbar
            if(($.fn.postitall.globals.showInfo && options.features.showInfo)
            || ($.fn.postitall.globals.addNew && options.features.addNew)
            || ($.fn.postitall.globals.showMeta && options.features.showMeta
                && typeof options.meta !== 'undefined' && typeof options.meta === 'object')
            ) {
                var bottomToolbar = $('<div />', {
                    'id': 'idPIAIconBottom_'+ index,
                    'class': 'PIAIconBottom'
                });
                //Info icon (show whit showInfo or with meta)
                if (($.fn.postitall.globals.showInfo && options.features.showInfo)
                || ($.fn.postitall.globals.showMeta && options.features.showMeta
                    && typeof options.meta !== 'undefined' && typeof options.meta === 'object')
                ) {
                    var info = $('<a />', {
                        'href': '#',
                        'id': 'idInfo_'+index,
                        'class': ' PIAicon PIAinfoIcon',
                    }).click(function(e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            $('.backContent_'+index).hide();
                            $('#idBackInfo_'+index+' > .PIABox').css({
                                //'width': options.width - 10,
                                'height': options.height - 40
                            });
                            $('#idBackInfo_'+index+' .PIAtab span:nth-of-type(2)').css({
                                'width': options.width - 30,
                                'height': options.height - 60
                            });
                            $('#idBackInfo_'+index).show();
                            t.switchBackNoteOn('PIAflip2');
                            //Open first tab
                            if (($.fn.postitall.globals.showInfo && options.features.showInfo)
                            && ($.fn.postitall.globals.showMeta && options.features.showMeta
                                && typeof options.meta !== 'undefined' && typeof options.meta === 'object')) {
                                $('#idPIAtab-1'+index).click();
                                $('#idDateBackToolbar_' + index).hide();
                            }
                        }
                        e.preventDefault();
                    });
                    bottomToolbar.append(info);
                }
                //Copy note icon
                if($.fn.postitall.globals.addNew && options.features.addNew) {
                   
                    var newNote = $('<a />', {
                        'href': '#',
                        'id': 'pia_new_' + index,
                        'class': 'icofont icofont-copy-alt PIAicon'
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            $.PostItAll.new({
                                content: options.content,
                                posX: parseInt(options.posX, 10) + 10,
                                posY: parseInt(options.posY, 10) + 10,
                                width: options.width,
                                height: options.height,
                                features: options.features,
                                attachedTo: options.attachedTo,
                                style: options.style,
                            }, function(id, options, obj) {
                                setTimeout(function() {
                                    $('.PIApostit').css('z-index', 999995);
                                    $(id).css('z-index', 999999);
                                }, 100);
                            });
                        }
                        e.preventDefault();
                    });
                    bottomToolbar.append(newNote);
                }
                //Export note
                if(options.features.export) {
                    var exportNote = $('<a />', {
                        'href': '#',
                        'id': 'pia_export_' + index,
                        'class': 'PIAexport PIAicon'
                    }).click(function (e) {
                        if (obj.hasClass('PIAdragged')) {
                            obj.removeClass('PIAdragged');
                        } else {
                            $.PostItAll.export(index);
                        }
                        e.preventDefault();
                    });
                    bottomToolbar.append(exportNote);
                }

                toolbar.prepend(bottomToolbar);
            }

            //Front page
            var front = $('<div />', {
                'class': 'PIAfront',
                'dir': 'ltr',
            }).append(toolbar).append(content);

            //// BACK PAGES ////
            //Back: Toolbar
            var toolbar = this.__getBPToolbar(index);
            //Back 1: config
            var configInfo = this.__getBPConfig(index);
            //Back 2: delete
            var deleteInfo = this.__getBPDelete(index, obj);
            //Back 3: hideUntil
            var hideUntilPanel = this.__getBPHideUntil(index);
            //Back 4: Info & meta data
            var metaDataPanel = this.__getBPMetaData(index);

            //Back page content
            var back = $('<div />', {
                'class': 'PIAback PIAback1 PIAback2',
                'style': 'visibility: hidden;'
            })
            .append(toolbar)
            .append(configInfo)
            .append(deleteInfo)
            .append(hideUntilPanel)
            .append(metaDataPanel);

            //Create postit
            var postit = $('<div />', {
                'id': 'idPostIt_' + index,
                'data-id': index
            });
            //Add front
            postit.append(front);
            //Add back
            postit.append(back);

            //Convert relative position to prevent height and width in html layout
            if (options.position === "relative") {
                options.position = "absolute";
                options.posY = obj.offset().top + parseInt(options.posY, 10);
                options.posY += "px";
                options.posX = obj.offset().left + parseInt(options.posX, 10);
                options.posX += "px";
            }

            //Arrow
            var arrowClases = " ";
            var arrowPaso = false;
            if($.fn.postitall.globals.addArrow != "none" && options.features.addArrow != "none") {
                arrowClases += "arrow_box";
                switch(options.style.arrow) {
                    case 'top':
                        arrowClases += ' arrow_box_top';
                        arrowPaso = true;
                    break;
                    case 'right':
                        arrowClases += ' arrow_box_right';
                        arrowPaso = true;
                    break;
                    case 'bottom':
                        arrowClases += ' arrow_box_bottom';
                        arrowPaso = true;
                    break;
                    case 'left':
                        arrowClases += ' arrow_box_left';
                        arrowPaso = true;
                    break;
                }
            }

            //Modify final Postit Object
            obj.removeClass()
                .addClass('PIApostit ' + (options.style.tresd ? ' PIApanel ' : ' PIAplainpanel ')
                    + (options.position == "fixed" ? ' fixed ' : '') + arrowClases)
                .css('position', options.position)
                .css('top', options.posY)
                .css('width', options.width + 'px')
                .css('height', options.height + 'px')
                .css('background-color', options.style.backgroundcolor)
                .css('color', options.style.textcolor)
                .css('font-family', options.style.fontfamily)
                .css('font-size', options.style.fontsize)
                .css('border-bottom-color', options.style.backgroundcolor)
                .css('border-left-color', options.style.backgroundcolor)
                .css('border-top-color', options.style.backgroundcolor)
                .css('border-right-color', options.style.backgroundcolor);

            if (options.right !== "") {
                obj.css('right', options.right);
                //options.right = "";
            } else {
                obj.css('left', options.posX)
            }
            if (options.style.textshadow) {
                obj.addClass(t.getTextShadowStyle(options.style.textcolor));
            } else {
                obj.addClass('dosd');
            }
            obj.html(postit)
            .on('focus', '#pia_editable_' + index, function () {
                options.onSelect($.fn.postitall.globals.prefix + index);

                if(options.flags.blocked)
                    return;

                if($.fn.postitall.globals.htmlEditor && options.features.htmlEditor && $.trumbowyg) {
                    var paso = false;
                    //t.hoverOptions(index, false);
                    t.toogleToolbar('hide', ['idPIAIconBottom_', 'pia_toolbar_', '.selectedArrow_']);
                    $($.fn.postitall.globals.prefix + index + ' > .ui-resizable-handle').css('visibility', 'hidden');
                    $('#pia_editable_' + index).trumbowyg({
                        //prefix: 'trumbowyg-black trumbowyg-',
                        //btns: ['bold', 'italic', 'underline', 'strikethrough', '|', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'link'],
                        btns: ['formatting',
                          '|', 'btnGrp-design',
                          '|', 'link',
                          '|', 'insertImage',
                          '|', 'btnGrp-justify',
                          '|', 'btnGrp-lists',
                          '|', 'horizontalRule',
                          '|', 'viewHTML'],
                        closable: true,
                        fullscreenable: false,
                        autogrow: true,
                        semantic: true,
                    })
                    .on('tbwfocus', function(){
                        //console.log('tbwfocus!');
                        //$( "#pia_editable_" + index ).dblclick();
                        //delay(function(){$( "#pia_editable_" + index ).focus();},500);
                    })
                    .on('tbwblur', function(){
                        //console.log('tbwblur!');
                        //delay(function() {
                        //    $('#pia_editable_' + index).trumbowyg('destroy');
                        //},1000);
                        //$('.trumbowyg-close-button').click();
                    })
                    .on('tbwresize', function(){
                        //console.log('tbwresize!');
                        //delay(function() {
                        //    this.autoresize($($.fn.postitall.globals.prefix + index));
                        //},1000);
                    });
                    $('#pia_editable_' + index).on('tbwclose', function(){
                        //console.log('tbwclose!');
                        $('#pia_editable_' + index).attr('contenteditable', true);
                        $('#pia_editable_' + index).css('height', 'auto');
                        t.toogleToolbar('show', ['idPIAIconBottom_', 'pia_toolbar_', '.selectedArrow_']);
                        $($.fn.postitall.globals.prefix + index + ' > .ui-resizable-handle').css('visibility', '');

                        t.autoresize();
                        var highlightedId = $("#the_lights").data('highlightedId');
                        if(highlightedId) {
                            t.collapseNote();
                        }
                        if(!paso) {
                            paso = true;
                            delay(function() {
                                options.onRelease($.fn.postitall.globals.prefix + index);
                            }, 100);
                        }
                    });
                    t.enableKeyboardNav(function() {
                        $('.trumbowyg-close-button').click();
                        t.autoresize();
                    });
                    t.autoresize();
                }
                var objeto = $(this);
                objeto.data('before', objeto.html());
                return objeto;
            })
            /*.on('focusout', '[contenteditable]', function () {
                $('#pia_editable_' + index).trumbowyg('destroy');
                $('#pia_editable_' + index).attr('contenteditable', true);
                console.log('focusout!!', '#pia_editable_' + index);
                var objeto = $(this);
                return objeto;
            })*/
            .on('blur keyup paste input', '[contenteditable]', function (e) {
                var objeto = $(this);
                if (objeto.data('before') !== objeto.html()) {
                    delay(function() {
                        //console.log('change!');
                        var content = objeto.text();
                        if ($.fn.postitall.globals.pasteHtml || options.features.pasteHtml)
                            content = objeto.html();
                        objeto.data('before', content);
                        objeto.trigger('change');
                        options.onChange($.fn.postitall.globals.prefix + index);
                        //TODO : Validar que no es propaguen les tecles a l'aplicacio nativa
                        e.preventDefault();
                    }, 100);
                }
                return objeto;
            })
            .click(function (e) {
                $('.PIApostit').css('z-index', 999995);
                $(this).css('z-index', 999999);
            });

            if ($.ui) {
                if ($.fn.postitall.globals.draggable && options.features.draggable) {
                    obj.draggable({
                        //handle: ".PIApostit",
                        scroll: false,
                        start: function (e) {
                            //Remove draggable postit option
                            $('.PIApostit').css('z-index', 999995);
                            $(this).css('z-index', 999999);
                            $(this).draggable('disable');
                            if(!options.flags.minimized) {
                                t.switchTrasparentNoteOn();
                            }
                            if(options.attachedTo.element !== "") {
                                options.attachedTo.element = '';
                                options.attachedTo.fixed = false;
                            }
                            obj.addClass('PIAdragged');
                            //onSelect event
                            options.onSelect($.fn.postitall.globals.prefix + options.id);
                        },
                        stop: function () {
                            //Enable draggable postit option
                            $(this).draggable('enable');
                            t.autoresize();
                            options.right = '';
                            //if ($.fn.postitall.globals.savable && options.features.savable) {
                                if(!options.flags.minimized) {
                                    options.posY = obj.css('top');
                                    options.posX = obj.css('left');
                                    options.oldPosition.leftMinimized = undefined;
                                } else {
                                    options.oldPosition.leftMinimized = obj.css('left');
                                }
                                t.saveOptions(options);
                            //}
                            if(!options.flags.minimized) {
                                t.switchTrasparentNoteOff();
                            }
                            delay(function() {
                                if (obj.hasClass('PIAdragged')) {
                                    obj.removeClass('PIAdragged');
                                    //onRelease event
                                    options.onRelease($.fn.postitall.globals.prefix + options.id);
                                }
                            }, 200);
                        }
                    });
                }
                if ($.fn.postitall.globals.resizable &&  options.features.resizable) {
                    var pos = false;
                    //console.log('options.minHeight',options.minHeight);
                    obj.resizable({
                        animate: true,
                        helper: 'ui-resizable-helper',
                        minHeight: options.minHeight,
                        minWidth: options.minWidth,
                        start: function() {
                            t.switchTrasparentNoteOn();
                            //Change minheight on resizable
                            var tmpHeigth = $('#pia_editable_'+index).height();
                            if(tmpHeigth <= options.minHeight)
                                tmpHeigth = options.minHeight;
                            //$(this).resizable({minHeight: tmpHeigth });
                            //onSelect event
                            options.onSelect($.fn.postitall.globals.prefix + options.id);
                        },
                        stop: function () {
                            delay(function(){
                                //console.log('stop autoresize');
                                t.autoresize();
                                options.right = '';
                                //if ($.fn.postitall.globals.savable && options.features.savable) {
                                    options.posY = obj.css('top');
                                    options.posX = obj.css('left');
                                    t.autoresize();
                                    t.saveOptions(options);
                                //}
                                //onRelease event
                                options.onRelease($.fn.postitall.globals.prefix + options.id);
                            }, 1000);
                            t.switchTrasparentNoteOff();
                        }
                    });
                }
            } else {
                //TODO : Resizable without jquer-ui
                if ($.fn.postitall.globals.resizable &&  options.features.resizable) {
                    obj.css('overflow', 'hidden');
                    obj.css('resize', 'both');
                    obj.find('.PIAfront').css('height', '92%');
                    obj.find('.PIAIconBottom').css('bottom', '0%');
                }
            }
            //hide back
            $('.backContent_' + options.id).hide();

            if(!options.style.tresd) {
                $('#generalstyle_' + options.id).click();
            }
            if(!options.style.textshadow) {
                $('#textshadow_' + options.id).click();
            }
            //Postit fixed?
            if($.fn.postitall.globals.fixed && options.features.fixed && (options.flags.fixed || options.position == "fixed")) {
                options.flags.fixed = false;
                $('#pia_fixed_' + options.id).click();
            }
            //Postit expanded?
            if($.fn.postitall.globals.expand && options.features.expand && options.flags.expand) {
                options.flags.expand = false;
                $('#pia_expand_' + options.id).click();
                delay(function() {
                    $('#pia_editable_' + options.id).focus();
                }, 500);
            }
            //Postit bloqued?
            if(($.fn.postitall.globals.blocked || options.features.blocked) && options.flags.blocked) {
                options.flags.blocked = false;
                $('#pia_blocked_' + options.id).click();
            }
            //Postit minimized?
            if($.fn.postitall.globals.minimized && options.features.minimized && options.flags.minimized) {
                options.flags.minimized = false;
                $('#pia_minimize_' + options.id).click();
            }

            //Select arrow in front
            if( ($.fn.postitall.globals.addArrow == "front" || $.fn.postitall.globals.addArrow == "all")
            || (options.features.addArrow == "all" || options.features.addArrow == "front") ) {
                var checks = "<div class='PIAicon icon_box icon_box_top selectedArrow_"+index+"' data-index='"+index+"' data-value='top'><span class='ui-icon ui-icon-triangle-1-n'></span></div>";
                checks += "<div class='PIAicon icon_box icon_box_right selectedArrow_"+index+"' data-index='"+index+"' data-value='right'><span class='ui-icon ui-icon-triangle-1-e'></span></div>";
                checks += "<div class='PIAicon icon_box icon_box_bottom selectedArrow_"+index+"' data-index='"+index+"' data-value='bottom'><span class='ui-icon ui-icon-triangle-1-s'></span></div>";
                checks += "<div class='PIAicon icon_box icon_box_left selectedArrow_"+index+"' data-index='"+index+"' data-value='left'><span class='ui-icon ui-icon-triangle-1-w'></span></div>";
                obj.append(checks);

                $('.selectedArrow_'+index).click(function(e) {
                    if (obj.hasClass('PIAdragged')) {
                        obj.removeClass('PIAdragged');
                    } else {
                        options = t.arrowChangeOption($(this).attr('data-value'));
                    }
                    e.preventDefault();
                });
            }
            if(arrowPaso) {
                var icon = $($.fn.postitall.globals.prefix+index).find('div[data-value="'+options.style.arrow+'"]');
                icon.show();
                icon.find('span').hide();
                //console.log('arrowPaso', arrowPaso, index, options.style.arrow);
            }

            //Change hidden state if note is higlighted
            if(options.flags.highlight)
                options.flags.hidden = false;

            //Show postit
            if(!options.flags.hidden) {
                obj.slideDown(function () {
                    //Rest of actions
                    //Config: text shadow
                    $('#textshadow_' + index).click(function () {

                        if ($(this).is(':checked')) {
                            $(this).closest('.PIApostit').find('.PIAcontent').addClass(t.getTextShadowStyle($('#minicolors_text_' + index).val())).removeClass('dosd');
                            options.style.textshadow = true;
                        } else {
                            $(this).closest('.PIApostit').find('.PIAcontent').addClass('dosd').removeClass('tresd').removeClass('tresdblack');
                            options.style.textshadow = false;
                        }
                        t.setOptions(options, true);
                    });
                    //3d or plain
                    $('#generalstyle_' + index).click(function () {
                        if ($(this).is(':checked')) {
                            $($.fn.postitall.globals.prefix + index).removeClass('PIAplainpanel').addClass('PIApanel');
                            options.style.tresd = true;
                        } else {
                            $($.fn.postitall.globals.prefix + index).removeClass('PIApanel').addClass('PIAplainpanel');
                            options.style.tresd = false;
                        }
                        t.setOptions(options, true);
                    });
                    //Background and text color
                    if ($.minicolors) {
                        //Config: change background-color
                        $('#minicolors_bg_' + index).minicolors({
                            //opacity: true,
                            change: function (hex, rgb) {
                                console.log(hex, rgb);
                                $($.fn.postitall.globals.prefix + index).css('background-color', hex);
                                //$($.fn.postitall.globals.prefix + index).css('opacity', rgb);
                                options.style.backgroundcolor = hex;
                                t.setOptions(options, true);
                            }
                        });
                        //Config: text color
                        $('#minicolors_text_' + index).minicolors({
                            change: function (hex) {
                                $($.fn.postitall.globals.prefix + index).css('color', hex);
                                options.style.textcolor = hex;
                                t.setOptions(options, true);
                            }
                        });
                    } else {
                        $('#minicolors_bg_' + index).change(function () {
                            $(this).closest('.PIApostit').css('background-color', $(this).val());
                            options.style.backgroundcolor = $(this).val();
                            t.setOptions(options, true);
                        });
                        $('#minicolors_text_' + index).change(function () {
                            $(this).closest('.PIApostit').css('color', $(this).val());
                            options.style.textcolor = $(this).val();
                            t.setOptions(options, true);
                        });
                    }

                    //Autoresize to fit content when content load is done
                    t.autoresize();
                });
            } else {
                if(options.features.hideUntil !== null)
                    t.showAgain(index, options.features.hideUntil);
                else
                    console.log('estic amagat sense data de fi', options.features);

            }

            //Hover options
            if(!options.flags.minimized && !options.flags.expand && !options.flags.blocked) {
                t.hoverOptions(index, true);
            }

            //disable draggable on mouseenter in contenteditable div
            if ($.fn.postitall.globals.draggable && options.features.draggable) {
                $("#pia_editable_" + index).mouseenter(function (e) {
                    if($.ui) obj.draggable({disabled: true});
                }).mouseleave(function(e) {
                    if($.ui && !options.flags.blocked && !options.flags.expand) {
                        obj.draggable({disabled: false});
                    }
                });
            }

            //Bind paste event
            $("#pia_editable_" + index).bind('paste', function (e){
                var element = this;
                $("#pia_editable_" + index).css("opacity", "0");
                setTimeout(function(){
                    var text = "";
                    if (!$.fn.postitall.globals.pasteHtml || !options.features.pasteHtml) {
                        //Text format
                        text = $(element).text();
                    } else {
                        //Html format
                        text = $(element).html();
                        //Default sanitize
                        text = text.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                                     //replace(/<[\/\!]*?[^<>]*?>/gi, '').
                                     replace(/<style[^>]*?>.*?<\/style>/gi, '').
                                     replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
                        //htmlClean sanitize plugin
                        if($.htmlClean !== undefined) {
                            //htmlClean plugin
                            text = $.htmlClean(text, { format: true });
                        }
                    }
                    $("#pia_editable_" + index).html(text);
                    t.autoresize();
                    $("#pia_editable_" + index).css("opacity", "1");
                }, 100);
            });

            //Bind click event
            //$(obj).click(function() {
            //    options.onSelect($.fn.postitall.globals.prefix + index);
            //});
            //Bind dblclick event
            $(obj).dblclick(function() {
                options.onDblClick($.fn.postitall.globals.prefix + index);
            });

            //Stop key propagation on contenteditable
            $("#pia_editable_" + index).keydown(function (e) {
                e.stopPropagation();
            });

            var t = this;
            setTimeout(function() {
                //Save in storage
                t.saveOptions(options);
                //OnCreated event (id, options, obj)
                options.onCreated($.fn.postitall.globals.prefix + index, options, obj);
                //Highlight note
                if(options.flags.highlight) {
                    t.scrollToNotePosition(options.posY, options.height, options.posX, options.width, function() {
                        t.switchOffLights();
                        t.enableKeyboardNav();
                    });
                }
            },200);

            //chaining
            return obj;
        },

        //// Back panels

        //Toolbar
        __getBPToolbar : function(index) {
            var t = this;
            var options = t.options;
            //Creation date
            var d = new Date(options.created);
            //Back page: toolbar
            var toolbar = $('<div />', { 'class': 'PIAtoolbarBack'  }) //, 'style': barCursor })
                //Close config icon
                .append($('<div />', {
                    'id': 'pia_close_' + index,
                    'class': 'PIAclose PIAicon',
                    'style': 'display:block;'
                })
                .click(function (e) {
                    t.switchBackNoteOff('PIAflip2');
                    t.switchOnLights();
                    e.preventDefault();
                })
            )
            .append($('<span />', {
                    'id': 'idDateBackToolbar_' + index,
                    'class': 'PIAdateBackToolbar'
                }).html(d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")")
            );
            return toolbar;
        },

        //Config back panel
        __getBPConfig : function(index) {
            var t = this;
            var options = t.options;
            //Back page: config content
            var content = "";
            if($.fn.postitall.globals.changeoptions) {
                //Background color
                var bgLabel = $('<label />', {
                    'class': 'minicolors_label',
                    'for': 'minicolors_bg_' + index,
                }).html('Background-color:');
                var bgString = $('<input />', {
                    'class': 'minicolors',
                    'id': 'minicolors_bg_' + index,
                    'type': 'text',
                    'height': '14px',
                    'style': 'font-size:smaller;',
                    'value': options.style.backgroundcolor,
                    'data-default-value': options.style.backgroundcolor
                });
                //Text color
                var tcLabel = $('<label />', {
                    'class': 'minicolors_label',
                    'for': 'minicolors_text_' + index,
                    'style': 'margin-top: 5px;'
                }).html('Text color:');
                var tcString = $('<input />', {
                    'class': 'minicolors',
                    'id': 'minicolors_text_' + index,
                    'type': 'text',
                    'height': '14px',
                    'style': 'font-size:smaller;',
                    'value': options.style.textcolor,
                    'data-default-value': options.style.textcolor
                });
                //Text shadow
                var checked = '';
                if (options.style.textshadow) {
                    checked = 'checked';
                }
                var tsString = $('<input />', {
                    'id': 'textshadow_' + index,
                    'type': 'checkbox',
                    'checked': checked
                });
                var tsLabel = $('<label />', {
                    'class': 'minicolors_label',
                    'for': 'textshadow_' + index
                }).append(tsString).append(' Text shadow');
                //3d style
                var checked2 = '';
                if (options.style.tresd) {
                    checked2 = 'checked';
                }
                var gsString = $('<input />', {
                    'id': 'generalstyle_' + index,
                    'type': 'checkbox',
                    'checked': checked2
                });
                var gsLabel = $('<label />', {
                    'class': 'minicolors_label',
                    'for': 'generalstyle_' + index,
                }).append(gsString).append(' 3D style');

                //Add arrow selection in options
                var aaString = "";
                if($.fn.postitall.globals.addArrow == "back" || $.fn.postitall.globals.addArrow == "all"
                || options.features.addArrow == "back" || options.features.addArrow == "all") {
                    aaString = $('<select />', {
                        'id': 'idAddArrow_' + index,
                        'style': 'margin-top: 5px;',
                    });
                    aaString.append('<option value="none" '+(options.style.arrow == "none" ? 'selected' : '')+'>Arrow in:</option>');
                    aaString.append('<option value="top" '+(options.style.arrow == "top" ? 'selected' : '')+'>Top</option>');
                    aaString.append('<option value="right" '+(options.style.arrow == "right" ? 'selected' : '')+'>Right</option>');
                    aaString.append('<option value="bottom" '+(options.style.arrow == "bottom" ? 'selected' : '')+'>Bottom</option>');
                    aaString.append('<option value="left" '+(options.style.arrow == "left" ? 'selected' : '')+'>Left</option>');
                    aaString.change(function(e) {
                        options = t.arrowChangeOption($(this).val());
                        e.preventDefault();
                    });
                }

                content = $('<div />', {
                    'id': 'idBackConfig_'+index,
                    'class': 'PIAcontent backContent_'+index,
                }).append($('<div />', {
                    'class': 'PIABox PIAconfigBox',
                    //'style': 'margin-left: -5px;',
                    //'width': options.width - 10,
                    //'width': 'auto',
                    'height': options.height - 40
                }).append("<div class='PIAtitle'>Note config</div>")
                    .append(bgLabel).append(bgString) // Bg color
                    .append(gsLabel)  // 3d or plain style
                    .append(tcLabel).append(tcString) // Text color
                    .append(tsLabel) // Text shadow
                    .append(aaString) //Arrow selection
                );
            }
            return content;
        },

        //Delete back panel
        __getBPDelete : function(index, obj) {
            var t = this;
            var options = t.options;
            var deleteInfo = "";
            if($.fn.postitall.globals.askOnDelete && options.features.askOnDelete) {
                deleteInfo = $('<div />', {
                    'id': 'idBackDelete_' + index,
                    'class': 'PIAcontent backContent_'+index
                }).append($('<div />', {
                        'id': 'pia_confirmdel_' + index,
                        'class': 'PIABox PIAwarningBox',
                        //'style': 'margin-left: -5px;',
                        //'width': options.width - 10,
                        //'width': 'auto',
                        'height': options.height - 40
                    }).append("<div class='PIAtitle'>Delete note!</div>")
                        .append($('<span />', {
                                'style': 'line-height:10px;font-size:10px;',
                                'class': 'PIAdelwar float-left'
                            }))
                            .append($('<div />', { 'class': 'PIAconfirmOpt' }).append(
                                    $('<a />', { 'id': 'sure_delete_' + index, 'href': '#' })
                                    .click(function(e) {
                                        t.switchOnLights();
                                        var id = obj.data('PIA-id');
                                        t.destroy();
                                        e.preventDefault();
                                    }).append($('<span />', { 'class': 'PIAdelyes' }).append("Delete this"))))
                            .append($('<div />', { 'class': 'PIAconfirmOpt' }).append(
                                    $('<a />', { 'id': 'all_' + index, 'href': '#' })
                                    .click(function(e) {
                                        t.switchOnLights();
                                        $.PostItAll.destroy();
                                        e.preventDefault();
                                    }).append($('<span />', { 'class': 'PIAdelyes' }).append("Delete all"))))
                            .append($('<div />', { 'class': 'PIAconfirmOpt' }).append(
                                    $('<a />', { 'id': 'cancel_' + index, 'href': '#' })
                                    .click(function(e) {
                                        t.switchOnLights();
                                        $('#pia_editable_' + index).show();
                                        t.switchBackNoteOff('PIAflip2');
                                        e.preventDefault();
                                    }).append($('<span />', { 'class': 'PIAdelno' }).append("Cancel"))))
                            .append($('<div />', { 'class': 'clear', 'style': 'line-height:10px;font-size:10px;font-weight: bold;' }).append("*This action cannot be undone"))
                );
            }
            return deleteInfo;
        },

        //Hide Until
        __getBPHideUntil : function(index) {
            var t = this;
            var options = t.options;
            var panel = "";
            if($.fn.postitall.globals.askOnHide && options.features.askOnHide) {
                var textInfo = "<div class='PIAtitle'>Hide note</div>";
                var normalForm = "<div id='PIAhideUntilNormal_"+index+"'>";
                normalForm += "<div>For how long do you want to hide this note?</div>";
                normalForm += "<input type='text' id='numericIncrement_" + index + "' size=3 maxlength=2 value='30'>"
                normalForm += "&nbsp;<select id='selectedIncrement_"+index+"'><option>Seconds</option><option>Minutes</option><option>Hours</option><option>Days</option></select>";
                normalForm += "</div>";
                var formContent = $('<div />');
                var datePickerForm = "";

                formContent.append(normalForm);
                if($.ui) {
                    datePickerForm += "<div id='PIAhideUntilDatePicker_"+index+"' style='display:none;'>";
                    datePickerForm += "<div>The note will be displayed again on the following datetime : </div>";
                    if($.ui.timepicker) {
                        datePickerForm += "<input type='text' id='datepicker_"+index+"' placeholder='dd/mm/yyyy hh:mm'>";
                    } else {
                        datePickerForm += "<input type='text' id='datepicker_"+index+"' size=11 placeholder='dd/mm/yyyy'>";
                        datePickerForm += "&nbsp;<input type='textbox' placeholder='hh:mm' id='timepicker_" + index + "' size=6>";
                    }
                    datePickerForm +="</div>";
                    formContent.append(datePickerForm)
                    .append($('<label />').append($('<input />', { 'id': 'PIAhideUntilCB_' + index, 'type': 'checkbox' }).click(function(e) {
                            if ($(this).is(':checked')) {
                                if($.ui.timepicker) {
                                    $('#datepicker_'+index).datetimepicker({ minDate: 0, dateFormat: "yy-mm-dd", timeFormat: "HH:mm" });
                                } else {
                                    $('#datepicker_'+index).datepicker({ minDate: 0, dateFormat: "yy-mm-dd" });
                                }
                                $('#PIAhideUntilDatePicker_'+index).show();
                                $('#PIAhideUntilNormal_'+index).hide();
                            } else {
                                $('#PIAhideUntilDatePicker_'+index).hide();
                                $('#PIAhideUntilNormal_'+index).show();
                            }
                        })
                    ).append(' Datepicker'));
                }

                panel = $('<div />', {
                    'id': 'idHideUntil_'+index,
                    'class': 'PIAcontent backContent_'+index
                }).append(
                    $('<div />', {
                        'class': 'PIAinfoBox PIABox',
                        'height': options.height - 40
                    }).append(textInfo)
                    .append(formContent)
                    .append($('<span />', { 'id': 'PIAhideUntilError_' + index}))
                    .append($('<br />'))
                    .append($('<button />', { 'text': 'Hide' })
                        .click(function(e) {
                            var dat = new Date();
                            var paso = false;
                            if($.ui) {
                                if($('#PIAhideUntilCB_' + index).is(':checked')) {
                                    paso = true;
                                    var gmt = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
                                    var datestr = "";
                                    if($.ui.timepicker) {
                                        //With timepicker
                                        datestr = $('#datepicker_'+index).val();
                                    } else {
                                        //With datepicker
                                        datestr = $('#datepicker_'+index).val() + " " + $('#timepicker_'+index).val();
                                    }
                                    datestr += " " + gmt;
                                    dat = new Date(datestr);
                                }
                            }
                            if(!paso) {
                                //Normal
                                var inc = parseInt($('#numericIncrement_' + index).val(), 10);
                                if(inc < 0) inc = 1;
                                if(inc > 99) inc = 99;
                                switch ($('#selectedIncrement_' + index).val()) {
                                    case 'Days':
                                        dat = dat.addDays(inc);
                                        break;
                                    case 'Hours':
                                        dat = dat.addHours(inc);
                                        break;
                                    case 'Minutes':
                                        dat = dat.addMinutes(inc);
                                        break;
                                    case 'Seconds':
                                    default:
                                        dat = dat.addSeconds(inc);
                                        break;
                                }
                            }
                            if(!isNaN(dat)) {
                                options.features.hideUntil = dat;
                                t.switchOnLights();
                                t.hide(index);
                                t.saveOptions(options);
                                t.showAgain(index, dat);
                            } else {
                                $('#PIAhideUntilError_' + index).css('color', 'red').html('Invalid date!').slideDown();
                                setTimeout(function() { $('#PIAhideUntilError_' + index).slideUp(); }, 1000);
                            }
                            e.preventDefault();
                        })
                    )
                    .append(
                        $('<button />', { 'text': 'Cancel' })
                        .click(function(e) {
                            t.switchOnLights();
                            $('#pia_editable_' + index).show();
                            t.switchBackNoteOff('PIAflip2');
                            e.preventDefault();
                        })
                    )
                );
            }
            return panel;
        },

        //Meta data panel
        __getBPMetaData : function(index) {
            var t = this;
            var options = t.options;
            //Show info tab?
            var addInfo = false;
            if($.fn.postitall.globals.showInfo && options.features.showInfo) {
                addInfo = true;
            }
            //Show meta data tab?
            var addMeta = false;
            if($.fn.postitall.globals.showMeta && options.features.showMeta
            && typeof options.meta !== 'undefined' && typeof options.meta === 'object') {
                addMeta = true;
            }
            //Nothing to show
            if(!addInfo && !addMeta)
                return "";

            //Info note
            if(addInfo) {
                var d = new Date(options.created);
                var textDate = d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")";
                var textInfo = "";
                if(!addMeta)
                    textInfo += "<div class='PIAtitle'>Note info</div>";
                textInfo += "<strong>Id:</strong> "+$.fn.postitall.globals.prefix+index+"<br>";
                textInfo += "<strong>Created on:</strong> "+textDate+"<br>";
                if(typeof options.domain === 'object' && options.domain.indexOf("http") >= 0)
                    textInfo += "<strong>Domain:</strong> "+options.domain+"<br>";
                textInfo += "<strong>Page:</strong> "+options.page+"<br>";
                textInfo += "<strong>Op.System:</strong> " + t.getOSName() + " - "+options.osname+"<br>";
            }

            //Meta data
            if(addMeta) {
                //Get form input
                var _FormElement = function(index, key, element) {
                    var ret = "";
                    if(typeof element === 'object' && element.type !== undefined) {
                        ret = $("<div />");
                        //On-change event
                        var _onChange = function(e) {
                            var tmpObj = $(this)
                            delay(function() {
                                //Save meta-data
                                options.meta[tmpObj.attr("data-title")].value = tmpObj.val();
                                t.setOptions(options, true);
                            },500);
                        };
                        var objElement = null;
                        var val = element.value;
                        //Input properties
                        var tmpObj = { 'name': 'input_' + key + '_' + index, 'data-title': key };
                        if(element.maxlength !== undefined) tmpObj.maxlength = parseInt(element.maxlength, 10);
                        if(element.size !== undefined) tmpObj.size = parseInt(element.size, 10);
                        if(element.placeholder !== undefined) tmpObj.placeholder = element.placeholder;
                        //type treatment
                        switch(element.type) {
                            //Combo type
                            case 'combo':
                                objElement = $('<select />', tmpObj).keypress(_onChange).change(_onChange);
                                $(element.values).each(function(i,e) {
                                    $.each(this, function (tmpName, tmpValue) {
                                        var tmpSelOpt = { 'value' : tmpName };
                                        if(val !== undefined && val === tmpName) tmpSelOpt.selected = 'selected';
                                        objElement.append($('<option />', tmpSelOpt).append(tmpValue));
                                    });
                                });
                                break;
                            //Textarea type
                            case 'textarea':
                                objElement = $('<textarea />', tmpObj).keypress(_onChange).change(_onChange).append(val);
                                break;
                            //Default & input type
                            default:
                            case 'input':
                                tmpObj.type = 'text';
                                if(val !== undefined) tmpObj.value = val;
                                objElement = $('<input />', tmpObj).keypress(_onChange).change(_onChange);
                                break;
                        }
                        //Add form element
                        ret.append($("<label />").append(key).append($('<br />')).append(objElement));
                    }
                    return ret;
                };

                var formInfo = $('<div />', { 'class' : 'meta-form' });
                $(options.meta).each(function() {
                    $.each(this, function (key, element) {
                        formInfo.append(_FormElement(index, key, element));
                   });
                });
            }

            var finalPanel = "";
            var panelClass = "";
            if(addInfo && addMeta) {
                //Tabs : info & meta
                panelClass = "PIApanelBox";
                finalPanel = $('<div />', { 'class' : 'PIAtabs' }).append(
                    $('<div />', { 'id' : 'PIAtab-1'+index, 'class': 'PIAtab' }).append(
                        $('<span />').append(
                            $('<a />', { 'id' : 'idPIAtab-1'+index }).click(function() {
                                $('#PIAtab-1'+index).addClass('PIAtab_selected');
                                $('#PIAtab-2'+index).removeClass('PIAtab_selected');
                                $('#idPIApanel1'+index).show();
                                $('#idPIApanel2'+index).hide();
                            }).append("Note info")
                        )
                    ).append(
                        $('<span />', { 'id' : 'idPIApanel1'+index, 'class' : 'PIAinfoBox' }).append(textInfo)
                    )
                ).append(
                    $('<div />', { 'id' : 'PIAtab-2'+index, 'class': 'PIAtab' }).append(
                        $('<span />').append(
                            $('<a />', { 'id' : 'idPIAtab-2'+index }).click(function() {
                                $('#PIAtab-1'+index).removeClass('PIAtab_selected');
                                $('#PIAtab-2'+index).addClass('PIAtab_selected');
                                $('#idPIApanel1'+index).hide();
                                $('#idPIApanel2'+index).show();
                            }).append("Meta data")
                        )
                    ).append(
                        $('<span />', { 'id' : 'idPIApanel2'+index, 'class' : 'PIAinfoBox' }).append(formInfo)
                    )
                );
            } else if(addInfo) {
                //Only info
                panelClass = "PIAinfoBox";
                finalPanel = textInfo
            } else {
                //Only meta
                panelClass = "PIAinfoBox";
                var formTitle = $('<div />', { 'class' : 'PIAtitle' }).append("Meta data");
                finalPanel = formInfo.prepend(formTitle);
            }

            //Final obj
            var panel = $('<div />', {
                'id': 'idBackInfo_'+index,
                'class': 'PIAcontent backContent_'+index
            }).append(
                $('<div />', {
                    'class': 'PIABox ' + panelClass,
                    'height': options.height - 40
                }).append(finalPanel)
            );
            return panel;
        }
    };

    //Drag postits
    //used if jQuery UI is not loaded
    $.fn.drags = function (opt) {

        opt = $.extend({handle: "", cursor: "move"}, opt);

        var onMouseDown = function(e) {
            var $drag;
            if (opt.handle === "") {
                $drag = $(this).parent().parent().parent().addClass('draggable');
            } else {
                $drag = $(this).parent().parent().parent().addClass('active-handle').parent().addClass('draggable');
            }
            var options = $drag.data('PIA-options');
            if(options.flags.minimized || options.flags.expand)
                return;
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            var onMouseMove = function(e) {
                $drag.addClass('PIAdragged');
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            };
            $drag.css('z-index', 10000).parents()
            .on("mousemove", onMouseMove)
            .on("mouseup",function() {
                $(this).off("mousemove", onMouseMove);
                delay(function() {
                    $drag.removeClass('PIAdragged');
                },200);
            });
            e.preventDefault(); // disable selection
        };

        var onMouseUp = function(e) {
            var $drag;
            if (opt.handle === "") {
                $(this).removeClass('draggable');
                $drag = $(this).parent().parent().parent();
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
                $drag = $(this).parent().parent().parent().parent();
            }
            var options = $drag.data('PIA-options');
            options.right = '';
            if(!options.flags.minimized) {
                options.posY = $drag.css('top');
                options.posX = $drag.css('left');
                options.oldPosition.leftMinimized = undefined;
            } else {
                options.oldPosition.leftMinimized = $drag.css('left');
            }
            $($.fn.postitall.globals.prefix + options.id).postitall('save', options);
        };

        var $el = this;
        if (opt.handle !== "") {
            $el = this.find(opt.handle);
        }
        return $el.css('cursor', opt.cursor).on("mousedown", onMouseDown).on("mouseup", onMouseUp);
    };

    /********* STORAGE ************/

    // Global storage var
    var $storage = null;

    // Storage Manager
    var storageManager = {
        add: function (obj, callback) {
            this.loadManager(function() {
                $storage.add(obj, function(error) {
                    if(callback != null) callback(error);
                });
            });
        },
        get: function (id, callback) {
            this.loadManager(function() {
                if(id !== "") {
                    $storage.get(id, function(varvalue) {
                        if(callback != null) callback(varvalue);
                    });
                } else {
                    if(callback != null) callback(null);
                }
            });
        },
        getAll: function (callback) {
            this.loadManager(function() {
                $storage.getAll(function(varvalue) {
                    if(callback != null) callback(varvalue);
                });
            });
        },
        getByKey: function (key, callback) {
            this.loadManager(function() {
                if (key != null && key.slice(0,7) === "PostIt_") {
                    key = key.slice(7,key.length);
                    if(key !== "") {
                        storageManager.get(key, callback);
                    } else {
                        if(callback != null) callback(null);
                    }
                } else {
                    if(callback != null) callback(null);
                }
            });
        },
        remove: function (id, callback) {
            this.loadManager(function() {
                $storage.remove(id, function(varvalue) {
                    if(callback != null) callback();
                });
            });
        },
        removeDom: function (options, callback) {
            this.loadManager(function() {
                $storage.removeDom(options, function() {
                    if(callback != null) callback();
                });
            });
        },
        clear: function (options, callback) {
            this.loadManager(function() {
                $storage.clear(function() {
                    if(callback != null) callback();
                });
            });
        },
        getlength: function (callback) {
            this.loadManager(function() {
                $storage.getlength(function(length) {
                    if(callback != null) callback(length);
                });
            });
        },
        key: function (i, callback) {
            this.loadManager(function() {
                $storage.key(i, function(name) {
                    if(callback != null) callback(name);
                });
            });
        },
        view: function (callback) {
            this.loadManager(function() {
                $storage.view();
            });
        },
        //Load storage manager
        loadManager: function(callback) {
            if($storage === null) {
                this.getStorageManager(function($tmpStorage) {
                    $storage = $tmpStorage;
                    callback($storage)
                });
            } else {
                callback($storage);
            }
        },
        // Get storage manager
        getStorageManager: function(callback) {
            if (typeof externalManager !== 'undefined') callback(externalManager);
            else callback(localManager);
        }
    };

    // local storage manager
    var localManager = {
        add: function (obj, callback) {
            var varname = 'PostIt_' + obj.id.toString();
            var testPrefs = JSON.stringify(obj);
            $localStorage.setItem(varname, testPrefs);
            //console.log('Saved', varname, testPrefs);
            if(callback != null) callback("");
        },
        get: function (id, callback) {
            var varname = 'PostIt_' + id.toString();
            var varvalue = $localStorage.getItem(varname);
            if(varvalue != null)
                varvalue = JSON.parse(varvalue);
            else
                varvalue = "";
            //console.log('Loaded', varname, varvalue);
            if(callback != null) callback(varvalue);
        },
        remove: function (id, callback) {
            $localStorage.removeItem('PostIt_' + id);
            if(callback != null) callback();
        },
        removeDom: function (options, callback) {
            this.clear(callback);
        },
        clear: function (callback) {
            $localStorage.clear();
            if(callback != null) callback();
        },
        getlength: function (callback) {
            callback($localStorage.length);
        },
        key: function (i, callback) {
            i--;
            var name = $localStorage.key(i);
            callback(name);
        },
        view: function () {
            console.log('view local');
            console.log($localStorage);
        },
        getAll: function (callback) {
            console.log('TODO getAll on localStorage');
        }
    };

    //Initialize environement
    $(document).ready(function() {
        $.PostItAll.__initialize();
    });

}(jQuery, window.localStorage));
