/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM("<body><div id='app'></div></body>", {
  url: 'https://example.org/',
});

global.history = jsdom.window.history;
global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = window.MouseEvent;
