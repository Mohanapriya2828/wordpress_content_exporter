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
    this.copy_html_btn = document.getElementById('copy-html');
    this.preview_btn = document.getElementById('preview');
    this.exportTab = document.getElementById('export-tab');
    this.exportPanel = document.getElementById('export-panel');
    this.exportWordBtn = document.getElementById('export-word-btn');
    this.exportPdfBtn = document.getElementById('export-pdf-btn');
    this.documentTitle = "Wordpad Document";
    this.documentAuthor = "Priya Jayabalan";
    this.findReplaceTab = document.getElementById('findreplace-tab');
    this.findReplacePanel = document.getElementById('findreplace-panel');
    this.modeTab = document.getElementById('mode-tab');
    this.modePanel = document.getElementById('mode-panel');
    this.lightModeBtn = document.getElementById('light-mode-btn');
    this.darkModeBtn = document.getElementById('dark-mode-btn');
    this.autosaveTab = document.getElementById("autosave-tab");
    this.autosavePanel = document.getElementById("autosave-panel");
    this.autosaveToggle = document.getElementById("autosave-toggle");
    this.autosaveEnabled = false;

const savedContent = localStorage.getItem("editorContent");
if (savedContent) {
  this.editor.innerHTML = savedContent;
}

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

const imagebtn = document.getElementById('insert-image');
if (imagebtn) imagebtn.addEventListener('click', () => {
  const url = prompt("Enter image URL:");
  if (!url) return;

  const editor = document.querySelector('#editor');

  const img = document.createElement('img');
  img.src = url;
  img.style.position = "absolute";
  img.style.top = "50px";
  img.style.left = "50px";
  img.style.width = "300px";
  img.style.height = "200px";
  img.style.cursor = "move";
  img.draggable = false;
  editor.appendChild(img);

  let isDragging = false, dragStartX = 0, dragStartY = 0, imgStartLeft = 0, imgStartTop = 0;
  img.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    imgStartLeft = parseInt(img.style.left);
    imgStartTop = parseInt(img.style.top);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
  });

  function dragMove(e) {
    if (!isDragging) return;
    let dx = e.clientX - dragStartX;
    let dy = e.clientY - dragStartY;
    let newLeft = imgStartLeft + dx;
    let newTop = imgStartTop + dy;
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + img.offsetWidth > editor.clientWidth) newLeft = editor.clientWidth - img.offsetWidth;
    if (newTop + img.offsetHeight > editor.clientHeight) newTop = editor.clientHeight - img.offsetHeight;
    img.style.left = newLeft + "px";
    img.style.top = newTop + "px";
    updateResizeHandle();
  }

  function dragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
  }

  const resizeHandle = document.createElement('div');
  resizeHandle.style.position = "absolute";
  resizeHandle.style.width = "12px";
  resizeHandle.style.height = "12px";
  resizeHandle.style.background = "#0078d4";
  resizeHandle.style.cursor = "se-resize";
  editor.appendChild(resizeHandle);

  function updateResizeHandle() {
    resizeHandle.style.left = (parseInt(img.style.left) + img.offsetWidth - 6) + "px";
    resizeHandle.style.top = (parseInt(img.style.top) + img.offsetHeight - 6) + "px";
  }
  updateResizeHandle();

  let isResizing = false, startWidth = 0, startHeight = 0, startX = 0, startY = 0;

  resizeHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    isResizing = true;
    startWidth = img.offsetWidth;
    startHeight = img.offsetHeight;
    startX = e.clientX;
    startY = e.clientY;
    document.addEventListener('mousemove', resizeMove);
    document.addEventListener('mouseup', resizeEnd);
  });

  function resizeMove(e) {
    if (!isResizing) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    let newWidth = startWidth + dx;
    let newHeight = startHeight + dy;
    if (parseInt(img.style.left) + newWidth > editor.clientWidth) newWidth = editor.clientWidth - parseInt(img.style.left);
    if (parseInt(img.style.top) + newHeight > editor.clientHeight) newHeight = editor.clientHeight - parseInt(img.style.top);
    img.style.width = newWidth + "px";
    img.style.height = newHeight + "px";
    updateResizeHandle();
  }

  function resizeEnd() {
    isResizing = false;
    document.removeEventListener('mousemove', resizeMove);
    document.removeEventListener('mouseup', resizeEnd);
  }

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

if(this.copy_html_btn) {
  this.copy_html_btn.addEventListener('click', () => {
    const temp = document.createElement('textarea');
    temp.value = this.editor.innerHTML;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    this.copy_html_btn.classList.add('clicked');
    setTimeout(() => this.copy_html_btn.classList.remove('clicked'), 500);
  });
  this.copy_html_btn.classList.add("special-action");
  this.copy_html_btn.addEventListener("click", () => {
    this.copy_html_btn.classList.toggle("active");
  });
}

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
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${this.documentTitle}</title>
        <meta name="author" content="${this.documentAuthor}">
      </head>
      <body>
    `;
    const footer = "</body></html>";
    const blob = new Blob([header + content + footer], {
      type: "application/msword"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${this.documentTitle}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

if (this.exportPdfBtn) {
  this.exportPdfBtn.addEventListener('click', () => {
    const opt = {
      margin: 10,
      filename: `${this.documentTitle}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };
    html2pdf().set(opt).from(this.editor).toPdf().get('pdf').then(function (pdf) {
      pdf.setProperties({
        title: this.documentTitle,
        author: this.documentAuthor
      });
    }.bind(this)).save();
    this.exportPanel.classList.add('hidden');
  });
}

if(this.findReplaceTab && this.findReplacePanel) {
  this.findReplaceTab.addEventListener('click', () => this.togglePanel(this.findReplacePanel, this.findReplaceTab));
}

    this.insertTab.addEventListener('click', () => this.togglePanel(this.insertPanel, this.insertTab));
    this.homeTab.addEventListener('click', () => this.togglePanel(this.homePanel, this.homeTab));
    this.structureTab.addEventListener('click', () => this.togglePanel(this.structurePanel, this.structureTab));
    this.editor.addEventListener('keyup', () => this.updateButtonState());
    this.editor.addEventListener('mouseup', () => this.updateButtonState());
    this.editor.addEventListener('focus', () => this.updateButtonState());

this.matches = [];
this.currentFindIndex = -1;
this.lastTerm = '';

const findInput = document.getElementById('find-input');
const replaceInput = document.getElementById('replace-input-box');
const findNextBtn = document.getElementById('find-next-btn');
const replaceBtn = document.getElementById('replace-btn');
const replaceAllBtn = document.getElementById('replace-all-btn');

if (findNextBtn) {
  findNextBtn.addEventListener('click', () => {
    const term = findInput.value.trim();
    if (!term) return;
    if (this.matches.length === 0 || this.lastTerm !== term) {
      this.lastTerm = term;
      this.matches = [];
      this.currentFindIndex = -1;
      const walker = document.createTreeWalker(this.editor, NodeFilter.SHOW_TEXT);
      let node;
      while (node = walker.nextNode()) {
        let regex = new RegExp(term, 'gi');
        let match;
        while (match = regex.exec(node.textContent)) {
          this.matches.push({ node, start: match.index, end: match.index + match[0].length });
        }
      }
    }
    this.nextMatch();
  });
}

if (replaceBtn) {
  replaceBtn.addEventListener('click', () => {
    if (!this.matches.length || this.currentFindIndex === -1) return;
    const replacement = replaceInput.value;
    const match = this.matches[this.currentFindIndex];
    const range = document.createRange();
    range.setStart(match.node, match.start);
    range.setEnd(match.node, match.end);
    range.deleteContents();
    range.insertNode(document.createTextNode(replacement));
    this.editor.normalize();
    findNextBtn.click();
  });
}

if (replaceAllBtn) {
  replaceAllBtn.addEventListener('click', () => {
    const term = findInput.value.trim();
    const replacement = replaceInput.value;
    if (!term) return;
    const regex = new RegExp(term, 'gi');
    this.editor.innerHTML = this.editor.innerHTML.replace(regex, replacement);
    this.matches = [];
    this.currentFindIndex = -1;
  });
}

this.nextMatch = () => {
  if (!this.matches.length) return;
  this.currentFindIndex = (this.currentFindIndex + 1) % this.matches.length;
  const match = this.matches[this.currentFindIndex];
  const range = document.createRange();
  range.setStart(match.node, match.start);
  range.setEnd(match.node, match.end);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  this.editor.focus();
};

if (this.modeTab && this.modePanel) {
  this.modeTab.addEventListener('click', () => 
    this.togglePanel(this.modePanel, this.modeTab)
  );
}

if (this.lightModeBtn) {
  this.lightModeBtn.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  });
}

if (this.darkModeBtn) {
  this.darkModeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  });
}

if (this.autosaveTab && this.autosavePanel) {
  this.autosaveTab.addEventListener("click", () => {
    this.togglePanel(this.autosavePanel, this.autosaveTab);
  });
}

if (this.autosaveToggle) {
  this.autosaveToggle.addEventListener("click", () => {
    this.autosaveEnabled = !this.autosaveEnabled;
    this.autosaveToggle.textContent = `Auto-Save: ${this.autosaveEnabled ? "ON" : "OFF"}`;
  });
}

this.editor.addEventListener("input", () => {
  if (this.autosaveEnabled) {
    localStorage.setItem("editorContent", this.editor.innerHTML);
  }
});

}

togglePanel(panel, tab) {
    const allPanels = [this.homePanel, this.structurePanel, this.insertPanel,this.operations_panel,this.exportPanel,this.findReplacePanel,this.modePanel,this.autosavePanel];
    const allTabs = [this.homeTab, this.structureTab, this.insertTab,this.operations_tab,this.exportTab,this.findReplaceTab,this.modeTab,this.autosaveTab];
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

nextMatch() {
  if(!this.matches || this.matches.length === 0) return;
  this.currentFindIndex = (this.currentFindIndex + 1) % this.matches.length;
  const match = this.matches[this.currentFindIndex];
  const range = document.createRange();
  range.setStart(match.node, match.start);
  range.setEnd(match.node, match.end);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  this.editor.focus();
}
clearHighlights() {
  const sel = window.getSelection();
  sel.removeAllRanges();
  this.matches = [];
  this.currentFindIndex = -1;
}
replaceNext() {
  if (!this.replaceMatches || this.replaceMatches.length === 0) return;
  this.replaceCurrentIndex = (this.replaceCurrentIndex + 1) % this.replaceMatches.length;
  const match = this.replaceMatches[this.replaceCurrentIndex];
  const range = document.createRange();
  range.setStart(match.node, match.start);
  range.setEnd(match.node, match.end);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  this.editor.focus();
}

clearReplaceHighlights() {
  const sel = window.getSelection();
  sel.removeAllRanges();
  this.replaceMatches = [];
  this.replaceCurrentIndex = -1;
}

}
document.addEventListener('DOMContentLoaded', () => {
  const editor = new AssignmentEditor('editor');
  if (editor.alignmentSelect) {
    editor.alignmentSelect.value = editor.currentAlignment || "left";
  }
});
document.querySelectorAll('#toolbar button[data-command]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.execCommand(btn.dataset.command, false, null);
    btn.classList.toggle("active");
  });
});







