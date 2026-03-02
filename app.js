class Product {
    constructor(nombre, categoria, precio, stock, estado, descripcion = '') {
        this.id = Date.now();
        this.nombre = nombre.trim();
        this.categoria = categoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.estado = estado;         
        this.descripcion = descripcion.trim();
    }
}

let productos = [
    new Product("Laptop Lenovo", "Electrónica", 1200, 5, "activo", "Alta gama – 16GB RAM"),
    new Product("Mouse Logitech", "Periféricos", 25, 8, "activo", "Inalámbrico"),
    new Product("Teclado RGB", "Periféricos", 45, 0, "inactivo", "Sin stock temporalmente")
];

function agregarProducto() {
    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const precioStr = document.getElementById("precio").value.trim();
    const stockStr = document.getElementById("stock").value.trim();
    const estado = document.getElementById("estado").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validaciones
    if (!nombre) return Swal.fire("Error", "El nombre es obligatorio", "warning");
    if (!categoria) return Swal.fire("Error", "Debe seleccionar una categoría", "warning");
    if (!precioStr || isNaN(precioStr) || Number(precioStr) <= 0) return Swal.fire("Error", "Precio inválido (debe ser mayor a 0)", "warning");
    if (!stockStr || isNaN(stockStr) || Number(stockStr) < 0) return Swal.fire("Error", "Stock inválido (no puede ser negativo)", "warning");
    if (!estado) return Swal.fire("Error", "Debe seleccionar el estado del producto", "warning");

    if (id) {
        const index = productos.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            productos[index].nombre = nombre;
            productos[index].categoria = categoria;
            productos[index].precio = parseFloat(precioStr);
            productos[index].stock = parseInt(stockStr);
            productos[index].estado = estado;
            productos[index].descripcion = descripcion;
        }

        Swal.fire({
            title: "¡Producto actualizado!",
            text: `${nombre} se actualizó correctamente`,
            icon: "success",
            timer: 2200,
            showConfirmButton: false
        });

    } else {
        const nuevo = new Product(nombre, categoria, precioStr, stockStr, estado, descripcion);
        productos.push(nuevo);

        Swal.fire({
            title: "¡Producto agregado!",
            text: `${nombre} se añadió correctamente`,
            icon: "success",
            timer: 2200,
            showConfirmButton: false
        });
    }

    // Limpiar formulario
    document.getElementById("producto-id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("btn-guardar").textContent = "Agregar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Agregar nuevo producto";

    // Volver a la lista y re-renderizar
    document.getElementById("btn-guardar").textContent = "Agregar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Agregar nuevo producto";
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-section="lista"]').classList.add('active');
    document.getElementById('seccion-lista').classList.add('active');
    renderizarProductos();
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    // Cargar datos en el formulario
    document.getElementById("producto-id").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("estado").value = producto.estado;
    document.getElementById("descripcion").value = producto.descripcion;

    document.getElementById("btn-guardar").textContent = "Actualizar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Editar producto";

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-section="agregar"]').classList.add('active');
    document.getElementById('seccion-agregar').classList.add('active');
}

function renderizarProductos() {
    const tbody = document.getElementById("cuerpo-tabla");
    tbody.innerHTML = "";

productos.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td class="${producto.estado === 'activo' ? 'estado-activo' : 'estado-inactivo'}">
                ${producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}
            </td>
            <td>${producto.descripcion || '—'}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto(${producto.id})">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Cancelar acción
function cancelarAccion(){
   document.getElementById("producto-id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("descripcion").value = "";

    document.getElementById("btn-guardar").textContent = "Agregar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Agregar nuevo producto";

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-section="lista"]').classList.add('active');
    document.getElementById('seccion-lista').classList.add('active');

    renderizarProductos();
}

// Navegación entre secciones
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));

        this.classList.add('active');
        const seccion = this.getAttribute('data-section');
        document.getElementById(`seccion-${seccion}`).classList.add('active');

        if (seccion === 'lista') {
            renderizarProductos();
        }
    });
});

renderizarProductos();