import connectToWrap from '../../utils/wrapper';
import Button from 'react-bootstrap/lib/Button';

@connectToWrap()
class MyButton extends Button {}
MyButton.getComponentDefaultProps = () => {
  return {
    children: 'Try Default Value',
    bsStyle: 'danger'
  };
};
export default MyButton;
