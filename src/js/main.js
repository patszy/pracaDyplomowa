import WebGL from 'three/addons/capabilities/WebGL.js';
import init from './init';

if(WebGL.isWebGLAvailable()) init();
else {
	const warning = WebGL.getWebGLErrorMessage();
	document.body.appendChild( warning );
}