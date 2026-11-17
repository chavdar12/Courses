function listOfProducts(products) {
    [...products].sort().forEach((product, i) => console.log(`${i + 1}.${product}`));
}

module.exports = listOfProducts;
