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
import { gql } from '@apollo/client';

export const ROSNODELIST = gql`
query ROSNODELIST { 
  rosnodes(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/node/list"
      bodyKey: "body"
    ) {
      nodes
    }
}
`;

export const ROSNODEINFO = gql`

query ROSNODEINFO { 
  rosnode(node_name: $node_name) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/node/info?node_name={args.node_name}"
      bodyKey: "body"
    ) {
      info
    }
}
`;

export const ROSPUBS = gql`
query ROSPUBS { 
  rospubs(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/node/rosout/pubs"
      bodyKey: "body"
    ) {
      pubs
    }
}
`;

export const ROSSUBS = gql`
query ROSSUBS { 
  rossubs(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/node/rosout/subs"
      bodyKey: "body"
    ) {
      subs
    }
}
`;

export const ROSSERVICES = gql`
query ROSSERVICES { 
  rosservices(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/node/rosout/services"
      bodyKey: "body"
    ) {
      services
    }
}
`;

export const ROSTOPICINFO = gql`
query ROSTOPICINFO { 
  rostopic(topic_name: $topic_name) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/topic/info?topic_name={args.topic_name}"
      bodyKey: "body"
    ) {
      info
    }
}
`;

export const ROSTOPICLIST = gql`
query ROSTOPICLIST { 
  rostopics(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/topic/list"
      bodyKey: "body"
    ) {
      topics
    }
}
`;

export const ROSARGS = gql`
query ROSARGS { 
  rosargs(id: $id) @rest (
      method: "GET"
      type: "ros"
      path: "/ros/system/args"
      bodyKey: "body"
    ) {
      args
    }
}
`;



