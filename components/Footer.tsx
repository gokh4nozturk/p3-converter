export default function Footer() {
  return (
    <footer className="flex items-center justify-center gap-2 bg-neutral-100 p-4 text-center text-neutral-500">
      <p>&copy; 2025 P3 Color Converter</p>

      <a
        className="underline-offset-2 hover:underline"
        target="_blank"
        href="https://github.com/gokh4nozturk/p3-converter"
        rel="noreferrer"
      >
        View the source code on GitHub
      </a>
    </footer>
  );
}
