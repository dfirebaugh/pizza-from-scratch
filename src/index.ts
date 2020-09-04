/**
 * This is our Apps entry point
 * We will mount other components here based on the 
 * imported Router and App_State
 * 
 * Load our lit elements and other ESmodules
 */
import { LitElement, html, css } from "lit-element";
import Router from "./router";
import AppStateService from "./services/AppStateService";
import "./components/post-element";
import "./components/post-summary";
import "./components/top-bar"

const mountPoint = document.getElementById("pizza-from-scratch")
class ComicApp extends LitElement {
    static get styles() {
        return css`
            page-container {
                display: grid;
                justify-content: center;
            }

            top-bar {
                display: grid;
                width: 100vw;
            }
        `;
    }

    firstUpdated() {
        AppStateService.registerRequestUpdateCallBack(this.requestUpdate.bind(this));
    }

    render() {
        return html`
        <top-bar></top-bar>
        ${Router()}
        `
    }
}

customElements.define("pizza-from-scratch", ComicApp);

/**
 * Mount the app into the DOM
 */
if (mountPoint)
    mountPoint.appendChild(document.createElement("pizza-from-scratch"));
