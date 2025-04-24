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
          <Row>
            <Column>
              <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Product Details:
              </Text>
              <Text>Title: {product.title}</Text>
              <Text>Status: {product.status}</Text>
              {product.description && (
                <Text>Description: {product.description}</Text>
              )}
            </Column>
            {product.thumbnail && (
              <Column>
                <Img
                  src={product.thumbnail}
                  alt={product.title}
                  width="200px"
                />
              </Column>
            )}
          </Row>
        </Section>
      </Container>
    </Html>
  );
}

export const productCreatedEmail = (props: ProductCreatedEmailProps) => (
  <ProductCreatedEmailComponent {...props} />
);
