import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
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
}
export const config: SubscriberConfig = {
  event: "product.created",
};
