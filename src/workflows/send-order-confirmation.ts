import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { sendNotificationStep } from "./steps/send-notification";

type WorkflowInput = {
  id: string;
};

type Order = {
  id: string;
  email: string;
  currency_code: string;
  total: number;
  items: Array<{
    id: string;
    quantity: number;
  }>;
};

export const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  ({ id }: WorkflowInput) => {
    // @ts-ignore
    const { data: orders } = useQueryGraphStep<Order[]>({
      entity: "order",
      fields: ["id", "email", "currency_code", "total", "items.*"],
      filters: {
        id,
      },
    });

    const notification = sendNotificationStep([
      {
        to: orders[0].email,
        channel: "email",
        template: "order-placed",
        data: {
          order: orders[0],
        },
      },
    ]);

    return new WorkflowResponse(notification);
  }
);
