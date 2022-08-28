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
import { useLazyQuery } from '@apollo/client';
import { Alert, PageSection, Spinner, Title } from '@patternfly/react-core';
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GETSYSTEMGRAPH } from '../../api/query/model';
import Graph from "../../components/Graph/Graph";

const Test: React.FunctionComponent = () => {

  const [getSytemGraph, { loading, error, data: systemGraph }] = useLazyQuery(GETSYSTEMGRAPH);
  const [graphData, setGraphData] = useState<any[]>([]);

  React.useEffect(() => {
    getSytemGraph();

    if (systemGraph?.systemGraph?.systemGraph) {
      manipulateData()
    }
  }, [systemGraph]);

  const manipulateData = () => {
    let data: Array<any> = [];
    let edges: Array<any> = [];


    const {
      publishers,
      subscribers
    }: { publishers: Array<any>; subscribers: Array<any> } = systemGraph.systemGraph.systemGraph;

    publishers.forEach((publisher) => {
      // Push topics from publisher list
      data.push({
        data: {
          id: publisher[0],
          type: 1
        }
      });

      // Push each node 
      publisher[1].forEach((node: string) => {

        // Check if already pushed (topics are unique)
        if (!data.some(datum => datum.id === node)) {
          data.push({
            data: {
              id: node,
              type: 2
            }
          })
        }

        // Push edges connecting publisher nodes and published topics
        edges.push({
          data: {
            id: uuidv4(),
            source: node,
            target: publisher[0]
          }
        })
      });

    })

    // Push topics from subscriber list
    subscribers.forEach((subscriber) => {
      // Check if topic already pushed
      if (!data.some(datum => datum.id === subscriber[0])) {
        data.push({
          data: {
            id: subscriber[0],
            type: 1
          }
        });
      }

      subscriber[1].forEach((node: string) => {

        // Check if already pushed (topics are unique)
        if (!data.some(datum => datum.id === node)) {
          data.push({
            data: {
              id: node,
              type: 2
            }
          })
        }

        // Push edges connecting publisher nodes and published topics
        edges.push({
          data: {
            id: uuidv4(),
            source: node,
            target: subscriber[0]
          }
        })

      })
    })

    const out: Array<string> = [...data, ...edges];

    setGraphData(out);
  }

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">Active Node Graph.</Title>
      </PageSection>

      <PageSection>
        {!!loading && <Spinner />}
        {!!error && <Alert variant="danger" title={JSON.stringify(error.message)} />}
        {!!systemGraph &&
        <div className='graph'>
          <Graph
            elements={graphData}
          />
        </div>}
      </PageSection>
    </>
  )
}
export default Test;


