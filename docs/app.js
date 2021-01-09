class Libro{
    constructor(titulo,autor,isbn){
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}

class UI{
    static mostrarlibros(){
        const libros = datos.traerlibros();
        libros.forEach((libro)=>UI.agregarlibrolista(libro));
    }

    static agregarlibrolista(libro){
        const lista = document.querySelector('#libro_list');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.isbn}</td>
            <td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;

        lista.appendChild(fila);
    }

    static eliminarlibro(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static mostraralert(mensaje , className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div,form);

        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static limpiarcampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#IBSN').value = '';

    }
}

class datos{
    static traerlibros(){
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }

    static agregarlibro(libro){
        const libros = datos.traerlibros();
        libros.push(libro);
        UI.agregarlibrolista(libro);
        localStorage.setItem('libros',JSON.stringify(libros));
    }

    static removerlibro(isbn){
        const libros = datos.traerlibros();
        libros.forEach((libro,index) =>{
            if(libro.isbn === isbn){
                libros.splice(index,1);
            }
        });
        localStorage.setItem('libros',JSON.stringify(libros));
    }
}

// Carga de la pagina
document.addEventListener('Domcontent',UI.mostrarlibros());

//Control boton submit
document.querySelector('#libro-form').addEventListener('submit',(e) => {
    e.preventDefault();
    //obtener valores de los 3 campos:
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const isbn = document.querySelector('#IBSN').value;

    if(titulo === '' || autor === '' || isbn === '' ){
        UI.mostraralert('Porfavor ingrese todos lo datos','danger');
    }else{
        const libro = new Libro(titulo ,autor,isbn);
        datos.agregarlibro(libro);
        UI.mostraralert('Libro Agregado','success');
        UI.limpiarcampos();
    }
}); 

document.querySelector('#libro_list').addEventListener('click', (e)=>{
    UI.eliminarlibro(e.target);
    datos.removerlibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostraralert('Libro Eliminado','success');
});