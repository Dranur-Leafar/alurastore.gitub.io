const imageUploader = document.getElementById("img-uploader");
const imagePreview = document.getElementById("img-preview");

//WIDGET PARA SUBIR IMAGENES A CLOUDINARY
let widget_cloudinary = cloudinary.createUploadWidget({
   cloudName: 'dmim46vju',
   uploadPreset: 'dranur'
    }, (err, result) => {
    if (!err && result && result.event === 'success'){
        console.log('Imagen subida con éxito', result.info);
        imagePreview.src = result.info.secure_url;
        return imagePreview.src;
    }

});
    //FUNCION QUE DISPARA LA CARGA DE LA IMAGEN
imageUploader.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);


const formulario = document.querySelector("[data-form]")

function limpiarFormulario(formulario){
    
    document.querySelector(".categoria").value="";
    document.querySelector(".nombre").value=""; 
    document.querySelector(".precio").value=""; 
    document.querySelector(".descripcion").value="";  
    
}

//funcion para agregar un producto a la base de datos 
function agregarProducto(categoria, nombre, precio, descripcion, imagen){
    let opciones = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({categoria, nombre, precio, descripcion, imagen, id: uuid.v4()})
        }

    
     return fetch("http://localhost:3000/producto",opciones).then(respuesta=>{
        return respuesta.json()
    })
    .catch((err) => {
        console.log(err)
        return err})
    
    
}




//FUNCION QUE OBTIENE LOS DATOS INGRESADOS PARA POSTEARLOS EN EL SERVIDOR JSON
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    categoria = formulario.categoria.value;
    nombre = formulario.nombre.value;
    precio = formulario.precio.value;
    descripcion = formulario.descripcion.value;
    imagen = imagePreview.src;
    agregarProducto(categoria, nombre, precio, descripcion, imagen).then((respuesta)=> {
                
   
        
        console.log("Producto agregado correctamente con el ID",  respuesta.id);

        
           
        
    
    })
    limpiarFormulario(formulario); 

})