const fs = require('fs');
const readline = require('readline');

class Producto{
  constructor(id,desc,prize,clasif,cant,min,max){
    this.id = id;
    this.desc = desc;
    this.prize = prize;
    this.clasif = clasif;
    this.cant = cant;
    this.min = min;
    this.max = max;
  }
}

let prod = [];

async function leerArchivo() {
  let c=0
  const rl = readline.createInterface({
    input: fs.createReadStream('./list.txt'),
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let array = []; //Array con los datos del objeto
    let current=0;
    let string = ""; // variable que guarda cada dato del objeto
    for (let i=0; i<line.length; i++){
      if(line[i] == " " || line[i] == '/'){ //Condicion para validar si hay un espacio en la linea, lo que significa que el dato(atributo del objeto) ha acabado y sigue con otro.
        array[current] = string;
        current++;
        string = "";
      }else{
        string=string+line[i];
      }
    }
    array[0] = parseFloat(array[0]);
    array[2] = parseFloat(array[2]);
    array[4] = parseFloat(array[4]);
    array[5] = parseFloat(array[5]);
    array[6] = parseFloat(array[6]);
    prod[c]= new Producto(array[0],array[1],array[2],array[3],array[4],array[5],array[6]); //Se crea el objeto producto dentro del array de productos
    c++;
  }
}

const exist20=()=>{
  let c = 0;
  for (let i=0;i<prod.length;i++){
    if(prod[i].cant > 20){
      c++;
    }
  }
  console.log(`Cantidad de productos con existencia mayor a 20: ${c}`);
}

const existMin15=()=>{
  let c = 0;
  for (let i=0;i<prod.length;i++){
    if(prod[i].cant < 15){
      c++;
    }
  }
  console.log(`Cantidad de productos con existencia menor a 15: ${c}`);
}

const sameClasPrize= ()=>{
  let listA=[];
  let listB=[];
  let listC=[];
  let listD=[];

  for (let i=0;i<prod.length;i++){
    if(prod[i].clasif=='A' && prod[i].prize > 15.5){
      listA.push(prod[i].desc);
    }else if(prod[i].clasif=='B' && prod[i].prize > 15.5){
      listB.push(prod[i].desc);
    }else if(prod[i].clasif=='C' && prod[i].prize > 15.5){
      listC.push(prod[i].desc);
    }else if(prod[i].clasif=='D' && prod[i].prize > 15.5){
      listD.push(prod[i].desc);
    }
  }
  console.log(`Lista de productos con la misma clasificación A y precio mayor 15.50: ${listA}`);
  console.log(`Lista de productos con la misma clasificación B y precio mayor 15.50: ${listB}`);
  console.log(`Lista de productos con la misma clasificación C y precio mayor 15.50: ${listC}`);
  console.log(`Lista de productos con la misma clasificación D y precio mayor 15.50: ${listD}`);
}

const prodBetween = async () => {
  let list = [];
  for (let i = 0; i < prod.length; i++) {
    if (prod[i].prize > 20.3 && prod[i].prize < 45.0) {
      list.push(prod[i].desc);
    }
  }
  console.log(`Productos con precio mayor a 20.3 y menor a 45: ${list}`);
};

const numAgrup = ()=>{
  let cA=0;
  let cB=0;
  let cC=0;
  let cD=0;

  for (let i=0;i<prod.length;i++){
    if(prod[i].clasif=='A'){
      cA++;
    }else if(prod[i].clasif=='B'){
      cB++;
    }else if(prod[i].clasif=='C'){
      cC++;
    }else if(prod[i].clasif=='D'){
      cD++;
    }
  }
  console.log(`Numero de productos con clasificacion A: ${cA}`);
  console.log(`Numero de productos con clasificacion B: ${cB}`);
  console.log(`Numero de productos con clasificacion C: ${cC}`);
  console.log(`Numero de productos con clasificacion D: ${cD}`);
}

async function main() {
  await leerArchivo();
  exist20();
  console.log();
  existMin15();
  console.log();
  sameClasPrize();
  console.log();
  prodBetween();
  console.log();
  numAgrup();
}

main();
