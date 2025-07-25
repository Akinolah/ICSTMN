import { FastifyInstance } from 'fastify';
import { PaymentController } from '../controllers/payment.controller';

export async function paymentRoutes(fastify: FastifyInstance) {
    // In src/routes/payment.routes.ts
fastify.post(
  '/api/payment/initialize',
  {
    schema: {
      body: {
        type: 'object',
        required: ['reference', 'email', 'amount', 'tier'],
        properties: {
          reference: { type: 'string' },
          email: { type: 'string', format: 'email' },
          amount: { type: 'string' },
          tier: {
            type: 'object',
            required: ['id', 'title', 'price'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              price: { type: 'string' },
            },
          },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            paymentDetails: {
              type: 'object',
              properties: {
                amountInKobo: { type: 'number' },
                paymentReference: { type: 'string' },
                paystackPublicKey: { type: 'string' },
                registrationId: { type: 'number' },
                customerEmail: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  PaymentController.initializePayment
);
  fastify.post(
    '/api/payment/verify',
    {
      schema: {
        body: {
          type: 'object',
          required: ['reference'],
          properties: {
            reference: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              payment: {
                type: 'object',
                properties: {
                  reference: { type: 'string' },
                  amount: { type: 'number' },
                  status: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    PaymentController.verifyPayment
  );
}