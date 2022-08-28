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
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  EmptyState,
  Label
} from '@patternfly/react-core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETECONTEXTBYID, GETCONTEXTBYID } from '../../api/query/context';

import { useLocation } from 'react-router-dom';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import CustomHeader from '../../components/CustomHeader';
import { uniqueId } from 'lodash';

interface stateType {
  fromContextId: string
}

const ContextById: React.FunctionComponent = () => {

  const [contextId, setcontextId] = useState('');
  const [getContext, { loading, error, data }] = useLazyQuery(GETCONTEXTBYID);

  const [deleteContextById,] = useMutation(DELETECONTEXTBYID,
    { refetchQueries: [GETCONTEXTBYID] }
  );

  const location = useLocation<stateType>()
  var { fromContextId } = location.state ? location.state : { fromContextId: '' }


  React.useEffect(() => {

    if (fromContextId !== '') {
      setcontextId(fromContextId)
      fromContextId = ''
      window.history.replaceState({}, document.title) // refresh the page on reload
    }

    getContext({ variables: { id: contextId } })

  }, [])

  React.useEffect(() => {

    getContext({ variables: { id: contextId } })

    if (data) {
      console.log(data)
    }

  }, [contextId, data, getContext])


  const handleIdChange = (newId: string) => {
    setcontextId(newId);
  };

  return (
    <>
      <CustomHeader title="Context By Id"
        description="Get Attributes of a Composiv Context. Start typing and the result will appear."
      />
      <PageSection>
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error)} />}
        <Form isHorizontal key="context-by-id-form">
          <FormGroup label="Id" isRequired fieldId="horizontal-form-modelid">
            <TextInput
              value={contextId}
              isRequired
              type="text"
              id="horizontal-form-modelid"
              aria-describedby="horizontal-form-modelid-helper"
              name="horizontal-form-modelid"
              onChange={handleIdChange}
            />
          </FormGroup>
        </Form>
      </PageSection>

      {data?.contextById ?
        <PageSection>
          {data?.contextById?.msg && <Alert variant="danger" title={JSON.stringify(data?.contextById.msg)} />}
          {data?.contextById &&
            <PageSection>
              <Card key={uniqueId()}  >
                <CardTitle>Details</CardTitle>
                <CardBody>
                  <DescriptionList>
                    <DescriptionListGroup key={uniqueId()} >
                      <DescriptionListTerm key={uniqueId()} >Name</DescriptionListTerm>
                      <DescriptionListDescription key={uniqueId()}>{data?.contextById?.context?.id}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup key={uniqueId()}  >
                      <DescriptionListTerm> key={uniqueId()} Description</DescriptionListTerm>
                      <DescriptionListDescription key={uniqueId()} >{data?.contextById?.context?.description}</DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup key={uniqueId()}  >
                      <DescriptionListTerm  key={uniqueId()} >Feature Set</DescriptionListTerm>
                      <DescriptionListDescription key={uniqueId()} > f_a: <i>{data?.contextById?.context?.feature_set.f_a} </i></DescriptionListDescription>
                      <DescriptionListDescription key={uniqueId()} > f_b: <i>{data?.contextById?.context?.feature_set.f_b} </i></DescriptionListDescription>
                      <DescriptionListDescription key={uniqueId()} > f_c: <i>{data?.contextById?.context?.feature_set.f_c} </i></DescriptionListDescription>
                      <DescriptionListDescription key={uniqueId()} > f_d: <i>{data?.contextById?.context?.feature_set.f_d} </i></DescriptionListDescription>
                      <DescriptionListDescription key={uniqueId()} > f_e: <i>{data?.contextById?.context?.feature_set.f_e} </i></DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup key={uniqueId()}  >
                      <DescriptionListTerm key={uniqueId()} >Keywords</DescriptionListTerm>
                      <DescriptionListDescription key={uniqueId()} >{data?.contextById?.context?.keywords.map((k: string) => (
                        <>
                        <Label key={uniqueId()} isCompact>{k}</Label>{' '}
                        </>
                      ))
                      }</DescriptionListDescription>
                    </DescriptionListGroup>
                    <Button variant="danger" key="show-more-action"
                      onClick={() => { deleteContextById({ variables: { id: contextId } }) }
                      }
                    >Delete Model</Button>
                  </DescriptionList>
                </CardBody>
              </Card>
            </PageSection>
          }
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
              <Button variant="link"><a href="/context/list"> View Context List</a></Button>
            </EmptyStateSecondaryActions>
          </EmptyState>
        </PageSection>
      }

    </>);
}

export default ContextById;