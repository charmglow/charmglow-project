const express = require('express');
const Order = require('../../models/Order');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, userId, name } = req.body;
  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      name: name,
      cart: JSON.stringify(cartItems),
    },
  });
  const line_items = cartItems.map((cart) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: cart?.title,
          images: cart?.productImage,
          metadata: {
            id: cart?._id,
          },
        },
        unit_amount: cart?.price * 100,
      },
      quantity: cart?.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'shipping cost',
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: 'http://charmglowjewelry.com/checkout',
    cancel_url: 'http://charmglowjewelry.com/checkout',
  });

  res.send({ url: session.url });
});

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  try {
    const savedOrder = await newOrder.save();
    console.log('====================================');
    console.log(savedOrder);
    console.log('====================================');
  } catch (error) {
    return res.status(500).json({ error: 'Webhook error' });
  }
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = 'whsec_GzQtLWtFjcy1xHfeVU4dbgxCxvLfuCWa';

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = stripe.webhooks.generateTestHeaderString({
      payload: JSON.stringify(request.body),
      secret: endpointSecret,
    });
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        JSON.stringify(request.body),
        sig,
        endpointSecret,
      );
      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionAsyncCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.async_payment_succeeded
          stripe.customers
            .retrieve(checkoutSessionAsyncCompleted.customer)
            .then((customer) => {
              createOrder(customer, checkoutSessionAsyncCompleted);
            })
            .catch((err) => console.log(err.message));
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    } catch (err) {
      console.log('====================================');
      console.log(`Webhook Error: ${err.message}`);
      console.log('====================================');
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  },
);
module.exports = router;
