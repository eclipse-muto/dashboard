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
const COLORS = {
  purp: '#43447a',
  pink: '#EE4411',
  black: '#000000'
};

type tTypeColors = {
  [key: number]: string
}

type tTypeShapes = {
  [key: number]: number
}

const typeColors: tTypeColors = {
  1: '#ff6347',
  2: '#6495ed'
}

const typeShapes: tTypeShapes = {
  1: 20,
  2: 50
}

const nodeStyles = [
  {
    selector: 'node',
    style: {
      'transition-property': 'background-color border-color',
      'transition-duration': 0.3,
      //   'transition-timing-function': 'ease-in-sine',
      'background-color': (el: any) => typeColors[el.attr("type")],
      'background-height': '40%',
      'background-width': '40%',
      'border-color': '#fff',
      'border-width': '4%',
      color: '#000',
      'label': 'data(id)',
      shape: "ellipse",
      width: 50,
      height: (el: any) => typeShapes[el.attr("type")],
      'font-family': 'Helvetica',
      'font-size': 12,
      'overlay-opacity': 0,
      'min-zoomed-font-size': 8
    }
  }
];
const edgeStyles = [
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      // @ts-ignore
      'target-arrow-shape': 'triangle',
      'target-arrow-color': COLORS.black,
      'line-color': 'black',
      'overlay-opacity': 0,
      width: 0.5,

    }
  }
];

export default [...nodeStyles, ...edgeStyles];
