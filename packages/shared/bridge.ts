import "webext-bridge"
import { JsonValue, Primitive } from "type-fest"
import { Endpoint, RuntimeContext } from "webext-bridge"
import { SerialisedTreeRoot } from "./graph"

export const SOLID_DEVTOOLS_NAMESPACE = "SOLID_DEVTOOLS"

export interface ProtocolMap {
  SolidOnPage: true
  DevtoolsScriptConnected: true
  DevtoolsPanelReady: true
  PanelVisibility: boolean
  ResetPanel: true
  GraphUpdate: {
    added: SerialisedTreeRoot[]
    removed: number[]
    updated: SerialisedTreeRoot[]
  }
  BatchedUpdate: BatchedUpdate[]
  ForceUpdate: true
}

type BridgePayload<K extends keyof ProtocolMap> = {
  sender: Endpoint
  id: string
  data: ProtocolMap[K]
  timestamp: number
}

export type OnMessage = <K extends keyof ProtocolMap>(
  messageID: K,
  callback: (payload: BridgePayload<K>) => void,
) => void

export type SendMessage = <K extends keyof ProtocolMap>(
  messageID: K,
  payload: ProtocolMap[K],
  destination: Endpoint | RuntimeContext | (string & {}),
) => Promise<void>

export type SafeValue = Primitive | JsonValue

export enum UpdateType {
  Signal,
  Computation,
}

export interface SignalUpdatePayload {
  id: number
  value: SafeValue
  oldValue: SafeValue
}

export type BatchedUpdate =
  | {
      type: UpdateType.Signal
      payload: SignalUpdatePayload
    }
  | {
      type: UpdateType.Computation
      payload: number
    }
