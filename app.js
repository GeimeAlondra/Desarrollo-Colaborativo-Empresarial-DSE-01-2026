let nextId = 1

class Product {
    constructor(nombre, categoria, precio, stock, descripcion = '') {
        this.id = generarId();
        this.nombre = nombre.trim();
        this.categoria = categoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.estado = this.stock > 0 ? "activo" : "inactivo";         
        this.descripcion = descripcion.trim();
    }

    actualizarStock(nuevoStock) {
        this.stock = parseInt(nuevoStock);
        this.estado = this.stock > 0 ? "activo" : "inactivo";
    }
}

function generarId() {
    const id = `PRD-${String(nextId).padStart(3, '0')}`;
    nextId++;
    return id;
}

function actualizarContadorId() {
    if (productos.length === 0) {
        nextId = 1;
        return;
    }
    
    let maxNum = 0;
    productos.forEach(p => {
        if (p.id && p.id.startsWith('PRD-')) {
            const num = parseInt(p.id.substring(4));
            if (!isNaN(num) && num > maxNum) maxNum = num;
        }
    });
    nextId = maxNum + 1;
}

let productos = [
    new Product("Laptop Lenovo IdeaPad", "Electrónica", 899.99, 12, "16GB RAM - 512GB SSD - Intel i5 12ª gen"),
    new Product("Mouse Inalámbrico Logitech MX Master 3S", "Periféricos", 99.99, 8, "Ergonómico, sensor 8000 DPI, USB-C"),
    new Product("Teclado Mecánico RGB HyperX Alloy Origins", "Periféricos", 129.90, 0, "Switches rojos - sin stock temporal"),
    new Product("Cable HDMI 2.1 8K 48Gbps 3m", "Componentes", 19.99, 30, "Alta velocidad - compatible PS5/Xbox Series X"),
    new Product("Disco SSD Samsung 970 EVO Plus 1TB", "Componentes", 109.99, 0, "NVMe M.2 - lectura 3500 MB/s"),
];
 
actualizarContadorId();

function agregarProducto() {
    const id = document.getElementById("producto-id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value;
    const precioStr = document.getElementById("precio").value.trim();
    const stockStr = document.getElementById("stock").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validaciones
    if (!nombre) return Swal.fire("Error", "El nombre es obligatorio", "warning");
    if (!categoria) return Swal.fire("Error", "Debe seleccionar una categoría", "warning");
    if (!precioStr || isNaN(precioStr) || Number(precioStr) <= 0) return Swal.fire("Error", "Precio inválido (debe ser mayor a 0)", "warning");
    if (!stockStr || isNaN(stockStr) || Number(stockStr) < 0) return Swal.fire("Error", "Stock inválido", "warning");

    if (id) {
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            const producto = productos[index]
            producto.nombre = nombre;
            producto.categoria = categoria;
            producto.precio = parseFloat(precioStr);
            producto.actualizarStock(stockStr);
            producto.descripcion = descripcion;
        }

        Swal.fire({
            title: "¡Producto actualizado!",
            text: `${nombre} se actualizó correctamente`,
            icon: "success",
            timer: 2200,
            showConfirmButton: false
        });

    } else {
        const nuevo = new Product(nombre, categoria, precioStr, stockStr, descripcion);
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
    resetearFormulario()
    cambiarSeccion('lista')
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
    document.getElementById("descripcion").value = producto.descripcion;

    document.getElementById("btn-guardar").textContent = "Actualizar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Editar producto";

    cambiarSeccion('agregar')
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
                <button class="btn-editar" onclick="editarProducto('${producto.id}')">Editar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function cancelarAccion(){
    resetearFormulario();
    cambiarSeccion('lista');
    renderizarProductos();
}

function resetearFormulario() {
    document.getElementById("producto-id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("btn-guardar").textContent = "Agregar producto";
    document.querySelector("#seccion-agregar h2").textContent = "Agregar nuevo producto";
}

function cambiarSeccion(seccion) {
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));

    document.querySelector(`[data-section="${seccion}"]`).classList.add('active');
    document.getElementById(`seccion-${seccion}`).classList.add('active');
}

// Navegación entre secciones
document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.seccion').forEach(s => s.classList.remove('active'));

        this.classList.add('active');
        const seccion = this.getAttribute('data-section');
        document.getElementById(`seccion-${seccion}`).classList.add('active');

        if (seccion === 'lista') {
            resetearFormulario()
            renderizarProductos();
        }
    });
});

renderizarProductos();