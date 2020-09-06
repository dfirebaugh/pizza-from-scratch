/**
 * This is our Apps entry point
 * We will mount other components here based on the 
 * imported Router and App_State
 * 
 * Load our lit elements and other ESmodules
 */
import { LitElement, html, css } from "lit-element";
import router from "./router";
import linkStyle from "./theme/links";
import "./components/post-element";
import "./components/post-summary";
import "./materialLoader";

const mountPoint = document.getElementById("pizza-from-scratch")
class ComicApp extends LitElement {
    static styles = [
        linkStyle,
        css`
        .page-title {
            color: white;
        }
        `];

    firstUpdated() {
        /* call the router */
        router.ready
    }

    render() {
        return html`
        <mwc-top-app-bar>
            <page-title slot="title">
                <a class="page-title" href="/">
                    Pizza From Scratch
                </a>
            </page-title>
        </mwc-top-app-bar>
        `
    }
}

customElements.define("pizza-from-scratch", ComicApp);

/**
 * Mount the app into the DOM
 */
if (mountPoint)
    mountPoint.appendChild(document.createElement("pizza-from-scratch"));
