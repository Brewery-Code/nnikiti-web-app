export default function Title({ title }: { title: string }) {
  return (
    <h2 className="font-open-sans text-white text-4xl font-bold uppercase">
      {title}
    </h2>
  );
}
