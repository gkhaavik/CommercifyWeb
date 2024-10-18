import Image from 'next/image'
import React from 'react'
import aboutImage from '@/public/about.jpeg'


function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col lg:flex-row items-start justify-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="w-full lg:w-1/2">
                    <Image
                        src={aboutImage}
                        alt="Hotel Hunger"
                        width={600}
                        height={400}
                        layout="responsive"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">Om Hotel Hunger</h1>
                    <div className="space-y-4 text-lg">
                        <p className="font-bold text-2xl">Tight, tungt, højt og tæt sammenspillet!</p>

                        <p>Hotel Hunger udsendte comeback albummet &apos;Slut&apos; i 2023. Knap 20 år efter bandets seneste udgivelse.</p>

                        <p>De nye sange er blevet skrevet af lyst, og det er tydeligt, at det er legen og nysgerrigheden, der driver værket. &quot;Slut&quot; (Album titel) byder på 10 numre, der umiskendeligt lyder som Hotel Hunger, men som bestemt ikke er blodfattige kopier af fordums materiale. Med erfaringer og inspirationer fra forskellige individuelle projekter gennem de sidste to årtier, har alle medlemmer bragt nye inputs med i studiet. Det kan høres.</p>

                        <p>Hotel Hunger er altså stærkt tilbage: For efter 20 års heftig turnéaktivitet - og otte studiealbums - besluttede det populære rockorkester oprindeligt at sige tak for nu i 2005. Men nu er det legendariske band igen på scenerne, når de i september 2023 drager på en eksklusiv turné rundt i Danmark. Og endda med et nyt album i rygsækken.</p>

                        <p>Gennem tiderne har bandet høstet utallige gode anmeldelser i aviser og magasiner, samt adskillelige Grammy nomineringer. Deres helt store gennembrud fik de i 1995 med udgivelsen af albummet &apos;Mars Needs Guitars&apos;, som blandt andet indeholdt hittet &apos;Sitting In a Room&apos;, der har opnået status som udødelig evergreen. Sangen nåede tiendepladsen på Tjeklisten. Og den bliver stadig spillet med jævne mellemrum på DR&apos;s radiokanaler.</p>

                        <p className="font-semibold">Besætningen er:</p>
                        <ul className="list-disc list-inside">
                            <li>Jimmy Jørgensen, Vox</li>
                            <li>Henrik Botoft – guitar</li>
                            <li>Michael Ziegler – bas</li>
                            <li>Knut E. Haavik – Keyboard</li>
                            <li>Freddie Wolf – trommer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage