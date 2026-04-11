import { getAllProduct, getProductById } from "./database";

export class ProductService {
    static findAll() {
        return getAllProduct();
    }

    static findById(id) {
        return getProductById(id);
    }
}