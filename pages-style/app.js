/**
 * PAGES STYLE — APP.JS
 * Dynamic Rendering and Navigation
 */

(function () {
  'use strict';

  // Crisp 40x40 SVG Icons
  const ICONS = {
    // Navigation & General Icons
    globe: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M20,3C10.6,3,3,10.6,3,20s7.6,17,17,17s17-7.6,17-17S29.4,3,20,3z M34.8,18.9h-6.2c-0.1-2.2-0.3-4.2-0.8-6.1 c1.5-0.4,3-0.9,4.2-1.5c0.6,0.9,1.2,1.8,1.6,2.9C34.3,15.7,34.7,17.3,34.8,18.9z M25.7,26.7c-1.5-0.3-3.1-0.4-4.6-0.5v-5.1h5.4 c-0.1,1.8-0.3,3.5-0.6,5.1C25.8,26.3,25.8,26.5,25.7,26.7z M14.2,26.2c-0.3-1.6-0.6-3.3-0.6-5.1h5.4v5.1c-1.6,0-3.2,0.2-4.6,0.5 C14.2,26.5,14.2,26.3,14.2,26.2z M14.3,13.3c1.5,0.3,3.1,0.4,4.6,0.5v5.1h-5.4c0.1-1.8,0.3-3.5,0.6-5.1 C14.2,13.7,14.2,13.5,14.3,13.3z M21.1,5.4C21.4,5.6,21.7,5.7,22,6c0.8,0.7,1.6,1.7,2.2,3c0.4,0.7,0.7,1.5,0.9,2.3 c-1.3,0.2-2.7,0.4-4,0.4V5.4z M18,6c0.3-0.3,0.6-0.4,0.9-0.6v6.2c-1.4,0-2.8-0.2-4-0.4c0.3-0.8,0.6-1.6,0.9-2.3 C16.5,7.7,17.2,6.7,18,6z M18.9,28.4v6.2c-0.3-0.1-0.6-0.3-0.9-0.6c-0.8-0.7-1.6-1.7-2.2-3c-0.4-0.7-0.7-1.5-0.9-2.3 C16.2,28.6,17.5,28.4,18.9,28.4z M22,34c-0.3,0.3-0.6,0.4-0.9,0.6v-6.2c1.4,0,2.8,0.2,4,0.4c-0.3,0.8-0.6,1.6-0.9,2.3 C23.5,32.3,22.8,33.3,22,34z M21.1,18.9v-5.1c1.6,0,3.2-0.2,4.6-0.5c0,0.2,0.1,0.4,0.1,0.5c0.3,1.6,0.6,3.3,0.6,5.1H21.1z M30.5,9.5 c0,0,0.1,0.1,0.1,0.1c-1,0.4-2.2,0.8-3.4,1.1c-0.6-1.9-1.4-3.5-2.4-4.8c0.3,0.1,0.6,0.2,0.9,0.3C27.5,7.1,29.1,8.1,30.5,9.5z M14.2,6.3c0.3-0.1,0.6-0.2,0.9-0.3c-0.9,1.3-1.7,2.9-2.4,4.8c-1.2-0.3-2.3-0.7-3.4-1.1c0,0,0.1-0.1,0.1-0.1 C10.9,8.1,12.5,7.1,14.2,6.3z M7.9,11.4c1.3,0.6,2.7,1.1,4.2,1.5c-0.4,1.9-0.7,3.9-0.8,6.1H5.2c0.1-1.6,0.5-3.2,1.1-4.7 C6.8,13.2,7.3,12.3,7.9,11.4z M5.2,21.1h6.2c0.1,2.2,0.3,4.2,0.8,6.1c-1.5,0.4-3,0.9-4.2,1.5c-0.6-0.9-1.2-1.8-1.6-2.9 C5.7,24.3,5.3,22.7,5.2,21.1z M9.5,30.5c0,0-0.1-0.1-0.1-0.1c1-0.4,2.2-0.8,3.4-1.1c0.6,1.9,1.4,3.5,2.4,4.8 c-0.3-0.1-0.6-0.2-0.9-0.3C12.5,32.9,10.9,31.9,9.5,30.5z M25.8,33.7c-0.3,0.1-0.6,0.2-0.9,0.3c0.9-1.3,1.7-2.9,2.4-4.8 c1.2,0.3,2.3,0.7,3.4,1.1c0,0-0.1,0.1-0.1,0.1C29.1,31.9,27.5,32.9,25.8,33.7z M32.1,28.6c-1.3-0.6-2.7-1.1-4.2-1.5 c0.4-1.9,0.7-3.9,0.8-6.1h6.2c-0.1,1.6-0.5,3.2-1.1,4.7C33.2,26.8,32.7,27.7,32.1,28.6z"/></svg>',
    user: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M31.6,36.5H8.4c-1.7,0-3.1-1.4-3.1-3.1v-4.6c0-3.8,1.8-6.9,5.2-9c1.1-0.7,2.4-1.2,3.8-1.6 c-0.8-0.7-1.5-1.5-2-2.4c-0.8-1.3-1.2-2.9-1.2-4.4c0-4.9,4-8.9,8.9-8.9s8.9,4,8.9,8.9c0,1.6-0.4,3.1-1.2,4.4c-0.5,0.9-1.2,1.7-2,2.4 c1.4,0.4,2.7,1,3.8,1.6c3.4,2,5.2,5.1,5.2,9v4.6C34.7,35.1,33.3,36.5,31.6,36.5z M20,5.4c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6 S23.3,5.4,20,5.4z M8.2,28.8v4.6c0,0.1,0.1,0.2,0.2,0.2h23.2c0.1,0,0.2-0.1,0.2-0.2v-4.6c0-3-1.4-5.2-4.2-6.7 c-2-1.1-4.9-1.8-7.7-1.8C15.6,20.3,8.2,22.1,8.2,28.8z"/></svg>',
    info: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M26.1,34.7c.6,0,1,.5,1,1v1.5c0,.6-.5,1-1,1h-12.2c-.6,0-1-.5-1-1v-1.5c0-.6.5-1,1-1h1.5V16h-1.5c-.6,0-1-.5-1-1v-.5c0-.6.5-1,1-1h12.2c.6,0,1,.5,1,1v.5c0,.6-.5,1-1,1h-1.5v18.8h1.5ZM23,9.8h-6.1c-.8,0-1.5-.7-1.5-1.5V3.2c0-.8.7-1.5,1.5-1.5h6.1c.8,0,1.5.7,1.5,1.5v5.1c0,.8-.7,1.5-1.5,1.5Z"/></svg>',
    check: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M2.6,20.8l1.5-1.5c0.2-0.2,0.5-0.2,0.7,0l11,11l21-21c0.2-0.2,0.5-0.2,0.7,0l1.5,1.5c0.2,0.2,0.2,0.5,0,0.7L15.8,34.7 L2.6,21.5C2.4,21.3,2.4,21,2.6,20.8z"/></svg>',
    copy: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M36.3,35.5H12.9c-1.1,0-2-0.9-2-2v-6.2H4.7c-1.1,0-2-0.9-2-2V7.5c0-1.1,0.9-2,2-2h23.4c1.1,0,2,0.9,2,2v6.2h6.2 c1.1,0,2,0.9,2,2v17.8C38.3,34.6,37.4,35.5,36.3,35.5z M27.9,8.6c0-0.4-0.3-0.7-0.7-0.7H5.6c-0.4,0-0.7,0.3-0.7,0.7v15.6 c0,0.4,0.3,0.7,0.7,0.7h5.3v-9.2c0-1.1,0.9-2,2-2h14.9V8.6z M36.1,16.8c0-0.4-0.3-0.7-0.7-0.7l-21.5,0c-0.4,0-0.7,0.3-0.7,0.7 l0,15.6c0,0.4,0.3,0.7,0.7,0.7h21.5c0.4,0,0.7-0.3,0.7-0.7V16.8z"/></svg>',
    mail: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M37.5,12.6l-17.5,11.9L2.5,12.6c-.2-.1-.3-.2-.5-.2v-2.7c0-.8.6-1.4,1.4-1.4h33.1c.8,0,1.4.6,1.4,1.4v2.7c-.2,0-.4,0-.5.2ZM19.5,26.3c.2.1.3.2.5.2s.4,0,.5-.2l17.5-11.9v16.9c0,.8-.6,1.4-1.4,1.4H3.4c-.8,0-1.4-.6-1.4-1.4V14.4l17.5,11.9Z"/></svg>',
    cart: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M13,32.1c-0.5-0.5-1.1-0.7-1.9-0.7s-1.4,0.2-1.9,0.7c-0.5,0.5-0.7,1.1-0.7,1.9c0,0.7,0.2,1.4,0.7,1.9 c0.5,0.5,1.1,0.7,1.9,0.7s1.4-0.2,1.9-0.7c0.5-0.5,0.7-1.1,0.7-1.9S13.5,32.6,13,32.1z M31.2,32.1c-0.5-0.5-1-0.7-1.8-0.7 s-1.4,0.2-1.9,0.7c-0.5,0.5-0.7,1.1-0.7,1.9c0,0.7,0.2,1.4,0.7,1.9s1.1,0.7,1.9,0.7s1.4-0.2,1.9-0.7c0.5-0.5,0.7-1.1,0.7-1.9 S31.7,32.6,31.2,32.1z M34.2,9.8c-0.2-0.2-0.5-0.4-0.9-0.4H8.9c0-0.1,0-0.3-0.1-0.5c0-0.3-0.1-0.5-0.1-0.6c0-0.1-0.1-0.3-0.2-0.5 c0-0.2-0.1-0.4-0.2-0.5C8.1,7.1,8,7,7.8,6.9C7.6,6.8,7.4,6.8,7.2,6.8H2c-0.3,0-0.6,0.1-0.9,0.4C0.7,7.6,0.7,7.8,0.7,8.1 c0,0.3,0.1,0.6,0.4,0.9s0.5,0.4,0.9,0.4h4.2l3.5,17.8c0,0.1-0.1,0.3-0.3,0.6c-0.2,0.3-0.3,0.6-0.4,0.8c-0.1,0.2-0.2,0.4-0.3,0.7 c-0.1,0.3-0.2,0.5-0.2,0.6c0,0.3,0.1,0.6,0.4,0.9c0.2,0.2,0.5,0.4,0.9,0.4h20.9c0.3,0,0.6-0.1,0.9-0.4c0.2-0.2,0.4-0.5,0.4-0.9 c0-0.4-0.1-0.6-0.4-0.9c-0.2-0.2-0.5-0.4-0.9-0.4H12.1c0.3-0.6,0.5-1,0.5-1.4c0-0.1-0.1-0.6-0.3-1.5l21.3-2.5c0.3,0,0.6-0.2,0.8-0.4 c0.2-0.2,0.3-0.5,0.3-0.8V10.7C34.7,10.4,34.5,10.1,34.2,9.8z"/></svg>',
    cancel: '<svg viewBox="0 0 40 40" width="13" height="13" fill="currentColor"><path d="M7.6,30.5l10.3-10.3L7.6,9.9c-0.2-0.2-0.2-0.5,0-0.7L9,7.8c0.2-0.2,0.5-0.2,0.7,0L20,18L30.3,7.8c0.2-0.2,0.5-0.2,0.7,0 l1.4,1.4c0.2,0.2,0.2,0.5,0,0.7L22.2,20.2l10.3,10.3c0.2,0.2,0.2,0.5,0,0.7L31,32.6c-0.2,0.2-0.5,0.2-0.7,0L20,22.4L9.7,32.6 c-0.2,0.2-0.5,0.2-0.7,0l-1.5-1.5C7.4,31,7.4,30.6,7.6,30.5z"/></svg>',
    upload: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M2.7,35.4v-2.2c0-.5.4-1,1-1h32.7c.5,0,1,.4,1,1v2.2c0,.5-.4,1-1,1H3.7c-.5,0-1-.4-1-1ZM16.9,5.4l2.3-2.3c.4-.4,1-.4,1.4,0l2.3,2.3h0l10.1,10.1c.4.4.4,1,0,1.4l-2.3,2.3c-.4.4-1,.4-1.4,0l-6.7-6.7v15.4c0,.6-.5,1-1,1h-3.2c-.6,0-1-.5-1-1v-15.4l-6.8,6.8c-.4.4-1,.4-1.4,0l-2.3-2.3c-.4-.4-.4-1,0-1.4l10-10.2h0Z"/></svg>',
    folder: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M14.6,9.5l3.2,3.3h17.9c1.2,0,2.1,0.9,2.1,2.1v17.4c0,1.2-0.9,2.1-2.1,2.1H4.3c-1.2,0-2.1-0.9-2.1-2.1V7.7 c0-1.2,0.9-2.1,2.1-2.1h7.1C12.5,5.6,13.8,7.1,14.6,9.5z M34.6,16H16.2l-3.2-3.3H4.3v17.4h30.3V16z"/></svg>',
    feed: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M20,3C10.6,3,3,10.6,3,20s7.6,17,17,17s17-7.6,17-17S29.4,3,20,3z M13,29.3c-1.3,0-2.3-1-2.3-2.3c0-1.3,1-2.3,2.3-2.3 s2.3,1,2.3,2.3C15.3,28.3,14.3,29.3,13,29.3z M20.9,29.3c0-2.8-1.1-5.3-3.1-7.3c-2-2-4.5-3.1-7.3-3.1v-3.7 c3.8,0,7.3,1.5,10,4.1c2.7,2.7,4.1,6.2,4.1,10H20.9z M28.2,29.3c0-4.8-1.9-9.2-5.3-12.6C19.5,13.3,15.1,11.4,10.3,11.4V7.7 c5.8,0,11.1,2.3,15.2,6.4c4.1,4.1,6.4,9.4,6.4,15.2H28.2z"/></svg>',
    pin: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M20,3.4c-6.5,0-11.7,5.2-11.7,11.7c0,5.7,8.2,16.5,10.3,19.2c0.7,0.9,2.1,0.9,2.8,0 c2.1-2.7,10.3-13.5,10.3-19.2C31.7,8.7,26.5,3.4,20,3.4z M20,18.9c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8s3.8,1.7,3.8,3.8 S22.1,18.9,20,18.9z"/></svg>',
    journey: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M36.1,19.6c0,8.9-7.2,16.1-16.1,16.1c-4.4,0-8.5-1.8-11.4-4.7L6.2,33.4c-0.4,0.4-1,0.1-1-0.4v-8.2 c0-0.3,0.3-0.6,0.6-0.6H14c0.5,0,0.8,0.6,0.4,1l-2.6,2.6c2.2,2.2,5.1,3.5,8.2,3.5c6.5,0,11.7-5.2,11.7-11.7s-5.2-11.7-11.7-11.7 c-4.6,0-8.6,2.7-10.6,6.6c-0.2,0.4-0.7,0.6-1.1,0.4l-3.3-1.4c-0.4-0.2-0.6-0.7-0.4-1.1C7.1,6.8,13.1,3.5,20,3.5 C28.9,3.5,36.1,10.7,36.1,19.6z"/></svg>',
    chat: '<svg viewBox="0 0 40 40" width="14" height="14" fill="currentColor"><path d="M20,3.5C10.9,3.5,3.5,10,3.5,18c0,4.8,2.7,9.1,6.8,11.8l-1.9,5.7c-0.2,0.6,0.3,1.2,0.9,1l6.7-2.7 c1.3,0.4,2.6,0.7,4,0.7c9.1,0,16.5-6.5,16.5-14.5S29.1,3.5,20,3.5z"/></svg>',

    // Social Icons (Modern Creator Platform SVGs)
    twitter: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M36.3,10.2c-1,1.3-2.1,2.5-3.4,3.5c0,0.2,0,0.4,0,1c0,1.7-0.2,3.6-0.9,5.3c-0.6,1.7-1.2,3.5-2.4,5.1 c-1.1,1.5-2.3,3.1-3.7,4.3c-1.4,1.2-3.3,2.3-5.3,3c-2.1,0.8-4.2,1.2-6.6,1.2c-3.6,0-7-1-10.2-3c0.4,0,1.1,0.1,1.5,0.1 c3.1,0,5.9-1,8.2-2.9c-1.4,0-2.7-0.4-3.8-1.3c-1.2-1-1.9-2-2.2-3.3c0.4,0.1,1,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-1.4-0.3-2.7-1.1-3.7-2.3s-1.4-2.6-1.4-4.2v-0.1c1,0.6,2,0.9,3,0.9c-1-0.6-1.5-1.3-2.2-2.4c-0.6-1-0.9-2.1-0.9-3.3s0.3-2.3,1-3.4 c1.5,2.1,3.6,3.6,6,4.9s4.9,2,7.6,2.1c-0.1-0.6-0.1-1.1-0.1-1.4c0-1.8,0.8-3.5,2-4.7c1.2-1.2,2.9-2,4.7-2c2,0,3.6,0.8,4.8,2.1 c1.4-0.3,2.9-0.9,4.2-1.5c-0.4,1.5-1.4,2.7-2.9,3.6C33.8,11.2,35.1,10.9,36.3,10.2L36.3,10.2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    twitch: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M23.9,33.6h-5.2l-6.5,6.5v-6.5H4.5V10.4L11,3.9h24.5V22L23.9,33.6z M32.9,6.5H12.2 v19.4h5.2V31l5.2-5.2h5.2l5.2-5.2V6.5z M26.5,11.7H29v7.7h-2.6V11.7z M20,11.7h2.6v7.7H20V11.7z"/></svg>',
    tiktok: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M36.1,11.7v5c-3.3,0-6.3-1-8.8-2.8v12.9c0,6.5-5.2,11.7-11.7,11.7c-2.4,0-4.6-0.7-6.5-2c0,0,0,0,0,0 c-3.1-2.1-5.2-5.7-5.2-9.7c0-6.5,5.2-11.7,11.7-11.7c0.5,0,1.1,0,1.6,0.1v1.4c0,0,0,0,0,0v5c-0.5-0.2-1.1-0.3-1.6-0.3 c-2.9,0-5.3,2.4-5.3,5.4c0,2.1,1.2,3.9,2.9,4.8c0.7,0.4,1.5,0.6,2.4,0.6c2.9,0,5.3-2.4,5.3-5.3V1.5h6.3v0.8c0,0.2,0.1,0.5,0.1,0.7 c0.4,2.5,1.9,4.7,4,6c0,0,0.1,0.1,0.1,0.1c0,0-0.1-0.1-0.1-0.1c1.4,0.9,3,1.3,4.7,1.3V11.7"/></svg>',
    youtube: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M37.6,27.1c0,0-0.3,2.4-1.4,3.5c-1.4,1.4-2.9,1.4-3.6,1.5c-5,0.4-12.4,0.4-12.4,0.4s-9.2-0.1-12.1-0.4 c-0.8-0.1-2.6-0.1-3.9-1.5c-1.1-1.1-1.4-3.5-1.4-3.5s-0.4-2.9-0.4-5.7v-2.7c0-2.9,0.4-5.7,0.4-5.7s0.3-2.4,1.4-3.5 C5.5,8,7,8,7.7,7.9c5-0.4,12.4-0.4,12.4-0.4h0c0,0,7.5,0,12.4,0.4C33.3,8,34.8,8,36.2,9.4c1.1,1.1,1.4,3.5,1.4,3.5s0.4,2.9,0.4,5.7 v2.7C37.9,24.2,37.6,27.1,37.6,27.1z M16.5,14.6l0,9.9l9.6-5L16.5,14.6z"/></svg>',
    kofi: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M17.7,8.7c4.3,0,8.6,0,12.9,0c4.2,0,8,3.1,8.7,7.3c0.7,4.4-1.4,8.3-5.6,9.8c-1.2,0.4-2.5,0.5-3.8,0.7 c-0.5,0.1-0.8,0.2-0.8,0.8c0,0.6-0.2,1.3-0.4,1.9c-0.7,2-2.4,3.1-4.5,3.1c-5.7,0-11.3,0-17,0c-2.9,0-4.8-1.9-4.8-4.7 c0-5.6,0-11.2,0-16.7c0-1.6,0.4-2.1,2-2.1C8.9,8.7,13.3,8.7,17.7,8.7z M23.1,18.2c0-2.2-1.4-3.6-3.5-3.7c-1.3,0-2.4,0.5-3.3,1.3 c-0.4,0.4-0.7,0.3-1.2,0c-0.7-0.5-1.5-0.9-2.3-1.2c-1.8-0.5-4.2,0.4-4.5,2.7c-0.2,1.7,0.4,3.2,1.6,4.3c1.7,1.7,3.6,3.4,5.4,5.1 c0.3,0.3,0.6,0.3,0.9,0c1.7-1.7,3.5-3.4,5.2-5.1C22.5,20.7,23.2,19.6,23.1,18.2z M29.1,17.7c0,0.9,0,1.8,0,2.7 c0,1.6-0.3,1.5,1.5,1.5c1.6,0,2.9-0.7,3.6-2.2c0.7-1.6,0.8-3.2-0.3-4.7c-1-1.4-2.4-1.6-4-1.5c-0.6,0-0.8,0.2-0.8,0.8 C29.1,15.4,29.1,16.5,29.1,17.7z"/></svg>',
    throne: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M27.8,20.5L20,4.1l-7.8,16.4l7.8,8.4L27.8,20.5z M7.5,33.9L1.8,13.5L20,32.3l0,0C15.1,32.3,10.6,32.9,7.5,33.9z M32.5,33.9l5.7-20.4L21.8,30.4l1.8,2C27.1,32.6,30.2,33.2,32.5,33.9z"/></svg>',
    thron: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M27.8,20.5L20,4.1l-7.8,16.4l7.8,8.4L27.8,20.5z M7.5,33.9L1.8,13.5L20,32.3l0,0C15.1,32.3,10.6,32.9,7.5,33.9z M32.5,33.9l5.7-20.4L21.8,30.4l1.8,2C27.1,32.6,30.2,33.2,32.5,33.9z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    bluesky: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.737 1.5 3.5c0 1.157.65 6.012.923 7.025.9 3.327 4.148 4.216 7.077 3.655-4.257 1.34-6.386 4.398-3.6 7.42 3.447 3.738 5.6-1.5 6.1-3.6.5 2.1 2.653 7.338 6.1 3.6 2.786-3.022.657-6.08-3.6-7.42 2.929.561 6.177-.328 7.077-3.655.273-1.013.923-5.868.923-7.025 0-1.763-1.066-2.49-3.702-.695C16.046 4.747 13.087 8.686 12 10.8z"/></svg>',
    bsky: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.737 1.5 3.5c0 1.157.65 6.012.923 7.025.9 3.327 4.148 4.216 7.077 3.655-4.257 1.34-6.386 4.398-3.6 7.42 3.447 3.738 5.6-1.5 6.1-3.6.5 2.1 2.653 7.338 6.1 3.6 2.786-3.022.657-6.08-3.6-7.42 2.929.561 6.177-.328 7.077-3.655.273-1.013.923-5.868.923-7.025 0-1.763-1.066-2.49-3.702-.695C16.046 4.747 13.087 8.686 12 10.8z"/></svg>',
    patreon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.957 7.21c-.004-3.064-2.391-5.576-5.191-6.482-3.478-1.125-8.064-.962-11.384.604C2.357 3.231 1.093 7.391 1.046 11.54c-.039 3.411.302 12.396 5.369 12.46 3.765.047 4.326-4.804 6.068-7.141 1.24-1.662 2.836-2.132 4.801-2.618 3.376-.836 5.678-3.501 5.673-7.031Z"/></svg>',
    vgen: '<svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.019 7.534a8.337 8.337 0 0 1 11.774.617l.248.275c1.409 1.527 2.666 3.732 2.612 5.905a4.5 4.5 0 0 1-.665 2.252l-.082.132c-.045.07-.108.17-.187.29-.159.242-.383.578-.664.977a36 36 0 0 1-2.31 2.96c-.938 1.073-2.134 2.29-3.497 3.272-1.282.924-3.23 2.02-5.574 2.02-2.297 0-4.268-1.06-5.573-1.935-1.407-.944-2.688-2.122-3.718-3.176a41 41 0 0 1-3.53-4.15l-.091-.125a4.469 4.469 0 0 1 7.252-5.22l.033.044.145.194a31 31 0 0 0 1.084 1.354 8.3 8.3 0 0 1 2.743-5.686zm1.298 1.514a5.47 5.47 0 0 1 7.725.405l.26.287.002.004c1.175 1.268 1.897 2.791 1.863 3.913v.003c-.007.274-.084.55-.239.802l-.019.03-.044.071-.166.258c-.143.219-.35.528-.61.897a33 33 0 0 1-2.123 2.72c-.863.989-1.897 2.029-3.014 2.834-1.088.784-2.438 1.478-3.899 1.478-1.444 0-2.833-.681-3.975-1.448-1.179-.79-2.305-1.817-3.264-2.798a38 38 0 0 1-3.325-3.919l-.02-.028c-.143-.224-.234-.383-.283-.69A1.598 1.598 0 0 1 7.1 12.054c.48.106.76.353.967.632l.001.001.01.014.04.055.167.223a35 35 0 0 0 2.82 3.287c.88.9 1.833 1.757 2.757 2.377.962.645 1.7.905 2.191.905.363 0 .842-.145 1.424-.481l.406-.235-.355-.306a4 4 0 0 1-.322-.315l-1.294-1.438a5.47 5.47 0 0 1 .405-7.725m6.07 4.945a30 30 0 0 1-1.832 2.339l-.017.019-.233.266-2.006-1.98-.007-.006a2.268 2.268 0 1 1 3.37-3.035l.26.287c.25.279.465.588.572.933.11.355.099.732-.073 1.12l-.014.03z"/></svg>',
    pixiv: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.002 0C5.373 0 0 5.373 0 12.002c0 6.628 5.373 12.002 12.002 12.002 6.628 0 12.002-5.374 12.002-12.002C24.004 5.373 18.63 0 12.002 0zm-.375 5.688c2.977 0 5.39 2.414 5.39 5.391 0 2.977-2.413 5.39-5.39 5.39-1.026 0-1.986-.288-2.805-.788v5.043H6.54V5.98c.997-.184 2.029-.292 3.087-.292h2zm0 2.285h-.543c-.318 0-.623.036-.919.102v6.008c.433.197.914.31 1.462.31 1.716 0 3.106-1.39 3.106-3.11s-1.39-3.11-3.106-3.11z"/></svg>',
    artstation: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.215.352-.674.464-1.026.248-2.812-1.718-6.353-2.107-10.522-1.155-.403.092-.803-.162-.895-.565-.092-.403.162-.803.565-.895 4.568-1.043 8.486-.597 11.63 1.326.352.216.464.675.248 1.041zm1.468-3.262c-.27.44-.848.578-1.287.308-3.22-1.979-8.127-2.55-11.935-1.394-.495.15-1.022-.132-1.172-.627-.15-.495.132-1.022.627-1.172 4.354-1.321 9.774-.682 13.46 1.583.44.27.578.848.307 1.302zm.129-3.41c-3.861-2.293-10.231-2.505-13.916-1.386-.592.18-1.218-.16-1.398-.752-.18-.592.16-1.218.752-1.398 4.234-1.285 11.272-1.037 15.71 1.598.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.54.397z"/></svg>',
    soundcloud: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.17 12.22c-.05 0-.09.04-.1.1l-.32 3.12c0 .06.04.1.1.1l.32-.1c.06 0 .1-.04.1-.1l.32-3.02c0-.06-.04-.1-.1-.1l-.32-.1zm1.18-.53c-.06 0-.11.04-.11.1l-.4 3.73c0 .06.05.1.11.1l.4-.1c.06 0 .1-.04.11-.1l.4-3.63c0-.06-.05-.1-.11-.1l-.4-.1zm1.18-.1c-.06 0-.11.05-.12.11l-.46 3.92c0 .07.05.11.12.11l.46-.11c.06 0 .11-.05.11-.11l.46-3.81c0-.07-.05-.11-.11-.11l-.46-.11zm1.18-.76c-.07 0-.12.05-.13.12l-.46 4.79c0 .07.06.12.13.12l.46-.12c.07 0 .12-.05.13-.12l.46-4.67c0-.07-.06-.12-.13-.12l-.46-.12zm1.18-.54c-.07 0-.13.06-.14.13l-.47 5.43c0 .07.06.13.14.13l.47-.13c.07 0 .13-.06.13-.13l.48-5.3c0-.07-.06-.13-.14-.13l-.47-.13zm1.18-.08c-.08 0-.14.06-.15.14l-.45 5.58c0 .08.06.14.15.14l.45-.14c.08 0 .14-.06.14-.14l.46-5.44c0-.08-.06-.14-.15-.14l-.45-.14zm1.18-.32c-.08 0-.15.07-.15.15l-.42 6.01c0 .08.07.15.15.15l.43-.15c.08 0 .15-.07.15-.15l.43-5.86c0-.08-.07-.15-.15-.15l-.44-.15zm1.19-.19c-.09 0-.16.07-.16.16l-.37 6.35c0 .09.07.16.16.16l.37-.16c.09 0 .16-.07.16-.16l.38-6.19c0-.09-.07-.16-.16-.16l-.38-.16zm2.4 1.13c-.22 0-.43.04-.63.11l-.22-4.14c0-.09-.08-.17-.17-.17l-.34.17c-.09 0-.17.08-.17.17l.31 6.55c0 .09.08.17.17.17h5.18c2.14 0 3.88-1.74 3.88-3.88s-1.74-3.88-3.88-3.88c-.37 0-.73.05-1.07.15-.38-2.38-2.44-4.2-4.93-4.2-.7 0-1.36.14-1.97.4-.1.04-.15.15-.12.25l.42 2.15c.03.11.14.17.25.13.43-.17.9-.27 1.39-.27 1.94 0 3.53 1.48 3.69 3.39.02.19.16.33.35.33.24 0 .47-.02.7-.02 1.46 0 2.65 1.19 2.65 2.65s-1.19 2.65-2.65 2.65h-4.32z"/></svg>',
    tumblr: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.464C9.849.075 9.94 0 10.05 0h3.585v6.177h4.81v3.57h-4.81v7.409c0 1.635.894 2.459 2.459 2.459 1.127 0 2.052-.375 2.052-.375l.623 3.673s-1.636.887-4.206.887z"/></svg>',
    cara: '<svg viewBox="0 0 200 200" width="16" height="16" fill="currentColor"><path d="M159.095 65.5695L188.299 25.8197C141.919 -11.4129 71.0789 -9.07994 30.2977 37.3947C16.782 52.7973 8.09251 72.8914 7.08942 97.2662C5.69382 131.179 20.7504 162.585 44.2222 179.443C88.6201 211.33 148.393 203.635 191 173.408L164.897 131.311C133.567 155.964 76.0419 153.615 72.0666 104.31C68.0913 55.004 121.963 40.9164 159.095 65.5695Z"/></svg>',
    reddit: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
    paypal: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M35.1,20.2c-1.3,5.6-5.5,8.2-11.2,8.8h-0.9c-0.7,0-1.3,0.5-1.4,1.2l-0.1,0.4l-1.1,6.8l-0.1,0.3 c-0.1,0.7-0.7,1.2-1.4,1.2h-4.7L16.6,25h2.9c8,0,13-3.9,14.6-11.2C35.4,15.4,35.6,17.6,35.1,20.2z M32.3,13.1 c-1.4,7.5-6.4,10-12.8,10h-3.2c-0.8,0-1.4,0.6-1.6,1.3l0.1-0.3l-1.7,10.8H6.3c-0.6,0-1-0.5-0.9-1.1L9.9,4.7C10,4,10.7,3.4,11.5,3.4 h11c3.8,0,6.8,0.8,8.4,2.7c1.5,1.7,1.9,3.6,1.5,6.3C32.4,12.4,32.3,12.8,32.3,13.1z"/></svg>',
    email: '<svg viewBox="0 0 40 40" width="16" height="16" fill="currentColor"><path d="M37.5,12.6l-17.5,11.9L2.5,12.6c-.2-.1-.3-.2-.5-.2v-2.7c0-.8.6-1.4,1.4-1.4h33.1c.8,0,1.4.6,1.4,1.4v2.7c-.2,0-.4,0-.5.2ZM19.5,26.3c.2.1.3.2.5.2s.4,0,.5-.2l17.5-11.9v16.9c0,.8-.6,1.4-1.4,1.4H3.4c-.8,0-1.4-.6-1.4-1.4V14.4l17.5,11.9Z"/></svg>',
  };

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined && text !== null) {
      el.textContent = text;
    }
  }

  function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el && html !== undefined && html !== null) {
      el.innerHTML = html;
    }
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message || 'Action completed!';
    toast.classList.add('visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }

  // 1. Header
  function renderHeader(config) {
    const header = config.header || {};
    setText('header-updated', header.updatedDate || 'Site Last Updated');

    const logoImg = document.getElementById('header-avatar');
    if (logoImg && header.logoUrl) {
      logoImg.src = header.logoUrl;
      logoImg.alt = header.logoAlt || 'Creator Mascot';
    }

    setText('header-name', header.name || 'CREATOR');
    setText('header-tagline', header.tagline || '');

    const navList = document.getElementById('header-nav-list');
    if (navList && Array.isArray(header.navLinks)) {
      navList.innerHTML = '';
      header.navLinks.forEach((link) => {
        if (link.status === 'off' || link.show === false || link.enabled === false) return;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${link.id}`;
        a.className = 'nav-btn';
        a.dataset.section = link.id;

        const iconSvg = ICONS[link.icon] || ICONS.globe;
        a.innerHTML = `<span>${link.label}</span><span class="nav-icon">${iconSvg}</span>`;

        li.appendChild(a);
        navList.appendChild(li);
      });
    }
  }

  // 2. Home Section
  function renderHome(config) {
    const home = config.homeSection || {};

    const iframe = document.getElementById('home-video-iframe');
    const videoWrap = iframe ? iframe.closest('.video-responsive-wrap') : null;
    if (home.showVideo === false || !home.videoEmbedUrl) {
      if (videoWrap) videoWrap.style.display = 'none';
    } else {
      if (videoWrap) videoWrap.style.display = '';
      if (iframe) iframe.src = home.videoEmbedUrl;
    }

    const creditsEl = document.getElementById('home-credits-text');
    if (home.showCredits === false || !home.creditsHtml) {
      if (creditsEl) creditsEl.style.display = 'none';
    } else {
      if (creditsEl) creditsEl.style.display = '';
      setHtml('home-credits-text', home.creditsHtml || '');
    }

    const intro = home.intro || {};
    setText('home-intro-tag', intro.tag || 'INTRODUCTION');
    setText('home-intro-greeting', intro.greeting || '');

    const pWrap = document.getElementById('home-intro-paragraphs');
    if (pWrap && Array.isArray(intro.paragraphs)) {
      pWrap.innerHTML = '';
      intro.paragraphs.forEach((pText) => {
        const p = document.createElement('p');
        p.textContent = pText;
        pWrap.appendChild(p);
      });
    }

    const news = home.news || {};
    setText('home-news-tag', news.tag || 'NEWS');

    const newsList = document.getElementById('home-news-bullets');
    if (newsList && Array.isArray(news.bullets)) {
      newsList.innerHTML = '';
      news.bullets.forEach((bText) => {
        const li = document.createElement('li');
        li.innerHTML = bText;
        newsList.appendChild(li);
      });
    }

    setText('home-sub-note', news.subNote || '');
  }

  // 3. About / Lore Section
  function renderAbout(config) {
    const about = config.aboutSection || {};
    const origin = about.origin || {};
    setText('about-origin-tag', origin.tag || 'ORIGIN');
    setText('about-origin-text', origin.text || '');

    const journey = about.journey || {};
    setText('about-journey-tag', journey.tag || 'JOURNEY');
    setText('about-journey-text', journey.text || '');

    // 4-Column Community Tags Table
    const thead = document.getElementById('about-tags-thead');
    const tbody = document.getElementById('about-tags-tbody');
    if (thead && tbody && Array.isArray(about.tags) && about.tags.length > 0) {
      thead.innerHTML = `<tr>${about.tags.map((t) => `<th>${t.label}</th>`).join('')}</tr>`;
      tbody.innerHTML = `<tr>${about.tags.map((t) => `<td>${t.value}</td>`).join('')}</tr>`;
    }

    // FAQ Block
    const faqBlock = document.getElementById('about-faq-block');
    const faqDivider = document.getElementById('about-faq-divider');
    const faqContent = document.getElementById('about-faq-content');
    const faq = about.faq;

    if (faq && Array.isArray(faq.items) && faq.items.length > 0) {
      if (faqBlock) faqBlock.style.display = 'block';
      if (faqDivider) faqDivider.style.display = 'block';
      setText('about-faq-tag', faq.tag || 'F A Q');

      if (faqContent) {
        faqContent.innerHTML = '';
        faq.items.forEach((item) => {
          const p = document.createElement('p');
          p.className = 'faq-item-p';
          p.innerHTML = `<strong>${item.question || ''}</strong><br>${item.answer || ''}`;
          faqContent.appendChild(p);
        });
      }
    } else {
      if (faqBlock) faqBlock.style.display = 'none';
      if (faqDivider) faqDivider.style.display = 'none';
    }

    // Character Portrait Image
    const portraitImg = document.getElementById('about-portrait-img');
    if (portraitImg && about.portraitUrl) {
      portraitImg.src = about.portraitUrl;
      if (about.portraitAlt) portraitImg.alt = about.portraitAlt;
    }

    // Optional Art Credit (can be toggled on/off)
    const creditElem = document.getElementById('about-art-credit');
    const creditLabel = document.getElementById('about-art-credit-label');
    const creditLink = document.getElementById('about-art-credit-link');
    const artCredit = about.artCredit;

    if (creditElem && artCredit && (artCredit.show === true || artCredit.status === 'on')) {
      creditElem.style.display = 'block';
      if (creditLabel) {
        creditLabel.textContent = (artCredit.label || 'Art Credit ›') + ' ';
      }
      if (creditLink) {
        creditLink.textContent = artCredit.artistName || '';
        creditLink.href = artCredit.artistUrl || '#';
      }
    } else if (creditElem) {
      creditElem.style.display = 'none';
    }
  }

  // 4. Commissions Section
  function renderCommissions(config) {
    const comm = config.commissionsSection || {};
    const container = document.getElementById('commissions-tiers-container');
    if (!container || !Array.isArray(comm.tiers)) return;

    container.innerHTML = '';
    comm.tiers.forEach((tier) => {
      const block = document.createElement('div');
      block.className = 'commissions-tier-block';

      let specsHtml = '';
      if (Array.isArray(tier.specs)) {
        specsHtml = `<ul class="comm-specs-list">${tier.specs
          .map((s) => `<li><strong>${s.label}:</strong> ${s.value}</li>`)
          .join('')}</ul>`;
      }

      block.innerHTML = `
        <h2 class="comm-tier-heading">${tier.heading}</h2>
        <hr class="divider-hatched">
        <div class="comm-meta-row">
          <span class="comm-status-pill">${ICONS.cancel} ${tier.status}</span>
          <span class="comm-price-btn">${ICONS.cart} ${tier.price}</span>
        </div>
        ${specsHtml}
      `;
      container.appendChild(block);
    });
  }

  // 5. Terms of Service
  function renderTos(config) {
    const tos = config.tosSection || {};
    setText('tos-preamble', tos.preamble || '');

    const container = document.getElementById('tos-categories-container');
    if (!container || !Array.isArray(tos.categories)) return;

    container.innerHTML = '';
    tos.categories.forEach((cat) => {
      const div = document.createElement('div');
      div.className = 'tos-category-block';

      let bulletsHtml = '';
      if (Array.isArray(cat.bullets)) {
        bulletsHtml = `<ul class="tos-cat-bullets">${cat.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`;
      }

      div.innerHTML = `
        <h3 class="tos-cat-title">${ICONS.upload} ${cat.tag}</h3>
        ${bulletsHtml}
      `;
      container.appendChild(div);
    });
  }

  // 6. Portfolio Section
  function renderPortfolio(config) {
    const port = config.portfolioSection || {};
    const container = document.getElementById('portfolio-groups-container');
    if (!container || !Array.isArray(port.groups)) return;

    container.innerHTML = '';
    port.groups.forEach((grp) => {
      const block = document.createElement('div');
      block.className = 'portfolio-group-block';

      let itemsHtml = '';
      if (Array.isArray(grp.items)) {
        itemsHtml = `<div class="portfolio-gallery-grid">${grp.items
          .map(
            (it) => `
            <div class="portfolio-item">
              <div class="portfolio-thumb-wrap">
                <img class="portfolio-thumb" src="${it.image}" alt="${it.title}" loading="lazy">
              </div>
              <div class="portfolio-caption">${it.title}</div>
            </div>`
          )
          .join('')}</div>`;
      }

      block.innerHTML = `
        <h2 class="section-title">${grp.heading}</h2>
        <hr class="divider-hatched">
        ${itemsHtml}
      `;
      container.appendChild(block);
    });
  }

  // 7. Contact Section
  function renderContact(config) {
    const contact = config.contactSection || {};
    setText('contact-heading-text', contact.heading || 'COMMISSION ME');

    const instrWrap = document.getElementById('contact-instructions-wrap');
    if (instrWrap && Array.isArray(contact.instructions)) {
      instrWrap.innerHTML = '';
      contact.instructions.forEach((ins) => {
        const p = document.createElement('p');
        p.textContent = ins;
        instrWrap.appendChild(p);
      });
    }

    const newsList = document.getElementById('contact-news-bullets');
    if (newsList && Array.isArray(contact.newsBullets)) {
      newsList.innerHTML = '';
      contact.newsBullets.forEach((b) => {
        const li = document.createElement('li');
        li.textContent = b;
        newsList.appendChild(li);
      });
    }

    // Helper to test if a channel / feature toggle is active
    function isChannelActive(channelObj, defaultVal = false) {
      if (channelObj === undefined || channelObj === null) return defaultVal;
      if (typeof channelObj === 'boolean') return channelObj;
      if (typeof channelObj === 'string') {
        const s = channelObj.trim().toLowerCase();
        return s === 'on' || s === 'true' || s === 'yes' || s === '1';
      }
      if (typeof channelObj === 'object') {
        if (channelObj.enabled !== undefined) return isChannelActive(channelObj.enabled, defaultVal);
        if (channelObj.show !== undefined) return isChannelActive(channelObj.show, defaultVal);
        if (channelObj.status !== undefined) return isChannelActive(channelObj.status, defaultVal);
      }
      return defaultVal;
    }

    const contactWrap = document.getElementById('contact-two-col');
    const formCol = document.getElementById('contact-right-col');

    const form = document.getElementById('order-form');
    const extCard = document.getElementById('contact-external-card');
    const extDesc = document.getElementById('contact-external-desc');
    const extBtn = document.getElementById('contact-external-btn');
    const extBtnText = document.getElementById('contact-external-btn-text');

    const emailCard = document.getElementById('contact-email-card');
    const emailDesc = document.getElementById('contact-email-desc');
    const emailBtn = document.getElementById('contact-email-btn');
    const emailBtnText = document.getElementById('contact-email-btn-text');

    const secOptionsWrap = document.getElementById('contact-secondary-options');
    const secExt = document.getElementById('contact-secondary-external');
    const secDesc = document.getElementById('contact-secondary-desc');
    const secLink = document.getElementById('contact-secondary-link');
    const secLinkText = document.getElementById('contact-secondary-link-text');

    const secEmail = document.getElementById('contact-secondary-email');
    const secEmailDesc = document.getElementById('contact-secondary-email-desc');
    const secEmailLink = document.getElementById('contact-secondary-email-link');
    const secEmailLinkText = document.getElementById('contact-secondary-email-link-text');

    // 1. Resolve active status for each of the 3 channels
    const formCfg = contact.form || {};
    let formEnabled = false;
    if (contact.form !== undefined) {
      formEnabled = isChannelActive(contact.form, true);
    } else if (contact.formMode === 'external') {
      formEnabled = false;
    } else if (contact.showForm !== undefined) {
      formEnabled = contact.showForm !== false;
    } else {
      formEnabled = true; // default on
    }

    const directEmailCfg = contact.directEmail || {};
    let emailEnabled = false;
    if (contact.directEmail !== undefined) {
      emailEnabled = isChannelActive(contact.directEmail, false);
    } else if (contact.formMode === 'mailto' && !formEnabled) {
      emailEnabled = true;
    }

    const extCfg = contact.externalPlatform || {};
    let externalEnabled = false;
    if (contact.externalPlatform !== undefined) {
      externalEnabled = isChannelActive(contact.externalPlatform, extCfg.showSecondaryButton === true || contact.formMode === 'external');
    } else if (contact.formMode === 'external') {
      externalEnabled = true;
    }

    // 2. Control right column visibility (if all 3 channels are off, left column expands full width)
    const anyChannelActive = formEnabled || emailEnabled || externalEnabled;
    if (contactWrap && formCol) {
      if (!anyChannelActive) {
        formCol.style.display = 'none';
        contactWrap.classList.add('no-form');
      } else {
        formCol.style.display = '';
        contactWrap.classList.remove('no-form');
      }
    }

    // 3. Render Channels & Secondary Links
    if (formEnabled) {
      // Primary: Show Form
      if (form) form.style.display = 'flex';
      if (extCard) extCard.style.display = 'none';
      if (emailCard) emailCard.style.display = 'none';

      // Update submit button text if configured
      const submitBtnText = document.getElementById('order-submit-btn-text');
      if (submitBtnText && formCfg.submitButtonText) {
        submitBtnText.textContent = formCfg.submitButtonText;
      }

      // Secondary options below form (if either external or direct email is also enabled)
      const hasSecondary = (externalEnabled && extCfg.platformUrl) || emailEnabled;
      if (secOptionsWrap) {
        secOptionsWrap.style.display = hasSecondary ? 'flex' : 'none';
      }

      // Secondary External Link
      if (secExt) {
        if (externalEnabled && extCfg.platformUrl) {
          secExt.style.display = 'flex';
          if (secDesc) secDesc.textContent = extCfg.note || 'Prefer an external commission platform?';
          if (secLinkText) secLinkText.textContent = extCfg.buttonLabel || 'ORDER VIA VGEN';
          if (secLink) secLink.href = extCfg.platformUrl;
        } else {
          secExt.style.display = 'none';
        }
      }

      // Secondary Direct Email Link
      if (secEmail) {
        if (emailEnabled) {
          secEmail.style.display = 'flex';
          const mailRecipient = directEmailCfg.email || contact.contactEmail || 'hello@example.com';
          const mailSubj = encodeURIComponent(directEmailCfg.subject || '[Commission Inquiry] Request from Website');
          if (secEmailDesc) secEmailDesc.textContent = directEmailCfg.note || 'Prefer sending a direct email?';
          if (secEmailLinkText) secEmailLinkText.textContent = directEmailCfg.buttonLabel || 'EMAIL DIRECTLY';
          if (secEmailLink) {
            secEmailLink.href = `mailto:${mailRecipient}?subject=${mailSubj}`;
            secEmailLink.onclick = () => {
              showToast(`✦ Opening email client for ${mailRecipient}...`);
            };
          }
        } else {
          secEmail.style.display = 'none';
        }
      }
    } else {
      // Primary Form is OFF
      if (form) form.style.display = 'none';
      if (secOptionsWrap) secOptionsWrap.style.display = 'none';

      // Render External Portal Card
      if (extCard) {
        if (externalEnabled && extCfg.platformUrl) {
          extCard.style.display = 'flex';
          if (extDesc) extDesc.textContent = extCfg.note || 'Prefer automated escrow and verified reviews? Request directly via my external platform.';
          if (extBtn) extBtn.href = extCfg.platformUrl;
          if (extBtnText) extBtnText.textContent = extCfg.buttonLabel || 'ORDER VIA VGEN';
        } else {
          extCard.style.display = 'none';
        }
      }

      // Render Direct Email Card
      if (emailCard) {
        if (emailEnabled) {
          emailCard.style.display = 'flex';
          const mailRecipient = directEmailCfg.email || contact.contactEmail || 'hello@example.com';
          const mailSubj = encodeURIComponent(directEmailCfg.subject || '[Commission Inquiry] Request from Website');
          if (emailDesc) emailDesc.textContent = directEmailCfg.note || 'Prefer sending a direct email inquiry? Click below to launch your email client.';
          if (emailBtnText) emailBtnText.textContent = directEmailCfg.buttonLabel || 'EMAIL DIRECTLY';
          if (emailBtn) {
            emailBtn.href = `mailto:${mailRecipient}?subject=${mailSubj}`;
            emailBtn.onclick = () => {
              showToast(`✦ Opening email client for ${mailRecipient}...`);
            };
          }
        } else {
          emailCard.style.display = 'none';
        }
      }
    }

    // 4. Attach Form Submit Handler
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();

        const nameVal = (document.getElementById('order-name')?.value || '').trim();
        const contactVal = (document.getElementById('order-contact')?.value || '').trim();
        const typeVal = (document.getElementById('order-type')?.value || '').trim();
        const detailsVal = (document.getElementById('order-details')?.value || '').trim();

        const formMode = (formCfg.mode || contact.formMode || 'demo').toLowerCase().trim();

        // Option 1: Mailto Form Submission
        if (formMode === 'mailto') {
          const recipient = formCfg.email || directEmailCfg.email || contact.mailtoEmail || contact.contactEmail || 'hello@example.com';
          const subject = encodeURIComponent(`${formCfg.subject || directEmailCfg.subject || contact.mailtoSubject || '[Commission Request]'} — ${typeVal} (${nameVal})`);
          const body = encodeURIComponent(
            `Name: ${nameVal}\n` +
            `Contact Info: ${contactVal}\n` +
            `Commission Type: ${typeVal}\n\n` +
            `Add-ons & Details:\n${detailsVal}\n\n` +
            `Sent from website commission inquiry form.`
          );
          const mailtoUri = `mailto:${recipient}?subject=${subject}&body=${body}`;
          showToast('✦ Opening your email client to send request...');
          window.location.href = mailtoUri;
          form.reset();
          return;
        }

        // Option 2: Free Static Form Endpoint (FormSubmit, Formspree, Basin)
        if (formMode === 'endpoint') {
          const endpoint = formCfg.endpoint || contact.formEndpoint;
          if (!endpoint || endpoint.includes('your-email@example.com')) {
            showToast('⚠️ Please configure your form endpoint in config.js');
            return;
          }

          const submitBtn = document.getElementById('order-submit-btn');
          const submitBtnText = document.getElementById('order-submit-btn-text');
          const originalText = submitBtnText ? submitBtnText.textContent : 'S E N D';

          try {
            if (submitBtn) submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.textContent = 'S E N D I N G...';

            const formData = new FormData(form);
            const response = await fetch(endpoint, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json',
              },
            });

            if (response.ok) {
              showToast(formCfg.successMessage || '✦ Request sent successfully! I will reply soon.');
              form.reset();
            } else {
              showToast('✕ Submission error. Please email directly.');
            }
          } catch (err) {
            console.error('Form submission error:', err);
            showToast('✕ Could not reach server. Please email directly.');
          } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.textContent = originalText;
          }
          return;
        }

        // Option 3: Default Demo Mode (Zero-Config Simulation)
        showToast(formCfg.successMessage || '✦ Thank you! Your request has been recorded (Demo Mode).');
        form.reset();
      };
    }
  }

  // Helper to check if a social icon is set to "on" or "off"
  function isSocialOn(soc) {
    if (soc.status !== undefined) {
      if (typeof soc.status === 'string') {
        return soc.status.trim().toLowerCase() === 'on';
      }
      return Boolean(soc.status);
    }
    if (soc.enabled !== undefined) {
      if (typeof soc.enabled === 'string') {
        return soc.enabled.trim().toLowerCase() === 'on';
      }
      return Boolean(soc.enabled);
    }
    return true; // Default to on if not specified
  }

  // 8. Footer on canvas and floating footer
  function renderFooter(config) {
    const contact = config.contactSection || {};
    const emailLink = document.getElementById('footer-email-link');
    if (emailLink && contact.contactEmail) {
      emailLink.textContent = contact.contactEmail;
      emailLink.href = `mailto:${contact.contactEmail}`;
    }

    // Flat black social icons with On / Off filter
    const iconsList = document.getElementById('footer-social-icons');
    if (iconsList && Array.isArray(contact.socialLinks)) {
      iconsList.innerHTML = '';
      contact.socialLinks.forEach((soc) => {
        if (!isSocialOn(soc)) return; // Skip icons that are turned "off"

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = soc.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'footer-social-link';
        a.setAttribute('aria-label', soc.name);
        a.setAttribute('title', soc.name);
        a.innerHTML = ICONS[soc.icon] || ICONS.twitter;
        li.appendChild(a);
        iconsList.appendChild(li);
      });
    }

    // Copyright year
    const copyEl = document.getElementById('footer-copy-year');
    if (copyEl) {
      const yr = new Date().getFullYear();
      const name = (config.header && config.header.name) || 'CREATOR';
      copyEl.textContent = `${yr} © ${name.replace(/\s+/g, '')}`;
    }

    // Floating footer configuration
    const creditEl = document.getElementById('footer-credit');
    if (creditEl && config.footer && config.footer.text) {
      creditEl.innerHTML = config.footer.text;
    }
  }

  // 9. Routing
  function initRouting() {
    const validSections = ['home', 'about', 'commissions', 'tos', 'portfolio', 'contact'];

    function switchSection(targetId) {
      if (!validSections.includes(targetId)) {
        targetId = 'home';
      }

      document.querySelectorAll('.site-section').forEach((sec) => {
        sec.classList.remove('active');
      });

      const activeSec = document.getElementById(`${targetId}-section`);
      if (activeSec) {
        activeSec.classList.add('active');
      }

      document.querySelectorAll('.nav-btn').forEach((btn) => {
        if (btn.dataset.section === targetId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    function handleHash() {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();
      switchSection(hash || 'home');
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    const config = window.SITE_CONFIG || {};

    if (config.meta && config.meta.title) {
      document.title = config.meta.title;
    }

    renderHeader(config);
    renderHome(config);
    renderAbout(config);
    renderCommissions(config);
    renderTos(config);
    renderPortfolio(config);
    renderContact(config);
    renderFooter(config);

    initRouting();
  });
})();
