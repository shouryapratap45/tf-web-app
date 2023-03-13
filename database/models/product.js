const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  text: String
});

const productModel=new mongoose.model("products", productSchema);

module.exports=productModel;

// productModel.insertMany([
//     {
//         name: "Jacket",
//         price: 700,
//         imageUrl: "/img/jacket.jpg",
//         text: "A jacket is a garment for the upper body, usually extending below the hips. A jacket typically has sleeves, and fastens in the front or slightly on the side. A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear."
//     },
//     {
//         name: "Jeans",
//         price: 500,
//         imageUrl: "/img/jeans.jpg",
//         text: "Jeans are a type of pants or trousers made from denim or dungaree cloth. Often the term \"jeans\" refers to a particular style of trousers, called \"blue jeans\", which were invented by Jacob W. Davis in partnership with Levi Strauss & Co. in 1871[1] and patented by Jacob W. Davis and Levi Strauss on May 20, 1873. Prior to the Levi Strauss patented trousers, the term \"blue jeans\" had been long in use for various garments (including trousers, overalls, and coats), constructed from blue-colored denim"
//     },
//     {
//         name: "Shoes",
//         price: 800,
//         imageUrl: "/img/shoes.jpg",
//         text: "A shoe is an item of footwear intended to protect and comfort the human foot. They are often worn with a sock. Shoes are also used as an item of decoration and fashion. The design of shoes has varied enormously through time and from culture to culture, with form originally being tied to function. Though the human foot can adapt to varied terrains and climate conditions, it is still vulnerable to environmental hazards such as sharp rocks and temperature extremes, which shoes protect against. Some shoes are worn as safety equipment, such as steel-toe boots which are required footwear at industrial worksites."
//     },
//     {
//         name: "Laptop",
//         price: 50000,
//         imageUrl: "/img/laptop.jpg",
//         text: "MacOS, formerly (1984–2001) Mac OS and (2001–2016) Mac OS X, operating system (OS) developed by the American computer company Apple Inc. The OS was introduced in 1984 to run the company’s Macintosh line of personal computers (PCs). The Macintosh heralded the era of graphical user interface (GUI) systems, and it inspired Microsoft Corporation to develop its own GUI, the Windows OS."
//     },
//     {
//         name: "Keyboard",
//         price: 700,
//         imageUrl: "/img/keyboard.jpg",
//         text: "A keyboard is for putting information including letters, words and numbers into your computer. You press the individual buttons on the keyboard when you type. The number keys across the top of the keyboard are also found on the right of the keyboard. The letter keys are in the centre of the keyboard."
//     },
//     {
//         name: "Mouse",
//         price: 300,
//         imageUrl: "/img/mouse.jpg",
//         text: "A mouse is a small device that a computer user pushes across a desk surface in order to point to a place on a display screen and to select one or more actions to take from that position. The mouse first became a widely-used computer tool when Apple Computer made it a standard part of the Apple Macintosh."
//     },
//     {
//         name: "TV",
//         price: 18000,
//         imageUrl: "/img/tv.jpg",
//         text: "An LED is a semiconductor device that emits visible light when an electric current passes through it. The light is not particularly bright, but in most LEDs it is monochromatic, occurring at a single wavelength. In comparison with fluorescent lights, LEDs have significantly lower power requirements and convert power to light more efficiently so that less is lost as heat and focus it more precisely so that there is less light leakage, which can cause fuzziness. An LED also lasts much longer than most other lighting technologies."
//     },
//     {
//         name: "Smartphone",
//         price: 15000,
//         imageUrl: "/img/mobile.jpg",
//         text: "A smartphone is a cellular telephone with an integrated computer and other features not originally associated with telephones such as an operating system, web browsing, and the ability to run software applications."
//     },
//     {
//         name: "Washing Machine",
//         price: 8000,
//         imageUrl: "/img/washing.jpg",
//         text:"Washing maching uses to wash clothes" 
//     }
// ]);