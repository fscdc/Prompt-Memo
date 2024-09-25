document.getElementById('saveButton').addEventListener('click', () => {
    const promptInput = document.getElementById('promptInput').value;
  
    // 获取已保存的prompts
    chrome.storage.sync.get('prompts', (data) => {
      const prompts = data.prompts || [];
      prompts.push(promptInput);
      
      // 保存新的prompts
      chrome.storage.sync.set({ prompts }, () => {
        displayPrompts();
      });
    });
  });
  
  // 显示已保存的prompts
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
  
  // 初始化时显示已保存的prompts
  displayPrompts();
  