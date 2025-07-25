import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../services/supabase.service';

export class PaymentController {
  static async initializePayment(req: FastifyRequest<{
    Body: {
        reference: string;
        email: string;
        amount: string;
        tier: {
        id: string;
        title: string;
        price: string;
        };
    };
    }>, reply: FastifyReply) {
    try {
        const { reference, email, amount, tier } = req.body;

        // Log incoming request for debugging
        req.log.info({ reference, email, amount, tier }, 'Incoming payment initialization');

        // Verify the registration exists
        const { data: registration, error } = await supabase
        .from('pre_registrations')
        .select('*')
        .eq('reference_id', reference)
        .single();

        if (error || !registration) {
        req.log.error({ error, reference }, 'Registration not found');
        return reply.status(404).send({ error: 'Registration not found' });
        }

        // Convert amount to kobo
        const amountValue = req.body.amount.replace(/[^\d.]/g, ''); // Remove currency symbols
            if (isNaN(parseFloat(amountValue))) {
            return reply.status(400).send({ error: 'Invalid amount format' });
        }
        const amountInKobo = Math.round(amountValue * 100);

        // Generate payment reference
        const paymentReference = `ICSTM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        reply.send({
        success: true,
        paymentDetails: {
            amountInKobo,
            paymentReference,
            paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
            registrationId: registration.id,
            customerEmail: email,
        },
        });
    } catch (error) {
        req.log.error(error);
        reply.status(500).send({ error: 'Failed to initialize payment' });
    }
    }

  static async verifyPayment(req: FastifyRequest<{
    Body: {
      reference: string;
    };
  }>, reply: FastifyReply) {
    try {
      const { reference } = req.body;

      // Here you would typically verify with Paystack API
      // This is a simplified version
      const paystackResponse = await verifyWithPaystack(reference);

      if (!paystackResponse.status) {
        return reply.status(400).send({ error: 'Payment verification failed' });
      }

      // Update registration status
      const { error } = await supabase
        .from('pre_registrations')
        .update({ status: 'completed' })
        .eq('reference_id', reference);

      if (error) {
        throw error;
      }

      reply.send({ 
        success: true,
        payment: paystackResponse.data 
      });

    } catch (error) {
      req.log.error(error);
      reply.status(500).send({ error: 'Payment verification failed' });
    }
  }
}

// Mock Paystack verification - replace with actual API call
async function verifyWithPaystack(reference: string) {
  return {
    status: true,
    data: {
      reference,
      amount: 5000000,
      status: 'success'
    }
  };
}