import { Button as ButtonAnt, ButtonProps } from 'antd';

interface ButtonCurrentProps extends ButtonProps {
  width?: string;
  title?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
}

const Button = ({
  width,
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
        width: width || '100%',
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
