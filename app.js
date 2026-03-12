let nextId = 1


class Product {
    constructor(nombre, categoria, precio, stock, descripcion = '') {
        this.id = generarId();
        this.nombre = nombre.trim();
        this.categoria = categoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.estado = this.stock > 0 ? "disponible" : "agotado";        
        this.descripcion = descripcion.trim();
    }


    actualizarStock(nuevoStock) {
        this.stock = parseInt(nuevoStock);
        this.estado = this.stock > 0 ? "disponible" : "agotado";
    }
}


function generarId() {
    return 'PRD-' + crypto.randomUUID().slice(0,8).toUpperCase();
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
        new Product("Café Americano", "Bebidas Calientes", 2.50, 45, "Café - tamaño mediano"),
        new Product("Latte Vainilla", "Bebidas Calientes", 4.20, 18, "Espresso con leche vaporizada"),
        new Product("Frappé Mocha", "Bebidas Frías", 5.80, 8, "Café helado con chocolate y crema batida"),
        new Product("Cheesecake de Fresa", "Postres", 4.90, 12, "Base de galleta con queso crema y mermelada de fresa"),
        new Product("Brownie con Nueces", "Postres", 3.80, 0, "Brownie intenso de chocolate negro con nueces")
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

function eliminarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;


    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = productos.findIndex(p => p.id === id);
            if (index !== -1) {
                productos.splice(index, 1);
                actualizarContadorId();
                renderizarProductos();
                Swal.fire({
                    title: '¡Eliminado!',
                    text: `${producto.nombre} ha sido eliminado correctamente.`,
                    icon: 'success',
                    timer: 2200,
                    showConfirmButton: false
                });
            }
        }
    });
}

function renderizarProductos() {
    const tbody = document.getElementById("cuerpo-tabla");
    const texto = document.getElementById('input-busqueda')?.value.toLowerCase().trim() ?? '';
    const categoria = document.getElementById('filtro-categoria')?.value ?? '';


    tbody.innerHTML = "";


    const productosFiltrados = productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === '' || p.categoria === categoria;
        return coincideNombre && coincideCategoria;
    });


    productosFiltrados.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td class="${producto.estado === 'disponible' ? 'estado-activo' : 'estado-inactivo'}">
                ${producto.estado.charAt(0).toUpperCase() + producto.estado.slice(1)}
            </td>
            <td>${producto.descripcion || '—'}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto('${producto.id}')"><i class="bi bi-pencil-square"></i></button>
                <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')"><i class="bi bi-trash"></i></button>
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

document.getElementById('input-busqueda').addEventListener('input', renderizarProductos);
document.getElementById('filtro-categoria').addEventListener('change', renderizarProductos);

