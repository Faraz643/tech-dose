import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World working fine");
//   res.status(404).send('404 r')
});

app.get('/api/test', (req, res)=>{
    console.log('Calling from client side: Api is working')
})


app.listen(port, ()=>{
    console.log('200! OK')
});
