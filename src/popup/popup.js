document.getElementById('saveButton').addEventListener('click', () => {
  const promptInput = document.getElementById('promptInput').value;

  // 获取已保存的 prompts
  chrome.storage.sync.get('prompts', (data) => {
    const prompts = data.prompts || [];
    prompts.push(promptInput);

    // 保存 prompts
    chrome.storage.sync.set({ prompts }, () => {
      displayPrompts();
      document.getElementById('promptInput').value = ''; // 清空输入框
    });
  });
});

// 显示保存的 prompts
function displayPrompts() {
  chrome.storage.sync.get('prompts', (data) => {
      const promptList = document.getElementById('promptList');
      promptList.innerHTML = ''; // 清空列表
      (data.prompts || []).forEach((prompt, index) => {
          const li = document.createElement('li');
          li.textContent = prompt;

          // 创建删除按钮
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.style.marginLeft = '10px';
          deleteButton.addEventListener('click', () => {
              deletePrompt(index);
          });

          li.appendChild(deleteButton);
          promptList.appendChild(li);
      });
  });
}

// 删除指定 prompt
function deletePrompt(index) {
  chrome.storage.sync.get('prompts', (data) => {
      const prompts = data.prompts || [];
      prompts.splice(index, 1); // 删除指定的 prompt
      chrome.storage.sync.set({ prompts }, () => {
          displayPrompts(); // 刷新列表
      });
  });
}

// 页面加载时显示保存的 prompts
displayPrompts();
