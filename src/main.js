import init from './init';
import WebGL from 'three/addons/capabilities/WebGL.js';

if(WebGL.isWebGLAvailable()) init();
else {
	const warning = WebGL.getWebGLErrorMessage();
	document.body.appendChild( warning );
}