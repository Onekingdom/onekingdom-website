import { EditorElement } from '@/types/pageEditor';
import React from 'react'
import { TeamSectionContent } from '.';
import MemberCard from '@/components/pageEditor/components/onekingdom/membercard/MemberCard';
import { database } from '@/lib/appwrite';
import { memberStorage } from '@/types/database/members';

type Props = {
  element: EditorElement<TeamSectionContent>;
}

export default  function TeamSeactionComponenta({ element }: Props) {
  const { title } = element.content
  const [members, setMembers] = React.useState<memberStorage[]>()

  React.useEffect(() => {
    
    const fetchMembers = async () => {
      const members = await database.listDocuments<memberStorage>("658fabb7b076a84d06d2", "65b88761559a4aa41f38");
      setMembers(members.documents)
    }
    fetchMembers()
  }, [])



  return (
 
        <div className="neoh_fn_team">
   
        </div>
 
  )
}
