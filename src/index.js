import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import reducer from "./store/reducer";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const oldata = JSON.parse(localStorage.getItem("PURANADATA"))
const store = createStore(reducer, oldata == null ? undefined : oldata)
store.subscribe(() => {
  console.log("mene sun liya")
  console.log("mene sun liya", store.getState())
  localStorage.setItem("PURANADATA", JSON.stringify(store.getState()))
})
root.render(
  <React.StrictMode>
    <Provider store={store}> <App />
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
