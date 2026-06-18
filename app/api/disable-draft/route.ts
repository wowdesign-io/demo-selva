import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

// Exits draft mode. Visit /api/disable-draft to return to published content.
export async function GET() {
  const dm = await draftMode()
  dm.disable()
  redirect('/')
}
