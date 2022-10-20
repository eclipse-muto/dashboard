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
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '../utils/utils';

import NotFound from './NotFound';


import { useDocumentTitle } from '../utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import RemoteComponent from '@eclipse-muto/liveui-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Home from './Home';

const Stack = props =>  <RemoteComponent form={{component: "Stack", from: "dashboard-stack"}} {...props} />

const Vehicle = props =>  <RemoteComponent form={{component: "Vehicle", from: "dashboard-device"}} {...props} />
const VehicleDetail = props =>  <RemoteComponent form={{component: "VehicleDetail", from: "dashboard-device"}} {...props} />
const VehicleStack = props =>  <RemoteComponent form={{component: "VehicleStack", from: "dashboard-device"}} {...props} />
const VehicleTelemetry = props =>  <RemoteComponent form={{component: "VehicleTelemetry", from: "dashboard-device"}} {...props} />

const TopicEcho= props =>  <RemoteComponent  form={{component: "TopicEcho", from: "dashboard-device"}}  {...props} />
const TopicList= props =>  <RemoteComponent  form={{component: "TopicList", from: "dashboard-device"}}  {...props} />
const TopicDetail= props =>  <RemoteComponent  form={{component: "TopicDetail", from: "dashboard-device"}}  {...props} />
const NodeList= props =>  <RemoteComponent  form={{component: "NodeList", from: "dashboard-device"}}  {...props} />
const NodeDetail= props =>  <RemoteComponent  form={{component: "NodeDetail", from: "dashboard-device"}}  {...props} />
const ParamList= props =>  <RemoteComponent  form={{component: "ParamList", from: "dashboard-device"}}  {...props} />
const ParamDetail= props =>  <RemoteComponent  form={{component: "ParamDetail", from: "dashboard-device"}}  {...props} />


let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: any[] = [
  {
    component: Home,
    exact: true,
    label: 'Home',
    path: '/',
    title: 'Eclipse Muto | Main Dashboard',
  },
  {
    component: Stack,
    exact: true,
    isAsync: true,
    label: 'Stacks',
    path: '/stack',
    title: 'Eclipse Muto | Stacks',
  },
  {
    component: Vehicle,
    exact: true,
    isAsync: true,
    label: 'Vehicles',
    path: '/vehicle',
    title: 'Eclipse Muto | Vehicles',
  },
  {
    component: VehicleDetail,
    exact: true,
    isAsync: true,
    //label: 'Vehicle Detail',
    path: '/vehicle/:thingid',
    title: 'Eclipse Muto | Vehicle Detail',
  },
  {
    component: VehicleStack,
    exact: true,
    isAsync: true,
    //label: 'Vehicle Stacks',
    path: '/vehicle/:thingid/stacks',
    title: 'Eclipse Muto | Vehicle Stack Management',
  },
  {
    component:VehicleTelemetry,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/telemetry',
    title: 'Eclipse Muto | Telemetry',
  },
  {
    component:TopicList,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/topics',
    title: 'Eclipse Muto | Ros Topics',
  },
  {
    component: TopicDetail,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/topics/:topic',
    title: 'Eclipse Muto | Ros Topic Detail',
  },
  {
    component: TopicEcho,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/echo',
    title: 'Eclipse Muto | Ros Topic Echo',
  },
  {
    component: NodeList,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/nodes',
    title: 'Eclipse Muto | Ros Nodes',
  },
  {
    component: NodeDetail,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/nodes/:node',
    title: 'Eclipse Muto | Ros Node Detail',
  },
  {
    component: ParamList,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/params',
    title: 'Eclipse Muto | Ros Parameters',
  },
  {
    component: ParamDetail,
    exact: true,
    isAsync: true,
    //label: 'Vehicle ros actions',
    path: '/vehicle/:thingid/params/:param',
    title: 'Eclipse Muto | Ros Parameter Detail',
  },
  /*{
    component: RosActions,
    exact: true,
    isAsync: true,
    //label: 'ROS Actions',
    path: '/ros',
    title: 'Eclipse Muto | ROS System Panel',
  },

  {
    component: Test,
    exact: true,
    isAsync: true,
    label: 'Test',
    path: '/test',
    title: 'Eclipse Muto | Test Page',
  },*/
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
};

const RouteWithTitleUpdates = ({ component: Component, isAsync = false, title, ...rest }: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <> <Breadcrumbs /><Component {...rest} {...routeProps} /></>;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Switch>
      {flattenedRoutes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };