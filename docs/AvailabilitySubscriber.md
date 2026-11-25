>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

> ⚠️ **Deprecated**
>
> The `availability-subscriber` block is deprecated. It saves the shopper's name and email in the Master Data `AS` entity directly from the browser, without credentials. Starting on **December 12, 2026**, Master Data requires authentication to write to fields that hold personal data (PII), so this block can no longer save requests when those fields are private.
>
> Do not make the `AS` fields public to keep it working. To keep offering a "notify me" form, follow the [Recommended alternatives](#recommended-alternatives).

# Availability Subscriber

The `availability-subscriber` component shows the availability subscriber form displayed when a product isn't available. This component can be imported and used by any VTEX App.

![availability-component](https://user-images.githubusercontent.com/67270558/147770983-16f37aea-ea98-476c-a9aa-a01e1fca24f8.png)

This component only collects the emails of the customers that subscribed to receive updates about a specific out-of-stock product. It does not email shoppers automatically when the product gets back in stock.

## Why it is deprecated

The component writes to the `AS` entity with the shopper's browser session, or anonymously. Master Data is restricting public access to PII fields, such as `name` and `email`. After that change, an anonymous or shopper-authenticated browser request to write those fields is rejected, and the form shows an error instead of saving the request.

The shopper's session does not work around this. A shopper token has no write permission on the entity, so logged-in shoppers are rejected as well. Only a server-side call with application credentials can write to private fields.

## Recommended alternatives

To keep the "notify me" feature, move the write to the server side. You have two options:

- **Use the `vtex.availability-notify` app.** It records the request on the server with the app's own credentials, and it does not require public fields in Master Data. It also emails the shopper when the product is back in stock, which `availability-subscriber` never did. See [Migrating to Availability Notify](#migrating-to-availability-notify).
- **Create your own custom component.** Build a component for your store that sends the request to a server-side layer you own, such as a VTEX IO service route, and have that layer write to Master Data with the app's credentials. Do not write to Master Data from the browser, and do not set the entity's fields as public.

## Migrating to Availability Notify

1. [Install](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-installing-an-app) the app in your account:

   ```sh
   vtex install vtex.availability-notify
   ```

2. Declare the app in your theme's `manifest.json`, as described in the [Availability Notify documentation](https://developers.vtex.com/vtex-developer-docs/docs/vtex-availability-notify):

   ```json
   "peerDependencies": {
     "vtex.availability-notify": "1.x"
   }
   ```

   > ⚠️ Adding a peer dependency to a Store Theme requires releasing a new major version of the theme. See [How to migrate CMS settings after a theme major update](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-migrating-cms-settings-after-major-update).

3. Replace the block in your Product Details Page template:

   ```diff
     "store.product": {
       "children": [
   -     "availability-subscriber"
   +     "availability-notify"
       ]
     }
   ```

4. In the Admin, open **Extensions Hub** > **Installed Apps** > **Availability Notifier** and review the app settings, and review the **BACK IN STOCK** email template in **Customer** > **Message center** > **Templates**.

Keep in mind that the requests are stored in a different entity (`notify`) from the one used by `availability-subscriber` (`AS`). Existing `AS` records are not migrated, and any worker, integration or trigger that reads `AS` must be adjusted.

## Configuration

> ℹ️ The steps below only apply to stores that still use the deprecated block. Do not configure public fields in the `AS` entity for it.

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `availability-subscriber` block as a child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
+     "availability-subscriber”
    ]
  }
```

The Availability Subscriber component does not have any props. Hence, once added to your Product Details Page template, the Availability Subscriber component is ready for use.        

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the blocks available within `AvailabilitySubscriber` and describes if they are mandatory or optional.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

For now this block does not have any mandatory or optional blocks.

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles | 
| ---------- | 
| `content` |
| `error` | 
| `form` | 
| `input` |
| `inputEmail` |
| `inputName` | 
| `submit` | 
| `subscriberContainer` |
| `subscribeLabel` |
| `success` |
| `title` |