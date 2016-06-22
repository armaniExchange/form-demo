import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Button';

@connectToWrap()
export default class Button extends BootstrapComponent {}
