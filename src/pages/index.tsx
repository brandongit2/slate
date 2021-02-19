import {Link} from "gatsby";
import React from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";

import "./index.css";
import SubjectCard from "components/SubjectCard";
import logo from "images/logotype-dark.svg";

const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
  margin-left: 4rem;
  display: grid;
  row-gap: 2rem;
`;

const Logo = styled.img`
  height: 2rem;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

const Subheader = styled.h2`
  font-size: 18px;
`;

const Subjects = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto;
  column-gap: 0.5rem;
`;

const Subject = styled.div`
  display: contents;
`;

export default function Index() {
  return (
    <Container>
      <Helmet>
        <title>Slate: Learn by doing.</title>
        <link rel="stylesheet" href="https://use.typekit.net/eqs1cah.css" />
      </Helmet>
      <Logo src={logo} />
      <div>
        <Header>learn by doing.</Header>
        <Subheader>
          mathematics, science, and more with interactive demos and virtual
          labs.
        </Subheader>
      </div>
      <div>
        <Subjects>
          <Link to="/subject/mathematics" key="mathematics">
            <Subject>
              <SubjectCard
                name="mathematics"
                description="description"
                color="ff0000"
              />
            </Subject>
          </Link>
        </Subjects>
      </div>
    </Container>
  );
}
