const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../web/public/api/data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const formattedStrings = data.map(coin => {
    const packageId = coin.type.split("::")[0];
    return `/* ${coin.symbol} */ "${packageId}",`;
});

const output = formattedStrings.join("\n");

console.log(output);
