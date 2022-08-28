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
import { Tabs, Tab, TabTitleText } from '@patternfly/react-core';

const SimpleTabs: React.FunctionComponent<{ tabs?: Array<any> }> = ({ tabs }) => {

  const [activeTabKey, setActiveTabKey] = useState<string | number>()

  // Toggle currently active tab
  const handleTabClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, tabIndex: string | number) => {
    setActiveTabKey(tabIndex)
  };

  return (
    <div>
      <Tabs activeKey={activeTabKey} onSelect={handleTabClick} isBox={false}>
        {tabs?.map(({ title, component }: any, idx: number) => (
          <Tab eventKey={idx} title={<TabTitleText>{title}</TabTitleText>}>
            {component}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default SimpleTabs;