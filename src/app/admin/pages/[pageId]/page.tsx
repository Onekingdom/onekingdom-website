import EditorProvider from '@/providers/editor/editor-provider'
import { redirect } from 'next/navigation'
import FunnelEditor from './_components/funnel-editor'
import FunnelEditorNavigation from './_components/funnel-editor-navigation'
import FunnelEditorSidebar from './_components/funnel-editor-sidebar'

type Props = {
  params: {
    subaccountId: string
    funnelId: string
    funnelPageId: string
  }
}

const Page = async ({ params }: Props) => {

  const funnelPageDetails = {
    id: "1",
    name: "Page 1",
    pathName: "/page1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-02"),
    visits: 100,
    content: "<p>Content of Page 1</p>",
    order: 1,
    previewImage: "https://example.com/preview1.jpg",
    funnelId: "funnelId1"
  }

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`
    )
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subaccountId={params.subaccountId}
        funnelId={params.funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={params.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={params.subaccountId}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={params.funnelPageId} />
        </div>

        <FunnelEditorSidebar subaccountId={params.subaccountId} />
      </EditorProvider>
    </div>
  )
}

export default Page
