import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { client } from "./graphql/client.ts";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import { App } from "./App.tsx";
import { store } from "./redux/store";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
