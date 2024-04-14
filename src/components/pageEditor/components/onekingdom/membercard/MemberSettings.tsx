import useEditor from "@/hooks/useEditor";
import { memberStorage } from "@/types/database/members";
import { EditorElement } from "@/types/pageEditor";
import { database, storage } from "@/lib/clientAppwrite";
import { useEffect, useState } from "react";
import { MemberCardProps } from ".";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  element: EditorElement<MemberCardProps>;
};

export default function Settings({ element }: Props) {
  const [members, setMembers] = useState<memberStorage[]>([]);
  const { dispatch } = useEditor();

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");
      if (res) {
        setMembers(res.documents);
      }
    };
    fetchMembers();
  }, []);

  const updateContent = (ID: string) => {
    dispatch({
      type: "pageEditor/updateAnElement",
      payload: {
        ...element,
        content: {
          userID: ID,
        },
      } as EditorElement<MemberCardProps>,
    });
  };

  return (
    <Select onValueChange={updateContent}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select A Member" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select A Member</SelectLabel>
          {members.map((member) => (
            <SelectItem key={member.id} value={member.$id}>
              <div className="flex items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={member.image ? storage.getFilePreview(member.image.bucketID, member.image.imageID).toString() : ""}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="ml-4">{member.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
