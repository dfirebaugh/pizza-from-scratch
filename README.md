Pizza From Scratch
=

This is a website worked on with 
[Bill Lemmond](https://github.com/Pastshelfdate) to publish his cartoons.


### Serving up the site for development
```
npm run serve
```

### Adding Content
Content exists in MarkDown Files in the `content` folder.

You can read up on how to write markdown files [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Typically, you will want to make a new folder for each post and place the images that belong in that post in the same folder.

>note: you should reference these images relative from the root of the repo e.g. (if the image is located at `content/imagename.png` you would reference it as `![image-alt-tag](content/imagename.png)`)

Each markdown file should start with some metadata at the top of the file.
e.g.: 
```
---
title: example post 2
description: this is just another example file for testing
date: 09-02-2020
slug: example-post 2
---
```

`slug` must be unique as it is used to reference the post in the code.