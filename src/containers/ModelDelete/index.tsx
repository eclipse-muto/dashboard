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
import React, { useState } from 'react';
import {
  PageSection, Spinner, Alert, Form,
  FormGroup,
  TextInput,
  Button,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateSecondaryActions
} from '@patternfly/react-core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETEMODELBYID, GETMODELBYID } from '../../api/query/model';
import { Node } from '../../utils/types';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import CustomHeader from '../../components/CustomHeader';


const ModelDelete: React.FunctionComponent = () => {

  const [modelId, setmodelId] = useState('');
  const [getModel, { loading, error, data }] = useLazyQuery(GETMODELBYID);


  const [deleteModelById, { error: deleteModelError }] = useMutation(DELETEMODELBYID,
    { refetchQueries: [GETMODELBYID] }
  );


  React.useEffect(() => {

    getModel({ variables: { id: modelId } })

    if (data) {
      console.log(data)
    }

  }, [modelId, data, getModel])


  const handleIdChange = (newId: string) => {
    setmodelId(newId);
  };

  if (deleteModelError) {
    <Alert variant="danger" title={JSON.stringify(deleteModelError)} />
  }

  return (
    <>
      <CustomHeader title="Model Delete By Id"
        description="Attention: Deletes the Model."
      />
      <PageSection>
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error)} />}
        <Form isHorizontal>
          <FormGroup label="Id" isRequired fieldId="horizontal-form-modelid">
            <TextInput
              value={modelId}
              isRequired
              type="text"
              id="horizontal-form-modelid"
              aria-describedby="horizontal-form-modelid-helper"
              name="horizontal-form-modelid"
              onChange={handleIdChange}
            />
          </FormGroup>
          <Button variant="danger" key="show-more-action"
            onClick={() => { deleteModelById({ variables: { id: modelId } }) }

            }
          >Delete Model</Button>
        </Form>
      </PageSection>
      <PageSection>
        {data?.modelById?.message && <Alert variant="danger" title={JSON.stringify(data?.modelById.message)} />}
        {data?.modelById &&
          <PageSection>
            <Card>
              <CardTitle>Details</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>State</DescriptionListTerm>
                    <DescriptionListDescription>{data?.modelById?.state}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Context Id</DescriptionListTerm>
                    <DescriptionListDescription>{data?.modelById?.context?.id}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Context Description</DescriptionListTerm>
                    <DescriptionListDescription>{data?.modelById?.context?.description}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Context Feature Set</DescriptionListTerm>
                    <DescriptionListDescription key="f_a"> f_a: <i>{data?.modelById?.context?.feature_set.f_a} </i></DescriptionListDescription>
                    <DescriptionListDescription key="f_b"> f_b: <i>{data?.modelById?.context?.feature_set.f_b} </i></DescriptionListDescription>
                    <DescriptionListDescription key="f_c"> f_c: <i>{data?.modelById?.context?.feature_set.f_c} </i></DescriptionListDescription>
                    <DescriptionListDescription key="f_d"> f_d: <i>{data?.modelById?.context?.feature_set.f_d} </i></DescriptionListDescription>
                    <DescriptionListDescription key="f_e"> f_e: <i>{data?.modelById?.context?.feature_set.f_e} </i></DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Context Keywords</DescriptionListTerm>
                    <DescriptionListDescription>{data?.modelById?.context?.keywords?.join(", ")}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Nodes</DescriptionListTerm>
                    {data?.modelById?.nodes?.map((x: Node, i: number) => (
                      <DescriptionListDescription key={i}> {x.name} : <i> {x.health}</i></DescriptionListDescription>
                    ))}
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>

            </Card>
          </PageSection>}
      </PageSection>
      :
      <PageSection>
        <EmptyState>
          <EmptyStateIcon icon={SearchIcon} />
          <Title headingLevel="h4" size="lg">
            No results found
          </Title>
          <EmptyStateBody>
            No results found for the given id. Try again with a valid id, or see the list of ids.
          </EmptyStateBody>
          <EmptyStateSecondaryActions>
            <Button variant="link"><a href="/model/list"> View Model List</a></Button>
          </EmptyStateSecondaryActions>
        </EmptyState>
      </PageSection>
    </>);
}

export default ModelDelete;