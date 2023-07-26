const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito");
const modalcontainer = document.getElementById("modal-container")

const productos = [
    { 
      id:1,
      nombre: "costillar",
      precio: 500,
      img: "https://soloporgusto.com/wp-content/uploads/2021/08/ohra-pampa-costillar.jpg",
    },
    {
        id: 2, 
        nombre: "cocacola", 
        precio: 350,
        img: "https://as2.ftcdn.net/v2/jpg/02/79/49/49/1000_F_279494912_hMOXGnxL4skdTpZOtpQzlNSsmq1ZxR7V.jpg",
    },
    { 
        id: 3,
        nombre: "fernet", 
        precio: 580,
        img:"https://d22fxaf9t8d39k.cloudfront.net/e8f7024a702c77fb813c6e327b49b4ba78ce91143b172a76235f0ee8a8cc1929151809.jpeg",
    },
    { 
        id: 4,
        nombre: "verduras", 
        precio: 250,
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIAQ3IpgfL8av1DArhJK1NBc8sBrgNrbsUPQ&usqp=CAU",
    },
    { 
        id: 5,
        nombre: "hielo", 
        precio: 50,
        img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/452/929/products/bolsa-hielo-bolsalogo1-266e54d91c1cd7f82d16534243058132-480-0.webp",
    },
];

let carrito = [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio}</p>
    `;

    shopcontent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio
        })
        console.log(carrito);
    })

});

vercarrito.addEventListener("click", () =>{
    modalcontainer.innerHTML ="";
    modalcontainer.style.display = "flex";
    const modalheader = document.createElement("div");
    modalheader.className = "modal-header"
    modalheader.innerHTML = `
      <h1 class="modal-header-title">carrito.</h1>
    `;
    modalcontainer.append(modalheader);
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    })

    modalheader.append(modalbutton)

    carrito.forEach((product) => {
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content"
        carritocontent.innerHTML = `
         <img src="${product.img}">
         <h3>${product.nombre}</h3>
         <p>${product.precio} $</p>
        `;

        modalcontainer.append(carritocontent)
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content"
    totalbuying.innerHTML = `total a pagar: ${total} $`;
    modalcontainer.append(totalbuying);
});