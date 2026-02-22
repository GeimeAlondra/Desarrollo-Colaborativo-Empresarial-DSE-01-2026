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


