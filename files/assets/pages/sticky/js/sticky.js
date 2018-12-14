  'use strict';
  $(document).ready(function() {
      var $window = $(window);
      if ($window.width() <= 767) {

          setWindowSticky();
      } else {
          setSticky();
      }

  });

  $(window).on('resize',function() {
      var $window = $(window);
      if ($window.width() <= 767) {

          setWindowSticky();
      } else {
          setSticky();
      }

  });

  function setWindowSticky() {


      $('#notes').postitall({
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          width: 150,
          height: 200,
          posX: 50,
          posY: 200,
          style: {
              backgroundcolor: '#4680ff', //Background color in new postits when randomColor = false
              textcolor: '#fff', //Text color
              fontfamily: 'Open Sans', //Default font
              fontsize: 'small', //Default font size
              arrow: 'none', //Default arrow : none, top, right, bottom, left
          },
      });


      $('#idRunTheCode').click(function(e) {
          /* */
          var a = $("#the_notes div.PIApostit").last().css("top");
          var b = $("#the_notes div.PIApostit").last().css("left");
          $.PostItAll.new({
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              width: 150,
              height: 200,
              posX: parseInt(b, 10) + 10, //185
              posY: parseInt(a, 10),
              /*posX :410,
              posY : 200,*/
              style: {
                  backgroundcolor: '#4680ff',
                  textcolor: '#fff', //Text color
                  fontfamily: 'Open Sans', //Default font
                  fontsize: 'small', //Default font size
                  arrow: 'none', //Default arrow : none, top, right, bottom, left
              },

          });
          e.preventDefault();
      });

      //Global vars : enable and disable features and change the notes behaviour
      $.fn.postitall.globals = {
          prefix: '#PIApostit_', //Id note prefixe
          filter: 'domain', //Options: domain, page, all
          savable: false, //Save postit in storage
          randomColor: true, //Random color in new postits
          toolbar: true, //Show or hide toolbar
          autoHideToolBar: false, //Animation effect on hover over postit showing/hiding toolbar options
          removable: true, //Set removable feature on or off
          askOnDelete: false, //Confirmation before note removal
          draggable: true, //Set draggable feature on or off
          resizable: true, //Set resizable feature on or off
          editable: true, //Set contenteditable and enable changing note content
          changeoptions: false, //Set options feature on or off
          blocked: false, //Postit can not be modified
          minimized: true, //true = minimized, false = maximixed
          expand: true, //Expand note
          fixed: false, //Allow to fix the note in page
          addNew: true, //Create a new postit
          showInfo: false, //Show info icon
          pasteHtml: false, //Allow paste html in contenteditor
          htmlEditor: false, //Html editor (trumbowyg)
          autoPosition: true, //Automatic reposition of the notes when user resizes the screen
          export: false,
          addArrow: 'back' //Add an arrow to notes : none, front, back, all
      };
  }

  function setSticky() {

      $('#notes').postitall({
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          width: 150,
          height: 200,
          posX: 50,
          posY: 200,
          style: {
              backgroundcolor: '#4680ff', //Background color in new postits when randomColor = false
              textcolor: '#fff', //Text color
              fontfamily: 'Open Sans', //Default font
              fontsize: 'small', //Default font size
              arrow: 'none', //Default arrow : none, top, right, bottom, left
          },
      });

      $('#notes1').postitall({
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          width: 150,
          height: 200,
          posX: 230,
          posY: 200,
          style: {
              backgroundcolor: '#4680ff', //Background color in new postits when randomColor = false
              textcolor: '#fff', //Text color
              fontfamily: 'Open Sans', //Default font
              fontsize: 'small', //Default font size
              arrow: 'none', //Default arrow : none, top, right, bottom, left
          },
      });


      $('#idRunTheCode').click(function(e) {
          /* */
          var a = $("#the_notes div.PIApostit").last().css("top");
          var b = $("#the_notes div.PIApostit").last().css("left");
          $.PostItAll.new({
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              width: 150,
              height: 200,
              posX: parseInt(b, 10) + 10, //185
              posY: parseInt(a, 10),
              /*posX :410,
              posY : 200,*/
              style: {
                  backgroundcolor: '#4680ff',
                  textcolor: '#fff', //Text color
                  fontfamily: 'Open Sans', //Default font
                  fontsize: 'small', //Default font size
                  arrow: 'none', //Default arrow : none, top, right, bottom, left
              },

          });
          e.preventDefault();
      });

      //Global vars : enable and disable features and change the notes behaviour
      $.fn.postitall.globals = {
          prefix: '#PIApostit_', //Id note prefixe
          filter: 'domain', //Options: domain, page, all
          savable: false, //Save postit in storage
          randomColor: true, //Random color in new postits
          toolbar: true, //Show or hide toolbar
          autoHideToolBar: false, //Animation effect on hover over postit showing/hiding toolbar options
          removable: true, //Set removable feature on or off
          askOnDelete: false, //Confirmation before note removal
          draggable: true, //Set draggable feature on or off
          resizable: true, //Set resizable feature on or off
          editable: true, //Set contenteditable and enable changing note content
          changeoptions: false, //Set options feature on or off
          blocked: false, //Postit can not be modified
          minimized: true, //true = minimized, false = maximixed
          expand: true, //Expand note
          fixed: false, //Allow to fix the note in page
          addNew: true, //Create a new postit
          showInfo: false, //Show info icon
          pasteHtml: false, //Allow paste html in contenteditor
          htmlEditor: false, //Html editor (trumbowyg)
          autoPosition: true, //Automatic reposition of the notes when user resizes the screen
          export: false,
          addArrow: 'back' //Add an arrow to notes : none, front, back, all
      };
  };
