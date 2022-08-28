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
  PageSection,
  Spinner,
  Alert,
  Button,
  DataList,
  DataListAction,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
} from '@patternfly/react-core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETEMODELBYID, GETMODELS } from '../../api/query/model';
import { Link, useLocation } from 'react-router-dom';
import { Model } from '../../utils/types';
import CustomHeader from '../../components/CustomHeader';


const ModelList: React.FunctionComponent = () => {

  const location = useLocation();

  const [getModels, { loading, error, data: modelsList }] = useLazyQuery(GETMODELS);
  const [deleteModelById,] = useMutation(DELETEMODELBYID,
    { refetchQueries: [GETMODELS] }
  );

  React.useEffect(() => {

    getModels()

    if (modelsList) {
      console.log(modelsList)
    }

  }, [location, getModels, modelsList])

  return (
    <>
      <CustomHeader title="Models List"
        description="Lists all the models available and their states."
      />
      <PageSection>
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error)} />}

        <DataList aria-label="model info">
          <DataListItem aria-labelledby="simple-item1" >
            <DataListItemRow  >
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="model_id">
                    <b>Model Id</b>
                  </DataListCell>,
                  <DataListCell key="context"> <b> Context</b></DataListCell>,
                  <DataListCell key="state"><b> State</b></DataListCell>,
                ]}
              />
              <DataListAction
                aria-labelledby="single-action-item1 single-action-action1"
                id="single-action-action1"
                aria-label="Actions"
              >
              </DataListAction>
            </DataListItemRow>
          </DataListItem>
          {modelsList?.model.length > 0 && modelsList?.model?.map((m: Model) => (
            <DataListItem aria-labelledby="simple-item1" key={m.id}>
              <DataListItemRow key={m.id} onClick={() => { console.log(m.id) }} >
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="model_id">
                      <span id="simple-item1">{m.id}</span>
                    </DataListCell>,
                    <DataListCell key="context">
                      <Link
                        to={{
                          pathname: "/context/byname",
                          state: { fromContextId: m.context?.id }
                        }}
                      >
                        {m.context?.id}
                      </Link>
                    </DataListCell>,
                    <DataListCell key="state">{m.state}</DataListCell>
                  ]}
                />
                <DataListAction
                  aria-labelledby="single-action-item1 single-action-action1"
                  id="single-action-action1"
                  aria-label="Actions"
                >
                  <Link
                    to={{
                      pathname: "/modelById",
                      state: { fromModelId: m.id }
                    }}
                  >
                    <Button
                      variant="secondary"
                      key="show-more-action"
                      id={m.id}
                    >
                      MORE
                    </Button>
                  </Link>
                  <Button variant="secondary" isDanger key="delete-model"
                    onClick={() => { deleteModelById({ variables: { id: m.id } }) }
                    }
                  >DELETE</Button>
                </DataListAction>
              </DataListItemRow>
            </DataListItem>
          ))}
        </DataList>

      </PageSection>
    </>);
}
export default ModelList;