export default interface ITarefa {
    id: string,
    city: string,
    state: string,
    coords: {
        lat: number,
        lng: number
    },
    weather: any
}