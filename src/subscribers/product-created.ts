import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import myWorkflow from "../workflows/hello-world";

export default async function productCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const { result } = await myWorkflow(container).run({
    input: {
      name: "🟢John🟢",
    },
  });

  console.log(result);

  const notificationModuleService = container.resolve(Modules.NOTIFICATION);
  const productModuleService = container.resolve(Modules.PRODUCT);

  const product = await productModuleService.retrieveProduct(data.id);
  console.log(`🟢Product: ${product.id} was created🟢`);

  await notificationModuleService.createNotifications({
    to: "y953159141@gmail.com",
    channel: "email",
    template: "product-created",
    data: {
      product_title: product.title,
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
