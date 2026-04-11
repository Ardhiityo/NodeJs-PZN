import { ProductService } from "../src/product-service";
import { getAllProduct, getProductById } from "../src/database";

jest.mock('../src/database.js');

it('find all modules', () => {
    const products = [
        {
            id: 1,
            name: 'Mock product'
        },
        {
            id: 2,
            name: 'Mock product'
        }
    ]

    getAllProduct.mockImplementation(() => {
        return products;
    });

    expect(ProductService.findAll()).toEqual(products);
});

it('find by id modules', () => {
    const product = {
        id: 1,
        name: 'Mock product'
    }

    getProductById.mockImplementation(() => {
        return product
    });

    expect(ProductService.findById()).toEqual(product);
});