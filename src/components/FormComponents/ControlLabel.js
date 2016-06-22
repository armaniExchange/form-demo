import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/ControlLabel';

@connectToWrap()
export default class ControlLabel extends BootstrapComponent {}
