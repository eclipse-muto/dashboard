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
  Wizard,
  Button,
  Modal,
  ModalVariant
} from '@patternfly/react-core';
import { useLazyQuery } from '@apollo/client';
import { GETCONTEXTS } from '../../api/query/context';

import { useLocation } from 'react-router-dom';
import { ROSARGS, ROSNODEINFO, ROSNODELIST, ROSPUBS, ROSSERVICES, ROSSUBS, ROSTOPICINFO, ROSTOPICLIST } from '../../api/query/ros';
import { CheckCircleIcon, EyeIcon } from '@patternfly/react-icons'
import CustomHeader from '../../components/CustomHeader';

const RosSystem: React.FunctionComponent = () => {

  const location = useLocation();

  const [getContexts, { data: contextList }] = useLazyQuery(GETCONTEXTS);

  const [getRosNodeList, { data: rosNodeList }] = useLazyQuery(ROSNODELIST);
  const [getRosArgsList, { data: rosArgsList }] = useLazyQuery(ROSARGS);
  const [getRosTopicList, { data: rosTopicList }] = useLazyQuery(ROSTOPICLIST);
  const [getRosPubs, { data: rosPubs }] = useLazyQuery(ROSPUBS);
  const [getRosSubs, { data: rosSubs }] = useLazyQuery(ROSSUBS);
  const [getRosServices, { data: rosServices }] = useLazyQuery(ROSSERVICES);
  const [getRosTopicInfo, { data: rosTopicInfo }] = useLazyQuery(ROSTOPICINFO);
  const [getRosNodeInfo, { data: rosNodeInfo }] = useLazyQuery(ROSNODEINFO);

  // const [getRosNodeInfo, {data: rosNodeInfo}] = useMutation(ROSNODEINFO, );

  const [isModalOpenTopic, setModalOpenTopic] = useState(false);
  const [isModalOpenNode, setModalOpenNode] = useState(false);

  const handleModalToggleTopic = () => {
    setModalOpenTopic(!isModalOpenTopic);
  };

  const handleModalToggleNode = () => {
    setModalOpenNode(!isModalOpenNode);
  };

  React.useEffect(() => {

    getContexts()

    if (contextList) {
      console.log(contextList.context)
    }

    getRosNodeList()
    getRosArgsList()
    getRosTopicList()
    getRosPubs()
    getRosSubs()
    getRosServices()

  }, [location, getContexts, contextList, getRosNodeList, getRosArgsList, getRosTopicList, getRosPubs, getRosSubs, getRosServices])

  const steps = [
    {
      name: 'Node List', component: <p>{rosNodeList?.rosnodes?.nodes.map((node: string) =>
        <>
          <Button variant="plain" aria-label="Action"
            onClick={() => {
              getRosNodeInfo({
                variables: { "node_name": node },
              }).then(() => handleModalToggleNode())

            }}
          >
            <CheckCircleIcon /> {node}
          </Button>
        </>
      )}</p>
    },
    {
      name: 'Args List', component: <p>{rosArgsList?.rosargs?.args.map((arg: string) =>
        <li>{arg}</li>
      )}</p>
    },
    {
      name: 'Topic List', component: <p>{rosTopicList?.rostopics?.topics.map((topicinner: Array<string>) =>

        topicinner.map((topic: string) =>
          // <li>{topic}</li>
          <>
            <Button variant="plain" aria-label="Action"
              onClick={() => {
                getRosTopicInfo({
                  variables: { "topic_name": topic },
                }).then(() => handleModalToggleTopic())

              }}
            >
              <EyeIcon /> {topic}
            </Button>
            <br />
          </>
        )
      )
      }</p>
    },
    {
      name: 'Pubs', component: <p>{rosPubs?.rospubs?.pubs.map((pub: string) =>
        <li>{pub}</li>
      )
      }</p>
    },
    {
      name: 'Subs', component: <p>{rosSubs?.rossubs?.subs.map((sub: string) =>
        <li>{sub}</li>
      )}</p>
    },
    {
      name: 'Services', component: <p>{rosServices?.rosservices?.services.map((sub: string) =>
        <li>{sub}</li>
      )}</p>
    },
  ];
  const title = 'ROS Actions wizard';

  return (
    <>
      <CustomHeader title="ROS System Actions"
        description="ROS terminal actions."
      />

      <PageSection>
        <Wizard
          navAriaLabel={`${title} steps`}
          mainAriaLabel={`${title} content`}
          steps={steps}
          height={700}
          footer={<footer>footer</footer>}
        />
        <Modal
          variant={ModalVariant.small}
          title="Topic Info"
          description="Detailed info about the topic."
          isOpen={isModalOpenTopic}
          onClose={handleModalToggleTopic}
          actions={[
            <Button key="cancel" variant="link" onClick={handleModalToggleTopic}>
              Cancel
            </Button>
          ]}
        >
          {rosTopicInfo?.rostopic?.info}
          {console.log(rosTopicInfo?.rostopic?.info)}
        </Modal>

        <Modal
          variant={ModalVariant.small}
          title="Node Info"
          description="Detailed info about the node."
          isOpen={isModalOpenNode}
          onClose={handleModalToggleNode}
          actions={[
            <Button key="cancel" variant="link" onClick={handleModalToggleNode}>
              Cancel
            </Button>
          ]}
        >
          {rosNodeInfo?.rosnode?.info}
          {console.log(rosNodeInfo?.rosnode?.info)}
        </Modal>
        
      </PageSection>
    </>);
}
export default RosSystem;