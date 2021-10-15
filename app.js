var express = require('express');
var mysql= require('mysql');
var cors = require('cors');
var app = express();
;
app.use(express.json());
app.use(cors());
var conexion = mysql.createPool({
    host:'us-cdbr-east-04.cleardb.com',
    user:'b3dc391cc851fb',
    password:'08fcee7d',
    database:'heroku_dfe49c234591b59'
});

conexion.getConnection(function(err){
  if(err){
      throw err;
  }else{
      console.log("Conexion a la base de datos Exitosa!");
  }
});

app.get('/', (req, res) => {
  res.json({mensaje:"¡Haupei Kp!"});
});

//Mostrar todos los moniciones
app.get('/api/moniciones', (req, res) => {
  conexion.query("SELECT * FROM moniciones", (error, filas)=>{
      if(error){
          throw error;
      }else{
          res.send(filas);
      }
  });
});
//Mostrar una sola monicion por su ID a traves de (params /:)
app.get("/api/moniciones/:id", (req, res) => {
  conexion.query("SELECT * FROM moniciones WHERE id=?", [req.params.id],(error, fila)=>{
      if(error){
          throw error;
      }else{
          res.send(fila);
          //res.send(fila[0].titulo);
      }
  });
});
//Mostrar una sola monicion por su fecha a traves de (params /:)
app.get("/api/moniciones/fecha/:fecha", (req, res) => {
    conexion.query(`SELECT * FROM moniciones WHERE fecha = ?`, [req.params.fecha],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].titulo);
        }
    });
});
//Mostrar una sola monicion por su titulo, ciclo y tiempo a traves de (params /:)
app.get("/api/moniciones/:titulo/:ciclo/:tiempo", (req, res) => {
    conexion.query("SELECT * FROM moniciones WHERE titulo = ? AND ciclo = ? AND tiempo = ?", [req.params.titulo, req.params.ciclo, req.params.tiempo],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].titulo);
        }
    });
  });
  //Mostrar moniciones por su Ciclo a traves de (params /:)
app.get('/api/moniciones/ciclo/:ciclo', (req, res) => {
    
    conexion.query("SELECT * FROM moniciones WHERE ciclo=? OR ciclo='a, b y c'", [req.params.ciclo],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].titulo);
        }
    });
  });

//Mostrar moniciones por su Ciclo y tiempo a traves de (params /:)
app.get('/api/moniciones/ciclo/:ciclo/tiempo/:tiempo', (req, res) => {
    
    conexion.query("SELECT * FROM moniciones WHERE ciclo=? AND tiempo=?", [req.params.ciclo, req.params.tiempo],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].titulo);
        }
    });
  });

//Mostrar moniciones por su Tiempo y Ciclo a traves de (params /:)
app.get('/api/moniciones/tiempo/:tiempo/ciclo/:ciclo', (req, res) => {
    
    conexion.query("SELECT * FROM moniciones WHERE tiempo=? AND ciclo=? OR ciclo='a, b y c'", [req.params.tiempo, req.params.ciclo],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].titulo);
        }
    });
  });

//Crear una sola moniciones
app.post('/api/moniciones', (req, res)=>{
    conexion.query("INSERT INTO moniciones (dia, semana, fecha, titulo, ciclo, tiempo, entrada, lecturas, respuestaOracionUniversal, oracionUniversal1, oracionUniversal2, oracionUniversal3, oracionUniversal4, oracionUniversal5, presentacionDeLasOfrendas, comunion, despedida) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.dia, req.body.semana, req.body.fecha, req.body.titulo, req.body.ciclo, req.body.tiempo, req.body.entrada, req.body.lecturas, req.body.respuestaOracionUniversal, req.body.oracionUniversal1, req.body.oracionUniversal2, req.body.oracionUniversal3, req.body.oracionUniversal4, req.body.oracionUniversal5, req.body.presentacionDeLasOfrendas, req.body.comunion, req.body.despedida], function(error, results){
        if(error){
            throw error;
        }else{
            res.send('Monición Creada con Éxito');
      }
  });
});

//Editar un moniciones
app.put("/api/moniciones/:id", (req, res) => {
  let id = req.params.id;
  let dia = req.body.dia;
  let semana = req.body.semana;
  let fecha = req.body.fecha;
  let titulo = req.body.titulo;
  let ciclo = req.body.ciclo;
  let tiempo = req.body.tiempo;
  let entrada = req.body.entrada;
  let lecturas = req.body.lecturas;
  let respuestaOracionUniversal = req.body.respuestaOracionUniversal;
  let oracionUniversal1 = req.body.oracionUniversal1;
  let oracionUniversal2 = req.body.oracionUniversal2;
  let oracionUniversal3 = req.body.oracionUniversal3;
  let oracionUniversal4 = req.body.oracionUniversal4;
  let oracionUniversal5 = req.body.oracionUniversal5;
  let presentacionDeLasOfrendas = req.body.presentacionDeLasOfrendas;
  let comunion = req.body.comunion;
  let despedida = req.body.despedida;
  let sql = "UPDATE moniciones SET  dia=?, semana=?, fecha=?, titulo=?, ciclo=?, tiempo=?, entrada=?, lecturas=?, respuestaOracionUniversal=?, oracionUniversal1=?, oracionUniversal2=?, oracionUniversal3=?, oracionUniversal4=?, oracionUniversal5=?, presentacionDeLasOfrendas=?, comunion=?, despedida=? WHERE id=?";
  conexion.query(sql, [dia, semana, fecha, titulo, ciclo, tiempo, entrada, lecturas, respuestaOracionUniversal, oracionUniversal1, oracionUniversal2, oracionUniversal3, oracionUniversal4, oracionUniversal5, presentacionDeLasOfrendas, comunion, despedida, id], function (error, results) {
      if(error){
          throw error;
      }else{
          res.send('Monición Modificada con Éxito');
      }
  });
  
});

//Eliminar una monicion
app.delete("/api/moniciones/:id", (req, res) => {
  conexion.query("DELETE FROM moniciones WHERE id=?", [req.params.id], function (error, filas) {
      if(error){
          throw error;
      }else{
          res.send('Monicion Eliminada con Éxito');
      }
  });
});

app.set('port', process.env.PORT || 7000);

app.listen(app.get('port'), ()=> {
    console.log(`Servidor Iniciado en puerto: ${app.get('port')}`);
});