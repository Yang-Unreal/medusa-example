import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function productCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("🟢 Event received");

  const notificationModuleService = container.resolve(Modules.NOTIFICATION);
  const productModuleService = container.resolve(Modules.PRODUCT);

  const product = await productModuleService.retrieveProduct(data.id);
  await notificationModuleService.createNotifications({
    to: "y953159141@gmail.com",
    channel: "email",
    template: "product-created",
    data: {
      product_title: product.title,
      product_image: product.images[0]?.url,
    },
  });
}
export const config: SubscriberConfig = {
  event: "product.created",
};

// import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

// console.log(
//   `---------------------------------------The subscriber was init---------------------------------------`
// );
// export default async function productCreateHandler({
//   event,
// }: SubscriberArgs<{ id: string }>) {
//   const productId = event.data.id;
//   console.log(
//     `---------------------------------------The product ${productId} was created---------------------------------------`
//   );
// }

// export const config: SubscriberConfig = {
//   event: "product.created",
// };
