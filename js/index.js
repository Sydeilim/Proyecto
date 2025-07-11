document.addEventListener("DOMContentLoaded", () => {
    const urlProductosBelleza = 'https://dummyjson.com/products/category/beauty'
    const urlProductosFragancias = 'https://dummyjson.com/products/category/fragrances'
    const urlProductosCuidado = 'https://dummyjson.com/products/category/skin-care'
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    const renderizarProductos = (url, idContenedor) => {
        fetch(url)
        .then((res)=> res.json())
        .then((datos) => {
            let contenedorProductos = document.getElementById(idContenedor)
            for (const producto of datos.products) {
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

                let botonAgregar = document.createElement("button");
                botonAgregar.textContent = "Agregar";
                botonAgregar.addEventListener("click", () => {
                    alert(` El producto ${producto.title} se agrego al carrito`);
                    agregarProducto(producto);
                    actualizarAgregados();
                });

                tarjetaProducto.appendChild(imagenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(botonAgregar);

                contenedorProductos.appendChild(tarjetaProducto);

            }
        }).catch((err) => console.error("Error: ", err));
    }
    const agregarProducto = (producto) => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };
    const actualizarAgregados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };
    renderizarProductos(urlProductosBelleza, "contenedor-productos-belleza");
    renderizarProductos(urlProductosFragancias, "contendor-productos-fragancias");
    renderizarProductos(urlProductosCuidado, "contendor-productos-cuidado-personal");
    actualizarAgregados();
});

