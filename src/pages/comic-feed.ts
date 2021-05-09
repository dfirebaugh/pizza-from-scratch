/**
 * ComicFeed is the page that contains post-summaries
 * it is the front page of the site
 */
import {
  LitElement,
  html,
  css,
  customElement,
  TemplateResult,
  CSSResult,
} from "lit-element";
import ContentService from "../contentLoader";

@customElement("comic-feed")
export class ComicFeed extends LitElement {
  static get styles(): CSSResult {
    return css`
      container {
        display: grid;
        justify-content: center;
        width: 52vw;
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <container>
        ${Object.values(ContentService)
          .sort((a: any, b: any) => a.date - b.date)
          .map((post) => {
            return html` <post-summary
              slug=${post.slug}
              title=${post.title}
              description=${post.description}
              date=${new Date(Number(post.date)).toDateString()}
            >
            </post-summary>`;
          })}
      </container>
    `;
  }
}
