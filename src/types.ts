
export enum APP_MODES {
    COMIC_ROLL,
    VIEW_POST
}

export interface Post_t {
    title: string,
    date: string, //TODO: change this
    slug: string,
    markDown: string,
    description: string,
}

export interface Content_t {
    [slug: string]: Post_t
}
