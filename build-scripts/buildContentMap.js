import fs from "fs";
import path from "path";

const markDownContent = {};

const contentDirectory = "./content"
fs.mkdirSync(`dist/comics`, { recursive: true })

fileToBuildFolder("index.html", "dist/index.html");

const getAllFiles = function (dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            const currentFile = path.join(dirPath, "/", file)
            fileToBuildFolder(currentFile, `dist/comics/${file}`)
            if (path.extname(currentFile) == ".md")
                arrayOfFiles.push(currentFile)
        }
    })

    return arrayOfFiles
}

const markDownFiles = getAllFiles(contentDirectory, [])

markDownFiles.forEach(function (markdownFile) {
    const post = {}

    const fileContents = fs.readFileSync(markdownFile, {
        encoding: 'utf8'
    })

    /**
     * strip out the metadata
     */
    const firstvariable = "---\n";
    const secondvariable = "---\n"
    var regExString = new RegExp("(?:" + firstvariable + ")((.[\\s\\S]*))(?:" + secondvariable + ")", "ig"); //set ig flag for global search and case insensitive
    const metadataUnparsed = fileContents.match(regExString);
    const markDownStripped = fileContents.substr(metadataUnparsed[0].length, fileContents.length);

    post["markDown"] = markDownStripped;

    metadataUnparsed.forEach(x => {
        return x.split("\n").filter(line => line != "---").forEach(property => {
            if (property.length == 0) return;

            const [key, value] = property.split(":");
            if (key == "slug") {
                /**
                * remove spaces from slug
                * */
                const slug = value.trim().replace(" ", "_")
                post[key] = slug;
            } else {
                post[key.trim()] = value;
            }
        })
    })

    /**
     * remove spaces from slug
     */
    const slug = post.slug.trim().replace(" ", "_")
    markDownContent[slug] = post;
})

const outputString = JSON.stringify(markDownContent);

fs.writeFile(`./src/content.json`, outputString, function (err) {
    if (err) {
        console.error(err);
    }
})

function fileToBuildFolder(filePath, destPath) {
    fs.copyFile(filePath, destPath, (err) => {
        if (err) throw err;
        console.log(filePath, `was copied to ${destPath}`);
    });
}
