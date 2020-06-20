import React from 'react';
import ReactDom from 'react-dom';
import { initSheet } from '@artistry/abstract';

import './BaseStyles';
import Home from './views/Home';

let styleSheet = initSheet();

export default function main() {
    const root = document.getElementById('root');
    ReactDom.render(<Home />, root);
    styleSheet.attach();
}

main();
