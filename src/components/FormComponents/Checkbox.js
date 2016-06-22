import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Checkbox';

@connectToWrap()
export default class Checkbox extends BootstrapComponent {}
