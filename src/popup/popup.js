document.getElementById('saveButton').addEventListener('click', () => {
    const promptInput = document.getElementById('promptInput').value;
  
    // get saved prompts
    chrome.storage.sync.get('prompts', (data) => {
      const prompts = data.prompts || [];
      prompts.push(promptInput);
      
      // save prompts
      chrome.storage.sync.set({ prompts }, () => {
        displayPrompts();
      });
    });
  });
  
  // show saved prompts
  function displayPrompts() {
    chrome.storage.sync.get('prompts', (data) => {
      const promptList = document.getElementById('promptList');
      promptList.innerHTML = '';
      (data.prompts || []).forEach(prompt => {
        const li = document.createElement('li');
        li.textContent = prompt;
        promptList.appendChild(li);
      });
    });
  }
  
  // show saved prompts when popup is opened
  displayPrompts();
  