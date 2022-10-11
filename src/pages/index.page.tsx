import type { NextPageWithLayout } from '@src/pages/_app.page'
import { BaseLayout } from '@src/layout/BaseLayout/BaseLayout'

const Page: NextPageWithLayout = () => {
  return <div>saaaas</div>
}

Page.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>
}

export default Page
