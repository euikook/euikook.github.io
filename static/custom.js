/* Append Copy button to code block  */
function createCopyButton(elem) {
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.innerText = "Copy";
    button.addEventListener("click", () =>
      copyCodeToClipboard(button, elem)
    );
    addCopyButtonToDom(button, elem);
  }
  
  async function copyCodeToClipboard(button, elem) {
    const codeToCopy = elem.querySelector(":last-child > .chroma > code")
      .innerText;
    try {
      var q = await navigator.permissions.query({ name: "clipboard-write" });
      if (q.state == "granted" || q.state == "prompt") {
        await navigator.clipboard.writeText(codeToCopy);
      } else {
        copyCodeBlockExecCommand(codeToCopy, elem);
      }
    } catch (_) {
      copyCodeBlockExecCommand(codeToCopy, elem);
    } finally {
      codeWasCopied(button);
    }
  }
  
  function copyCodeBlockExecCommand(code, elem) {
    const textArea = document.createElement("textArea");
    textArea.contentEditable = "true";
    textArea.readOnly = "false";
    textArea.className = "copyable-text-area";
    textArea.value = code;
    elem.insertBefore(textArea, elem.firstChild);
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    textArea.setSelectionRange(0, 999999);
    document.execCommand("copy");
    elem.removeChild(textArea);
  }
  
  function codeWasCopied(button) {
    button.blur();
    button.innerText = "Copied!";
    setTimeout(function () {
      button.innerText = "Copy";
    }, 2000);
  }
  
  function addCopyButtonToDom(button, elem) {
    elem.insertBefore(button, elem.firstChild);
    const wrapper = document.createElement("div");
    wrapper.className = "highlight-wrapper";
    elem.parentNode.insertBefore(wrapper, elem);
    wrapper.appendChild(elem);
  }
  
  document
    .querySelectorAll(".highlight")
    .forEach((d) => createCopyButton(d));
  
    document
    .querySelectorAll(".highlight")
    .forEach((d) => addPrompt(d));