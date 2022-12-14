import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";

import DataTableManager from "@commercetools-uikit/data-table-manager";
import DataTable from "@commercetools-uikit/data-table";
import IconButton from "@commercetools-uikit/icon-button";
import {
    CheckInactiveIcon,
    EditIcon,
    CheckBoldIcon,
} from "@commercetools-uikit/icons";
import TextInput from "@commercetools-uikit/text-input";

import {
    useShowApiErrorNotification,
    useShowNotification,
} from "@commercetools-frontend/actions-global";

import { DOMAINS } from "@commercetools-frontend/constants";


import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";
import { fetchShoppingLists } from "./queries.graphql";
import {
    deleteShoppingList,
    updateShoppingListName,
} from "./mutations.graphql";

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;




const ShoppingLists = () => {
    const [updateVisibility, setUpdateVisibility] = useState({
        status: false,
        rowId: "",
        version: "",
        name: "",
    });
    const showApiErrorNotification = useShowApiErrorNotification();
    const showSuccessNotification = useShowNotification();
    const { error, data, loading } = useQuery(fetchShoppingLists, {
        context: { target },
    });
    const refetch = {
        // Then re-run
        refetchQueries: [{ query: fetchShoppingLists, context: { target } }],
    };
    const [updateShoppingList] = useMutation(updateShoppingListName, refetch);
    const [delShoppingList] = useMutation(deleteShoppingList, refetch);
    const cols = [
        {
            key: "id",
            label: "id",
            renderItem: (row) => (row?.id ?? ""),
        },
        {
            key: "version",
            label: "version",
            renderItem: (row) => (row?.version ?? ""),
        },
        {
            key: "name",
            label: "Name",
            renderItem: (row) => {
                if (updateVisibility.status && updateVisibility.rowId == row.id)
                    return (
                        <TextInput
                            value={updateVisibility.name}
                            onChange={(event) =>
                                setUpdateVisibility({
                                    ...updateVisibility,
                                    name: event.target.value,
                                })
                            }
                        />
                    );

                // return row?.nameAllLocales ? row?.nameAllLocales[0]?.value : "";
                return row?.nameAllLocales?.[0].value ?? "";
            },
        },
        {
            key: "actions",
            label: "Actions",
            renderItem: (row) => {
                const { version, id, nameAllLocales: [{ value: name, locale }] } = row;

                return (
                    <React.Fragment>
                        <IconButton
                            icon={<CheckInactiveIcon />}
                            label="Delete Record"
                            onClick={async (row) => {
                                const { error } = await delShoppingList({
                                    variables: {
                                        version,
                                        id,
                                    },
                                    context: { target },
                                });
                                if (error) showApiErrorNotification({ error: error });
                                showSuccessNotification({
                                    kind: "success",
                                    domain: DOMAINS.SIDE,
                                    text: "Shopping List Deleted Successfully",
                                });
                            }}
                        />
                        {updateVisibility.status ? (
                            updateVisibility.rowId == id ? (
                                <IconButton
                                    icon={<CheckBoldIcon />}
                                    label="Submit Edit Record"
                                    onClick={async (row) => {
                                        const { error } = await updateShoppingList({
                                            variables: {
                                                version,
                                                id,
                                                locale,
                                                value: updateVisibility.name,
                                            },
                                            context: { target },
                                        });
                                        if (error) showApiErrorNotification({ error: error });
                                        showSuccessNotification({
                                            kind: "success",
                                            domain: DOMAINS.SIDE,
                                            text: "Shopping List updated Successfully",
                                        });
                                        setUpdateVisibility({
                                            status: false,
                                            rowId: "",
                                            version: "",
                                            name: "",
                                        });
                                    }}
                                />
                            ) : (
                                ""
                            )
                        ) : (
                            <IconButton
                                icon={<EditIcon />}
                                label="Edit Record"
                                onClick={(row) =>
                                    setUpdateVisibility({
                                        status: true,
                                        rowId: id,
                                        version,
                                        name,
                                    })
                                }
                            />
                        )}
                    </React.Fragment>
                );
            },
        },
    ];

    if (loading) return "Loading...";
    if (error) return `---Error! ${error.message}`;

    return (
        <React.Fragment>
            <DataTableManager columns={cols}>
                <DataTable rows={data?.shoppingLists?.results} />
            </DataTableManager>
        </React.Fragment>
    );
};
ShoppingLists.displayName = "ShoppingLists";

export default ShoppingLists;
