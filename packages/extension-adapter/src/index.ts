import { createEffect, createSignal } from "solid-js"
import { registerDebuggerPlugin, PluginFactory, getSafeValue } from "@solid-devtools/debugger"
import {
  BatchedUpdate,
  OnMessage,
  SendMessage,
  SOLID_DEVTOOLS_NAMESPACE,
  UpdateType,
} from "@shared/bridge"
import type { SerialisedTreeRoot } from "@shared/graph"
import { getArrayDiffById } from "@shared/diff"
import * as Bridge from "webext-bridge/window"

Bridge.setNamespace(SOLID_DEVTOOLS_NAMESPACE)

const onMessage = Bridge.onMessage as OnMessage
const sendMessage = Bridge.sendMessage as SendMessage

const extensionAdapterFactory: PluginFactory = ({
  forceTriggerUpdate,
  serialisedRoots,
  makeBatchUpdateListener,
}) => {
  const [enabled, setEnabled] = createSignal(false)

  try {
    sendMessage("SolidOnPage", true, "devtools")
  } catch (e) {
    console.log("Solid on the page, but no one listens...")
  }

  // update the graph only if the devtools panel is in view
  // TODO: figure out onCleanup
  // onCleanup(onWindowMessage(MESSAGE.PanelVisibility, setEnabled))
  // onCleanup(onWindowMessage(MESSAGE.ForceUpdate, forceTriggerUpdate))
  onMessage("PanelVisibility", e => setEnabled(e.data))
  onMessage("ForceUpdate", forceTriggerUpdate)

  onMessage("DevtoolsPanelReady", () => {
    console.log("devtools panel ready")
  })

  // // diff the roots array, and send only the changed roots (edited, deleted, added)
  // createEffect((prev: SerialisedTreeRoot[]) => {
  //   const _roots = serialisedRoots()
  //   const diff = getArrayDiffById(prev, _roots)
  //   sendMessage("GraphUpdate", diff, "devtools")
  //   return _roots
  // }, [])

  // makeBatchUpdateListener(updates => {
  //   // serialize the updates and send them to the devtools panel
  //   const safeUpdates = updates.map(({ type, payload }) => ({
  //     type,
  //     payload:
  //       type === UpdateType.Computation
  //         ? payload
  //         : {
  //             id: payload.id,
  //             value: getSafeValue(payload.value),
  //             oldValue: getSafeValue(payload.oldValue),
  //           },
  //   })) as BatchedUpdate[]
  //   sendMessage("BatchedUpdate", safeUpdates, "devtools")
  // })

  return { enabled }
}

/**
 * Registers the extension adapter with the debugger.
 */
export function useExtensionAdapter() {
  registerDebuggerPlugin(data => {
    const { enabled } = extensionAdapterFactory(data)
    return {
      enabled,
      trackSignals: enabled,
      trackBatchedUpdates: enabled,
    }
  })
}
