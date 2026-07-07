import TeamMemberCard from "@/components/ui//TeamMemberCard";

const members = [
  // replace with real people
  {
    name: "John Smith",
    role: "Director",
    bio: "Lorem ipsum dolor sit amet...",
    email: "johnsmith@email.com",
    image: "/images/john-smith.png",
  },

  {
    name: "John Smith",
    role: "Director",
    bio: "Lorem ipsum dolor sit amet...",
    email: "johnsmith@email.com",
    image: "/images/john-smith.png",
  },

  {
    name: "John Smith",
    role: "Director",
    bio: "Lorem ipsum dolor sit amet...",
    email: "johnsmith@email.com",
    image: "/images/john-smith.png",
  },
];

export default function TeamSection() {
  return (
    <div className="bg-[#FAF5E4] px-8 py-16">
      <h2 className="mb-2 text-center text-3xl font-bold">Meet the Team</h2>
      <div className="mx-auto mb-10 w-28 border-b-2 border-[#F5D76E]" />
      <div className="mt-8 grid grid-cols-1 justify-items-center md:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}
