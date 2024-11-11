import { Button as ButtonAnt, ButtonProps } from 'antd';

interface ButtonCurrentProps extends ButtonProps {
  title?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
}

const Button = ({
  title,
  margin,
  backgroundColor,
  color,
  ...props
}: ButtonCurrentProps) => {
  return (
    <ButtonAnt
      style={{
        margin,
        width: '100%',
        backgroundColor,
        color,
      }}
      {...props}
    >
      {title}
    </ButtonAnt>
  );
};

export default Button;
