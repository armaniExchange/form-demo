import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Radio';

@connectToWrap()
export default class Radio extends BootstrapComponent {}
