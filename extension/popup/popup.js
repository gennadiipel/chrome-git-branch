document.getElementById("create-branch").addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { command: "copyBranchName" });
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.command === "branchNameGenerated") {
    navigator.clipboard.writeText(message.branchName);
    // fetch(`http://localhost:10101`, {
    //   method: "POST",
    //   body: {
    //     branchName,
    //     pathToRepo: "/Users/gennadiipel/Work/chrome-git-branch",
    //   },
    // }).then((res) => {
    //   alert(res.body);
    // });
    alert();
  }
});
