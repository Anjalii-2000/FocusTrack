chrome.storage.local.get(null, (data) => {
  const list = document.getElementById("stats");

  for (let site in data) {
    const minutes = (data[site] / 60000).toFixed(1);
    const li = document.createElement("li");
    li.textContent = `${site}: ${minutes} min`;
    list.appendChild(li);
  }
});
