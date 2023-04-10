import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("All fields are mandatory");
      return;
    }

    const duplicateCode = this.products.some((p) => p.code === product.code);
    try {
      if (duplicateCode) {
        console.error("Product code is already in use");
        return;
      } else {
        product.id = this.products.length + 1;

        const content = await fs.readFile(this.path, "utf-8");

        const aux = JSON.parse(content);
        aux.push(product);

        await fs.writeFile(this.path, JSON.stringify(aux));
        console.log("Product added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    //Consulto
    const productsArr = await fs.readFile(this.path, "utf-8");
    //Paso a formato json
    const products = JSON.parse(productsArr);
    return products;
  }

  //   Aca utilizar el write file, no el append file
  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      //Consulto
      const productsArr = await fs.readFile(this.path, "utf-8");
      const productToFind = JSON.parse(productsArr);

      return productToFind;
    } else {
      console.error("Product not found");
    }
  }

  updateProduct() {
    console.log("update");
  }

  //   deleteProduct(id) {
  //     const product = this.products.find((product) => product.id === id);
  //     console.log("delete");

  //     fs.unlink(this.path, (err) => {
  //       if (err) throw err;
  //       console.log(`Product with ID ${id} has been deleted`);
  //     });
  //   }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

const product1 = new Product(
  "Product 1",
  "Description 1",
  10,
  "thumbnail0.png",
  "aaa124",
  10
);
const product2 = new Product(
  "Product 2",
  "Description 2",
  20,
  "thumbnail1.png",
  "aab125",
  20
);
const product3 = new Product(
  "Product 3",
  "Description 3",
  30,
  "thumbnail2.png",
  "aac125",
  30
);

const product4 = new Product(
  "Product 4",
  "",
  40,
  "thumbnail4.png",
  "aaa123",
  40
);

const product5 = new Product(
  "Product 5",
  "Description 5",
  50,
  "thumbnail5.png",
  "aab123",
  50
);

const product6 = new Product(
  "Product 6",
  "Description 6",
  60,
  "thumbnail6.png",
  "aab123",
  60
);

const productManager = new ProductManager("./info.txt");
await productManager.addProduct(product1);
await productManager.addProduct(product2);
await productManager.addProduct(product3);
await productManager.addProduct(product4); //Se generará error por tener un campo vacío
await productManager.addProduct(product5);
await productManager.addProduct(product6); // Se generará error por tener el campo code duplicado

// const productIdToFind = 1;
// productManager.getProductById(productIdToFind).then((prod) => {
//   console.log("getProductById", prod);
// });

// productManager.getProducts().then((prods) => console.log("getProducts", prods));

// console.log("delete", productManager.deleteProduct(1));

//TODO: HACER DINAMICO EL ADD PRODUCT
