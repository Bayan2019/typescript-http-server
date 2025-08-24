import express from "express";
const app = express();
const PORT = 8080;
// const handlerReadiness = (req, res) => {//Promise<void>
//     req.set()
//     req.send("OK")
// };
// Use the static middleware in Express to serve the file
// app.use(express.static("."));
// Use the express.static middleware alongside app.use to mount the /app path
app.use("/app", express.static("./src/app"));
app.get("/healthz", (req, res) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send("OK");
});
// Set the server to listen on port 8080 using the .listen() method
// app.listen("8080")
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
