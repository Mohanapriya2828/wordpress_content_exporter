class AssignmentEditor {
  constructor(editorId = 'editor') {
    this.editor = document.getElementById(editorId);
    this.homeTab = document.getElementById('home-tab');
    this.homePanel = document.getElementById('home-panel');
    this.formatButtons = Array.from(document.querySelectorAll('#toolbar button[data-command]'));
    this.headingSelect = document.getElementById('heading-select');

    this.init();
  }

  init() {
    this.homeTab.addEventListener('click', () => this.toggleHomePanel());
    this.formatButtons.forEach(btn => {
      btn.type = 'button';
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const cmd = btn.getAttribute('data-command');
        document.execCommand(cmd, false, null);
        this.editor.focus();
        this.updateButtonState();
      });
    });
    if (this.headingSelect) {
      this.headingSelect.addEventListener('change', (e) => {
        const val = e.target.value || 'p';
        document.execCommand('formatBlock', false, val);
        this.editor.focus();
        this.updateButtonState();
      });
     
      this.headingSelect.addEventListener('mousedown', (e) => {

      });
    }

    this.editor.addEventListener('keyup', () => this.updateButtonState());
    this.editor.addEventListener('mouseup', () => this.updateButtonState());
    this.editor.addEventListener('focus', () => this.updateButtonState());
  }

  toggleHomePanel() {
    const hidden = this.homePanel.classList.toggle('hidden');
    this.homePanel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    this.homeTab.setAttribute('aria-expanded', hidden ? 'false' : 'true');
    setTimeout(() => this.editor.focus(), 0);
  }

  updateButtonState() {
    this.formatButtons.forEach(btn => {
      const cmd = btn.getAttribute('data-command');
      try {
        const active = document.queryCommandState(cmd);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      } catch (err) {
        btn.removeAttribute('aria-pressed');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AssignmentEditor('editor');
});



