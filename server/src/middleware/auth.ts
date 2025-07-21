import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export async function isAuthenticated(req: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return reply.status(401).send({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}

export async function isAdmin(req: FastifyRequest, reply: FastifyReply) {
  const user = (req as any).user;
  if (user?.role !== 'admin') {
    return reply.status(403).send({ message: 'Forbidden: Admins only' });
  }
}









// import jwt from 'jsonwebtoken';
// import { FastifyRequest, FastifyReply } from 'fastify';

// // Define the allowed roles only
// interface DecodedToken {
//   id: string;
//   role: 'User' | 'Admin';
// }

// // General Auth Middleware – attach user to request
// export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
//   const authHeader = request.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return reply.status(401).send({ message: 'No or invalid token' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
//     (request as any).user = decoded;
//   } catch (error) {
//     return reply.status(401).send({ message: 'Invalid token' });
//   }
// }

// // Admin-Only Middleware
// export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
//   const user = (request as any).user as DecodedToken;

//   if (user?.role === 'Admin') {
//     return; // Access granted
//   }

//   return reply.status(403).send({ message: 'Forbidden: Admins only' });
// }

// // User-Only Middleware
// export async function userOnly(request: FastifyRequest, reply: FastifyReply) {
//   const user = (request as any).user as DecodedToken;

//   if (user?.role === 'User') {
//     return; // Access granted
//   }

//   return reply.status(403).send({ message: 'Forbidden: Users only' });
// }
