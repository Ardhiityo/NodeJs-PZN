import prisma from "../app/database";
import ResponseException from "../exception/response-exception";

const create = async (request) => {
    return await prisma.contact.create({
        data: {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            phone: request.body.phone,
            user_id: request.user.id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

const update = async (request) => {
    const contactCount = await prisma.contact.count({
        where: {
            id: BigInt(request.params.id),
            user_id: request.user.id
        }
    });

    if (contactCount === 0) {
        throw new ResponseException(404, "Contact is not found");
    }

    return await prisma.contact.update({
        where: {
            id: BigInt(request.params.id)
        },
        data: {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            phone: request.body.phone,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

const get = async (request) => {
    const page = parseInt(request.query.page ?? 1);
    const size = parseInt(request.query.size ?? 10);
    const skip = (page - 1) * size;

    const filters = [
        {
            user_id: request.user.id
        }
    ];

    if (request.query.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.query.name
                    }
                },
                {
                    last_name: {
                        contains: request.query.name
                    }
                }
            ]
        });
    }

    if (request.query.email) {
        filters.push({
            email: {
                contains: request.query.email
            }
        });
    }

    if (request.query.phone) {
        filters.push({
            phone: {
                contains: request.query.phone
            }
        });
    }

    const contacts = await prisma.contact.findMany({
        where: {
            AND: filters
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        },
        skip: skip,
        take: size
    });

    const total_item = await prisma.contact.count({
        where: {
            AND: filters
        }
    });

    const total_page = Math.ceil(total_item / size);

    return {
        contacts: contacts,
        paging: {
            page,
            total_page,
            total_item
        }

    }
}


const detail = async (request) => {
    const contact = await prisma.contact.findFirst({
        where: {
            id: BigInt(request.params.id),
            user_id: request.user.id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!contact) {
        throw new ResponseException(404, "Contact is not found");
    }

    return contact;
}

const destroy = async (request) => {
    const contactCount = await prisma.contact.count({
        where: {
            id: BigInt(request.params.id),
            user_id: request.user.id
        }
    });

    if (contactCount === 0) {
        throw new ResponseException(404, "Contact is not found");
    }

    await prisma.contact.delete({
        where: {
            id: BigInt(request.params.id)
        }
    });

    return true
}

export default {
    create,
    get,
    update,
    detail,
    destroy
}