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
import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useQuery } from '@apollo/client';
import { GETMODELBYID } from '../../api/query/model';

const Users: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GETMODELBYID, {
    variables: { id: 4 },
  });
return (
  <PageSection>
    <Title headingLevel="h1" size="lg">Users Page Title!</Title>
    { loading ? <h1>Loading...</h1> : <p>{data.model.name}</p>}
    {!!error && <p>{error}</p> }
  </PageSection>);
}


export default Users;