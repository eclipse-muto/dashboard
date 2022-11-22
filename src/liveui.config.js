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
import axios from 'axios'
import React from 'react'
import * as RQ from '@tanstack/react-query'

const timestamp = (new Date()).getTime()
const config = {
    shares: {
        'axios': axios,
        react: React,
        'react-dom': require('react-dom'),
        'react-router-dom': require('react-router-dom'),
        "@patternfly/react-core": require('@patternfly/react-core'),
        "@patternfly/react-table": require('@patternfly/react-table'),
        '@tanstack/react-query': RQ,
        "react-i18next": require('react-i18next'),
        "i18next": require('i18next'),
        "uuid": require('uuid'),
        "mqtt": require('mqtt'),
        "mqtt-react-hooks": require('mqtt-react-hooks')
    },
    remotes: {
        "dashboard-device": global.__DEV__ ? 'http://localhost:5005/dashboard-device' : `/dashboard-device?${timestamp}`,
        "dashboard-stack": global.__DEV__ ? 'http://localhost:5006/dashboard-stack' : `/dashboard-stack?${timestamp}`,
    },
}

export default config;