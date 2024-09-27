//memo.js
document.getElementById('saveButton').addEventListener('click', () => {
  const promptInput = document.getElementById('promptInput').value;
  const tagInput = document.getElementById('tagInput').value || 'No Tag';  // 如果没有输入 tag，默认值为 'No Tag'

  if (!promptInput) return; // 如果输入为空则不保存

  // 获取已保存的 prompts
  chrome.storage.sync.get('prompts', (data) => {
    const prompts = data.prompts || [];

    // 新的 prompt 对象，包含 prompt 和 tag
    prompts.push({ prompt: promptInput, tag: tagInput });

    // 保存 prompts
    chrome.storage.sync.set({ prompts }, () => {
      displayPrompts();
      document.getElementById('promptInput').value = ''; // 清空输入框
      document.getElementById('tagInput').value = '';    // 清空 tag 输入框
    });
  });
});

// 显示保存的 prompts，按 tag 分组
function displayPrompts(searchQuery = '') {
  chrome.storage.sync.get('prompts', (data) => {
    const promptList = document.getElementById('promptList');
    promptList.innerHTML = ''; // 清空列表

    const filteredPrompts = filterPrompts(data.prompts || [], searchQuery);
    const groupedPrompts = groupByTag(filteredPrompts);

    // 按 tag 分组展示
    for (const tag in groupedPrompts) {
      const tagHeader = document.createElement('h4');
      tagHeader.textContent = `Tag: ${tag}`;
      promptList.appendChild(tagHeader);

      const ul = document.createElement('ul');
      groupedPrompts[tag].forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.prompt;

        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.marginLeft = '10px';
        copyButton.addEventListener('click', () => {
          copyToClipboard(item.prompt);
        });

        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', () => {
          deletePrompt(item.prompt, item.tag);
        });

        li.appendChild(copyButton);
        li.appendChild(deleteButton);
        ul.appendChild(li);
      });

      promptList.appendChild(ul);
    }
  });
}

// 将 prompts 按 tag 分组
function groupByTag(prompts) {
  return prompts.reduce((acc, item) => {
    const tag = item.tag || 'No Tag';
    if (!acc[tag]) {
      acc[tag] = [];
    }
    acc[tag].push(item);
    return acc;
  }, {});
}

// 删除指定的 prompt
function deletePrompt(promptToDelete, tagToDelete) {
  chrome.storage.sync.get('prompts', (data) => {
    const prompts = data.prompts || [];
    const updatedPrompts = prompts.filter(item => !(item.prompt === promptToDelete && item.tag === tagToDelete));
    
    chrome.storage.sync.set({ prompts: updatedPrompts }, () => {
      displayPrompts(); // 刷新列表
    });
  });
}

// 复制 prompt 到剪贴板
function copyToClipboard(prompt) {
  const tempInput = document.createElement('input');
  tempInput.value = prompt;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  // alert('Prompt copied to clipboard!');
}

// 搜索功能：过滤 prompts
function filterPrompts(prompts, query) {
  return prompts.filter(item => {
    const searchTerm = query.toLowerCase();
    return item.prompt.toLowerCase().includes(searchTerm) || item.tag.toLowerCase().includes(searchTerm);
  });
}

// 添加搜索框监听
document.getElementById('searchInput').addEventListener('input', (event) => {
  const searchQuery = event.target.value;
  displayPrompts(searchQuery); // 根据搜索框的输入重新显示 prompts
});

// 显示保存的 prompts，按 tag 分组
function displayPrompts(searchQuery = '') {
  chrome.storage.sync.get('prompts', (data) => {
    const promptList = document.getElementById('promptList');
    promptList.innerHTML = ''; // 清空列表

    const filteredPrompts = filterPrompts(data.prompts || [], searchQuery);
    const groupedPrompts = groupByTag(filteredPrompts);

    // 按 tag 分组展示
    for (const tag in groupedPrompts) {
      const tagHeader = document.createElement('h4');
      tagHeader.textContent = `Tag: ${tag}`;
      promptList.appendChild(tagHeader);

      const ul = document.createElement('ul');
      groupedPrompts[tag].forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.prompt;

        // 创建按钮组
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.classList.add('copy-button');
        copyButton.addEventListener('click', () => {
          copyToClipboard(item.prompt);
        });

        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          deletePrompt(item.prompt, item.tag);
        });

        buttonGroup.appendChild(copyButton);
        buttonGroup.appendChild(deleteButton);
        li.appendChild(buttonGroup);
        ul.appendChild(li);
      });

      promptList.appendChild(ul);
    }
  });
}

// 页面加载时显示保存的 prompts
displayPrompts();