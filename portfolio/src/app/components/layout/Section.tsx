import clsx from "clsx";

export const Section = ({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={clsx("section py-20 px-4", className)}
  >
    {children}
  </section>
);