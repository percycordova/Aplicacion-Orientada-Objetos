'use strict'
class product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }

}

class ui {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
           <div class="card text-center mb-4" >
               <div class="card-body">
                 <strong class="m-2">Product Name:</strong> ${product.name}
                 <strong class="m-2">Price:</strong>$ ${product.price}
                 <strong class="m-2">Year:</strong> ${product.year}
                 <a href="#" class="btn btn-warning ml-2" name="delete">Delete</a>
               </div>
           </div>
        `;
        productList.appendChild(element);
    }
    resetForm() {
        document.getElementById("product-form").reset();
    }
    deleteProduct(element) {
        if (element.name === "delete") {
            var conf = confirm("¿Seguro que desea Continuar?");
            if (conf) {
                element.parentElement.parentElement.parentElement.remove(); //accediendo al div principal de la tarjeta
                this.showMessage("Product Deleted Successfully","danger")
            } else {
                alert("Transaccion Cancelada");
            }
        }
    }
    showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-3`
        div.appendChild(document.createTextNode(message));
        //show in dom
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        container.insertBefore(div,app);//me va inserta el div antes del div(con la clase app)
         setTimeout(function(){
             document.querySelector(".alert").remove();
         },1000);
    }
}

//DOM EVENTOS

document.getElementById("product-form").addEventListener('submit', function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    const object_product = new product(name, price, year);
    const object_ui = new ui();
    object_ui.addProduct(object_product);
    object_ui.resetForm();
    object_ui.showMessage("Product Add Successfully","success");
    e.preventDefault(); //no me recarga la pagina por defecto
});

document.getElementById("product-list").addEventListener('click', function (e) {
    const object_ui = new ui();
    object_ui.deleteProduct(e.target);
});