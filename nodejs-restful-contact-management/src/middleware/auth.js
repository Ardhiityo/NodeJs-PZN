import prisma from '../app/database';

const auth = async (req, res, next) => {
    const token = req.get('Authorization');
    if (token) {
        const user = await prisma.user.findUnique({
            where: {
                token: token,
            },
        });

        if (user) {
            return next();
        }
    }

    return res.status(401).json({ errors: 'Unauthenticated' }).end();
};

export default auth