// src/services/notification-resend/emails/product-created.tsx
import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Row,
  Section,
  Img,
} from "@react-email/components";
import { ProductDTO } from "@medusajs/framework/types";

type ProductCreatedEmailProps = {
  product: ProductDTO;
};

export function ProductCreatedEmailComponent({
  product,
}: ProductCreatedEmailProps) {
  return (
    <Html>
      <Heading>New Product Created Successfully</Heading>
      <Container>
        <Section style={{ padding: "20px 0" }}>
          <Text>Product ID: {product.id}</Text>
        </Section>
      </Container>
    </Html>
  );
}

export const productCreatedEmail = (props: ProductCreatedEmailProps) => (
  <ProductCreatedEmailComponent {...props} />
);
