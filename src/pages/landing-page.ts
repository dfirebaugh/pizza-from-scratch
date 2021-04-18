/**
 * LandingPage showcases the latest comic, but it will allow the user to 
 *  cycle to different strips
 */
import { LitElement, customElement, html, css } from "lit-element";
import ContentLoader from "../contentLoader";
// import router from '../router';
import { Post_t } from "../types";

@customElement("landing-page")
export class LandingPage extends LitElement {
    index: number = 0;
    strips: Array<Post_t> = [];
    static get styles() {
        return css`
         `;
    }

    constructor() {
        super();
        this.strips = Object.values(ContentLoader).sort(
            (a: Post_t, b: Post_t) => Number(b.date) - Number(a.date)).map((post: Post_t) => {
                return Object.assign(post, {
                })
            })
    }


    render() {
        return html`
         <post-element 
            slug="${this.strips[this.index].slug}"
            markdown="${this.strips[this.index].markDown}">
        </post-element>
         `
    }
}