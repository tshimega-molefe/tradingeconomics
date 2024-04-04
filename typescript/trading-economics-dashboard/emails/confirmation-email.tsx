import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ConfirmationEmailProps {
  confirmationLink: string;
}

const baseUrl = process.env.NEXT_DEVELOPMENT_URL
  ? `http://${process.env.NEXT_DEVELOPMENT_URL}`
  : "";

export const ConfirmationEmail = ({
  confirmationLink,
}: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm your email address</Heading>
        <Link
          href={confirmationLink}
          target="_blank"
          style={{
            ...link,
            display: "block",
            marginBottom: "16px",
          }}
        >
          Click here to confirm your email address.
        </Link>
        <Text style={{ ...text, marginBottom: "14px" }}>
          or copy and paste it in your open browser window and we&apos;ll help
          you get signed in.
        </Text>
        <code style={code}>{confirmationLink}</code>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          If you you&apos;ve already confirmed your email address, you can
          safely ignore this email.
        </Text>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          Hint: You can create a new confirmation link by signing in again, or
          by creating a new account.
        </Text>
        <Img
          src={`${baseUrl}/trading-economics.png`}
          width="32"
          height="32"
          alt="Trading Economics Logo"
        />
        <Text style={footer}>
          <Link
            href="http://localhost:3000"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            Trading Economics
          </Link>
          , the all-in-one-trading-platform
          <br />
          for indicators, currencies, information, trading, and much much more.
        </Text>
      </Container>
    </Body>
  </Html>
);

ConfirmationEmail.PreviewProps = {
  confirmationLink: "sparo-ndigo-amurt-secan",
} as ConfirmationEmailProps;

export default ConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
