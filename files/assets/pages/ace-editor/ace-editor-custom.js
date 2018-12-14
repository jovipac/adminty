"use strict";
AUI().ready('aui-ace-editor', function(A) {
    var editor = new A.AceEditor({
        boundingBox: '#editor',

        // highlightActiveLine: false,
        // readOnly: true,
        // tabSize: 8,
        // useSoftTabs: true,
        // useWrapMode: true,
        // showPrintMargin: false,
        mode: 'php',
        value: '<#assign portlet_display = portletDisplay />\n' +
            '<#assign portlet_id = htmlUtil.escapeAttribute(portlet_display.getId()) />\n' +
            '<#assign portlet_title = portlet_display.getTitle() />\n' +
            '<#assign portlet_back_url = htmlUtil.escapeAttribute(portlet_display.getURLBack()) />\n' +
            '<section class="portlet" id="portlet_${portlet_id}">\n' +
            '   <header class="portlet-topper">\n' +
            '       <h1 class="portlet-title">\n' +
            '           ${theme.iconPortlet()} <span class="portlet-title-text">${portlet_title}</span>\n' +
            '       </h1>\n' +
            '       <menu class="portlet-topper-toolbar" id="portlet-topper-toolbar_${portlet_id}" type="toolbar">\n' +
            '           <#if portlet_display.isShowBackIcon()>\n' +
            '               <a href="${portlet_back_url}" class="portlet-icon-back"><@liferay.language key="return-to-full-page" /></a>\n' +
            '           <#else>\n' +
            '               ${theme.iconOptions()}' +
            '               ${theme.iconMinimize()}' +
            '               ${theme.iconMaximize()}' +
            '               ${theme.iconClose()}' +
            '           </#if>\n' +
            '       </menu>\n' +
            '   </header>\n' +
            '   <div class="portlet-content">\n' +
            '       ${portlet_display.writeContent(writer)}' +
            '   </div>\n' +
            '</section>'
    }).render();

    // editor.getEditor().setTheme('ace/theme/cobalt');

    //editor.set('mode', 'javascript');
    // editor.set('mode', 'json');
    // editor.set('mode', 'xml');

    var mode = A.one('#mode');
    if (mode) {

        var currentMode = 'javascript';





        mode.on('change', function(event) {
            currentMode = this.val();

            editor.set('mode', currentMode);


        });
    }

    // editor.set('value', 'Change the original content');
});
