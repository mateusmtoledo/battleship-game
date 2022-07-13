import './style.css';
import newGame from './game';
import header from './header';

const main = document.createElement('main');
main.append(newGame());

document.body.append(header);
document.body.append(main);
