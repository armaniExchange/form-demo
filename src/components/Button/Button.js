import Button from 'react-bootstrap/lib/Button';

class MyButton extends Button {}
MyButton.getComponentDefaultProps = () => {
  return {
    children: 'Try Default Value',
    bsStyle: 'danger'
  };
};
export default MyButton;
