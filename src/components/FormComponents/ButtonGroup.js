import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/ButtonGroup';

@connectToWrap()
export default class ButtonGroup extends BootstrapComponent {}
