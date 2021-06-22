var editorIsLoaded = false;

var openPath = "";
var recentlyOpen = []
var editor;


function show_to_editor(item) {
    let foundMatchPrevOpen = false;
    let cursorPos = -1;
    let scrollPos = 0;

    if (!(editorIsLoaded)) {
        loadEditor();
        editorIsLoaded = true;

        recentlyOpen = [[item.dataset.path, -1, 0]];
    } else {
        
        // Get NEW file data.
        for (let i = 0; i < recentlyOpen.length; i++) {
            if (recentlyOpen[i][0] === item.dataset.path) {
                foundMatchPrevOpen = true;
                cursorPos = recentlyOpen[i][1];
                scrollPos = recentlyOpen[i][2];
                break;
            }
        }

        // Save OLD file data.
        let foundOldOpen = false;
        for (let i = 0; i < recentlyOpen.length; i++) {
            if (recentlyOpen[i][0] === openPath) {
                foundOldOpen = true;
                recentlyOpen[i][1] = editor.getCursorPosition();
                recentlyOpen[i][2] = document.getElementById('editor').scrollTop;
                break;
            }
        }

        if (!(foundOldOpen)) {
            recentlyOpen.push([openPath, editor.getCursorPosition(), 0])
        }
        
    }

    for (let i = 0; i < open_file_data.length; i++) {
        if (open_file_data[i].path === item.dataset.path) {

            if (foundMatchPrevOpen) {
                editor.setValue(open_file_data[i].data, cursorPos.row);
                editor.gotoLine(cursorPos.row + 1, cursorPos.column);
                editor.focus();
                document.getElementById('editor').scrollTo(0, scrollPos);
            } else {
                editor.setValue(open_file_data[i].data, cursorPos)
            }
        }
    }

    var mode = modelist.getModeForPath(item.dataset.path).mode
    editor.session.setMode(mode)

    openPath = item.dataset.path;
    console.log(recentlyOpen);
    
}



function loadEditor() {
    ace.require("ace/ext/language_tools");
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_blue");
    editor.session.setMode("ace/mode/javascript");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
    });
    editor.setFontSize(15)
    console.log("Editor Loaded!");
}
