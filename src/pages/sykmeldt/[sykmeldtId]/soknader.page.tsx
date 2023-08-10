import React, { ReactElement } from 'react'
import Head from 'next/head'
import { PersonIcon } from '@navikt/aksel-icons'
import { PageContainer, RootPages } from '@navikt/dinesykmeldte-sidemeny'

import { useSykmeldt } from '../../../hooks/useSykmeldt'
import SoknaderList from '../../../components/soknader/SoknaderList'
import { withAuthenticatedPage } from '../../../auth/withAuthentication'
import { formatNameSubjective } from '../../../utils/sykmeldtUtils'
import PageFallbackLoader from '../../../components/shared/pagefallbackloader/PageFallbackLoader'
import PageSideMenu from '../../../components/PageSideMenu/PageSideMenu'
import { createSoknaderBreadcrumbs, useUpdateBreadcrumbs } from '../../../hooks/useBreadcrumbs'
import SoknaderInfo from '../../../components/SoknaderInfo/SoknaderInfo'
import PageError from '../../../components/shared/errors/PageError'
import useFocusRefetch from '../../../hooks/useFocusRefetch'
import { addSpaceAfterEverySixthCharacter } from '../../../utils/stringUtils'

function Soknader(): ReactElement {
    const { sykmeldtId, sykmeldt, isLoading, error, refetch } = useSykmeldt()
    const sykmeldtName = formatNameSubjective(sykmeldt?.navn)

    useFocusRefetch(refetch)
    useUpdateBreadcrumbs(() => createSoknaderBreadcrumbs(sykmeldtId, sykmeldt?.navn), [sykmeldt?.navn, sykmeldtId])

    return (
        <PageContainer
            header={{
                Icon: PersonIcon,
                title: sykmeldtName,
                subtitle: sykmeldt && `Fødselsnr: ${addSpaceAfterEverySixthCharacter(sykmeldt.fnr)}`,
                subtitleSkeleton: !error,
            }}
            sykmeldt={sykmeldt}
            navigation={<PageSideMenu sykmeldt={sykmeldt} activePage={RootPages.Soknader} />}
        >
            <Head>
                <title>Søknader | Dine Sykmeldte - nav.no</title>
            </Head>
            {isLoading && <PageFallbackLoader text="Laster søknader" />}
            {sykmeldt && <SoknaderList sykmeldtId={sykmeldtId} sykmeldt={sykmeldt} />}
            {error && <PageError text="Vi klarte ikke å laste søknadene" cause={error.message} />}
            <SoknaderInfo />
        </PageContainer>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default Soknader
