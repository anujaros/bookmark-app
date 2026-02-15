
export async function fetchUrlMetadata(url: string) {
    try{
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
            console.error('Metadata fetch failed:', response.status)
            return {
                title: null,
                description: null,
                image: null,
                favicon: null,
            }
        }

        const data = await response.json()

        return {
            title: data.data?.title || null,
            description: data.data?.description || null,
            image: data.data?.image?.url || data.data?.screenshot.url ||null,
            favicon: data.data?.logo?.url || null,
         }
    } catch (error) {
        return {
            title: null,
            description: null,
            image: null ,
            favicon: null ,
        }
    }
}