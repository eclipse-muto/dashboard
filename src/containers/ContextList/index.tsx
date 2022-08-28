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
  Label,
} from '@patternfly/react-core';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DELETECONTEXTBYID, GETCONTEXTS } from '../../api/query/context';

import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../utils/types';
import CustomHeader from '../../components/CustomHeader';


const ContextList: React.FunctionComponent = () => {

  const location = useLocation();

  const [getContexts, { loading, error, data: contextList }] = useLazyQuery(GETCONTEXTS);

  const [deleteContextById,] = useMutation(DELETECONTEXTBYID,
    { refetchQueries: [GETCONTEXTS] }
  );

  const [, setAlerts] = React.useState<React.ReactNode[]>([]);
  const showAlert = (title: string) => {
    const timeout = 5000;
    setAlerts(prevAlerts => {
      return [...prevAlerts,
      <Alert title={title} timeout={timeout} >
        This alert will dismiss after {`${timeout / 1000} seconds`}
      </Alert>
      ]
    });
  }


  React.useEffect(() => {

    getContexts()

    if (contextList) {
      console.log(contextList.context)
    }

  }, [location, getContexts, contextList])

  return (
    <>
      <CustomHeader title="Context List"
        description="Lists all the contexts."
      />

      <PageSection>
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error)} />}
        <DataList aria-label="context info">
          {contextList?.context.length > 0 && contextList?.context?.map((c: Context) => (
            <DataListItem aria-labelledby="simple-item1" key={c.id}>
              <DataListItemRow key={c.id} onClick={() => { console.log(c.id) }} >
                <DataListItemCells
                  dataListCells={[
                    <DataListCell key="context_id">
                      <span id="simple-item1">{c.id}</span>
                    </DataListCell>,
                    <DataListCell key="context">{c.description}</DataListCell>,
                    <DataListCell key="keywords">
                    {c.keywords?.map((k: string) => (
                        <>
                        <Label isCompact>{k}</Label>{' '}
                        </>
                      ))
                      }
                      </DataListCell>,
                  ]}
                />
                <DataListAction
                  aria-labelledby="single-action-item1 single-action-action1"
                  id="single-action-action1"
                  aria-label="Actions"
                >
                  <Link
                    to={{
                      pathname: "/context/byname",
                      state: { fromContextId: c.id }
                    }}
                  >
                    <Button
                      variant="secondary"
                      key="show-more-action"
                      id={c.id}
                    >
                      MORE
                    </Button>

                  </Link>
                  <Button variant="secondary" isDanger key="delete-model"
                    onClick={() => {
                      deleteContextById({ variables: { id: c.id } }).then(() =>
                        showAlert("model deleted")
                      )
                    }
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
export default ContextList;