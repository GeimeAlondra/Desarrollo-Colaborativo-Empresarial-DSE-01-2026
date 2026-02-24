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
    const descripcion = document.getElementById('descripcion').value;
    const stock = document.getElementById('stock').value;
    
    const nuevo = new Product(nombre, precio, descripcion, stock);
    productos.push(nuevo);
    
}