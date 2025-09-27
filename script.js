class AssignmentEditor {
  constructor(editorId) {
    this.editor = document.getElementById(editorId);
    this.init();
  }

  init() {
    console.log("Editor initialized");
    
  }
}


document.addEventListener("DOMContentLoaded", () => {
  new AssignmentEditor("editor");
});
