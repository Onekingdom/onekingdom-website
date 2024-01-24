import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-dashboard w-full select-none flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-border/10">
      <h2 className="text-xl font-semibold text-foreground">
        You&apos;re not supposed to be here...
      </h2>
      <Button variant='secondary' asChild>
        <Link href="/">
          Go back <span className='ml-1 text-muted-foreground'>(or perish)</span>
        </Link>
      </Button>
    </div>
  )
}