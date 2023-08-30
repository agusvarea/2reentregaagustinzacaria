const shopcontent = document.getElementById("shopcontent");
const vercarrito = document.getElementById("vercarrito");
const modalcontainer = document.getElementById("modal-container")
const cantidadcarrito = document.getElementById("cantidadcarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
/* funcion asincrona para recorrer todos los productos*/
const getproducts = async ()=>{
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product)=> {
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
            Toastify({
                text: "se agrego al carrito",
                duration: 3000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                  borderRadius:"2rem",
                  textTransform:"uppercase",
                  fontSize:".75rem"
                },
                onClick: function(){} // Callback after click
              }).showToast();
            const repeat = carrito.some((repeatproduct) => repeatproduct.id === product.id);
            if (repeat){
                carrito.map((prod) => {
                    if(prod.id === product.id){
                        prod.cantidad++;
                    }
                });
            }else{
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
            }
            console.log(carrito);
            carritocounter();
            savelocal();
        })
    
    });
};
getproducts();
/*funcion del carrito*/
const pintarcarrito = () =>{
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
/* funcion para ver los productos del carrito*/
    carrito.forEach((product) => {
        let carritocontent = document.createElement("div");
        carritocontent.className = "modal-content"
        carritocontent.innerHTML = `
         <img src="${product.img}">
         <h3>${product.nombre}</h3>
         <p>${product.precio} $</p>
         <span class="restar"> - </span>
         <p>cantidad: ${product.cantidad}</p>
         <span class="sumar"> + </span>
         <p> total: ${product.cantidad * product.precio}</p>
        `;

        modalcontainer.append(carritocontent);

        let restar = carritocontent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if(product.cantidad !== 1){
                product.cantidad--; 
            }
            savelocal();
            pintarcarrito();
        })

        let sumar = carritocontent.querySelector(".sumar");
        sumar.addEventListener("click", () =>{
            product.cantidad++;
            savelocal();
            pintarcarrito();
        })

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritocontent.append(eliminar);

        eliminar.addEventListener("click",eliminarproducto)
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalbuying = document.createElement("div");
    totalbuying.className = "total-content"
    totalbuying.innerHTML = `total a pagar: ${total} $`;
    modalcontainer.append(totalbuying);
}

vercarrito.addEventListener("click", pintarcarrito);
/* funcion para eliminar cosas del carrito*/
const eliminarproducto = () => {
    Toastify({
        text: "producto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius:"2rem",
          textTransform:"uppercase",
          fontSize:".75rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const foundid = carrito.find((Element) => Element.id);
    carrito = carrito.filter((carritoid) => {
        return carritoid !== foundid;
    });
    carritocounter();
    savelocal();
    pintarcarrito();
};

const carritocounter = () => {
    cantidadcarrito.style.display = "block";
    const carritolength = carrito.length;
    localStorage.setItem("carritolength",JSON.stringify(carritolength))
    cantidadcarrito.innerText = JSON.parse(localStorage.getItem("carritolength"))
};

carritocounter();

// set item
const savelocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

 
