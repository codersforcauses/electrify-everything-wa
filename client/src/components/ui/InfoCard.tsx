interface InfoCardProps {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="w-full max-w-4xl rounded-2xl bg-[#F5D76E] px-8 py-10 text-center">
      <h3 className="mb-3 font-bold uppercase tracking-widest">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
