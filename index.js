const express = require("express");
const { readFileSync, writeFileSync } = require("node:fs");
const app = express();

//levantamos el servidor
app.listen(3000, () => {
  console.log("puerto activo");
});

// esto es un middleware
app.use(express.json());

//Definimos nuestras rutas-CRUD
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(readFileSync("canciones.json", "utf-8"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const canciones = JSON.parse(readFileSync("canciones.json"));
  const body = req.body;
  canciones.push(body);

  writeFileSync("canciones.json", JSON.stringify(canciones));

  res.json("cancion agregada con éxito");
});

app.delete("/:name", (req, res) => {
  const name = req.params.name;
  const canciones = JSON.parse(readFileSync("canciones.json", "utf-8"));

  const index = canciones.findIndex((cancion) => cancion.name === name);
  canciones.splice(index, 1);
  writeFileSync("canciones.json", JSON.stringify(canciones));
  res.json("cancion eliminada con éxito");
});


/* 
app.put("/:name", (req, res) => {
  const name = req.params.name;
  const body = req.body;
  const canciones = JSON.parse(readFileSync("canciones.json", "utf-8"));

  const index = canciones.findIndex((cancion) => cancion.name === name);
  canciones[index] = body;

  writeFileSync("canciones.json", JSON.stringify(canciones));
  res.json("cancion eliminada con éxito");
});
 */