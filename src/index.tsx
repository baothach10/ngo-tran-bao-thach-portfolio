import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App';
import { AssetLoaderProvider } from './context/AssetLoaderContext';
import { HeaderScrollProvider } from './context/HeaderShownByScrollContext';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    // <React.StrictMode>
    <HeaderScrollProvider>
        <AssetLoaderProvider><App /></AssetLoaderProvider>
    </HeaderScrollProvider>
    // </React.StrictMode>
);