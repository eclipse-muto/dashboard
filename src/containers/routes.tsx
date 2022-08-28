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

const Stack = props =>  <RemoteComponent name="stack" {...props} />
const StackDetail = props =>  <RemoteComponent name="sdetail" {...props} />
const Vehicle = props =>  <RemoteComponent name="vehicle" {...props} />
const VehicleDetail = props =>  <RemoteComponent name="vdetail" {...props} />
const VStack = props =>  <RemoteComponent name="vstack" {...props} />
// const RosActions = props =>  <RemoteComponent name="rosActions" {...props} />

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
  /*{
    component: Home,
    exact: true,
    label: 'Home - Active System',
    path: '/',
    title: 'Eclipse Muto | Main Dashboard',
  },*/
  {
    component: Stack,
    exact: true,
    isAsync: true,
    label: 'Stack Panel',
    path: '/stack',
    title: 'Eclipse Muto | Stack Panel Page',
  },
  {
    component: StackDetail,
    exact: true,
    isAsync: true,
    path: '/stackdetail',
    title: 'Eclipse Muto | Stack Panel Page',
  },
  {
    component: Vehicle,
    exact: true,
    isAsync: true,
    label: 'Vehicle Panel',
    path: '/',
    title: 'Eclipse Muto | Vehicle Panel Page',
  },
  {
    component: VehicleDetail,
    exact: true,
    isAsync: true,
    //label: 'Vehicle Detail',
    path: '/vehicledetail',
    title: 'Eclipse Muto | Vehicle Detail',
  },
  {
    component: VStack,
    exact: true,
    isAsync: true,
    //label: 'Vehicle Stacks',
    path: '/vstack',
    title: 'Eclipse Muto | Vehicle Stack Management',
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
    return <Component {...rest} {...routeProps} />;
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