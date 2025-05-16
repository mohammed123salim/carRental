import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";

const team = [
  {
    name: "MOHAMMED AL-JAHWARI 66S2021",
    role: "Front-end Developer",
    contribution: "Built the user interface using React, implemented routing, and integrated UI components.",
  },
  {
    name: "RASHID AL-GHAITHI - 66S208",
    role: "Back-end Developer",
    contribution: "Developed the server-side logic using Node.js.",
  },
  {
    name: "MOHAMMED AL-BALUSHI - 66S191",
    role: "Database Designer",
    contribution: "Designed the MongoDB database schema.",
  },
];

const references = [
  "CSSE4103 - Full-Stack Web Development-Anthony – https://myelearning.utas.edu.om/",
  "W3Schools – https://www.w3schools.com/",
  "ChatGPT by OpenAI – https://chat.openai.com",
  
];

const About = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Meet the Development Team</h1>
      <Row>
        {team.map((member, index) => (
          <Col md="4" key={index}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle tag="h5">{member.name}</CardTitle>
                <h6 className="text-muted">{member.role}</h6>
                <CardText>{member.contribution}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mt-5">References</h2>
      <ul>
  {references.map((ref, index) => {
    const [text, url] = ref.split(" – ");
    return (
      <li key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </li>
    );
  })}
</ul>

    </Container>
  );
};

export default About;
