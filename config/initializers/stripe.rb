Rails.configuration.stripe = {
  :publishable_key => "pk_test_4UDyZ8tCUJ5UbHZOSbikbToA",
  :secret_key      => "sk_test_4UDyxpOZfYW8Tmc9cQiHvutr"
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]