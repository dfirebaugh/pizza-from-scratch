/**
 * ComicPage is the page that displays post-element
 * (i.e. an individual post)
 */
import {
  LitElement,
  html,
  css,
  customElement,
  TemplateResult,
  CSSResult,
} from "lit-element";
import ContentLoader from "../contentLoader";
import router from "../router";

@customElement("comic-page")
export class ComicPage extends LitElement {
  static get styles(): CSSResult {
    return css``;
  }

  render(): TemplateResult {
    return html`
      <post-element
        slug="${router.location.params.slug}"
        markdown="${ContentLoader[String(router.location.params.slug)]
          .markDown}"
      >
      </post-element>
    `;
  }
}
