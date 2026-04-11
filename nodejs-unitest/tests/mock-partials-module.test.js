import { ProductService } from "../src/product-service";
import { getAllProduct, getProductById } from "../src/database";

jest.mock('../src/database.js', () => {
    const originalModule = jest.requireActual('../src/database.js');

    //hanya module getAllProduct saja yang dimocking, sisanya menggunakan implementasi asli modul
    return {
        __esModule: true,
        ...originalModule,
        getAllProduct: jest.fn()
    }
});

it('find all modules is mocked', () => {
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

it.failing('find by id modules is unmocked', () => {
    ProductService.findById();
});