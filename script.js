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
    this.structureTab = document.getElementById('structure-tab');
    this.structurePanel = document.getElementById('structure-panel');
    this.structureButtons = Array.from(document.querySelectorAll('#structure-panel button[data-command]'));
    this.insertTab = document.getElementById('insert-tab');
    this.insertPanel = document.getElementById('insert-panel');
    this.operations_tab = document.getElementById('operations-tab');
    this.operations_panel = document.getElementById('operations-panel');
    this.clear_format_btn = document.getElementById('clear-format');
    this.reset_btn = document.getElementById('reset-editor');
    this.copy_plain_btn = document.getElementById('copy-plain');
    this.preview_btn = document.getElementById('preview');
    this.exportTab = document.getElementById('export-tab');
    this.exportPanel = document.getElementById('export-panel');
    this.exportWordBtn = document.getElementById('export-word-btn');
    this.exportPdfBtn = document.getElementById('export-pdf-btn');
    this.init();
  }

init() 
{
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
const ulBtn = document.getElementById("ulBtn");
const olBtn = document.getElementById("olBtn");

if (ulBtn && olBtn) {
  ulBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    this.editor.focus();
    document.execCommand("insertUnorderedList", false, null);
    this.updateButtonState();
  });

  olBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    this.editor.focus();
    document.execCommand("insertOrderedList", false, null);
    this.updateButtonState();
  });
}

const linkBtn = document.getElementById('insert-link');
if (linkBtn) linkBtn.addEventListener('click', () => {
  const url = prompt("Enter URL:");
  if (url) document.execCommand('createLink', false, url);
  this.editor.focus();
});

const imageBtn = document.getElementById('insert-image');
if (imageBtn) imageBtn.addEventListener('click', () => {
  const url = prompt("Enter image URL:");
  if (url) document.execCommand('insertImage', false, url);
  this.editor.focus();
});

const tableBtn = document.getElementById('insert-table');
if (tableBtn) tableBtn.addEventListener('click', () => {
  const rows = parseInt(prompt("Rows:"), 10);
  const cols = parseInt(prompt("Columns:"), 10);
  if (rows > 0 && cols > 0) {
    let table = '<table border="1">';
    for (let r = 0; r < rows; r++) {
      table += '<tr>';
      for (let c = 0; c < cols; c++) table += '<td>&nbsp;</td>';
      table += '</tr>';
    }
    table += '</table><br>';
    document.execCommand('insertHTML', false, table);
  }
  this.editor.focus();
});


this.structureButtons.forEach(btn => {
  if (btn.id === "ulBtn" || btn.id === "olBtn") return;
  btn.type = 'button';
  btn.addEventListener('mousedown', e => {
    e.preventDefault();
    const cmd = btn.dataset.command;
    document.execCommand(cmd, false, null);
    this.editor.focus();
  });
});
this.operations_tab.addEventListener('click', () => this.togglePanel(this.operations_panel, this.operations_tab));

this.clear_format_btn.addEventListener('click', () => {
  document.execCommand('removeFormat', false, null);
  this.editor.focus();
});

this.reset_btn.addEventListener('click', () => {
  this.editor.innerHTML = '';
});
this.copy_plain_btn.addEventListener('click', () => {
  const temp = document.createElement('textarea');
  temp.value = this.editor.textContent;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
  this.copy_plain_btn.classList.add('clicked');
  setTimeout(() => this.copy_plain_btn.classList.remove('clicked'), 500);
});

this.preview_btn.addEventListener('click', () => {
  const win = window.open('', '_blank', 'width=800,height=600');
  win.document.write('<html><head><title>preview</title></head><body>');
  win.document.write(this.editor.innerHTML);
  win.document.write('</body></html>');
  win.document.close();
});

[this.clear_format_btn, this.reset_btn,this.copy_plain_btn,this.preview_btn].forEach(btn => {
  if (btn) {
    btn.classList.add("special-action");
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  }
});

if (this.exportTab && this.exportPanel) {
  this.exportTab.addEventListener('click', () => {
    this.togglePanel(this.exportPanel, this.exportTab);
  });
}

if (this.exportWordBtn) {
  this.exportWordBtn.addEventListener('click', () => {
    const content = this.editor.innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                   "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                   "xmlns='http://www.w3.org/TR/REC-html40'>" +
                   "<head><meta charset='utf-8'><title>Export</title></head><body>";
    const footer = "</body></html>";
    const blob = new Blob([header + content + footer], {
      type: "application/msword"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

const exportPdfBtn = document.getElementById('export-pdf-btn');
if (exportPdfBtn) {
  exportPdfBtn.addEventListener('click', () => {
    html2pdf().from(this.editor).set({
      margin: 10,
      filename: 'document.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save();
    this.exportPanel.classList.add('hidden');
  });
}



    this.insertTab.addEventListener('click', () => this.togglePanel(this.insertPanel, this.insertTab));
    this.homeTab.addEventListener('click', () => this.togglePanel(this.homePanel, this.homeTab));
    this.structureTab.addEventListener('click', () => this.togglePanel(this.structurePanel, this.structureTab));
    this.editor.addEventListener('keyup', () => this.updateButtonState());
    this.editor.addEventListener('mouseup', () => this.updateButtonState());
    this.editor.addEventListener('focus', () => this.updateButtonState());
}

togglePanel(panel, tab) {
    const allPanels = [this.homePanel, this.structurePanel, this.insertPanel,this.operations_panel,this.exportPanel];
    const allTabs = [this.homeTab, this.structureTab, this.insertTab,this.operations_tab,this.exportTab];
    const isHidden = panel.classList.contains('hidden');
    allPanels.forEach(p => p.classList.add('hidden'));
    allTabs.forEach(t => t.setAttribute('aria-expanded', 'false'));
    if (isHidden) {
        panel.classList.remove('hidden');
        tab.setAttribute('aria-expanded', 'true');
    }
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

