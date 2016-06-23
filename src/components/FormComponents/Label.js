import { default as BootstrapComponent } from 'react-bootstrap/lib/Label';

class Label extends BootstrapComponent {

}

Label.getComponentDefaultProps = () => {
  return {
    children: 'Default label.'
  };
};

export default Label;
