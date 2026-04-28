import contactValidation from "../validation/contact-validation"
import contactService from "../service/contact-service";
import ResponseFormatter from "../helper/response-formatter";

const create = async (req, res) => {
    contactValidation.create(req);

    const contact = await contactService.create(req);

    return ResponseFormatter.success(res, contact, 201);
}

const update = async (req, res) => {
    contactValidation.update(req);

    const contact = await contactService.update(req);

    return ResponseFormatter.success(res, contact, 200);
}

const get = async (req, res) => {
    const { contacts, paging } = await contactService.get(req);
    
    return ResponseFormatter.paging(res, contacts, paging);
}

const detail = async (req, res) => {
    const contact = await contactService.detail(req);

    return ResponseFormatter.success(res, contact, 200);
}

const destroy = async (req, res) => {
    const contact = await contactService.destroy(req);

    return ResponseFormatter.success(res, contact, 200);
}

export default {
    create,
    get,
    update,
    detail,
    destroy
}