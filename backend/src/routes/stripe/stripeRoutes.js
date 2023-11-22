const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;
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
    line_items,
    mode: 'payment',
    success_url: 'http://charmglowjewelry.com/checkout',
    cancel_url: 'http://charmglowjewelry.com/checkout',
  });

  res.send({ url: session.url });
});
module.exports = router;
