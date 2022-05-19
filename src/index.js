import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Amplify from "aws-amplify";
import store from "./state/store";
import * as AWS from 'aws-sdk';

//Amplify Cognito
Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: process.env["REACT_APP_REGION"],
        userPoolId: process.env["REACT_APP_USER_POOL_ID"],
        userPoolWebClientId: process.env["REACT_APP_APP_CLIENT_ID"],
    },
});

// AWS connection
const configuration = {
    region: process.env["REACT_APP_REGION"],
    secretAccessKey: process.env["REACT_APP_SECRET_ACCESS_KEY"],
    accessKeyId: process.env["REACT_APP_ACCESS_KEY_ID"]
}
AWS.config.update(configuration)

// persistor
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
