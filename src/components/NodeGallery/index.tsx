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
  PageSection,
  Spinner,
  Alert,
  Card,
  CardBody,
  Gallery,
  CardTitle,
  Button,
  CardActions,
  CardHeader,
  CardFooter,
  AlertGroup,
} from '@patternfly/react-core';
import { useLazyQuery } from '@apollo/client';
import { GETACTIVEMODEL, KILLNODE, STARTNODE } from '../../api/query/model';

import { Node } from '../../utils/types';
import { useLocation } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, PowerOffIcon } from '@patternfly/react-icons';

const NodeGallery: React.FunctionComponent = () => {

  const [getActiveModel, { loading, error, data: activeModel }] = useLazyQuery(GETACTIVEMODEL);
  const [cardData, setCardData] = useState<any[]>([])
  const [isNodeShut, setIsNodeShut] = useState(false)

  const [killNode, { data: killNodeMessage }] = useLazyQuery(KILLNODE);
  const [startNode, { data: startNodeMessage }] = useLazyQuery(STARTNODE);


  const location = useLocation();

  const prepareCardData = () => {
    let data: Array<any> = [];
    const nodes: Array<Node> = activeModel.activeModel.nodes;

    nodes.forEach((node) => {
      // prepare card data, and arrange icons according to node health
      let icon;
      if (node.health === "alive") {
        icon = <CheckCircleIcon color="var(--pf-global--success-color--100)" />
      }
      else if (node.health === "dead") {
        icon = <ExclamationCircleIcon color="var(--pf-global--success-color--100)" />
      }
      else {
        icon = <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
      }
      data.push({
        name: node.name,
        icon: icon,
        health: node.health
      });
    })

    setCardData(data)
  }

  React.useEffect(() => {
    getActiveModel()

    if (activeModel?.activeModel?.nodes) {
      prepareCardData();
    }
  }, [location, getActiveModel, activeModel, isNodeShut]);


  const handleCardToggle = (name: string, action: number) => {

    if (action === 0) {
      showAlert("killed " + name)
    }
    else {
      showAlert("started " + name)
    }
  }

  const [alerts, setAlerts] = React.useState<React.ReactNode[]>([]);
  const showAlert = (title: string) => {
    const timeout = 5000;
    setAlerts(prevAlerts => {
      return [...prevAlerts,
      <Alert title={title} timeout={timeout} >
        Model is still active, your action only affected the node you interacted with.
        This message will automatically dissapear in {`${timeout / 1000} seconds`}.
      </Alert>
      ]
    });
  }

  return (
    <div>
      <AlertGroup isLiveRegion>
        {alerts}
      </AlertGroup>
      <PageSection>
        {activeModel?.activeModel?.message && <Alert variant="danger" title={JSON.stringify(activeModel?.activeModel?.message)} />}
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error.message)} />}
        <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '260px' } as any}>
          {cardData.map(({ name, icon, health }) => (
            <Card style={{ textAlign: 'left' }} key={name} component="div">
              <CardHeader style={{ maxHeight: '40px' }} >
                <CardActions>
                  <Button variant="plain" aria-label="Action"
                    onClick={() => {
                      if (health === "alive") {
                        killNode({
                          variables: { "name": name },
                        }).then(() => handleCardToggle(name, 0))
                      }
                      else {
                        {
                          startNode({
                            variables: { "name": name },
                          }).then(() => handleCardToggle(name, 1))

                        }
                      }
                      setIsNodeShut(!isNodeShut)
                    }}
                  >
                    {
                      health === "alive" ?
                        <PowerOffIcon color="var(--pf-global--danger-color--100)" />
                        :
                        <PowerOffIcon color="var(--pf-global--success-color--100)" />
                    }
                  </Button>
                </CardActions>
              </CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardBody>some description for {name}.</CardBody>
              <CardFooter>{
                health === "alive" ?
                  <CheckCircleIcon color="var(--pf-global--success-color--100)" />
                  :
                  <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
              }
              </CardFooter>
            </Card>
          ))}
        </Gallery>
      </PageSection>
    </div>
  );
}

export default NodeGallery;