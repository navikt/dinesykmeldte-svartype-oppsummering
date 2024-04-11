import React, { ReactElement } from 'react'
import { Page } from '@navikt/ds-react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'
import PageError from '../components/shared/errors/PageError'

function Error(): ReactElement | boolean {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent feil' }])

    return (
        <Page>
            <Page.Block width="md" gutters>
                <PageError noReload cause="Internal server error (500)" />
            </Page.Block>
        </Page>
    )
}

export default Error
