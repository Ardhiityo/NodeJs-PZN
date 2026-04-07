import fs from "node:fs";

export const writeFile = (path, data) => {
    fs.writeFileSync(path, data);
}