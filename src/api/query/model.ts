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

export const GETSYSTEMGRAPH = gql`

query GETSYSTEMGRAPH {
  systemGraph @rest (
    method: "GET",
    type: "SystemGraph",
    path: "/ros/system/graph"
  ) {
    systemGraph: Object
  }
}
`;

export const GETMODELS = gql`

query GETMODELS { 
    model(id: $id) @rest (
        method: "GET"
        type: "Model"
        path: "/ros/model/list"
        bodyKey: "body"
      ) {
        id: number,
        context: object
        nodes,
        state,
        message,
        name: string
      }
  }
`;

export const GETMODELBYID = gql`

query GETMODELBYID { 
    modelById(id: $id) @rest (
        method: "GET"
        type: "Model"
        path: "/ros/model/:id"
        bodyKey: "body"
      ) {
        id: number,
        context,
        nodes,
        state,
        name
      }
  }
`;

export const POSTMODEL = gql`


mutation createModel($context: String!, $nodes: Array) {
  newModel(body: {context: $context, nodes: $nodes})
  @rest(
      type: "Model"
      path: "/ros/model/new"
      method: "POST"
      bodyKey: "body"
    )
  {
    context,
    id,
    nodes,
    state
  }
}

`;

export const DELETEMODELBYID = gql`
  mutation deleteModelById{
    deleteModelById(id: $id)
    @rest(
        type: "CassModelDelete"
        path: "/ros/model/:id"
        method: "DELETE"
      ){
        message
      }
 
  }
`;

export const GETTURTLESIM = gql`

query GETTURTLESIM { 
    turtlesim(id: $id) @rest (
        method: "GET"
        type: "Response"
        path: "/ros/launcher/turtlesim"
        bodyKey: "body"
      ) {
        message
      }
  }
`;

export const GETACTIVEMODEL = gql`

query GETACTIVEMODEL { 
    activeModel @rest (
        method: "GET"
        type: "CassModel"
        path: "/ros/lifecycle/modelstate"
        bodyKey: "body"
      ) {
        id: number,
        activeContext: string,
        name
        nodes,
        state,
        message
      }
  }
`;

export const ACTIVATEMODEL = gql`
mutation activateModel($command: String!, $id: String) {
  activateModel(body: {command: $command, id: $id})
  @rest(
      type: "LifecycleAction"
      path: "/ros/lifecycle/updatestate"
      method: "POST"
      bodyKey: "body"
    )
  {
    message
  }
}

`;

export const DEACTIVATEMODEL = gql`
mutation deactivateModel($command: String!) {
  deactivateModel(body: {command: $command})
  @rest(
      type: "LifecycleAction"
      path: "/ros/lifecycle/updatestate"
      method: "POST"
      bodyKey: "body"
    )
  {
    message
  }
}
`;

export const DIFFMODEL = gql`

query DIFFMODEL { 
  diff(id: $id) @rest (
      method: "GET"
      type: "CassModel"
      path: "/ros/lifecycle/diff/:id"
      bodyKey: "body"
    ) {
      info,
      active_model,
      common_nodes,
      new_model,
      nodes_to_start,
      nodes_to_stop
    }
}

`;

export const COMPAREMODELS = gql`

query COMPAREMODELS { 
  comparison(firstId: $firstId, secondId: $secondId) @rest (
      method: "GET"
      type: "CassModel"
      path: "/ros/lifecycle/comparemodels/:firstId/:secondId"
      bodyKey: "body"
    ) {
      from_model_id,
      to_model_id
      common_nodes,
      different_nodes,
      info
    }
}

`;

export const KILLNODE = gql`

query KILLNODE { 
  res(name: $name) @rest (
      method: "GET"
      type: "rosnode"
      path: "/ros/lifecycle/node/:name/kill"
      bodyKey: "body"
    ) {
     message
    }
}

`;

export const STARTNODE = gql`

query STARTNODE { 
  res(name: $name) @rest (
      method: "GET"
      type: "rosnode"
      path: "/ros/lifecycle/node/:name/start"
      bodyKey: "body"
    ) {
     message
    }
}

`;