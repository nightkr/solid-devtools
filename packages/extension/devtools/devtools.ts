import * as Bridge from "webext-bridge/devtools"
import { OnMessage, SendMessage } from "@shared/bridge"
import { log } from "@shared/utils"

const onMessage = Bridge.onMessage as OnMessage
const sendMessage = Bridge.sendMessage as SendMessage

// postRuntimeMessage(MESSAGE.DevtoolsScriptConnected)

let panel: chrome.devtools.panels.ExtensionPanel | undefined

onMessage("SolidOnPage", async () => {
  if (panel) return log("Panel already exists")

  log("Solid on page – creating panel")
  try {
    panel = await createPanel()
    log("Panel Created")
    panel.onShown.addListener(onPanelShown)
    panel.onHidden.addListener(onPanelHidden)
  } catch (error) {
    console.error(error)
  }
})

const createPanel = () =>
  new Promise<chrome.devtools.panels.ExtensionPanel>((resolve, reject) => {
    chrome.devtools.panels.create(
      "Solid",
      "assets/icons/solid-normal-32.png",
      "index.html",
      newPanel => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError)
        else resolve(newPanel)
      },
    )
  })

function onPanelShown() {
  sendMessage("PanelVisibility", true, "window")
}

function onPanelHidden() {
  sendMessage("PanelVisibility", false, "window")
}

export {}
