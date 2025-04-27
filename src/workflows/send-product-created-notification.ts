// src/workflows/send-product-created-notification.workflow.ts
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { sendNotificationStep } from "./steps/send-notification";

type WorkflowInput = {
  id: string;
};

export const sendProductCreatedNotificationWorkflow = createWorkflow(
  "send-product-created-notification",
  ({ id }: WorkflowInput) => {
    // @ts-ignore
    const { data: products } = useQueryGraphStep({
      entity: "product",
      fields: ["id", "title", "description", "status"],
      filters: {
        id,
      },
    });

    const notification = sendNotificationStep([
      {
        to: "y953159141@gmail.com", // Replace with actual admin email
        channel: "email",
        template: "product-created",
        data: {
          product: products[0],
        },
      },
    ]);

    return new WorkflowResponse(notification);
  }
);
