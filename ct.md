# Set up CommerceTools project

https://mc.europe-west1.gcp.commercetools.com/e-shop230731/welcome

# Configure CommerceTools API client

```
host: 'https://auth.europe-west1.gcp.commercetools.com'
projectKey: 'e-shop230731'
credentials: {
  clientId: "FZwAs7jaRrQUaTngF8DcA9zD",
  clientSecret: "XTTfvhIr-X8vmA_HEAI5a5T7DvbtZOKV",
}
scopes: ['view_cart_discounts:e-shop230731 manage_my_orders:e-shop230731 create_anonymous_token:e-shop230731 view_published_products:e-shop230731 view_discount_codes:e-shop230731 manage_my_payments:e-shop230731 view_categories:e-shop230731 manage_my_quotes:e-shop230731 manage_my_quote_requests:e-shop230731 manage_my_profile:e-shop230731 manage_my_shopping_lists:e-shop230731 manage_my_business_units:e-shop230731']
```

# Endpoints

To obtain an access token through the client credentials flow, just issue the following request to the auth service:

```
axios
  .post(
    'https://auth.europe-west1.gcp.commercetools.com/oauth/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa('FZwAs7jaRrQUaTngF8DcA9zD:XTTfvhIr-X8vmA_HEAI5a5T7DvbtZOKV')}`,
      },
    }
  );
```

#### Product Catalog

```
/product-projections
```

This endpoint only returns published (current) Product Projections

```
/categories
```

#### Pricing & Discounts

```
/cart-discounts
/discount-codes
```

#### Carts, Orders & Shopping Lists

```
/orders
/shopping-lists
/me/payments
```

#### Quotes

```
/quotes
/quote-requests
```

#### Customers

```
/me
```

This endpoint creates and provides access to a Customer profile scoped to a specific Customer.
