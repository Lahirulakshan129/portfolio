import { Button } from "../ui/button";

interface FooterProps {
  scrollTo: (id: string) => void;
  darkMode: boolean;
}

export const Footer = ({ scrollTo, darkMode }: FooterProps) => (
  <footer className={`py-8 text-center border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
    <div className="max-w-6xl mx-auto px-4">
      <p className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        © 2025 Alex Doe. Built with Code & Coffee
      </p>
      <Button
        onClick={() => scrollTo("home")}
        className={`px-6 py-2 ${darkMode ? 'bg-primary text-white' : 'bg-blue-600 text-white'}`}
      >
        Back to Top ↑
      </Button>
    </div>
  </footer>
);