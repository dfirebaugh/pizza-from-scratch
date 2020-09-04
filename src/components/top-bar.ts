/**
 * TopBar is displayed on every page
 * We can put some navigation here
 * and a Site title banner
 */
import { LitElement, html, css } from "lit-element";
import AppStateService from "../services/AppStateService";
import { APP_MODES } from "../types";

class TopBar extends LitElement {
    static get styles() {
        return css`
            container {
                height: 8vh;
                background-color: black;
                color: white;
                align-items: center;
                display: grid;
                padding-left: 1vw;
                grid-template-columns: auto 1fr;
            }
            h2:hover {
                cursor: pointer;
            }
        `;
    }

    handleTitleClick() {
        AppStateService.update({
            appMode: APP_MODES.COMIC_ROLL
        });
    }

    render() {
        return html`
        <container>
            <h2 @click="${this.handleTitleClick}">Pizza From Scratch</h2>
        </container>
        `
    }
}

customElements.define("top-bar", TopBar);
