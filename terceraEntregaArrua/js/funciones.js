// Tipo de torta

const guardarProductosLS = (nombresTorta) => {
    localStorage.setItem("nombresTorta", JSON.stringify(nombresTorta));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("nombresTorta")) || [];
}

const guardarIdProducto = (id) => {
    localStorage.setItem("idnombresTorta", JSON.stringify(id));
}

const cargarIdProducto = () => {
    return JSON.parse(localStorage.getItem("idnombresTorta"));
}


// Tamaño de torta

const guardarTamanoLS = (tiposTorta) => {
    localStorage.setItem("tipos", JSON.stringify(tiposTorta));
}

const cargarTamanoLS = () => {
    return JSON.parse(localStorage.getItem("tamanoTorta")) || [];
}

const guardarIdTamano = (id) => {
    localStorage.setItem("tamanoTorta", JSON.stringify(id));
}

const cargarIdTamano = () => {
    return JSON.parse(localStorage.getItem("idtamanoTorta"));
}

const tiposDetorta = (id) => {
    const tipos = cargarTamanoLS(); 
    const tipo = cargarTamanoLS()
    const tamanio = tiposTorta.find(item => item.id == IdTamano);
}



const mostrarProductos = () => {
    const tiposTorta = cargarProductosLS();
    let contenidoHTML = "";
    

    for (const item of nombresTorta) {
        contenidoHTML += `<div class="card border-0 mb-3" style="width: 18rem;">
        <a href="tipotorta.html" class= "text-dark text-decoration-none" onclick="guardarIdProducto(${item.id})" >
            <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
            <div class="card-body">
            <p class="card-text h4 text-center" style="font-size: xx-large ;font-weight: 200;">${item.nombre}</p>
            </div>
        </a>
        </div>
        </div>`
    }
    document.getElementById("tiposTorta").innerHTML = contenidoHTML;
}

const mensaje = (texto) => {
    Swal.fire({
        title: "Sweet!",
        text: "My cake ya es parte de la fiesta!",
        imageUrl: "images/logo.png",
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Mycake"
      });
}

const errorCarga = (texto) => {
    Swal.fire("Ingresa el número de personas");
}

const errorCarga2 = (texto) => {
    Swal.fire("Por favor, hacer click en Calcular precio antes de enviar el pedido.");
}

const renderProducto = () => {
    const idProducto = cargarIdProducto(); 
    const productos = cargarProductosLS();
    const producto = nombresTorta.find(item => item.id == idProducto);

    let contenidoHTML = `
        <div class="col-md-4 offset-md2">
            <img src="${producto.imagen}" class="img-fluid mb-5" alt="${producto.nombre}"/>
            <h2 class="mb-4" style=" font-size: xx-large ;font-weight: 200;">${producto.tipo}</h2>
        </div>
    
        <div class="col-md-4">
            <select id="cantidadPorciones" class="form-select mb-4" aria-label="Default select example">
                <option selected>¿Para cuántas personas es la torta?</option>
                <option value="10">10 personas</option>
                <option value="18">18 personas</option>
                <option value="24">24 personas</option>
                <option value="32">32 personas</option> 
                <option>Por mayor cantidad consulte por privado</option>
            </select>

            <div class="card-body">
                <button class="btn btn-info border-1 shadow p-3 mb-5 rounded tm-5 bm-5 text-white" onclick="mostrarPrecio(); guardarIdTamano()">Calcular precio</button>
            </div>

            <div class= mb-5>
                <h4 id="nombre" style=" font-size: xx-large ;font-weight: 200;">${producto.nombre}</h4>
                <h3 id="precioTotal" class= mt-5  style=" font-size: 2rem ;font-weight: 200;">Precio total: $0</h3>
                </div>
            <div class="d-grid gap-8 d-md-block">
            <button class="btn btn-info border-1 shadow p-3 mb-5 me-2 rounded tm-5  text-white" onclick="enviarPedido()" style="font-size: 1.1rem ;font-weight: 700;" type="button">¡Enviar Pedido!</button> 
            <button class="btn btn-body-color border-1 shadow p-3 mb-5  rounded tm-5 text-gray" onclick="resetPage()" style="font-size: 1.1rem ;font-weight: 300;" type="button">reset</button>
            </div>
            </div>
        </div>`

    document.getElementById("tiposTorta").innerHTML = contenidoHTML;
}

const mostrarPrecio = () => {
    const valorSeleccionado = parseInt(document.getElementById("cantidadPorciones").value); 
    const productoSeleccionado = tiposTorta.find(item => item.id === valorSeleccionado);

    if (!productoSeleccionado) {
        errorCarga()
    }

    const precioTotal = productoSeleccionado.precioPorcion * valorSeleccionado;

    document.getElementById("precioTotal").innerHTML = `Precio total: $${precioTotal}`;
    document.getElementById("nombre").innerHTML = `${productoSeleccionado.nombre}`;
}


const enviarPedido = () => {
    const cantidadPorciones = document.getElementById("cantidadPorciones").value;
    const precioTotal = document.getElementById("precioTotal").textContent;
        
    if (cantidadPorciones === "¿Para cuántas personas es la torta?" || cantidadPorciones === "") {
        errorCarga();
        return;
    }
        
    if (precioTotal === "Precio total: $0") {
        errorCarga2();
        return;
    }
    
    mensaje();

};

function resetPage() {
    location.reload(); 
}

