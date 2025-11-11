// src/components/Contact/ContactInfoItem.tsx
export const ContactInfoItem = ({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-white bg-opacity-5 transition-all duration-300 hover:bg-opacity-10">
      <div className="text-2xl animate-pulse">{icon}</div>
      <div>
        <div className="font-semibold">{label}</div>
        <div className="opacity-75">{value}</div>
      </div>
    </div>
  );