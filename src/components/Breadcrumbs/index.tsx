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
import { Breadcrumb, BreadcrumbItem, Button } from "@patternfly/react-core";

import { useHistory, withRouter, useLocation } from "react-router-dom";

const Breadcrumbs = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname }  = location;
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb>
      {pathnames.length > 0 ? (
        <BreadcrumbItem key="home">
          <Button variant="link" onClick={() => history.push("/")}>
            Home
          </Button>
        </BreadcrumbItem>
      ) : (
        <></>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <BreadcrumbItem key={name}>{name}</BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={name}>
            <Button variant="link" onClick={() => history.push(routeTo)}>
              {name}
            </Button>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default withRouter(Breadcrumbs);
