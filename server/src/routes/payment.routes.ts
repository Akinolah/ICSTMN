import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { verifyPaymentAndRegister } from '../controllers/payment.controller';

export default function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.post('/verify', verifyPaymentAndRegister);
  done();
}