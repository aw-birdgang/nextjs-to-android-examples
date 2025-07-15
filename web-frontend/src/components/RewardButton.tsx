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
        w-full py-5 px-8 rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl border-2
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 border-blue-500'
        }
      `}
    >
      {label}
    </button>
  );
}
