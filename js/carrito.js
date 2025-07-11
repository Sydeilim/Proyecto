document.addEventListener("DOMContentLoaded", () => {
    const renderizarProductos = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrtito(carrito);
        
        let precioTotalActual = 0;
        
        let seccionProductos = document.getElementById("lista-carrito");
        seccionProductos.innerHTML = "";

        if(!carrito.length) {

            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.textContent = "No hay productos en carrito";
            seccionProductos.appendChild(mensajeCarrito);

        } else {
            carrito.forEach((producto, index) => {

                precioTotalActual += producto.price;

                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("producto");

                let tituloProducto = document.createElement("h3");
                tituloProducto.classList.add("titulo-producto");
                tituloProducto.textContent = producto.title;
                
                let imagenProducto = document.createElement("img");
                imagenProducto.src = producto.images[0];
                imagenProducto.alt = producto.description;

                let precioProducto = document.createElement("p");
                precioProducto.textContent = `$${producto.price}`;

                let botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.addEventListener("click", () => {
                    eliminarProducto(producto, index);
                })

                tarjetaProducto.appendChild(imagenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(botonEliminar);

                seccionProductos.appendChild(tarjetaProducto);
            });
        }
        let textoCantidadProductos = document.getElementById("total-productos");
        textoCantidadProductos.textContent = carrito.length;

        let textoPrecioTotalActual = document.getElementById("importe-total");
        textoPrecioTotalActual.textContent = precioTotalActual.toFixed(2);
        renderizarBotones();
    }
    const renderizarBotones = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = "";

        if(carrito.length) {

            let botonVaciar = document.createElement("button");
            botonVaciar.textContent = "Vaciar carrito";
            botonVaciar.addEventListener("click", () => {
                vaciarCarrito();
            });

            let botonFinalizar = document.createElement("button");
            botonFinalizar.textContent = "Finalizar compra";
            botonFinalizar.addEventListener("click", () => {
                let confirmado = confirm("Seguro que desea finalizar la compra?");
                if(confirmado) {
                    alert("Gracias por su compra");
                    localStorage.removeItem("carrito");
                    window.location.href = "../index.html";
                };
            });
            divAcciones.appendChild(botonVaciar);
            divAcciones.appendChild(botonFinalizar);
        };
    };

    const productosEnCarrtito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito")
        contadorCarrito.textContent = carrito.length;
    };

    const eliminarProducto = (producto, index) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`El producto ${producto.title} fue eliminado del carrito`);
        renderizarProductos();
    }

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert("Carrito vaciado");
        renderizarProductos();
    }

    renderizarProductos();
});
