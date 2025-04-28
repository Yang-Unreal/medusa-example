import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";

type WorkflowInput = {
  name: string;
};

const step1 = createStep("step-1", async () => {
  return new StepResponse(`Hello from step one!`);
});

const step2 = createStep("step-2", async ({ name }: WorkflowInput) => {
  return new StepResponse(`Workflow Test: Hello ${name} from step two!`);
});

const myWorkflow = createWorkflow(
  "hello-world",
  function (input: WorkflowInput) {
    const str1 = step1();
    // to pass input
    const str2 = step2(input);

    return new WorkflowResponse({
      message: str2,
    });
  }
);

export default myWorkflow;
