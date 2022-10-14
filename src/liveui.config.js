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
const config = {
    shares: {
        react: require('react'),
        '@apollo/client': require('@apollo/client'),
        "graphql": require('graphql'),
        'react-dom': require('react-dom'),
        'react-router-dom': require('react-router-dom'),
        "@patternfly/react-core": require('@patternfly/react-core'),
        "@patternfly/react-icons":require('@patternfly/react-icons'),
        "@patternfly/react-table":require('@patternfly/react-table'),

        "react-i18next": require('react-i18next'),
        "i18next": require('i18next'),
        "uuid": require('uuid'),
    },
    remotes: {
       "liveui-dashboard-vehicle": 'http://localhost:5005/liveui-dashboard-vehicle',
    },
}

export default config;