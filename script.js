class AssignmentEditor {
  constructor(editorId) {
    this.editor = document.getElementById(editorId);
    this.init();
  }

  init() {
    const homeTab = document.getElementById("home-tab");
    const homePanel = document.getElementById("home-panel");

    homeTab.addEventListener("click", () => {
      homePanel.classList.toggle("hidden");
    });
    document.querySelectorAll("#toolbar button[data-command]").forEach(button => {
      button.addEventListener("click", () => {
        let command = button.getAttribute("data-command");
        document.execCommand(command, false, null);
      });
    });


    document.getElementById("heading-select").addEventListener("change", (e) => {
      let value = e.target.value;
      if (value) {
        document.execCommand("formatBlock", false, value);
      } else {
        document.execCommand("formatBlock", false, "p");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AssignmentEditor("editor");
});
