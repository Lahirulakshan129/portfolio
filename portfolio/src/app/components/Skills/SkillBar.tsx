// src/components/Skills/SkillBar.tsx
export const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="skill-bar-fill h-3 rounded-full bg-gradient-to-r from-primary to-cyan-400"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );