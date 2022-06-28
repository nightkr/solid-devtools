import { noop } from "@solid-primitives/utils"
import { SolidComputation, SolidMemo, SolidOwner, SolidRoot } from "@shared/graph"
import * as API from "./index"

export { getSafeValue } from "./index"

export const Debugger: typeof API.Debugger = props => props.children

export const attachDebugger: typeof API.attachDebugger = noop

export const registerDebuggerPlugin: typeof API.registerDebuggerPlugin = noop

// update
export const makeSolidUpdateListener: typeof API.makeSolidUpdateListener = () => noop
export const observeComputationUpdate: typeof API.observeComputationUpdate = noop
export const observeValueUpdate: typeof API.observeValueUpdate = () => noop

// utils
export const getOwnerType: typeof API.getOwnerType = () => 0
export const getOwnerName: typeof API.getOwnerName = () => "(anonymous)"
export const getName: typeof API.getName = () => "(anonymous)"
export const isSolidComputation: typeof API.isSolidComputation = (o): o is SolidComputation => false
export const isSolidMemo: typeof API.isSolidMemo = (o): o is SolidMemo => false
export const isSolidOwner: typeof API.isSolidOwner = (o): o is SolidOwner => false
export const isSolidRoot: typeof API.isSolidRoot = (o): o is SolidRoot => false
export const onOwnerCleanup: typeof API.onOwnerCleanup = () => noop
export const onParentCleanup: typeof API.onParentCleanup = () => noop
export const getFunctionSources: typeof API.getFunctionSources = () => []
export const createUnownedRoot: typeof API.createUnownedRoot = v => v(noop)
