import React from "react";
import styled from "styled-components";

function FolderView({name}: {name: string}) {
  return <p>{name}</p>;
}

function ArticleView({title}: {title: string}) {
  return <p>{title}</p>;
}

const Container = styled.div`
  width: calc(100vw - 8rem);
  height: calc(100vh - 8rem);
  background: var(--color-1);
  color: var(--color-5);
  padding: 4rem;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 30px;
`;

export default function SubjectPage() {
  return (
    <Container>
      <Title>title</Title>
      <div>
        {/* {children.map((child) => {
          switch (child.type) {
            case "folder": {
              return <FolderView name={child.name} key={child._id} />;
            }
            case "article": {
              return <ArticleView title={child.name} key={child._id} />;
            }
          }
        })} */}
      </div>
    </Container>
  );
}
