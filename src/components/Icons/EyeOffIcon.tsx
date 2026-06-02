interface Props {
  color?: string;
  size?: number;
}

export const EyeOffIcon: React.FC<Props> = ({ color = '#729cf0', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M2 2l16 16M8 8a3 3 0 004 4M5 5c-2 1.5-4 5-4 5s3.5 6.5 9 6.5c2 0 3.8-.7 5.2-1.7M8 3.5c.6-.2 1.3-.3 2-.3 5.5 0 9 6.5 9 6.5s-.8 1.7-2.3 3.3"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
