/* @refresh reload */
import { render } from "solid-js/web"
import "webext-bridge/devtools"
import App from "./App"
import "@solid-devtools/ui/css"

render(() => <App />, document.getElementById("root")!)
