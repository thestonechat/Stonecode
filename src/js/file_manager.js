const fs = require('fs');
var modelist = ace.require("ace/ext/modelist")

var open_file_data = []

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target);
}

async function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer;

    console.log(data);

    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        var path = "";
        var name = "";
        var data = "";

        var file = ev.dataTransfer.files[i];


        let alreadyIn = false;

        path = file.path;
        name = file.name;

        if (fs.lstatSync(path).isFile()) {
            for (let j = 0; j < open_file_data.length; j++) {
                try {
                    if (open_file_data[j].path === path) {
                        alreadyIn = true;
                        break;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    
            if (alreadyIn == false) {
                var data = fs.readFileSync(path, 'utf-8');
    
                open_file_data.push({name: name, path: path, data: data});
            }
        } else {
            console.log("thats a folder!");
        }

        
    }
    show_files();
}


function show_files() {
    document.getElementById('file_manager').innerHTML = `<div id="file_manager_title">Open Files</div><div style="width: 5vw; height: 4vh;"></div>`;

    var file_manager = document.getElementById('file_manager').innerHTML;

    for (let i = 0; i < open_file_data.length; i++) {
        file_manager += `<div class="open_file" data-path="${open_file_data[i].path}" onclick="show_to_editor(this)">${open_file_data[i].name}</div>`
        
    }

    document.getElementById('file_manager').innerHTML = file_manager;

}