import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/FormControl';

@connectToWrap()
export default class FormControl extends BootstrapComponent {}
