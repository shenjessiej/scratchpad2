var intro =
    ['<style>',
        '  body {background: #88a36f;}',
        '  .container {',
        '    background: #fff;',
        '    padding: 50px;',
        '    margin: 50px auto;',
        '    width: 400px;',
        '    font-family: sans-serif;',
        '    border-radius: 10px;',
        '  }',
        '</style>',
        '<div class="container">',
        '    <h1>scratchpad 2: electric boogaloo</h1>  ',
        '  <p>Hello! This is a simple web-based live-reload HTML/CSS/JS text editor! You can do code-y things here like in old Scratchpad, but none of your codes will be saved or be shareable. </p>',
        ' <p>  DM <b>tom nook apologist#6304</b> on discord if you encounter any bugs!   ',
        ' <p>  Rest in pieces Scratchpad (??-2020). ',
        '</div>'].join('\n');

$(document).ready(function () {
    console.log("ready!");

    // Scratchpad Intro
    //--------------------------------------------------------------------------------

    // Set up iframe.
    var iframe = document.getElementById('preview'),
        iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.setAttribute('tabindex', 0);

    // Code Editing
    //--------------------------------------------------------------------------------
    var startText = localStorage.getItem('editorKey') ? localStorage.getItem('editorKey') : intro;
    var startTitle = localStorage.getItem('titleKey') ? localStorage.getItem('titleKey') : 'Scratchpad 2: Electric Boogaloo';

    editor.setValue(startText);
    $('#title').html(startTitle);
    $('title').html(startTitle);


    iframedoc.body.innerHTML = editor.getValue();
    editor.clearSelection();
    editor.getSession().on('change', function (e) {
        iframedoc.body.innerHTML = editor.getValue();
        localStorage.setItem('editorKey', editor.getValue());

        // Resize the menu icon if appropriate
        var linesOfCode = editor.session.getLength();
        if (linesOfCode < 10) {
            $('#menu').attr('class', 'small')
        } else if (linesOfCode > 9 && linesOfCode < 99) {
            $('#menu').attr('class', 'medium')
        } else if (linesOfCode > 99 && linesOfCode < 999) {
            $('#menu').attr('class', 'large')
        } else if (linesOfCode > 999) {
            $('#menu').attr('class', 'x-large')
        }
    });

    var editorwidth = $('#editor').width() + 2;
    $('#preview').css('left', editorwidth);


});

// Ace Editor setup

var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.setHighlightActiveLine(false);
editor.getSession().setTabSize(2);
document.getElementById('editor').style.fontSize = '11px';
editor.commands.removeCommand('gotoline');
editor.setShowPrintMargin(false);
editor.getSession().setMode("ace/mode/html");
editor.commands.addCommand({
    name: 'showHelp',
    bindKey: {win: 'Ctrl-/', mac: 'Command-/'},
    exec: function (editor) {
        $('#help').toggleClass('visible');
    }
});
editor.commands.addCommand({
    name: 'toggleFullscreen',
    bindKey: {win: 'Ctrl-i', mac: 'Command-i'},
    exec: function (editor) {
        toggleFullscreen();
    }
});

// dragbar

var dragging = false;
var wpoffset = 0;
$('#editor-dragbar').mousedown(function (e) {
    e.preventDefault();
    window.dragging = true;

    var editor = $('#editor');
    var right_offset = editor.offset().right + wpoffset;

    // Set editor opacity to 0 to make transparent so our wrapper div shows
    editor.css('opacity', 0);

    // handle mouse movement
    $(document).mousemove(function (e) {

        var actualX = e.pageX + wpoffset;
        // editor width
        var ewidth = actualX + right_offset;
        var dragbarWidth = $('#editor-dragbar').width();

        var prevwidth = $(window).width() - e.pageX - dragbarWidth;
        var prevLeft = e.pageX + dragbarWidth;

        // Set wrapper width
        $('#editor').css('width', e.pageX);
        $('#navbar').css('width', e.pageX);

        $('#preview').css('width', prevwidth);
        $('#preview').css('left', prevLeft);

        // Move dragbar
        $('#editor-dragbar').css('opacity', 0.15).css('left', e.pageX);


    });

});

$('#editor-dragbar').mouseup(function (e) {

    if (window.dragging) {
        var editor = $('#editor');

        var actualX = e.pageX + wpoffset;
        var right_offset = editor.offset().right + wpoffset;
        var ewidth = actualX + right_offset;

        $(document).unbind('mousemove');

        // Set dragbar opacity back to 1
        $('#editor-dragbar').css('opacity', 1);

        // Set width on actual editor element, and opacity back to 1
        editor.css('width', e.pageX).css('opacity', 1);
        $('#preview').css('width', prevwidth);
        $('#preview').css('left', e.pageX);

        // Trigger ace editor resize()
        editor.resize();
        window.dragging = false;
    }

});

// resize preview frame when window is dragged
window.addEventListener("resize", function(){
    var editorWidth = $('#editor').width();
    var windowWidth = $(window).width();
    var dragbarWidth = $('#editor-dragbar').width();

    $('#preview').css('width', windowWidth - editorWidth - dragbarWidth);
    $('#preview').css('left', editorWidth + dragbarWidth);

});

// editing title stuff

$(document).on('click', '#title', function() {
    console.log('title clicked!');

    var element = $(this);
    var inputbox = $('<input id="titleinput"/>').val(element.text());

    $('#titleinput').css('width', $('#editor').width());

    element.replaceWith(inputbox);

    var save = function() {
        var p = $('<div id="title"/>').text(inputbox.val());
        inputbox.replaceWith(p);
        document.title = inputbox.val();
        localStorage.setItem('titleKey', inputbox.val());
    };

    inputbox.on('blur', save).focus();

});
