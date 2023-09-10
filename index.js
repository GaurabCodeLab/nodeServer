const http = require('http');
const fs = require('fs');
const data = fs.readFileSync("index.html", "utf-8");
const api = fs.readFileSync("data.json", "utf-8");
const server = http.createServer((req, res)=>{
    if(req.url.startsWith("/product")){
        const id = req.url.split("/")[2];
        res.writeHead(200, {
            "Content-Type" : "text/html"
        });
        const updatedData = data.replace("**url**", JSON.parse(api).products[id-1].images[0])
        .replace("**title**", JSON.parse(api).products[id-1].title)
        .replace("**price**", JSON.parse(api).products[id-1].price)
        .replace("**rating**", JSON.parse(api).products[id-1].rating)
        res.write(updatedData);
        res.end()

    } else if(req.url.startsWith("/")){
        res.writeHead(200, {
            "Content-Type" : "text/html"
        });
        const updatedData = data.replace("**url**", JSON.parse(api).products[0].images[0])
        res.write(updatedData);
        res.end();
    }

})

server.listen(8080);


