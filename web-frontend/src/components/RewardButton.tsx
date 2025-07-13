interface RewardButtonProps {
  label: string;
  onReward: () => void;
  disabled?: boolean;
}

export default function RewardButton({ label, onReward, disabled = false }: RewardButtonProps) {
  return (
    <button
      onClick={onReward}
      disabled={disabled}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
        }
      `}
    >
      {label}
    </button>
  );
}
