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
import * as React from "react";
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";

import style from './style';


const Graph: React.FunctionComponent<{
  elements: cytoscape.ElementDefinition[];
}> = ({ elements }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const graph = React.useRef<cytoscape.Core>();
  const layout = React.useRef<cytoscape.Layouts>();

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.add(elements);
      let opts = {
        name: "cola",
        animate: true,
        nodeDimensionsIncludeLabels: false,
        fit: true,
        nodeSpacing: () => (15),
        maxSimulationTime: 5000
      }
      layout.current = graph.current.elements().makeLayout(opts);
      layout.current.run();
    }
  }, [elements]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        cytoscape.use(cola);
        graph.current = cytoscape({
          elements,
          style,
          maxZoom: 2,
          wheelSensitivity: 0.2,
          container: container.current
        })
      }
      graph.current.on('click', 'node', (e) => {
        alert(e.target._private.data.id);
      })
    } catch (error) {
      console.error(error);
    }
    return () => {
      graph.current && graph.current.destroy();
    };
  }, []);

  return <div className="graph" ref={container} />;
};

export default Graph;