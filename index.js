import Header from './header.js';
import './index.css';


import pic from './005.jpg';

let img = new Image();
img.src = pic;

var dom = document.getElementById('root');
dom.append(img)




new Header();

