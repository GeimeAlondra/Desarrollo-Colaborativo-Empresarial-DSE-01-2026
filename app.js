class Product {
    constructor(nombre, precio, stock, descripcion = '') {
        this.id = Date.now();
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.descripcion = descripcion;
    }
}

// Productos de prueba
let productos = [
    new Product("Laptop", 1200, 5, "Alta gama"),
    new Product("Mouse", 25, 5, "Inalámbrico")
];

function agregarProducto() {

    const nombre = document.getElementById("nombre").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const stock = document.getElementById("stock").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

 // Validaciones
    if (nombre === "")
        return alert("El nombre es obligatorio");
    if (precio === "" || isNaN(precio) || Number(precio) <= 0)
        return alert("Precio inválido");
    if (stock === "" || isNaN(stock) || Number(stock) < 0)
        return alert("Stock inválido");

    const nuevo = new Product(nombre, precio, stock, descripcion);
    productos.push(nuevo);
    renderizarProductos();

 // limpiar inputs
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("descripcion").value = "";

}

function renderizarProductos() {
    const tbody = document.getElementById("cuerpo-tabla");
    tbody.innerHTML = "";
    productos.forEach(producto => {

        tbody.innerHTML += `
        <tr>
        <td>${producto.id}</td>      
        <td>${producto.nombre}</td>        
        <td>$${producto.precio.toFixed(2)}</td>       
        <td>${producto.stock}</td>    
        <td>${producto.descripcion}</td>        
        </tr> `;

    });

}
// cargar al iniciar
renderizarProductos();