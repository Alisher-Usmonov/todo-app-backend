const express = require("express");
const cors = require("cors");
const { PORT } = require("../config");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const psql = require("./modules/psql");

const server = async () => {
    try {
        const app = express();
        // middlewares
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({
            "Access-Control-Allow-Origin": "*"
        }));
        app.use(morgan("tiny"));
        app.use(async (req, res, next) => {
            req.psql = await psql();
            next();
        })
        // Routes
        fs.readdir(path.join(__dirname, "routes"), (err, files) => {
            if(!err) {
                files.forEach(file => {
                    let routerPath = path.join(__dirname, "routes", file);
                    let Router = require(routerPath);
                    if(Router.router && Router.path) app.use("/api"+Router.path, Router.router);
                })
            }
        })


        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (err) {
        console.log(err.message);
    }
}
server();