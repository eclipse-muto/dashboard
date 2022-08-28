//
//  Copyright (c) 2022 Composiv.ai, Eteration A.S. and others
//
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the Eclipse Public License v2.0
// and Eclipse Distribution License v1.0 which accompany this distribution.
//
// The Eclipse Public License is available at
//    http://www.eclipse.org/legal/epl-v10.html
//    and the Eclipse Distribution License is available at
//    http://www.eclipse.org/org/documents/edl-v10.php.
//
// Contributors:
//    Composiv.ai, Eteration A.S. - initial API and implementation
//
//
import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Title,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Divider,
  PageSection,
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';

const ModelDetails: React.FunctionComponent<{ model?: any }> = ({ model }) => {

  return (
    <PageSection>
      <Card>
        <CardTitle>
          <Title headingLevel="h2" size="xl">
            Active Model Details
          </Title>
        </CardTitle>
        <CardBody>
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>API Docs</DescriptionListTerm>
              <DescriptionListDescription>
                <a href="http://localhost:8125/api/docs/#/Model/get_api_ros_model__model_id_" target={"_blank"}>http://localhost:8125/api/docs/</a>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Model ID</DescriptionListTerm>
              <DescriptionListDescription>{model?.id}</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Model Name</DescriptionListTerm>
              <DescriptionListDescription>{model?.name}</DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Context</DescriptionListTerm>
              <DescriptionListDescription>
                <Link
                  to={{
                    pathname: "/context/byname",
                    state: { fromContextId: model?.activeContext }
                  }}
                >
                  {model?.activeContext}
                </Link>

              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </CardBody>
        <Divider />
        <CardFooter>
          <a href="/panel">View More Models</a>
        </CardFooter>
      </Card>
    </PageSection>
  );
};

export default ModelDetails;