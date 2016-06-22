import connectToWrap from '../../utils/wrapper';
import { default as BootstrapComponent } from 'react-bootstrap/lib/Label';

@connectToWrap()
class Label extends BootstrapComponent {

}

Label.getComponentDefaultProps = () => {
  return {
    children: 'Default label.'
  };
};

export default Label;
