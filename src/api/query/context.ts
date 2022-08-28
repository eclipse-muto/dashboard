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

export const GETCONTEXTBYID = gql`

query GETCONTEXTBYID { 
    contextById(id: $id) @rest (
        method: "GET"
        type: "Context"
        path: "/ros/context/:id"
        bodyKey: "body"
      ) {
        context,
        model_match_scores,
        msg,
        status
      }
  }
`;

export const GETCONTEXTS = gql`

query GETCONTEXTS { 
    context(id: $id) @rest (
        method: "GET"
        type: "Context"
        path: "/ros/context/list"
        bodyKey: "body"
      ) {
        id: string,
        feature_set,
        description,
        keywords
      }
  }
`;

export const DELETECONTEXTBYID = gql`
  mutation deleteContextById{
    deleteContextById(id: $id)
    @rest(
        type: "ContextDelete"
        path: "/ros/context/:id"
        method: "DELETE"
      ){
        message
      }
 
  }
`;
