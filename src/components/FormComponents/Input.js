import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Input';

@connectToWrap()
export default class Input extends BootstrapComponent {}

