export declare enum APP_MODES {
    COMIC_ROLL = 0,
    VIEW_POST = 1
}
export interface Post_t {
    title: string;
    date: string;
    slug: string;
    markDown: string;
    description: string;
}
export interface Content_t {
    [slug: string]: Post_t;
}
//# sourceMappingURL=types.d.ts.map