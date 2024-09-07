/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM("<body><div id='app'></div></body>", {
  url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = window.Node;
global.history = jsdom.window.history;
global.MouseEvent = window.MouseEvent;
