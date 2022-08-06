import { SOLID_DEVTOOLS_NAMESPACE } from "@shared/bridge"
import { allowWindowMessaging } from "webext-bridge/content-script"

allowWindowMessaging(SOLID_DEVTOOLS_NAMESPACE)
