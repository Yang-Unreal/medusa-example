// import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
// import { Modules } from "@medusajs/framework/utils";
// import { Logger } from "@medusajs/framework/types";

// export default async function productCreatedHandler({
//   event: { data },
//   container,
// }: SubscriberArgs<{ id: string }>) {
//   const logger = container.resolve<Logger>("logger");

//   logger.debug("🟢 Event received");

//   const notificationModuleService = container.resolve(Modules.NOTIFICATION);
//   const productModuleService = container.resolve(Modules.PRODUCT);

//   const product = await productModuleService.retrieveProduct(data.id);
//   await notificationModuleService.createNotifications({
//     to: "y953159141@gmail.com",
//     channel: "email",
//     template: "product-created",
//     data: {
//       product_title: product.title,
//       product_image: product.images[0]?.url,
//     },
//   });
// }
// export const config: SubscriberConfig = {
//   event: "product.created",
// };

// subscriber function
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function productCreateHandler({
  event,
}: SubscriberArgs<{ id: string }>) {
  const productId = event.data.id;
  console.log(
    `The product ${productId} was created-------------------------------------------------------------------`
  );
}

export const config: SubscriberConfig = {
  event: "product.created",
};
