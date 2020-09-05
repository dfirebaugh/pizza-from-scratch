/**
 * this is where we determine what shows up when we 
 * change the APP_MODE
 */
import { html } from "lit-element";
import AppState from "./services/AppStateService";
import { APP_MODES } from "./types";
import ContentService from "./services/ContentService";

function renderAllPosts() {
    return Object.values(ContentService).map(post => {
        return html`
        <post-summary 
            slug="${post.slug}"
            >
        </post-summary>`
    })
}

export default function router() {
    switch (AppState.get().appMode) {
        case (APP_MODES.COMIC_ROLL):
            return html`
            <page-container>
            ${renderAllPosts()}
            </page-container>
            `;
        case (APP_MODES.VIEW_POST):
            return html`
                <post-element 
                    slug="${AppState.get().currentPost}"
                    markdown="${ContentService[AppState.get().currentPost].markDown}">
                </post-element>
            `;
        default:
            return html`whoops...`;
    }
}