import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Dropdown';

@connectToWrap()
export default class Dropdown extends BootstrapComponent {}
