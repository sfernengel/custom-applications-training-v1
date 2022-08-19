import React, { useReducer, useEffect, useState } from "react";
import Text from "@commercetools-uikit/text";
// import { useShowApiErrorNotification } from "@commercetools-frontend/actions-global";
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from "@commercetools-uikit/spacings";
import PrimaryButton from "@commercetools-uikit/primary-button";

import { useExternalAPI } from '../../hooks/external-api-connector';

const externalApiUrl = "https://rickandmortyapi.com/api/character/2";
// const externalApiUrl = "https://app-kit-playground.vercel.app/api/echo";

const ExternalServer = () => {

    const { error, data, execute } = useExternalAPI({ externalApiUrl });


    if (error)
        return (
            <ContentNotification type="error">
                {" "}
                {`Message: ${error}`}{" "}
            </ContentNotification>
        );

    return (
        <Spacings.Stack scale="l" alignItems="flex-start">
            <Text.Headline as="h3">External fetch example</Text.Headline>
            <Text.Body>"Click on the button above to send a call to the External Server"</Text.Body>
            <PrimaryButton label="Call to External API" onClick={execute} />
            {data && <ContentNotification type={"success"}>
                {" "}
                {`Message: ${data.name}`}{" "}
            </ContentNotification>
            }
        </Spacings.Stack>
    );
};

export default ExternalServer;
