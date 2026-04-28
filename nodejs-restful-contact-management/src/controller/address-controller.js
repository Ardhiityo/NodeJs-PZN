import addressService from "../service/address-service";
import addressValidation from "../validation/address-validation"
import ResponseFormatter from "../helper/response-formatter";

const create = async (req, res) => {
    addressValidation.create(req);

    const address = await addressService.create(req);

    return ResponseFormatter.success(res, address, 201);
}

const get = async (req, res) => {
    const address = await addressService.get(req);

    return ResponseFormatter.success(res, address, 200);
}

const detail = async (req, res) => {
    const address = await addressService.detail(req);

    return ResponseFormatter.success(res, address, 200);
}

const update = async (req, res) => {
    addressValidation.update(req);

    const address = await addressService.update(req);

    return ResponseFormatter.success(res, address, 200);
}

const destroy = async (req, res) => {
    await addressService.destroy(req);

    return ResponseFormatter.success(res, true, 200);
}

export default {
    create,
    get,
    detail,
    update,
    destroy
}