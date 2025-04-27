import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import myWorkflow from "../workflows/hello-world";
import { sendProductCreatedNotificationWorkflow } from "../workflows/send-product-created-notification";

export default async function productCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sendProductCreatedNotificationWorkflow(container).run({
    input: {
      id: data.id,
    },
  });

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
    data,
  });
}
export const config: SubscriberConfig = {
  event: "product.created",
};
