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
import './App.css';
import { createContext } from "react";
import {

  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { AppLayout } from './components/AppLayout';
import { AppRoutes } from './containers/routes';
import { Connector } from 'mqtt-react-hooks';

export const MQTTContext = createContext({})



// const queryClient = new QueryClient()
// const qcContext = createContext<QueryClient>(queryClient)

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Connector brokerUrl="wss://sandbox.composiv.ai:443/ws" options={{ protocolVersion: 5 }}>
        <Router>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </Router>
      </Connector>
    </QueryClientProvider>
  )
}
