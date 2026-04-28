import prisma from "../app/database";
import ResponseException from "../exception/response-exception";

const create = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.contactsId),
            user_id: request.user.id
        }
    });

    if (!contact) {
        throw new ResponseException(404, 'Contact is not found');
    }

    return await prisma.address.create({
        data: {
            ...request.body,
            contact_id: contact.id
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const get = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.contactsId),
            user_id: request.user.id
        }
    });

    if (!contact) {
        throw new ResponseException(404, 'Contact is not found');
    }

    return await prisma.address.findMany({
        where: {
            contact_id: contact.id
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const detail = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.contactsId),
            user_id: request.user.id
        }
    });

    if (!contact) {
        throw new ResponseException(404, 'Contact is not found');
    }

    const address = await prisma.address.findFirst({
        where: {
            id: BigInt(request.params.addressesId),
            contact_id: contact.id
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    });

    if (!address) {
        throw new ResponseException(404, 'Address is not found');
    }

    return address
}

const update = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.contactsId),
            user_id: request.user.id
        }
    });

    if (!contact) {
        throw new ResponseException(404, 'Contact is not found');
    }

    const address = await prisma.address.findFirst({
        where: {
            id: BigInt(request.params.addressesId),
            contact_id: contact.id
        }
    });

    if (!address) {
        throw new ResponseException(404, 'Address is not found');
    }

    return await prisma.address.update({
        where: {
            id: BigInt(request.params.addressesId)
        },
        data: request.body,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

const destroy = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.contactsId),
            user_id: request.user.id
        }
    });

    if (!contact) {
        throw new ResponseException(404, 'Contact is not found');
    }

    const address = await prisma.address.findFirst({
        where: {
            id: BigInt(request.params.addressesId),
            contact_id: contact.id
        }
    });

    if (!address) {
        throw new ResponseException(404, 'Address is not found');
    }

    return await prisma.address.delete({
        where: {
            id: BigInt(request.params.addressesId)
        }
    })
}

export default {
    create,
    get,
    detail,
    update,
    destroy
}