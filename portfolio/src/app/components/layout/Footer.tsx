import { Button } from "../ui/button";

export const Footer = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <footer className="py-8 text-center border-t border-gray-700">
    <div className="max-w-6xl mx-auto px-4">
      <p className="mb-4">© 2025 Alex Doe. Built with Code & Coffee</p>
      <Button
        onClick={() => scrollTo("home")}
        className="bg-primary text-dark-bg px-6 py-2"
      >
        Back to Top Up Arrow
      </Button>
    </div>
  </footer>
);