import { FastifyRequest, FastifyReply } from 'fastify';
import { PreRegistrationModel } from '../models/preregistration.model';

interface PreRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: {
    id: string;
    title: string;
    price: string;
    breakdown: { label: string; amount: string }[];
  };
}

export class PreRegistrationController {
  static async create(req: FastifyRequest<{ Body: PreRegistrationRequest }>, reply: FastifyReply) {
    try {
      const { firstName, lastName, email, phone, tier } = req.body;

      // Validate input
      if (!firstName || !lastName || !email || !phone || !tier) {
        return reply.status(400).send({ error: 'All fields are required' });
      }

      // Create registration
      const registration = await PreRegistrationModel.create({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        tier_id: tier.id,
        tier_title: tier.title,
        tier_price: tier.price,
      });

      reply.status(201).send({
        success: true,
        data: {
          reference: registration.reference_id,
          amount: registration.tier_price,
          tier: {
            id: registration.tier_id,
            title: registration.tier_title,
          },
          customer: {
            name: `${registration.first_name} ${registration.last_name}`,
            email: registration.email,
            phone: registration.phone,
          },
        },
      });
    } catch (error) {
      req.log.error(error);
      reply.status(500).send({ error: 'Failed to process registration' });
    }
  }
}