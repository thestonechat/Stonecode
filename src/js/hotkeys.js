document.onkeydown = keydown;

function keydown (evt) { 

    if (!evt) evt = event; 
    
    if (evt.ctrlKey && 's' === evt.key) { 
        if (openPath !== "") {
            fs.writeFileSync(openPath, editor.getValue());
            
        }
    } 

}