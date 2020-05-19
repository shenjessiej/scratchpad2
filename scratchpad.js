$( document ).ready(function() {
    console.log( "ready!" );


    // Scratchpad Intro
  //--------------------------------------------------------------------------------
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
  '  <p>  NOTE-- IF YOU REFRESH THIS PAGE, YOU WILL LOSE YOUR CODE. I am looking into ways to save your current scratchpad to your browser so that this will not happen, so check back soon!  </p>',
  ' <p>  DM <b>tom nook apologist#6304</b> on discord if you encounter any bugs!   ',
  ' <p>  Rest in pieces Scratchpad (??-2020) you will be missed. ',
  ' <p>  Credit to <a href="https://gist.github.com/nbashaw">Nathan Baschez</a> for much of the source code! ',
  '</div>'].join('\n');
  
    // Set up iframe.
    var iframe = document.getElementById('preview'),
    iframedoc = iframe.contentDocument || iframe.contentWindow.document;
  iframedoc.body.setAttribute('tabindex', 0);

    // Code Editing
  //--------------------------------------------------------------------------------
  editor.setValue(intro);
  iframedoc.body.innerHTML = editor.getValue();
  editor.clearSelection();
  editor.getSession().on('change', function(e) {
    iframedoc.body.innerHTML = editor.getValue();
    // Resize the menu icon if appropriate
    var linesOfCode = editor.session.getLength();
    if (linesOfCode < 10) {
      $('#menu').attr('class', 'small')
    } else if ( linesOfCode > 9 && linesOfCode < 99) {
      $('#menu').attr('class', 'medium')
    } else if ( linesOfCode > 99 && linesOfCode < 999) {
      $('#menu').attr('class', 'large')
    } else if (linesOfCode > 999){
      $('#menu').attr('class', 'x-large')
    }
  });

  var editorwidth = $( '#editor' ).width() + 2; 
  $( '#preview' ).css( 'left', editorwidth);


  
});
