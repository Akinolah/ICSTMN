import { FastifyInstance } from 'fastify';
import { PreRegistrationController } from '../controllers/preregistration.controller';

export async function preRegistrationRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/api/preregister',
    {
      schema: {
        body: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'phone', 'tier'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            tier: {
              type: 'object',
              required: ['id', 'title', 'price'],
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                price: { type: 'string' },
                breakdown: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      label: { type: 'string' },
                      amount: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  reference: { type: 'string' },
                  amount: { type: 'string' },
                  tier: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                    },
                  },
                  customer: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string' },
                      phone: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    PreRegistrationController.create
  );
}