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
  Badge,
  Flex,
} from '@patternfly/react-core';
import { useLazyQuery } from '@apollo/client';
import { GETACTIVEMODEL } from '../../api/query/model';

import { useLocation } from 'react-router-dom';
import Test from '../Test';
import NodeGallery from '../../components/NodeGallery';
import CustomHeader from '../../components/CustomHeader';
import SimpleTabs from '../../components/SimpleTabs';
import ModelDetails from '../../components/ModelDetails';
import RemoteComponent from "@eclipse-muto/liveui-react";

const Home: React.FunctionComponent = () => {

  const [getActiveModel, { data: activeModel }] = useLazyQuery(GETACTIVEMODEL);


  const location = useLocation();

  const Monitoring = props =>  <RemoteComponent name="monitoring" {...props} />

  React.useEffect(() => {

    getActiveModel()

  }, [location, getActiveModel, activeModel])

  return (
    <>
      <CustomHeader title={activeModel?.activeModel?.name} description="Node details, node graph and the model details of the active model are shown below."
        extras={
          <>
            {' Nodes: '}
            <Badge key={1}>{activeModel?.activeModel?.nodes?.length}</Badge>
          </>
        }
        banner={
          <Flex
            justifyContent={{ default: 'justifyContentCenter', lg: 'justifyContentSpaceBetween' }}
            flexWrap={{ default: 'nowrap' }}
          >
            <div className="pf-u-display-none pf-u-display-block-on-lg">Localhost</div>
            <div className="pf-u-display-none pf-u-display-block-on-lg">
              Nodes in model: {activeModel?.activeModel?.nodes?.length}
            </div>
            <div className="pf-u-display-none-on-lg">Context: {activeModel?.activeModel?.activeContext}</div>
            <div className="pf-u-display-none-on-lg">Model: {activeModel?.activeModel?.id}</div>
          </Flex>
        }
      />

      <SimpleTabs
        tabs=
        {
          [
            {
              "title": "Graph",
              "component": <Test />
            },
            {
              "title": "Nodes",
              "component":  <Monitoring />
            },
            {
              "title": "Details",
              "component": <ModelDetails model={activeModel?.activeModel} />
            },
            {
              "title": "Events",
              "component": "Events"
            },
          ]
        }
      />
      {/* <NodeGallery /> */}
      {/* <Test /> */}
    </>
  );
}

export default Home;