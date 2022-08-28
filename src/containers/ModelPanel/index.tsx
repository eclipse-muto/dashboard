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
import { Link, useLocation } from 'react-router-dom';

import {
    Button,
    ButtonVariant,
    DataList,
    DataListAction,
    DataListCell,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    Toolbar,
    ToolbarItem,
    ToolbarContent,
    ToolbarToggleGroup,
    ToolbarGroup,
    Divider,
    Drawer,
    DrawerActions,
    DrawerCloseButton,
    DrawerContent,
    DrawerContentBody,
    DrawerHead,
    DrawerPanelBody,
    DrawerPanelContent,
    Flex,
    FlexItem,
    InputGroup,
    PageSection,
    PageSectionVariants,
    Text,
    Title,
    DescriptionListGroup,
    DescriptionListTerm,
    DescriptionListDescription,
    DescriptionList,
    Card,
    CardTitle,
    CardBody,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    SearchInput,
    Modal,
    ModalVariant,
    Form,
    FormGroup,
    Popover,
    TextInput,
    AlertGroup,
    Alert,
} from '@patternfly/react-core';

import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon'
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import TimesCircleIcon from '@patternfly/react-icons/dist/esm/icons/times-circle-icon';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

import { useLazyQuery, useMutation } from '@apollo/client';
import { ACTIVATEMODEL, COMPAREMODELS, DEACTIVATEMODEL, DELETEMODELBYID, DIFFMODEL, GETMODELS, POSTMODEL } from '../../api/query/model';

import { Node, Model, Context } from '../../utils/types';
import { GETCONTEXTS } from '../../api/query/context';
import { uniqueId } from 'lodash';
import { InfoCircleIcon } from '@patternfly/react-icons';
import CustomHeader from '../../components/CustomHeader';

export interface NewModelFormProps {
    contextlist: Array<Context>,
}

const NewModelFormModal = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [contextValue, setContextValue] = useState("");
    const [nodeValue, setNodeValue] = useState("");

    const [statusIsExpanded, setstatusIsExpanded] = useState(false);

    const [getContexts, { data: contextList }] = useLazyQuery(GETCONTEXTS);


    const [postModel,] = useMutation(POSTMODEL,
        { refetchQueries: [GETMODELS] }
    );


    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
        getContexts()
    };

    const handleNodeInputChange = (value: string) => {
        setNodeValue(value);
    };

    const handlePostModel = () => {
        const nodes = nodeValue.split(",");
        postModel({ variables: { "context": contextValue, "nodes": nodes }, })
        setContextValue('')
        setNodeValue('')
    }


    const onActiveSelect = (event?: React.SyntheticEvent<HTMLDivElement, Event> | undefined) => {
        setstatusIsExpanded(!statusIsExpanded)
    };

    const onActiveToggle = (isExpanded: boolean) => {
        setstatusIsExpanded(isExpanded)
    };

    const contextDropdownItems = contextList?.context.map((c: Context) => (
        <DropdownItem key={uniqueId()}
            component="button"
            onClick={() => {
                alert(c.id)
            }
            }>
            {c.id}
        </DropdownItem>
    ));


    return (
        <React.Fragment>
            <Button variant="plain" aria-label="Action"
                onClick={handleModalToggle}
            >
                <PlusCircleIcon /> New Model
            </Button>
            <Modal
                variant={ModalVariant.small}
                title="Create model"
                description="Choose the context and specify the nodes to create a new model."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <Button key="create-button"
                        variant="primary"
                        form="modal-with-form-form"
                        onClick={() => {
                            handlePostModel()
                            handleModalToggle()
                        }}
                    >
                        Confirm
                    </Button>,
                    <Button key="cancel-button" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>
                ]}
            >
                <Form id="modal-with-form-form">

                    <FormGroup
                        label="Context"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        context
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        name of the context. this should match with an existing context.
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for name field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="modal-with-form-form-name"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign />

                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="modal-with-form-form-context">

                        <Dropdown
                            onSelect={onActiveSelect}
                            toggle={
                                <DropdownToggle
                                    id="context-toggle"
                                    onToggle={onActiveToggle}
                                    toggleIndicator={CaretDownIcon}>
                                    Context
                                </DropdownToggle>
                            }
                            isOpen={statusIsExpanded}
                            dropdownItems={contextDropdownItems}
                            menuAppendTo="parent"
                        />

                    </FormGroup>

                    <FormGroup
                        label="Nodes"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        node names
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        list the node names that you want to see in this model. seperate with comma.
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for e-mail field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="modal-with-form-form-email"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign />
                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="modal-with-form-form-email">
                        <TextInput
                            isRequired
                            type="email"
                            id="modal-with-form-form-email"
                            name="modal-with-form-form-email"
                            value={nodeValue}
                            onChange={handleNodeInputChange}
                        />
                    </FormGroup>
                </Form>
            </Modal>

        </React.Fragment>
    );
}

const CompareModelsFormModal: React.FunctionComponent<{ models?: Model[] }> = ({ models }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modelFirst, setModelFirst] = useState("");
    const [modelFirstId, setModelFirstId] = useState("");
    const [modelSecond, setModelSecond] = useState("");
    const [modelSecondId, setModelSecondId] = useState("");

    const [modelsIsExpanded, setmodelsIsExpanded] = useState(false);
    const [modelsIsExpandedSecond, setmodelsIsExpandedSecond] = useState(false);

    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };

    const onActiveSelect = (event?: React.SyntheticEvent<HTMLDivElement, Event> | undefined) => {
        setmodelsIsExpanded(!modelsIsExpanded)
    };

    const onActiveToggle = (isExpanded: boolean) => {
        setmodelsIsExpanded(isExpanded)
    };
    const onActiveSelectSecond = (event?: React.SyntheticEvent<HTMLDivElement, Event> | undefined) => {
        setmodelsIsExpandedSecond(!modelsIsExpandedSecond)
    };

    const onActiveToggleSecond = (isExpanded: boolean) => {
        setmodelsIsExpandedSecond(isExpanded)
    };

    const modelFirstDropdownItems = models?.map((m: Model) => (
        <DropdownItem key={uniqueId()}
            component="button"
            onClick={() => {
                setModelFirst(m.name ? m.name : "")
                setModelFirstId(m.id)
            }
            }>
            {m.name}
        </DropdownItem>
    ));

    const modelSecondDropdownItems = models?.map((m: Model) => (
        <DropdownItem key={uniqueId()}
            component="button"
            onClick={() => {
                setModelSecond(m.name ? m.name : "")
                setModelSecondId(m.id)
            }
            }>
            {m.name}
        </DropdownItem>
    ));


    return (
        <React.Fragment>
            <Button variant="plain" aria-label="Action"
                onClick={() => {
                    handleModalToggle()
                }}
            >
                <InfoCircleIcon /> Compare Models
            </Button>
            <Modal
                variant={ModalVariant.small}
                title="Compare Models"
                description="Choose two models to see the difference between."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                    <DiffModal id={modelFirstId} idSecond={modelSecondId} />,
                    // <Button key="create"
                    //     variant="primary"
                    //     form="modal-with-form-form"
                    //     onClick={() => {
                    //         handleModalToggle()
                    //     }}
                    // >
                    //     Compare
                    // </Button>,
                    <Button key="cancel" variant="link" onClick={handleModalToggle}>
                        Cancel
                    </Button>
                ]}
            >
                <Form id="modal-with-form-form">

                    <FormGroup
                        label="First Model"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        model-1
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        Choose the first model that you want to compare.
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for name field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="modal-with-form-form-name"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign />

                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="modal-with-form-form-model1">

                        <Dropdown
                            onSelect={onActiveSelect}
                            toggle={
                                <DropdownToggle
                                    id="context-toggle"
                                    onToggle={onActiveToggle}
                                    toggleIndicator={CaretDownIcon}>
                                    {modelFirst ? modelFirst : "Model 1"}
                                </DropdownToggle>
                            }
                            isOpen={modelsIsExpanded}
                            dropdownItems={modelFirstDropdownItems}
                            menuAppendTo="parent"
                        />

                    </FormGroup>
                    <FormGroup
                        label="Second Model"
                        labelIcon={
                            <Popover
                                headerContent={
                                    <div>
                                        model-2
                                    </div>
                                }
                                bodyContent={
                                    <div>
                                        Choose the second model that you want to compare.
                                    </div>
                                }
                            >
                                <button
                                    type="button"
                                    aria-label="More info for name field"
                                    onClick={e => e.preventDefault()}
                                    aria-describedby="modal-with-form-form-name"
                                    className="pf-c-form__group-label-help"
                                >
                                    <HelpIcon noVerticalAlign />

                                </button>
                            </Popover>
                        }
                        isRequired
                        fieldId="modal-with-form-form-model2">

                        <Dropdown
                            onSelect={onActiveSelectSecond}
                            toggle={
                                <DropdownToggle
                                    id="context-toggle"
                                    onToggle={onActiveToggleSecond}
                                    toggleIndicator={CaretDownIcon}>
                                    {modelSecond ? modelSecond : "Model 2"}
                                </DropdownToggle>
                            }
                            isOpen={modelsIsExpandedSecond}
                            dropdownItems={modelSecondDropdownItems}
                            menuAppendTo="parent"
                        />

                    </FormGroup>
                </Form>
            </Modal>

        </React.Fragment>
    );
}

const DiffModal: React.FunctionComponent<{ id?: string, idSecond?: string }> = ({ id, idSecond }) => {
    const [getDiff, { data: diff }] = useLazyQuery(DIFFMODEL);
    const [getComparison, { data: comparison }] = useLazyQuery(COMPAREMODELS);

    const [isDiffModalOpen, setisDiffModalOpen] = useState(false); //model diff modal

    const handleCompareModalToggle = () => {
        setisDiffModalOpen(!isDiffModalOpen);
    };

    return (

        <>
            {!idSecond ?
                <Button variant="secondary" key="compare-model-with-active"
                    onClick={() => {
                        getDiff({
                            variables: { "id": id },
                        }).then(() => handleCompareModalToggle())

                    }}
                >Diff w/ Active</Button>
                :
                <Button variant="secondary" key="compare-two-models"
                    onClick={() => {
                        getComparison({
                            variables: { "firstId": id, "secondId": idSecond },
                        }).then(() => handleCompareModalToggle())
                        console.log(id)
                        console.log(idSecond)

                    }}
                >Compare</Button>


            }

            <Modal
                variant={ModalVariant.small}
                title="Model Diff"
                description="Compares the chosen model with the current running model."
                isOpen={isDiffModalOpen}
                onClose={handleCompareModalToggle}
            >
                {
                    idSecond ?
                        <ul key="diff-list-comparison">
                            <li key="first-model-id" > <b>First Model:</b> {comparison?.comparison?.from_model_id} </li>
                            <li key="second-model-id" ><b>Second Model:</b> {comparison?.comparison?.to_model_id} </li>
                            {comparison?.comparison?.info &&
                                <li key="model-comparison-info" ><b>Info:</b> {comparison?.comparison?.info} </li>}

                            {comparison?.comparison?.common_nodes?.length > 0 &&
                                <li key="common-nodes-list-title"><b> Common Nodes</b>
                                    <ol key="common-nodes-list">
                                        {comparison?.comparison?.common_nodes.map((node: string) => (
                                            <li key={uniqueId()}>{node}</li>
                                        ))}
                                    </ol>
                                </li>
                            }
                            {comparison?.comparison?.different_nodes?.length > 0 &&
                                <li key="comparison-different-nodes" ><b>Different Nodes</b>
                                    <ol key="start-new-nodes-list" >
                                        {comparison?.comparison?.different_nodes.map((node: string) => (
                                            <li key={uniqueId()}>{node}</li>
                                        ))}
                                    </ol>
                                </li>
                            }
                        </ul>
                        :
                        <ul key="diff-list">
                            <li key="active-model-id" > <b>Active Model:</b> {diff?.diff?.active_model} </li>
                            <li key="new-model-to-compare-id" ><b>Compared Model:</b> {diff?.diff?.new_model} </li>

                            {diff?.diff?.common_nodes?.length > 0 &&
                                <li key="common-nodes-list-title"> Common Nodes
                                    <ol key="common-nodes-list">
                                        {diff?.diff?.common_nodes.map((node: Node) => (
                                            <li key={uniqueId()}>{node.name}</li>
                                        ))}
                                    </ol>
                                </li>
                            }
                            {diff?.diff?.nodes_to_start?.length > 0 &&
                                <li key="start-new-nodes-list-title" ><b>Nodes that needs to be started</b>
                                    <ol key="start-new-nodes-list" >
                                        {diff?.diff?.nodes_to_start.map((node: string) => (
                                            <li key={uniqueId()}>{node}</li>
                                        ))}
                                    </ol>
                                </li>
                            }

                            {diff?.diff?.nodes_to_stop?.length > 0 &&
                                <li key="stop-nodes-list-title" > <b>Nodes that needs to be stopped</b>
                                    <ol key="stop-nodes-list" >
                                        {diff?.diff?.nodes_to_stop.map((node: string) => (
                                            <li key={uniqueId()} >{node}</li>
                                        ))}
                                    </ol>
                                </li>
                            }

                            {diff?.diff?.info &&
                                <li key="diff-info-text-li"> <b>Info:</b>  {diff?.diff?.info}</li>
                            }
                        </ul>
                }

            </Modal>
        </>
    )
}

const ModelPanel: React.FunctionComponent = () => {

    const location = useLocation();

    const [getModels, { data: modelsList }] = useLazyQuery(GETMODELS);
    const [deactivateModel,] = useMutation(DEACTIVATEMODEL, {
        variables: { "command": "shutdown" },
    });

    const [activateModel,] = useMutation(ACTIVATEMODEL,);

    const [isActive, setisActive] = useState(false)
    const [models, setModels] = useState<Model[]>()

    const [deleteModelById,] = useMutation(DELETEMODELBYID,
        { refetchQueries: [GETMODELS] }
    );

    const [isDrawerExpanded, setisDrawerExpanded] = useState(false);
    const [drawerPanelBodyContent, setdrawerPanelBodyContent] = useState(0);
    const [inputValue, setinputValue] = useState('');
    const [selectedDataListItemId, setselectedDataListItemId] = useState('');
    const [drawerPanelBodyContentModel, setdrawerPanelBodyContentModel] = useState<Model>();

    const [statusIsExpanded, setstatusIsExpanded] = useState(false);

    const [alerts, setAlerts] = React.useState<React.ReactNode[]>([]);
    const showAlert = (title: string) => {
        const timeout = 5000;
        setAlerts(prevAlerts => {
            return [...prevAlerts,
            <Alert title={title} timeout={timeout} >
                This alert will dismiss in {`${timeout / 1000} seconds`}
            </Alert>
            ]
        });
    }

    React.useEffect(() => {

        getModels().then(() => {
            if (modelsList) {
                console.log(modelsList)
                setModels(modelsList?.model.slice(0).reverse())
            }
        })

    }, [location, isActive, modelsList, getModels])


    const onCloseDrawerClick = () => {
        setisDrawerExpanded(false)
        setselectedDataListItemId('')
    };

    const onSelectDataListItem = (id: string) => {
        setisDrawerExpanded(true)
        setselectedDataListItemId(id)
        console.log(id)
        setdrawerPanelBodyContent(parseInt(id))
        setdrawerPanelBodyContentModel(modelsList?.model?.slice(0).reverse()[drawerPanelBodyContent])

    };

    const onInputChange = (newValue: string) => {
        setinputValue(newValue)
        searchByKeyword(newValue)
    };

    const searchByKeyword = (newValue: string) => {
        if (inputValue === '') {
            setModels(modelsList?.model?.slice().reverse())
            return
        }
        const filteredModels = modelsList?.model.filter((m: Model) => m.context.description.includes(newValue))
        setModels(filteredModels.reverse())
        console.log(models)
    }

    const onActiveToggle = (isExpanded: boolean) => {
        setstatusIsExpanded(isExpanded)
    };

    const onActiveSelect = (event?: React.SyntheticEvent<HTMLDivElement, Event> | undefined) => {
        setstatusIsExpanded(!statusIsExpanded)
    };

    const filterByStatus = (state: string) => {
        const filteredModels = modelsList?.model.filter((m: Model) => m.state === state)
        setModels(filteredModels.reverse())
        console.log(models)
    }

    const statusDropdownItems = [
        <DropdownItem key="action-4" component="button" onClick={() => { filterByStatus("active") }}>
            Active
        </DropdownItem>,
        <DropdownItem key="action-5" component="button" onClick={() => { filterByStatus("inactive") }}>
            Inactive
        </DropdownItem>
    ];

    const panelContent = (

        <DrawerPanelContent>
            <DrawerHead>
                <Title headingLevel="h2" size="xl">
                    MODEL-{drawerPanelBodyContent}
                </Title>
                <DrawerActions>
                    <DrawerCloseButton onClick={onCloseDrawerClick} />
                </DrawerActions>
            </DrawerHead>
            <DrawerPanelBody>
                <Flex spaceItems={{ default: 'spaceItemsLg' }} direction={{ default: 'column' }}>
                    <FlexItem>
                        <p>
                            <b>Description:</b> {drawerPanelBodyContentModel?.context.description}
                        </p>

                    </FlexItem>
                    <FlexItem>
                        <Card>
                            <CardTitle>Nodes</CardTitle>
                            <CardBody>
                                <DescriptionList>
                                    <DescriptionListGroup>
                                        <DescriptionListTerm>List of nodes</DescriptionListTerm>
                                        {drawerPanelBodyContentModel?.nodes?.map((x: Node, i: number) => (
                                            <>
                                                <DescriptionListDescription key={uniqueId()}> {i + 1}-{x.name} : <i>{x.health}</i></DescriptionListDescription>
                                            </>
                                        ))}
                                    </DescriptionListGroup>
                                </DescriptionList>
                            </CardBody>
                        </Card>
                    </FlexItem>

                    <FlexItem>
                        <Card>
                            <CardTitle>Features</CardTitle>
                            <CardBody>
                                <DescriptionList>
                                    <DescriptionListGroup>
                                        <DescriptionListTerm>Context Feature Set</DescriptionListTerm>
                                        <>

                                            <DescriptionListDescription key={uniqueId()}> f_b: <i>{drawerPanelBodyContentModel?.context?.feature_set.f_b} </i></DescriptionListDescription>
                                            <DescriptionListDescription key={uniqueId()}> f_c: <i>{drawerPanelBodyContentModel?.context?.feature_set.f_c} </i></DescriptionListDescription>
                                            <DescriptionListDescription key={uniqueId()}> f_d: <i>{drawerPanelBodyContentModel?.context?.feature_set.f_d} </i></DescriptionListDescription>
                                            <DescriptionListDescription key={uniqueId()}> f_e: <i>{drawerPanelBodyContentModel?.context?.feature_set.f_e} </i></DescriptionListDescription>
                                        </>
                                    </DescriptionListGroup>
                                </DescriptionList>
                            </CardBody>
                        </Card>
                    </FlexItem>
                </Flex>
            </DrawerPanelBody>
        </DrawerPanelContent>

    );

    const toggleGroupItems = (
        <React.Fragment>
            <ToolbarItem>
                <InputGroup>
                    <SearchInput
                        name="full-page-data-toolbar-input1"
                        id="full-page-data-toolbar-input1"
                        type="search"
                        aria-label="search input example"
                        onChange={onInputChange}
                        value={inputValue}
                        placeholder="Find by description"
                    />
                </InputGroup>
            </ToolbarItem>
            <ToolbarGroup variant="filter-group">
                <ToolbarItem>
                    <Dropdown
                        onSelect={onActiveSelect}
                        toggle={
                            <DropdownToggle id="status-toggle" onToggle={onActiveToggle}>
                                Status
                            </DropdownToggle>
                        }
                        isOpen={statusIsExpanded}
                        dropdownItems={statusDropdownItems}
                    />

                </ToolbarItem>
            </ToolbarGroup>
            <ToolbarItem>

                <NewModelFormModal />
                <CompareModelsFormModal models={models} />

            </ToolbarItem>
        </React.Fragment>
    );
    const ToolbarItems = (
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            {toggleGroupItems}
        </ToolbarToggleGroup>
    );

    const drawerContent = (
        <React.Fragment>
            <Toolbar id="full-page-data-toolbar" className="pf-m-page-insets">
                <ToolbarContent>{ToolbarItems}</ToolbarContent>
            </Toolbar>

            {!!models && models.length > 0 ?

                <DataList
                    aria-label="data list"
                    selectedDataListItemId={selectedDataListItemId}
                    onSelectDataListItem={onSelectDataListItem}
                >
                    {/* {modelsList?.model?.length > 0 && modelsList?.model?.map((m: Model, i: string) => { */}

                    {!!models && models?.map((m: Model, i: number) => {

                        // const activeNodeCount = modelsList?.model.filter((m: Model) => m.context.description.includes(newValue))
                        const activeNodeCount = m.nodes.filter((n: Node) => n.health === 'alive').length
                        const inactiveNodeCount = m.nodes.filter((n: Node) => n.health === 'dead').length
                        const riskyNodeCount = m.nodes.filter((n: Node) => n.health === 'risky').length

                        return (

                            <DataListItem id={i.toString()} key={i.toString()}>

                                <DataListItemRow>
                                    <DataListItemCells
                                        dataListCells={[
                                            <DataListCell key={uniqueId()}>
                                                <Flex direction={{ default: 'column' }}>
                                                    <FlexItem>
                                                        <p>{m.name}</p>
                                                        <small>{m.context.description}</small>
                                                    </FlexItem>
                                                    <FlexItem>
                                                        {/* <Text>keywords: */}
                                                        {m.context?.keywords?.map((k: string) =>
                                                        (<div className="pf-c-chip">
                                                            <span className="pf-c-chip__text">{k}</span>
                                                        </div>)
                                                        )}
                                                        {/* </Text> */}
                                                        <Text> <b>context: </b>
                                                            <Link
                                                                to={{
                                                                    pathname: "/context/byname",
                                                                    state: { fromContextId: m.context?.id }
                                                                }}
                                                            >
                                                                {m.context?.id}
                                                            </Link>

                                                        </Text>
                                                    </FlexItem>
                                                    <Flex>
                                                        <FlexItem>
                                                            <CheckCircleIcon /> {activeNodeCount}
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <ExclamationTriangleIcon /> {riskyNodeCount}
                                                        </FlexItem>
                                                        <FlexItem>
                                                            <TimesCircleIcon /> {inactiveNodeCount}
                                                        </FlexItem>
                                                        <FlexItem>{m.state}</FlexItem>
                                                    </Flex>
                                                </Flex>
                                            </DataListCell>,
                                            <DataListAction
                                                aria-label='actions'
                                                aria-labelledby='check-action-item2 check-action-action2'
                                                id='check-action-action2'
                                                key={uniqueId()}>
                                                {m.state === 'inactive' ?
                                                    <>
                                                        <Button variant={ButtonVariant.secondary}
                                                            onClick={() => {
                                                                activateModel({ variables: { "command": "start", "id": m.id }, }).then(() => {
                                                                    setisActive(!isActive)
                                                                    showAlert("model activated")
                                                                })
                                                            }}
                                                        >Activate</Button>
                                                        <DiffModal id={m.id} />
                                                    </>

                                                    :
                                                    <Button variant={ButtonVariant.secondary}
                                                        isDanger
                                                        onClick={() => {
                                                            deactivateModel().then(() => {
                                                                setisActive(!isActive)
                                                                showAlert("model deactivated")
                                                            })
                                                        }
                                                        }>Deactivate</Button>

                                                }

                                                <Button variant="secondary" isDanger key="delete-model"
                                                    onClick={() => {
                                                        deleteModelById({ variables: { id: m.id } }).then(() =>
                                                            showAlert("model deleted")
                                                        )
                                                    }
                                                    }
                                                >Delete</Button>

                                            </DataListAction>
                                        ]}
                                    />
                                </DataListItemRow>
                            </DataListItem>
                        )
                    }
                    )
                    }
                </DataList>
                :
                <PageSection>
                    <EmptyState>
                        <EmptyStateIcon icon={SearchIcon} />
                        <Title headingLevel="h4" size="lg">
                            No results found
                        </Title>
                        <EmptyStateBody>
                            No results match the filter criteria. Clear your entry and try again.
                        </EmptyStateBody>
                    </EmptyState>
                </PageSection>
            }
        </React.Fragment>
    );

    return (
        <>
            <CustomHeader title="Model Panel" description="This page lists all the models available and their detailed info."
                banner={
                    <AlertGroup isLiveRegion>
                        {alerts}
                    </AlertGroup>
                }
            />
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.light} padding={{ default: 'noPadding' }}></PageSection>
            <Divider component="div" />

            <PageSection variant={PageSectionVariants.light} padding={{ default: 'noPadding' }}>
                <Drawer isExpanded={isDrawerExpanded}>
                    <DrawerContent panelContent={panelContent} >
                        <DrawerContentBody>{drawerContent}</DrawerContentBody>
                    </DrawerContent>
                </Drawer>
            </PageSection>

        </>);
}
export default ModelPanel;