import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { FormModalPage } from "@commercetools-frontend/application-components";
import Spacings from "@commercetools-uikit/spacings";
import Text from "@commercetools-uikit/text";
import TextField from "@commercetools-uikit/text-field";

import {
    useShowApiErrorNotification,
    useShowNotification,
} from "@commercetools-frontend/actions-global";

import { DOMAINS } from "@commercetools-frontend/constants";

import { GRAPHQL_TARGETS } from "@commercetools-frontend/constants";

import { fetchShoppingLists } from "./queries.graphql";
import { createShoppingList } from "./mutations.graphql";


const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;




const AddShoppingListPage = (props) => {
    const { push } = useHistory();
    const showApiErrorNotification = useShowApiErrorNotification();
    const showSuccessNotification = useShowNotification();
    const refetch = {
        // Then re-run
        refetchQueries: [{ query: fetchShoppingLists, context: { target } }],
    };
    const [saveShoppingList] = useMutation(createShoppingList, refetch);
    const formik = useFormik({
        initialValues: {
            locale: "",
            name: "",
        },
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values);
            resetForm({});
        },
        validateOnChange: false,
        validateOnBlur: false,
    });

    const handleSubmit = async (formValues) => {
        const { error } = await saveShoppingList({
            variables: {
                locale: formValues.locale,
                value: formValues.name,
            },
            context: { target },
        });
        if (error) showApiErrorNotification({ error: error });
        showSuccessNotification({
            kind: "success",
            domain: DOMAINS.SIDE,
            text: "Shopping List added Successfully",
        });
        push(props.linkToShoppingLists);
    };


    return (
        <React.Fragment>
            <FormModalPage
                title="Add Shopping List"
                isOpen={true}
                onClose={() => push(props.linkToShoppingLists)}
                subtitle={
                    <Text.Body>{"Add a Shopping list to your project"}</Text.Body>
                }
                topBarCurrentPathLabel="Add Shopping List"
                topBarPreviousPathLabel="Back"
                onSecondaryButtonClick={() => push(props.linkToShoppingLists)}
                onPrimaryButtonClick={formik.handleSubmit}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Spacings.Inline>
                        <TextField
                            id="locale"
                            title="Locale"
                            value={formik.values.locale}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id="name"
                            title="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </Spacings.Inline>
                </form>
            </FormModalPage>
        </React.Fragment>
    );
};
AddShoppingListPage.displayName = "AddShoppingListPage";

export default AddShoppingListPage;
