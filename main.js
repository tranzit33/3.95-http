const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const express = require('express');
const app = express();

const http = require("http");
const https = require('https');
const server = https.createServer({ key, cert }, app);
const port = 443;
const prompt = require("prompt-sync")();

const ipvps = prompt("VPS IP : ");
let data = `server|${ipvps}\ntype|1\n#maint|Server is under maintenance. We will be back online shortly. Thank you for your patience!\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001\n`;

const pack = `
server|${ipvps}
port|17091
type|1
#maint|Server is under maintenance. We will be back online shortly. Thank you for your patience!
beta_server|127.0.0.1
beta_port|17091

beta_type|1
meta|defined
RTENDMARKERBS1001|unknown
`;


app.post("/growtopia/server_data.php", (req, res) => {
    res.status(200).send(pack).end();
  });
  server.listen(443, () => {
  });

const servers = http.createServer(function(req, res) {
	let ipAddress = req.connection.remoteAddress;
	let url = req.url.split("/growtopia/")[1];
    switch (req.method) {
        case 'POST': {
          if (req.connection.remoteAddress == null) {
            req.connection.destroy();
        }
        var ip = req.connection.remoteAddress;
    
        if (ip == null) { //checks if the ip address has already destroyed.
            req.connection.destroy();
            break;
        }
          if (url && url.startsWith("server_data.php") && req.method.toLowerCase() === "post" && req.headers['content-type'] === "application/x-www-form-urlencoded" && req.headers['accept'] === "*/*" && (req.headers['user-agent'] == null || req.headers['user-agent'] == undefined) && req.httpVersion == 1.0 && req.headers['host'] === "www.growtopia1.com" || req.headers['host'] === "www.growtopia2.com") {
            res.write(`server|` + ipvps + `\nport|` + udpport + `\ntype|1\n#maint|Server is under maintenance. We will be back online shortly. Thank you for your patience\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001`);
            res.end();
          } 
          else {
            return req.connection.destroy();
          }
        }
        break;
    
            default: { //blocking exception on request method
                return req.connection.destroy();
            }
                break;
      }
});
console.log("HTTP/S Started!");
servers.listen(80);
