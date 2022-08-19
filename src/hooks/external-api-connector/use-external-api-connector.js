import { useState } from "react";
import { actions, useAsyncDispatch } from "@commercetools-frontend/sdk";

export const useExternalAPI = ({ externalApiUrl }) => {
    // The asyncDispatch is a wrapper around the redux dispatch and provides
    // the correct return type definitions because the action resolves to a Promise.
    const asyncDispatch = useAsyncDispatch();
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = () => {
        asyncDispatch(actions.forwardTo.get({ uri: externalApiUrl }))
            .then(setData)
            .catch(setError)

    };

    return {
        error,
        data,
        execute
    }

};
