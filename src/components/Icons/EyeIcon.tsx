interface Props {
  color?: string;
  size?: number;
}

export const EyeIcon: React.FC<Props> = ({ color = '#729cf0', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M1 10s3.5-6.5 9-6.5S19 10 19 10s-3.5 6.5-9 6.5S1 10 1 10z"
      stroke={color}
      strokeWidth="1.5"
    />
    <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="1.5" />
  </svg>
);
