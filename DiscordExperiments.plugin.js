/**
 * @name DiscordExperiments
 * @author VincentX0905(炸蝦)
 * @description Open Discord Experiments function | 啟用 Discord 實驗功能
 * @version 1.7.0
 * @authorId 1183208834802667555
 * @donate https://donate.fsbot.xyz
 * @invite myZ7u8pPe9
 * @website https://github.com/Friedshrimp-Studio-TW/Discord-Experiments/
 * @source https://github.com/Friedshrimp-Studio-TW/Discord-Experiments/
 * @updateUrl https://raw.githubusercontent.com/Friedshrimp-Studio-TW/Discord-Experiments/plugins/DiscordExperiments.plugin.js
 */

function version() {
  return "1.7.0"
}

async function lang(key, defaulttext) {
  try {
    const response=await fetch(`https://raw.githubusercontent.com/Friedshrimp-Studio-TW/Discord-Experiments/main/lang/${document.documentElement.lang}.json`);
    if(!response.ok) {
      throw new Error('Error: Network Error!');
    }
    const data = await response.json();
    const text = data[key] || defaulttext;
    return String(text);
  }
  catch(error) {
    console.error('Error:', error);
    return String(defaulttext);
  }
}

function detectVersion() {
  var newupdate = false;
  fetch('https://raw.githubusercontent.com/Friedshrimp-Studio-TW/Discord-Experiments/main/info/version.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error: Network Error!');
    }
    return response.json();
  })
  .then(async data => {
    if (data["version"] != version()) {
      BdApi.showNotice(await lang("have-update", "A new version of DiscordExperiments is available: V%version%").then(result => result.replace("%version%", data["version"])), {type: "info", buttons: [{label: await lang("gotoupdate-button", "Go To Update"), onClick: () => window.open("https://raw.githubusercontent.com/Friedshrimp-Studio-TW/Discord-Experiments/main/DiscordExperiments.plugin.js", "mozillaTab")}]});
      BdApi.showToast(await lang("have-update", "A new version of DiscordExperiments is available: V%version%").then(result => result.replace("%version%", data["version"])), {type:"info",icon: true,timeout: 7500,forceShow: true});
      newupdate = true;
    }
    return newupdate;
  })
  .catch(error => {
    console.error('Error:', error);
    return newupdate;
  });
}

module.exports = class discordExperiments {
    async start() {
      BdApi.showToast(await lang("nowuse", "Now you using DiscordExperiments V%version%").then(result => result.replace("%version%", version())), {type:"info",icon: true,timeout: 7500,forceShow: true});
      detectVersion();
      var checkupdate = setInterval(function() {
        if (detectVersion()) {
          clearInterval(checkupdate);
        }
      }, 3600000);
      try {
        let c; webpackChunkdiscord_app.push([[Symbol()],{},r=>c=r.c]); webpackChunkdiscord_app.pop();
        let u = Object.values(c).find(x=>x?.exports?.default?.getUsers).exports.default;
        let m = Object.values(u._dispatcher._actionHandlers._dependencyGraph.nodes);
        u.getCurrentUser().flags |= 1;
        m.find((x)=>x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
        try {m.find((x)=>x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user:{flags: 1}})} catch {};
        m.find((x)=>x.name === "ExperimentStore").storeDidChange();
      } catch (err) {
        console.log(err);
        BdApi.showNotice(await lang("pluginerror", "An error occurred with the DiscordExperiments plugin")), {type: "error", buttons: [{label: await lang("pluginerror-button", "Report"), onClick: () => window.open("https://github.com/Friedshrimp-Studio-TW/Discord-Experiments/issues", "mozillaTab")}]};
        return BdApi.showNotice(await lang("pluginerror-output", "Error: %error%").then(result => result.replace("%error%", err)), {type: "error", buttons: [{label: await lang("pluginerror-button", "Report"), onClick: () => window.open("https://github.com/Friedshrimp-Studio-TW/Discord-Experiments/issues", "mozillaTab")}]});
      }
    }
  
    async stop() {
      BdApi.showNotice(await lang("need-reboot", "You need to reboot BetterDiscord for disabling DiscordExperiments"), {type: "warning", buttons: [{label: await lang("reboot-button", "Reboot BetterDiscord"), onClick: () => location.reload()}]});
    }
  }
  
