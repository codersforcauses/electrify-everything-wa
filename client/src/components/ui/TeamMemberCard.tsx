/* ---------------------------------- */
/* Team member card + section         */
/* ---------------------------------- */
import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  email: string;
  image: string;
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  email,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="flex w-72 flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative mb-2 h-48 w-full bg-gray-400">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="border-b border-[#F5D76E] pb-2 text-sm text-gray-500">
          {role}
        </p>
        <p className="text-sm">{bio}</p>
        <a href={`mailto:${email}`} className="text-sm text-gray-500">
          {email}
        </a>
      </div>
    </div>
  );
}
