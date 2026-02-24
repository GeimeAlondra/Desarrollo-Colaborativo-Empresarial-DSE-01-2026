class Product {
    constructor(nombre, precio, stock, descripcion = '') {
        this.id = Date.now();
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.descripcion = descripcion;
    }
}

// Prueba
let productos = [
    new Product("Laptop", 1200, 5, "Alta gama"),
    new Product("Mouse", 25, 5, "Inalámbrico")
];

function agregarProducto() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const descripcion = document.getElementById('descripcion').value;
    
    const nuevo = new Product(nombre, precio, stock, descripcion);
    productos.push(nuevo)
    renderizarProductos();

    
}

function renderizarProductos() {
    const tbody = document.getElementById('cuerpo-tabla');
    if (!tbody) {
        console.error("No se encontró el contenedor de la tabla");
        return;
    }

    tbody.innerHTML = '';

    productos.forEach(producto => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td>${producto.descripcion}</td>
        `;

        tbody.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();

    const form = document.getElementById('form-producto');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const stock = document.getElementById('stock').value;
        const descripcion = document.getElementById('descripcion').value;

        agregarProducto(nombre, precio, descripcion);

        form.reset();
    });
});