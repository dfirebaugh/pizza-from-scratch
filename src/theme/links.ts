import { css } from "lit-element";
import noselect from "../theme/noselect";

export default [
    noselect,
    css`
        a {
            text-decoration: none;
            color: var(--mdc-theme-primary, #6200ee);
        }

        a:hover {
            cursor: pointer;
            color: grey;
        }
    `];
