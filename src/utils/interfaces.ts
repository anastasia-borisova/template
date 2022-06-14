interface IObject {
    id: string,
    name: string,
}

interface IItem extends IObject {
    external_urls: {
        spotify: string
    },
    images: {
        url: string,
    }[],
    description: string,
    artists: IObject[]
}

interface IPlaylistsByCategory extends IObject {
    playlists: IItem[]
}

interface IMethod {
    method: string, 
    headers: { 
        'Authorization': string, 
        'Content-Type' : string  
    }
}

interface IPOST extends IMethod {
    body: string
}

interface IToken {
    access_token: string,
    expires_in: number,
}

interface ISearchResults {
    albums: {
        items: IItem[],
    }
    artists: {
        items: IItem[],
    }
    tracks: {
        items: IItem[],
    }
}

export type {
    IItem, IObject, IMethod, IPOST, IToken, IPlaylistsByCategory, ISearchResults
}