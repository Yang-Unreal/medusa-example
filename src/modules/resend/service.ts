import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils";
import {
  Logger,
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types";
import { Resend, CreateEmailOptions } from "resend";
// import { orderPlacedEmail } from "./emails/product-placed";
import { productCreatedEmail } from "./emails/product-created";

type ResendOptions = {
  api_key: string;
  from: string;
  html_templates?: Record<
    string,
    {
      subject?: string;
      content: string;
    }
  >;
};

type InjectedDependencies = {
  logger: Logger;
};

enum Templates {
  PRODUCT_CREATED = "product-created",
}

const templates: { [key in Templates]?: (props: unknown) => React.ReactNode } =
  {
    [Templates.PRODUCT_CREATED]: productCreatedEmail,
  };

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend";
  private resendClient: Resend;
  private options: ResendOptions;
  private logger: Logger;

  static validateOptions(options: Record<any, any>) {
    if (!options.api_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `api_key` is required in the provider's options."
      );
    }
    if (!options.from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Option `from` is required in the provider's options."
      );
    }
  }

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super();
    console.log(options.api_key);
    console.log(options.from);
    this.resendClient = new Resend(options.api_key);
    this.options = options;
    this.logger = logger;
  }

  getTemplate(template: Templates) {
    if (this.options.html_templates?.[template]) {
      return this.options.html_templates[template].content;
    }
    const allowedTemplates = Object.keys(templates);

    if (!allowedTemplates.includes(template)) {
      return null;
    }

    return templates[template];
  }

  getTemplateSubject(template: Templates) {
    if (this.options.html_templates?.[template]?.subject) {
      return this.options.html_templates[template].subject;
    }
    switch (template) {
      case Templates.PRODUCT_CREATED:
        return "New Product Created!";
      default:
        return "New Notification";
    }
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const template = this.getTemplate(notification.template as Templates);

    console.log(notification);

    if (!template) {
      this.logger.error(
        `Couldn't find an email template for ${
          notification.template
        }. The valid options are ${Object.values(Templates)}`
      );
      return {};
    }

    let emailOptions: CreateEmailOptions;
    const baseOptions = {
      from: this.options.from,
      to: [notification.to],
      subject: this.getTemplateSubject(notification.template as Templates),
    };

    // const emailOptions: CreateEmailOptions = {
    //   from: this.options.from,
    //   to: [notification.to],
    //   subject: this.getTemplateSubject(notification.template as Templates),
    //   html: "",

    // };
    if (typeof template === "string") {
      // Create the full object with 'html' here
      emailOptions = {
        ...baseOptions,
        html: template, // Fulfills RequireAtLeastOne
      };
    } else {
      // Create the full object with 'react' here
      emailOptions = {
        ...baseOptions,
        react: template(notification.data), // Fulfills RequireAtLeastOne
      };
    }

    const { data, error } = await this.resendClient.emails.send({
      from: "Yang <yang@limingcn.com>",
      to: ["delivered@resend.dev"],
      subject: "hello world",
      html: "<p>it works!</p>",
    });

    if (error) {
      this.logger.error(`Failed to send email`, error);
      return {};
    }

    return { id: data?.id };
  }
}

export default ResendNotificationProviderService;
