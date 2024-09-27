function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
      tab.style.display = 'none'; 
  });
  document.getElementById(tabName).style.display = 'block'; // 显示当前分区
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('memoTab').addEventListener('click', () => showTab('memo'));
  document.getElementById('starredTab').addEventListener('click', () => showTab('starred'));
  document.getElementById('aboutTab').addEventListener('click', () => showTab('about'));
});
