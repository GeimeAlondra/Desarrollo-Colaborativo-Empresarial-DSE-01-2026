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
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const precioStr = document.getElementById("precio").value.trim();
    const stockStr = document.getElementById("stock").value.trim();
    const estado = document.getElementById("estado").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validaciones
    if (!nombre) {
        return Swal.fire("Error", "El nombre es obligatorio", "warning");
    }
    if (!categoria) {
        return Swal.fire("Error", "Debe seleccionar una categoría", "warning");
    }
    if (!precioStr || isNaN(precioStr) || Number(precioStr) <= 0) {
        return Swal.fire("Error", "Precio inválido (debe ser mayor a 0)", "warning");
    }
    if (!stockStr || isNaN(stockStr) || Number(stockStr) < 0) {
        return Swal.fire("Error", "Stock inválido (no puede ser negativo)", "warning");
    }
    if (!estado) {
        return Swal.fire("Error", "Debe seleccionar el estado del producto", "warning");
    }

    const precio = parseFloat(precioStr);
    const stock  = parseInt(stockStr);

    const nuevo = new Product(nombre, categoria, precio, stock, estado, descripcion);
    productos.push(nuevo);

   Swal.fire({
        title: "¡Producto agregado!",
        text: `${nombre} se añadió correctamente`,
        icon: "success",
        timer: 2200,
        showConfirmButton: false
    });

    // Limpiar formulario
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("descripcion").value = "";

    if (document.getElementById("seccion-lista").classList.contains("active")) {
        renderizarProductos();
    }
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