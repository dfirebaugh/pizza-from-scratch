/**
 * this is where we determine what shows up when we 
 * change the APP_MODE
 */
import { html } from "lit-element";
import AppState from "./services/AppStateService";
import { APP_MODES } from "./types";
import content from "./content";

function renderAllPosts() {
    return Object.values(content).map(post => {
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
                    slug="${AppState.get().currentPost}">
                </post-element>
            `;
        default:
            return html`whoops...`;
    }
}