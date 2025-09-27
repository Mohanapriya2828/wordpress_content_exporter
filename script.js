class AssignmentEditor {
  constructor(editorId = 'editor') {
    this.editor = document.getElementById(editorId);
    this.homeTab = document.getElementById('home-tab');
    this.homePanel = document.getElementById('home-panel');
    this.formatButtons = Array.from(document.querySelectorAll('#toolbar button[data-command]'));
    this.headingSelect = document.getElementById('heading-select');
    this.fontSizeSelect = document.getElementById('font-size-select');
    this.fontFamilySelect = document.getElementById('font-family-select');
    this.currentFontSize = ""; 
    this.alignmentSelect = document.getElementById('alignment-select');
    this.currentAlignment = "left";
    if (this.alignmentSelect) this.alignmentSelect.value = this.currentAlignment;
    this.textColorPicker = document.getElementById('text-color-picker');
    this.highlightSelect = document.getElementById('highlight-select'); 
    this.init();
  }

init() 
{
    this.homeTab.addEventListener('click', () => this.toggleHomePanel());
    this.formatButtons.forEach(btn => {
      btn.type = 'button';
      btn.addEventListener('mousedown', e => {
        e.preventDefault();
        document.execCommand(btn.dataset.command, false, null);
        this.editor.focus();
        this.updateButtonState();
      });
    });

    if (this.headingSelect) {
      this.headingSelect.addEventListener('change', e => {
        const val = e.target.value || 'p';
        document.execCommand('formatBlock', false, val);
        this.currentFontSize = "";
        this.editor.focus();
        this.updateButtonState();
      });
    }

    if (this.fontSizeSelect) {
      this.fontSizeSelect.addEventListener('change', e => {
        const val = e.target.value;
        if (val) {
          document.execCommand('fontSize', false, val);
          this.currentFontSize = val;
        }
        this.editor.focus();
        this.updateButtonState();
      });
    }
if (this.fontFamilySelect) {
    this.fontFamilySelect.addEventListener('change', e => {
    const val = e.target.value;
    if (val) {
      document.execCommand('fontName', false, val);
      this.currentFontFamily = val;
    } else {
      this.currentFontFamily = "";
    }
    this.editor.focus();
    this.updateButtonState();
  });
}

 if (this.alignmentSelect) {
      this.alignmentSelect.addEventListener('change', e => {
        const val = e.target.value;
        const cmdMap = {
          left: 'justifyLeft',
          center: 'justifyCenter',
          right: 'justifyRight',
          justify: 'justifyFull'
        };
        document.execCommand(cmdMap[val], false, null);
        this.editor.focus();
        this.currentAlignment = val;
        this.updateButtonState();
      });
    }


    if (this.textColorPicker) {
  this.textColorPicker.addEventListener('change', e => {
    const color = e.target.value;
    document.execCommand('foreColor', false, color);
    this.editor.focus();
    this.updateButtonState();
  });
}

if (this.highlightSelect) {
  this.highlightSelect.addEventListener('change', e => {
    const color = e.target.value || 'transparent';
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    document.execCommand('styleWithCSS', false, true);
    document.execCommand('hiliteColor', false, color);
    this.editor.focus();
    this.updateButtonState();
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
      } catch {
        btn.removeAttribute('aria-pressed');
      }
    });

    if (this.fontSizeSelect) {
    this.fontSizeSelect.value = this.currentFontSize || "";
}

if (this.headingSelect) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      let node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentNode : sel.anchorNode;
      if (this.editor.contains(node)) {
        const heading = node.closest("h1, h2, h3, h4, h5, h6");
        this.headingSelect.value = heading ? heading.tagName.toLowerCase() : "";
      } else {
        this.headingSelect.value = "";
      }
    }
  }

  if (this.fontFamilySelect) {
  this.fontFamilySelect.value = this.currentFontFamily || "";
}

    if (this.alignmentSelect) this.alignmentSelect.value = this.currentAlignment;

  }
}
document.addEventListener('DOMContentLoaded', () => {
  const editor = new AssignmentEditor('editor');
  if (editor.alignmentSelect) {
    editor.alignmentSelect.value = editor.currentAlignment || "left";
  }
});

