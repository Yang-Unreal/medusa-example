import { MedusaContainer } from "@medusajs/framework/types";
import myWorkflow from "../workflows/hello-world";

export default async function myCustomJob(container: MedusaContainer) {
  const { result } = await myWorkflow(container).run({
    input: {
      name: "John",
    },
  });

  console.log(result.message);
}

export const config = {
  name: "run-once-a-day",
  schedule: `0 0 * * *`,
};
